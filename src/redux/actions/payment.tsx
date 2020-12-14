import moment from 'moment';
import {NativeModules} from 'react-native';
import {call} from 'react-native-reanimated';
import axiosConfig from '../../utils/axiosConfig';
import {mid, isStaging} from '../../utils/paytm';
import showSnackbar from '../../utils/snackbar';
import {AppThunk, actionNames, upgradePlanActionType} from '../utils';

const axios = axiosConfig();
const AllInOneSDKManager = NativeModules.AllInOneSDKManager;

export const upgradePlan = (
  loading: (x: boolean) => void,
  callback?: () => void,
): AppThunk => async (dispatch, getState) => {
  try {
    const {userId} = getState();

    const displayResult = async (result: string): Promise<void> => {
      // console.log(result);
      loading(true);

      const res = parsePaytmResponse(result);
      if (res) {
        if (res.STATUS === 'TXN_SUCCESS') {
          try {
            const verifyRes = await axios.post(
              `/users/${userId}/orders/${OrderId}/verify`,
              {
                CheckSumHash: res.CHECKSUMHASH,
                FormKeyValue: res,
              },
            );
            // console.log('Verify data', verifyRes.data);

            if (verifyRes.data?.Status === 'Success') {
              const upgradeDispatch: upgradePlanActionType = {
                type: actionNames.upgradePlan,
                payload: moment(verifyRes.data.UserPlan.Expiry),
              };
              dispatch(upgradeDispatch);
              callback?.();
            } else throw 'Verification failed';
          } catch (err) {
            console.log(err);
            setTimeout(() => {
              showSnackbar('Some error occurred');
            }, 250);
          }
        } else {
          console.log(res);
          setTimeout(() => {
            showSnackbar(res.RESPMSG);
          }, 250);
        }
      } else {
        console.log(result);
        setTimeout(() => {
          showSnackbar(result);
        }, 250);
      }
      loading(false);
    };

    const {
      data: {TransactionToken, OrderGuid, OrderId},
    } = await axios.post(`/users/${userId}/orders`, {
      PlanId: 1,
      Amount: 100,
      // CallBackUrlForGateway: '',
    });

    AllInOneSDKManager.startTransaction(
      OrderGuid.toString(),
      mid,
      TransactionToken.toString(),
      '100.00',
      `https://securegw-stage.paytm.in/theia/paytmCallback?ORDER_ID=${OrderGuid.toString()}`,
      isStaging,
      displayResult,
    );
  } catch (err) {
    console.log(err);

    setTimeout(() => {
      showSnackbar('Something went wrong');
    }, 250);
  }
  loading(false);
};

const parsePaytmResponse = (result: string) => {
  let res: {[x: string]: string} | null;

  if (result.slice(0, 28) === 'Payment Transaction response') {
    // populatng res with data using string manipulation
    res = {};
    result
      .slice(37, -2)
      .split(', ')
      .forEach((ele) => {
        const [x, y] = ele.split('=');
        res![x] = y;
      });
  } else {
    try {
      res = JSON.parse(result.trim());
    } catch (err) {
      res = null;
    }
  }
  // console.log('parsed', res);

  return res;
};

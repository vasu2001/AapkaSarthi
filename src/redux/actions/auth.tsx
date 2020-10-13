import {
  AppThunk,
  loginActionType,
  actionNames,
  loginActionPayload,
  signUpActionType,
} from '../utils';
import axiosConfig from '../../utils/axiosConfig';
import showSnackbar from '../../utils/snackbar';
import {NativeModules} from 'react-native';
import {mid, isStaging} from '../../utils/paytm';

const axios = axiosConfig();

const AllInOneSDKManager = NativeModules.AllInOneSDKManager;

const login = (payload: loginActionPayload): loginActionType => {
  return {
    type: actionNames.login,
    payload,
  };
};

const signUp = (
  firstName: string,
  lastName: string,
  email: string,
  phNo: string,
): signUpActionType => ({
  type: actionNames.signup,
  payload: {
    firstName,
    lastName,
    email,
    phNo,
  },
});

export const loginAction = (
  email: string,
  password: string,
  callback: () => void,
): AppThunk => async (dispatch) => {
  // api call
  try {
    const {
      data: {Claims},
    } = await axios.post('/accounts/login', {
      UserName: email,
      Password: password,
      Source: 'MobileApp',
    });
    // console.log(Claims);

    dispatch(
      login({
        userId: Claims.UserId,
        firstName: Claims.FirstName,
        lastName: Claims.LastName,
        email,
        // phNo: Claims.MobileNumber,
      }),
    );
  } catch (err) {
    console.log(JSON.stringify(err));
    // console.log('showing login failed snackbar');
    setTimeout(() => {
      showSnackbar(
        err.message == 'Network Error'
          ? 'Network Error'
          : 'Wrong email/password',
      );
    }, 250);
  }
  callback();
};

export const signUpAction = (
  FirstName: string,
  LastName: string,
  Email: string,
  MobileNumber: string,
  successCallback: () => void,
  failCallback: () => void,
): AppThunk => async (dispatch) => {
  try {
    await axios.post('/accounts/register', {
      FirstName,
      LastName,
      Email,
      MobileNumber,
      EmailRedirectUrl: 'null',
    });

    setTimeout(() => {
      showSnackbar('One Time Verification code has been sent');
    }, 250);

    dispatch(signUp(FirstName, LastName, Email, MobileNumber));
    successCallback();
  } catch (err) {
    console.log(err);

    setTimeout(() => {
      showSnackbar('Some error occured');
    }, 250);
    failCallback();
  }
};

export const resetPassAction = (
  otp: string,
  password: string,
  callback: () => void,
): AppThunk => async (dispatch, getState) => {
  try {
    const {email} = getState();

    await axios.post('/accounts/resetpassword', {
      UserName: email,
      Password: password,
      ResetToken: otp,
    });

    dispatch(loginAction(email ?? '', password, callback));
  } catch (err) {
    console.log(err);

    setTimeout(() => {
      showSnackbar('Some error occured');
    }, 250);

    callback();
  }
};

export const forgotPassAction = (
  email: string,
  successCallback: () => void,
  failCallback: () => void,
): AppThunk => async () => {
  try {
    setTimeout(() => {
      showSnackbar('OTP has been sent to your email');
    }, 250);

    successCallback();
  } catch (err) {
    console.log(err);

    setTimeout(() => {
      showSnackbar('Some error occured');
    }, 250);
    failCallback();
  }
};

export const signout = (): AppThunk => (dispatch) => {
  dispatch({
    type: actionNames.signout,
    payload: null,
  });
};

export const upgradePlan = (callback: () => void): AppThunk => async (
  dispatch,
  getState,
) => {
  try {
    const {userId} = getState();

    const displayResult = async (result: string): Promise<void> => {
      // console.log(result);

      if (result.slice(0, 28) === 'Payment Transaction response') {
        const res: {[x: string]: string} = {};

        // populatng res with data using string manipulation
        result
          .slice(37, -2)
          .split(', ')
          .forEach((ele) => {
            const [x, y] = ele.split('=');
            res[x] = y;
          });
        console.log(res, OrderId, userId);

        if (res.STATUS === 'TXN_SUCCESS') {
          try {
            const verifyRes = await axios.post(
              `/users/${userId}/orders/${OrderId}/verify`,
              {
                CheckSumHash: res.CHECKSUMHASH,
                FormKeyValue: res,
              },
            );

            console.log(verifyRes);

            // dispatch({
            //   type: actionNames.upgradePlan,
            //   payload: null,
            // });
          } catch (err) {
            console.log(err);
            setTimeout(() => {
              showSnackbar('Some error occurred');
            }, 250);
          }
        } else {
          setTimeout(() => {
            showSnackbar(res.RESPMSG);
          }, 250);
        }
      } else {
        setTimeout(() => {
          showSnackbar(result);
        }, 250);
      }
      callback();
    };

    const {
      data: {TransactionToken, OrderGuid, OrderId},
    } = await axios.post(`/users/${userId}/orders`, {
      PlanId: 1,
      Amount: 100,
      CallBackUrlForGateway: 'null',
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

    callback();
  }
};

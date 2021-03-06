import {
  AppThunk,
  loginActionType,
  actionNames,
  signUpActionType,
} from '../utils';
import axiosConfig from '../../utils/axiosConfig';
import showSnackbar from '../../utils/snackbar';
import moment from 'moment';

const axios = axiosConfig();

const signUp = (
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
): signUpActionType => ({
  type: actionNames.signup,
  payload: {
    firstName,
    lastName,
    email,
    phone,
  },
});

export const loginAction = (
  phone: string,
  otp: string,
  successCallback: () => void,
  failCallback: () => void,
): AppThunk => async (dispatch) => {
  // api call
  try {
    const {
      data: {Claims, AllowLogin, Message, UserPlan},
    } = await axios.post('/accounts/login', {
      Mobile: phone,
      OTP: otp,
    });
    // console.log('Login data', {Claims, AllowLogin, Message, UserPlan});

    if (AllowLogin) {
      const expiryDate = moment(UserPlan.Expiry);
      // const expiryDate = moment();

      const loginDispatch: loginActionType = {
        type: actionNames.login,
        payload: {
          userId: Claims.UserId,
          firstName: Claims.FirstName,
          lastName: Claims.LastName,
          email: Claims.Email,
          phone,
          freePlan: expiryDate.isBefore() || !UserPlan.Expiry,
          expiryDate,
        },
      };

      dispatch(loginDispatch);
    } else {
      setTimeout(() => {
        showSnackbar(Message);
      }, 250);
    }

    successCallback();
  } catch (err) {
    console.log(JSON.stringify(err));
    failCallback();
    // console.log('showing login failed snackbar');
    setTimeout(() => {
      showSnackbar(
        err.message == 'Network Error' ? 'Network Error' : 'Wrong OTP',
      );
    }, 250);
  }
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
      showSnackbar('Already Registered');
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

export const sendOtp = (
  phone: string,
  isregister: boolean,
  successCallback: () => void,
  failCallback: () => void,
): AppThunk => async (dispatch) => {
  try {
    const {data} = await axios.get(`/accounts/${phone}/otp`, {
      params: isregister,
    });

    console.log(data);

    if (data === 'InvalidUser') {
      // console.log('fail');
      setTimeout(() => {
        showSnackbar('User not registered');
      }, 250);

      failCallback();
    } else {
      setTimeout(() => {
        showSnackbar('One Time Verification code has been sent');
      }, 250);

      successCallback();
    }
  } catch (err) {
    console.log(err);
    setTimeout(() => {
      showSnackbar('Some error occured');
    }, 250);

    failCallback();
  }
};

export const verifyAccount = (
  mobile: string,
  otp: string,
  successCallback: () => void,
  failCallback: () => void,
): AppThunk => async (dispatch) => {
  try {
    const {data} = await axios.get(`/accounts/verifyotp`, {
      params: {
        mobile,
        otp,
      },
    });

    if (data === 'InvalidOtp') {
      setTimeout(() => {
        showSnackbar('Wrong OTP');
      }, 250);

      failCallback();
    } else if (data === 'Success') {
      // success
      dispatch(loginAction(mobile, otp, successCallback, failCallback));
    } else {
      setTimeout(() => {
        showSnackbar('Some error occured');
      }, 250);
      failCallback();
    }
  } catch (err) {
    console.log(err);
    setTimeout(() => {
      showSnackbar('Some error occured');
    }, 250);

    failCallback();
  }
};

export const setNewUser = (payload: boolean): AppThunk => (dispatch) =>
  dispatch({
    type: actionNames.setNewUser,
    payload,
  });

import {
  AppThunk,
  loginActionType,
  actionNames,
  loginActionPayload,
  signUpActionType,
} from '../utils';
import axiosConfig from '../../utils/axiosConfig';
import showSnackbar from '../../utils/snackbar';

const axios = axiosConfig();

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
  successCallback: () => void,
  failCallback: () => void,
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
    successCallback();
  } catch (err) {
    console.log(JSON.stringify(err));
    failCallback();
    // console.log('showing login failed snackbar');
    setTimeout(() => {
      showSnackbar(
        err.message == 'Network Error'
          ? 'Network Error'
          : 'Wrong email/password',
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

export const resetPassAction = (
  otp: string,
  password: string,
  successCallback: () => void,
  failCallback: () => void,
): AppThunk => async (dispatch, getState) => {
  try {
    const {email} = getState();

    await axios.post('/accounts/resetpassword', {
      UserName: email,
      Password: password,
      ResetToken: otp,
    });

    dispatch(loginAction(email ?? '', password, successCallback, failCallback));
  } catch (err) {
    console.log(err);
    failCallback();

    setTimeout(() => {
      showSnackbar('Some error occured');
    }, 250);
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

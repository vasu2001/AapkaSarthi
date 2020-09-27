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
  callback: () => void,
): AppThunk => async (dispatch) => {
  // api call
  try {
    const res = await axios.post(
      '/accounts/registeremail',
      {},
      {
        params: {
          email,
        },
      },
    );
    // console.log(res.data);
    dispatch(
      login({
        userId: res.data.UserId,
        firstName: res.data.FirstName,
        lastName: res.data.LastName,
        email,
        gender: res.data.Gender,
      }),
    );
  } catch (err) {
    console.log(JSON.stringify(err));
    // console.log('showing login failed snackbar');
    setTimeout(() => {
      showSnackbar(
        err.message == 'Network Error'
          ? 'Network Error'
          : 'User already registered',
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

export const forgotPassAction = (): AppThunk => () => {};

export const signout = (): AppThunk => (dispatch) => {
  dispatch({
    type: actionNames.signout,
    payload: null,
  });
};

export const upgradePlan = (): AppThunk => (dispatch) => {
  dispatch({
    type: actionNames.upgradePlan,
    payload: null,
  });
};

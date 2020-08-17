import {
  AppThunk,
  loginActionType,
  actionNames,
  loginActionPayload,
  contactGroupType,
  newListActionType,
  contactType,
  submitCallActionType,
  submitCallPayload,
} from './utils';
import axiosConfig from '../axios/axiosConfig';
import showSnackbar from '../utils/snackbar';

const axios = axiosConfig();

const login = (payload: loginActionPayload): loginActionType => {
  return {
    type: actionNames.login,
    payload,
  };
};

const newList = (payload: contactGroupType): newListActionType => {
  return {
    type: actionNames.newList,
    payload,
  };
};

const submitCall = (payload: submitCallPayload): submitCallActionType => ({
  type: actionNames.submitCall,
  payload,
});

const createList = async (GroupName: string, userId: string) =>
  axios.post(`/users/${userId}/calleesgroup`, {GroupName});

export const loginAction = (email: string): AppThunk => async (dispatch) => {
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
    showSnackbar('Login failed');
  }
};

export const newListAction = (
  list: contactType[],
  name: string,
  callback: () => void,
): AppThunk => async (dispatch, getState) => {
  try {
    const state = getState();
    const groupIdRes = await createList(name, state.userId ?? '');

    console.log(groupIdRes.data);

    //api call to submit the list

    dispatch(
      newList({
        name,
        list,
        id: groupIdRes.data.toString(),
      }),
    );
  } catch (err) {
    console.log(err);
    showSnackbar('Some Error Occured');
  }
  callback();
};

export const submitCallAction = (
  status: 'done' | 'rescheduled',
  comment: string,
  reschedule: string | null,
  contactIndex: number,
  listIndex: number,
  listId: string,
  callback: () => void,
): AppThunk => (dispatch) => {
  //api call

  dispatch(
    submitCall({
      comment,
      reschedule,
      contactIndex,
      listIndex,
      listId,
      status,
    }),
  );
  callback();
};

export const uploadFileAction = (
  data: string,
  name: string,
  hasHeaders: boolean,
  callback: () => void,
): AppThunk => async (dispatch, getState) => {
  try {
    const {userId} = getState();
    const groupId = await (
      await createList(name, userId ?? '')
    ).data.toString();

    const uploadRes = await axios.post(
      `/users/${userId}/groups/${groupId}/calleesfile`,
      {
        CountryCode: '+91',
        Callees: {
          Name: name,
          Type: 'test',
          HasHeaders: hasHeaders,
          Base64Bytes: data,
        },
      },
    );
    console.log(uploadRes.data);
  } catch (err) {
    console.log(err);
    showSnackbar('Some Error Occured');
  }
  callback();
};

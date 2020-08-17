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
import axiosConfig from '../utils/axiosConfig';
import showSnackbar from '../utils/snackbar';
import {Buffer} from 'buffer';

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
  successCallback: () => void,
  failCallback: () => void,
): AppThunk => async (dispatch, getState) => {
  try {
    const {userId} = getState();
    const groupId: string = (
      await createList(name, userId ?? '')
    ).data.toString();

    console.log(groupId);

    for (let i = 0; i < list.length; i++) {
      const contactId = (
        await axios.post(`/users/${userId}/groups/${groupId}/callees`, {
          Name: list[i].name,
          Contact: list[i].phNo,
        })
      ).data.toString();
      list[i].id = contactId;
    }

    dispatch(
      newList({
        name,
        list,
        id: groupId,
      }),
    );

    successCallback();
  } catch (err) {
    console.log(err);
    showSnackbar('Some Error Occured');
    failCallback();
  }
};

export const submitCallAction = (
  status: 'done' | 'rescheduled',
  comment: string,
  reschedule: string | null,
  contactIndex: number,
  listIndex: number,
  callback: () => void,
): AppThunk => async (dispatch, getState) => {
  try {
    const contactId: string =
      getState().callData[listIndex].list[listIndex].id ?? '';
    const {userId} = getState();

    await axios.post(`/users/${userId}/calls`, {
      Notes: comment === '' ? 'none' : comment,
      CalleeId: contactId,
      Status: status === 'done' ? 'Done' : 'ReScheduled',
      ReScheduledDate: reschedule ?? '',
    });

    dispatch(
      submitCall({
        comment,
        reschedule,
        contactIndex,
        listIndex,
        status,
      }),
    );
  } catch (err) {
    console.log(JSON.stringify(err));
    showSnackbar('Some error occured');
  }
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

    const buffer = new Buffer(data);
    // console.log(buffer.toString('base64'));

    const uploadRes = await axios.post(
      `/users/${userId}/groups/${groupId}/calleesfile`,
      {
        CountryCode: 'IN',
        Callees: {
          Name: name,
          Type: 'text/csv',
          HasHeaders: hasHeaders,
          Base64Bytes: buffer.toString('base64'),
        },
      },
    );
    // console.log(uploadRes.data);

    const getList = await axios.get(
      `/users/${userId}/groups/${groupId}/callees`,
      {
        params: {
          isActive: true,
          take: 100,
        },
      },
    );

    dispatch(
      newList({
        name,
        id: groupId,
        list: getList.data.Data.map(
          (ele: any): contactType => ({
            id: ele.CalleeId,
            name: ele.Name,
            phNo: ele.Contact,
            status: 'upcoming',
            reschedule: null,
          }),
        ),
      }),
    );
  } catch (err) {
    console.log(JSON.stringify(err));
    showSnackbar('Some Error Occured');
  }
  callback();
};

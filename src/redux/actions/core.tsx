import {
  actionNames,
  contactGroupType,
  newListActionType,
  submitCallPayload,
  submitCallActionType,
  contactType,
  addDataToListActionType,
  AppThunk,
  deleteListActionType,
  deleteAllActionType,
} from '../utils';
import PushNotification from 'react-native-push-notification';
import moment from 'moment';
import axiosConfig from '../../utils/axiosConfig';
import showSnackbar from '../../utils/snackbar';
import {call} from 'react-native-reanimated';

const axios = axiosConfig();
const freeLimit = 25; ///limit of contacts on free plan

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

const addDataToList = (
  index: number,
  list: contactType[],
): addDataToListActionType => ({
  type: actionNames.addToList,
  payload: {
    index,
    list,
  },
});

const createList = async (GroupName: string, userId: string) =>
  axios.post(`/users/${userId}/calleesgroup`, {GroupName});

export const newListAction = (
  list: {[x: string]: string},
  name: string,
  successCallback: () => void,
  failCallback: () => void,
): AppThunk => async (dispatch, getState) => {
  try {
    const {userId, freePlan} = getState();
    const groupId: string = (
      await createList(name, userId ?? '')
    ).data.toString();

    let finalList: contactType[] = [];

    console.log(groupId);
    // console.log(list);

    for (const i in list) {
      // console.log(i, list[i]);
      const contactId = (
        await axios.post(`/users/${userId}/groups/${groupId}/callees`, {
          Name: list[i],
          Contact: i,
        })
      ).data.toString();

      finalList.push({
        name: list[i],
        phNo: i,
        id: contactId,
        reschedule: null,
        status: 'upcoming',
      });
    }

    if (freePlan && finalList.length > freeLimit) {
      setTimeout(() => {
        showSnackbar(`Only ${freeLimit} contacts are allowed on free plan`);
      }, 250);
      finalList = finalList.slice(0, freeLimit);
    }

    dispatch(
      newList({
        name,
        list: finalList,
        id: groupId,
        loaded: true,
      }),
    );

    successCallback();
  } catch (err) {
    console.log(err);
    failCallback();
    showSnackbar('Some Error Occured');
  }
};

export const submitCallAction = (
  status: 'done' | 'rescheduled',
  comment: string,
  reschedule: string | null,
  contactIndex: number,
  // listIndex: number,
  callback: () => void,
): AppThunk => async (dispatch, getState) => {
  try {
    const {userId, activeList: listIndex, callData} = getState();
    const {name} = callData[listIndex].list[contactIndex];
    if (contactIndex < 0 || listIndex < 0) {
      callback();
      return;
    }

    const contactId: string =
      getState().callData[listIndex].list[contactIndex].id ?? '';

    await axios.post(`/users/${userId}/calls`, {
      Notes: comment === '' ? 'none' : comment,
      CalleeId: contactId,
      Status: status === 'done' ? 'Done' : 'ReScheduled',
      ReScheduledDate: reschedule ?? '',
    });

    if (status === 'rescheduled') {
      PushNotification.localNotificationSchedule({
        date: moment(reschedule).subtract(30, 'minutes').toDate(),
        title: 'ReScheduled Call',
        message: `A call to ${name} is scheduled in 30 mins.`,
        playSound: true,
        soundName: 'default',
      });
    }

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
    setTimeout(() => {
      showSnackbar('Some error occured');
    }, 250);
  }
  callback();
};

export const uploadFileAction = (
  data: string,
  name: string,
  hasHeaders: boolean,
  type: string,
  callback: () => void,
): AppThunk => async (dispatch, getState) => {
  try {
    const {userId, freePlan} = getState();
    const groupId = await (
      await createList(name, userId ?? '')
    ).data.toString();

    // console.log(uploadRes.data);

    const uploadRes = await axios.post(
      `/users/${userId}/groups/${groupId}/calleesfile`,
      {
        CountryCode: 'IN',
        Callees: {
          Name: name,
          Type: type,
          HasHeaders: hasHeaders,
          Base64Bytes: data,
        },
      },
    );

    const getList = await axios.get(
      `/users/${userId}/groups/${groupId}/callees`,
      {
        params: {
          isActive: true,
          take: freePlan ? freeLimit : 1000,
        },
      },
    );

    // console.log(uploadRes.data.TotalRecords);
    if (freePlan && parseInt(uploadRes.data.TotalRecords) > freeLimit) {
      setTimeout(() => {
        showSnackbar(`Only ${freeLimit} contacts are allowed on free plan`);
      }, 250);
    } else if (parseInt(uploadRes.data.TotalRecords) > 1000) {
      setTimeout(() => {
        showSnackbar('Only 1000 records are supported in beta version');
      }, 250);
    }

    dispatch(
      newList({
        name,
        id: groupId,
        loaded: true,
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
    console.log(err);
    setTimeout(() => {
      showSnackbar('Some Error Occured');
    }, 250);
  }
  callback();
};

export const deleteListAction = (
  listIndex: number,
  callback: () => void,
): AppThunk => async (dispatch, getState) => {
  try {
    const {userId, callData} = getState();
    const groupId = callData[listIndex].id;

    await axios.delete(`/users/${userId}/calleesgroup/${groupId}`);

    dispatch({
      type: actionNames.deleteList,
      payload: {
        listIndex,
      },
    });
  } catch (err) {
    console.log(err);

    setTimeout(() => {
      showSnackbar('Something went wrong');
    }, 250);
  }

  callback();
};

export const changeActiveListAction = (
  newIndex: number,
  callback: () => void,
): AppThunk => async (dispatch, getState) => {
  try {
    const {userId, callData, freePlan} = getState();
    const {id, loaded} = callData[newIndex];

    if (!loaded) {
      //get list and save it

      const getList = await axios.get(`/users/${userId}/groups/${id}/callees`, {
        params: {
          isActive: true,
          take: freePlan ? freeLimit : 1000,
        },
      });
      // console.log(getList.data);

      dispatch(
        addDataToList(
          newIndex,
          getList.data.Data.map(
            (ele: any): contactType => ({
              id: ele.CalleeId,
              name: ele.Name,
              phNo: ele.Contact,
              status: 'upcoming',
              reschedule: null,
            }),
          ),
        ),
      );
    }

    dispatch({
      type: actionNames.changeActiveList,
      payload: newIndex,
    });
  } catch (err) {
    console.log(err);
  }

  callback();
};

export const deleteAllAction = (callback: () => void): AppThunk => async (
  dispatch,
  getState,
) => {
  try {
    const {userId, callData} = getState();

    for (const {id} of callData) {
      await axios.delete(`/users/${userId}/calleesgroup/${id}`);
    }

    dispatch({
      type: actionNames.deleteAll,
      payload: null,
    });
  } catch (err) {
    console.log(err);

    setTimeout(() => {
      showSnackbar('Something went wrong');
    }, 250);
  }

  callback();
};

export const updateLists = (): AppThunk => async (dispatch, getState) => {
  try {
    const {userId, callData} = getState();

    const res = await axios.get(`/users/${userId?.toString()}/associates`);
    let listRes: {GroupId: string; GroupName: string}[] =
      res.data?.Data?.[0]?.CalleeGroups ?? [];

    listRes = listRes.filter(
      (rec) => callData.find((e) => e.id == rec.GroupId) === undefined,
    );

    // console.log(userId);
    // console.log(listRes);

    dispatch({
      type: actionNames.updateMultiple,
      payload: listRes.map(
        (e): contactGroupType => ({
          name: e.GroupName,
          id: e.GroupId,
          list: [],
          loaded: false,
        }),
      ),
    });
  } catch (err) {
    console.log(err);
  }
};

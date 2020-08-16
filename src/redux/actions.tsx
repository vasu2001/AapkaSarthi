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

export const loginAction = (email: string): AppThunk => async (dispatch) => {
  // api call
  dispatch(
    login({
      userId: '9',
      firstName: 'a',
      lastName: 'b',
      email,
      gender: 'm',
    }),
  );
};

export const newListAction = (
  list: contactType[],
  name: string,
  callback: () => void,
): AppThunk => async (dispatch) => {
  // api call, id return
  dispatch(
    newList({
      name,
      list,
      id: 'a',
    }),
  );
  callback();
};

export const submitCallAction = (
  status: 'done' | 'rescheduled',
  comment: string,
  reschedule: string | null,
  contactIndex: number,
  listIndex: number,
  listId: string,
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
};

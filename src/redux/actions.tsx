import {
  AppThunk,
  loginActionType,
  actionNames,
  loginActionPayload,
  contactGroupType,
  newListActionType,
  contactType,
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

export const loginAction = (email: string): AppThunk => async (dispatch) => {
  // api call
  dispatch(
    login({
      userId: '9',
      firstName: 'a',
      lastName: 'b',
      email: 'v@v.com',
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

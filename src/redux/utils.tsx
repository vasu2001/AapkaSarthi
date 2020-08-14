import {ThunkAction} from 'redux-thunk';
import {Action} from 'redux';

export interface contactType {
  name: string;
  phno: string;
  comment?: string | undefined;
}

export interface contactGroupType {
  name: string | null;
  id: string;
  list: contactType[];
}

export interface stateType {
  userId: string | null;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  gender: 'm' | 'f' | null;
  callData: contactGroupType[];
}

export const actionNames: {[x: string]: string} = {
  login: 'LOGIN',
};

export interface loginActionType {
  type: 'string';
  payload: {
    userId: string;
    firstName: string | null;
    lastName: string | null;
    email: string;
    gender: 'm' | 'f' | null;
  };
}

export type actionType = loginActionType;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  stateType,
  unknown,
  Action<string>
>;

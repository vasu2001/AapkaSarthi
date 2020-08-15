import {ThunkAction} from 'redux-thunk';
import {Action} from 'redux';

export const actionNames = {
  login: 'LOGIN',
  newList: 'ADD_LIST',
};

export interface contactType {
  name: string;
  phNo: string;
  comment?: string | undefined;
  status: 'pending' | 'done' | 'upcoming';
  reschedule: string | null;
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

export interface loginActionPayload {
  userId: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  gender: 'm' | 'f' | null;
}

export interface loginActionType {
  type: string;
  payload: loginActionPayload;
}

export type newListPayload = contactGroupType;

export interface newListActionType {
  type: string;
  payload: newListPayload;
}

export type actionType = newListActionType | loginActionType;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  stateType,
  unknown,
  Action<string>
>;

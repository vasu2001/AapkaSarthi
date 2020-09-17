import {ThunkAction} from 'redux-thunk';
import {Action} from 'redux';

export const actionNames = {
  login: 'LOGIN',
  newList: 'ADD_LIST',
  submitCall: 'SUBMIT_CALL',
  deleteList: 'DELETE_LIST',
  changeActiveList: 'ACTIVE_LIST',
  deleteAll: 'DELETE_ALL',
  upgradePlan: 'UPGRADE_PLAN',
  signout: 'SIGNOUT',
};

const aa = 'asdfbn';

export interface contactType {
  name: string;
  phNo: string;
  comment?: string | undefined;
  status: 'rescheduled' | 'done' | 'upcoming';
  reschedule: string | null;
  id: string | null;
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
  activeList: number;
  freePlan: boolean;
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

export interface submitCallPayload {
  contactIndex: number;
  listIndex: number;
  comment: string;
  reschedule: string | null;
  status: 'done' | 'rescheduled';
}

export interface submitCallActionType {
  type: string;
  payload: submitCallPayload;
}

export interface deleteListPayload {
  listIndex: number;
}

export interface deleteListActionType {
  type: string;
  payload: deleteListPayload;
}

export interface changeActiveListActionType {
  type: string;
  payload: number;
}

export interface deleteAllActionType {
  type: string;
  payload: null;
}

export type upgradePlanActionType = deleteAllActionType;

export type signoutActionType = deleteAllActionType;

export type actionType =
  | newListActionType
  | loginActionType
  | submitCallActionType
  | deleteListActionType
  | changeActiveListActionType
  | deleteAllActionType
  | upgradePlanActionType
  | signoutActionType;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  stateType,
  unknown,
  Action<string>
>;

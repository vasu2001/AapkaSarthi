import {ThunkAction} from 'redux-thunk';
import {Action} from 'redux';
import {Moment} from 'moment';

export const actionNames = {
  login: 'LOGIN',
  signup: 'SIGNUP',
  signout: 'SIGNOUT',
  upgradePlan: 'UPGRADE_PLAN',
  newList: 'ADD_LIST',
  deleteList: 'DELETE_LIST',
  changeActiveList: 'ACTIVE_LIST',
  deleteAll: 'DELETE_ALL',
  addToList: 'ADD_DATA_TO_LIST',
  updateMultiple: 'UPDATE_MULTIPLE_LIST',
  submitCall: 'SUBMIT_CALL',
  setNewUser: 'SET_NEW_USER',
};

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
  loaded: boolean;
}

export interface stateType {
  userId: string | null;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  activeList: number;
  freePlan: boolean;
  phone: string;
  callData: contactGroupType[];
  expiryDate: Moment;
  newUser: boolean; //flag to be set in case of signup
}

export interface loginActionPayload {
  userId: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  phone: string;
  freePlan: boolean;
  expiryDate: Moment;
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

export interface upgradePlanActionType {
  type: string;
  payload: Moment;
}

export type signoutActionType = deleteAllActionType;

export interface addDataToListPayload {
  index: number;
  list: contactType[];
}

export interface addDataToListActionType {
  type: string;
  payload: addDataToListPayload;
}

export interface updateMultipleListsActionType {
  type: string;
  payload: contactGroupType[];
}

export interface signUpPayload {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
}

export interface signUpActionType {
  type: string;
  payload: signUpPayload;
}

export interface newUserActionType {
  type: string;
  payload: boolean;
}

export type actionType =
  | newListActionType
  | loginActionType
  | submitCallActionType
  | deleteListActionType
  | changeActiveListActionType
  | deleteAllActionType
  | upgradePlanActionType
  | signoutActionType
  | addDataToListActionType
  | updateMultipleListsActionType
  | signUpActionType
  | newUserActionType;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  stateType,
  unknown,
  Action<string>
>;

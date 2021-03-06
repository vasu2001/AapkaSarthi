import moment from 'moment';
import {
  stateType,
  actionType,
  actionNames,
  contactGroupType,
  submitCallPayload,
  deleteListPayload,
  loginActionPayload,
  addDataToListPayload,
  signUpActionType,
  upgradePlanActionType,
  newUserActionType,
} from './utils';

const initialState: stateType = {
  email: null,
  userId: null,
  firstName: null,
  lastName: null,
  callData: [],
  activeList: -1,
  freePlan: true,
  phone: '',
  expiryDate: moment(null),
  newUser: false,
};

export default (state = initialState, action: actionType): stateType => {
  // console.log(action, state);
  console.log(JSON.stringify(action));
  let newState: stateType | null = null;

  switch (action.type) {
    case actionNames.login:
      return {...state, ...(action.payload as loginActionPayload)};

    case actionNames.newList:
      newState = {...state};
      if (newState.callData.length === 0) newState.activeList = 0;
      newState.callData = [
        ...newState.callData,
        action.payload as contactGroupType,
      ];
      return newState;

    case actionNames.submitCall:
      const {
        listIndex,
        contactIndex,
        comment,
        status,
        reschedule,
      } = action.payload as submitCallPayload;
      newState = {...state};
      newState.callData = [...newState.callData];
      newState.callData[listIndex].list = [
        ...newState.callData[listIndex].list,
      ];
      newState.callData[listIndex].list[contactIndex] = {
        ...newState.callData[listIndex].list[contactIndex],
        ...{comment, status, reschedule},
      };
      console.log(newState);
      return newState;

    case actionNames.deleteList:
      const {listIndex: deleteListIndex} = action.payload as deleteListPayload;
      newState = {...state};
      newState.callData = [...newState.callData];
      newState.callData.splice(deleteListIndex, 1);
      if (deleteListIndex === newState.activeList) newState.activeList = -1;
      else if (deleteListIndex < newState.activeList) newState.activeList--;
      return newState;

    case actionNames.changeActiveList:
      return {...state, activeList: action.payload as number};

    case actionNames.deleteAll:
      return {...state, activeList: -1, callData: []};

    case actionNames.upgradePlan:
      return {
        ...state,
        freePlan: false,
        expiryDate: (action as upgradePlanActionType).payload,
      };

    case actionNames.signout:
      return initialState;

    case actionNames.addToList:
      newState = {...state};
      const {index, list} = action.payload as addDataToListPayload;
      newState.callData[index].list = list;
      newState.callData[index].loaded = true;
      return newState;

    case actionNames.updateMultiple:
      newState = {...state};
      newState.callData = [
        ...newState.callData,
        ...(action.payload as contactGroupType[]),
      ];
      // refreshing freePlan on every app upload a/o expiry date
      newState.freePlan = state.freePlan || moment(state.expiryDate).isBefore();
      return newState;

    case actionNames.signup:
      const {payload} = action as signUpActionType;
      return {...state, ...payload, newUser: true};

    case actionNames.setNewUser:
      const {payload: newUser} = action as newUserActionType;
      return {...state, newUser};

    default:
      return state;
  }
};

import {
  stateType,
  actionType,
  actionNames,
  contactGroupType,
  submitCallPayload,
} from './utils';
import {newListAction} from './actions';
// import {fromJS} from 'immutable';

const initialState: stateType = {
  email: null,
  userId: null,
  firstName: null,
  lastName: null,
  callData: [],
  gender: null,
};

export default (state = initialState, action: actionType): stateType => {
  // console.log(action, state);
  console.log(JSON.stringify(action));
  let newState: stateType | null = null;

  switch (action.type) {
    case actionNames.login:
      return {...state, ...action.payload};

    case actionNames.newList:
      newState = {...state};
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
    default:
      return state;
  }
};

import {
  stateType,
  actionType,
  actionNames,
  contactGroupType,
  submitCallPayload,
} from './utils';
import {newListAction} from './actions';

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
  console.log(JSON.stringify(state));
  let newState: stateType | null = null;

  switch (action.type) {
    case actionNames.login:
      return {...state, ...action.payload};

    case actionNames.newList:
      newState = {...state};
      newState.callData.push(action.payload as contactGroupType);
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
      newState.callData[listIndex].list[contactIndex] = {
        ...newState.callData[listIndex].list[contactIndex],
        ...{comment, status, reschedule},
      };
      return newState;
    default:
      return state;
  }
};

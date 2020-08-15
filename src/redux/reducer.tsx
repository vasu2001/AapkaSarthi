import {stateType, actionType, actionNames, contactGroupType} from './utils';
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
  console.log(action);
  let newState: stateType | null = null;

  switch (action.type) {
    case actionNames.login:
      return {...state, ...action.payload};

    case actionNames.newList:
      newState = {...state};
      newState.callData.push(action.payload as contactGroupType);
      return newState;

    default:
      return state;
  }
};

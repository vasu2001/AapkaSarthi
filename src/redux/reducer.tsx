import {stateType, actionType, actionNames} from './utils';

const initialState: stateType = {
  email: null,
  userId: null,
  firstName: null,
  lastName: null,
  callData: [],
  gender: null,
};

export default (state = initialState, action: actionType): stateType => {
  switch (action.type) {
    case actionNames.login:
      return {...state, ...action.payload};
    default:
      return state;
  }
};

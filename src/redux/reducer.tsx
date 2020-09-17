import {
  stateType,
  actionType,
  actionNames,
  contactGroupType,
  submitCallPayload,
  deleteListPayload,
  loginActionPayload,
} from './utils';

const initialState: stateType = {
  email: null,
  userId: null,
  firstName: null,
  lastName: null,
  callData: [],
  activeList: -1,
  gender: null,
  freePlan: true,
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
      return {...state, freePlan: false};

    case actionNames.signout:
      return {...initialState, callData: state.callData};

    default:
      return state;
  }
};

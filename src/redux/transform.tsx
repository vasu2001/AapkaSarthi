import {createTransform} from 'redux-persist';
import {stateType} from './utils';

const setTransform = createTransform<stateType, string>(
  (inboundState) => {
    return JSON.stringify(inboundState);
  },
  (outbountState) => {
    console.log(outbountState);
    return JSON.parse(outbountState);
  },
  {},
);

export default setTransform;

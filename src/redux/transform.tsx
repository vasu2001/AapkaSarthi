import {createTransform} from 'redux-persist';

const setTransform = createTransform(
  (inboundState, key) => {
    return JSON.stringify(inboundState);
  },
  (outbountState, key) => {
    console.log(outbountState);
    return JSON.parse(outbountState);
  },
  {},
);

export default setTransform;

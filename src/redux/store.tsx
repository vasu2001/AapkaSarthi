import {createStore, applyMiddleware} from 'redux';
import {persistStore, persistReducer, PersistConfig} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import reducer from './reducer';
import thunk from 'redux-thunk';
import {stateType, actionType} from './utils';
import hardSet from 'redux-persist/es/stateReconciler/hardSet';
import setTransform from './transform';

const persistConfig: PersistConfig<stateType> = {
  key: 'statePersist',
  storage: AsyncStorage,
  stateReconciler: hardSet,
  transforms: [setTransform],
};

const persistedReducer = persistReducer<stateType, any>(persistConfig, reducer);

export default () => {
  let store = createStore(persistedReducer, applyMiddleware(thunk));
  let persistor = persistStore(store);
  return {store, persistor};
};

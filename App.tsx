import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {MainNavigator} from './src/navigations/MainNavigator';
import createPersistStore from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import {navRef} from './src/utils/NavigationRef';

declare const global: {HermesInternal: null | {}};

const {store, persistor} = createPersistStore();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer ref={navRef}>
          <MainNavigator />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;

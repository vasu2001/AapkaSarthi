import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reducer from './src/redux/reducer';
import thunk from 'redux-thunk';
import {MainNavigator} from './src/navigations/MainNavigator';

declare const global: {HermesInternal: null | {}};

const store = createStore(reducer, applyMiddleware(thunk));

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </Provider>
  );
};

export default App;

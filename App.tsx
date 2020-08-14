import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './src/navigations/AuthNavigator';
import {BottomNavigator} from './src/navigations/BottomNavigator';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reducer from './src/redux/reducer';
import thunk from 'redux-thunk';

declare const global: {HermesInternal: null | {}};

const store = createStore(reducer, applyMiddleware(thunk));

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        {/* <AuthNavigator /> */}
        <BottomNavigator />
      </NavigationContainer>
    </Provider>
  );
};

export default App;

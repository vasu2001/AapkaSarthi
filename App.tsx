import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './src/navigations/AuthNavigator';
import {BottomNavigator} from './src/navigations/BottomNavigator';

declare const global: {HermesInternal: null | {}};

const App = () => {
  return (
    <NavigationContainer>
      {/* <AuthNavigator /> */}
      <BottomNavigator />
    </NavigationContainer>
  );
};

export default App;

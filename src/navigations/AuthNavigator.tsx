import * as React from 'react';
import {Text, View, StatusBar} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import WelcomeScreen from '../screens/Welcome';
import {LoginScreen} from '../screens/Login';
import {GRAY_BACKGROUND} from '../utils/colors';

interface AuthNavigatorProps {}

const Stack = createStackNavigator();

const AuthNavigator: React.SFC<AuthNavigatorProps> = (props) => {
  return (
    <>
      <StatusBar backgroundColor={GRAY_BACKGROUND} barStyle="dark-content" />
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </>
  );
};

export default AuthNavigator;

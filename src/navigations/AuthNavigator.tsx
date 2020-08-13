import * as React from 'react';
import {Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import WelcomeScreen from '../screens/Welcome';
import {LoginScreen} from '../screens/Login';

interface AuthNavigatorProps {}

const Stack = createStackNavigator();

const AuthNavigator: React.SFC<AuthNavigatorProps> = (props) => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;

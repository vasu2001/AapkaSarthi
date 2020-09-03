import * as React from 'react';
import {StatusBar} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {LoginScreen} from '../screens/Login';
import {GRAY_BACKGROUND} from '../utils/colors';
import {IntroductionSlides} from '../screens/IntroductionSlides';

interface AuthNavigatorProps {}

const Stack = createStackNavigator();

const AuthNavigator: React.SFC<AuthNavigatorProps> = () => {
  return (
    <>
      <StatusBar backgroundColor={GRAY_BACKGROUND} barStyle="dark-content" />
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Welcome" component={IntroductionSlides} />
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </>
  );
};

export default AuthNavigator;

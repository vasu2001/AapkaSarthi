import * as React from 'react';
import {StatusBar} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {LoginScreen} from '../screens/Login';
import {GRAY_BACKGROUND} from '../utils/colors';
import {IntroductionSlides} from '../screens/IntroductionSlides';
import {SignUpScreen} from '../screens/SignUp';
import {ForgotPasswordScreen} from '../screens/ForgotPassword';
import {VerifyOtpScreen} from '../screens/VerifyOTP';

interface AuthNavigatorProps {}

const Stack = createStackNavigator();

const AuthNavigator: React.SFC<AuthNavigatorProps> = () => {
  return (
    <>
      <StatusBar backgroundColor={GRAY_BACKGROUND} barStyle="dark-content" />
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Welcome" component={IntroductionSlides} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="ForgotPass" component={ForgotPasswordScreen} />
        <Stack.Screen name="VerifyOtp" component={VerifyOtpScreen} />
      </Stack.Navigator>
    </>
  );
};

export default AuthNavigator;

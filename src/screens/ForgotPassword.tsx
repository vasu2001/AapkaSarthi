import React, {useState} from 'react';
import {View, StyleSheet, ImageBackground, Image} from 'react-native';
import {BLUE, GRAY_BACKGROUND, GRAY} from '../utils/colors';
import CustomInput from '../components/CustomInput';
import {CustomButton} from '../components/CustomButton';
import showSnackbar from '../utils/snackbar';
import {useDispatch} from 'react-redux';
import {LoadingModal} from '../components/LoadingModal';
import {StackNavigationProp} from '@react-navigation/stack';
import {forgotPassAction} from '../redux/actions/auth';

export interface ForgotPasswordScreenProps {
  navigation: StackNavigationProp<any>;
}

export const ForgotPasswordScreen: React.FunctionComponent<ForgotPasswordScreenProps> = ({
  navigation,
}) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const mailFormat: RegExp = /^[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,4}$/;
  const dispatch = useDispatch();

  const signup = (): void => {
    if (!mailFormat.test(email.trim())) {
      showSnackbar('Enter a valid email');
    } else {
      setLoading(true);
      dispatch(
        forgotPassAction(
          email.trim(),
          () => {
            setLoading(false);
            navigation.navigate('VerifyOtp');
          },
          () => {
            setLoading(false);
          },
        ),
      );
    }
    navigation.navigate('VerifyOtp');
  };

  return (
    <>
      <ImageBackground
        source={require('../assets/background/1.png')}
        style={styles.mainContainer}
        resizeMode="stretch">
        <Image
          source={require('../assets/logo/beta-dark.png')}
          resizeMode="contain"
          style={styles.heading}
        />
        <View style={styles.container}>
          <CustomInput
            value={email}
            onChangeText={setEmail}
            validation={(text: string): boolean => mailFormat.test(text.trim())}
            placeholder="Email"
            placeholderTextColor="grey"
            style={styles.input}
          />

          <CustomButton
            text="Send OTP"
            onPress={signup}
            style={styles.button}
            disabled={loading}
          />
        </View>
      </ImageBackground>
      <LoadingModal visible={loading} />
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: GRAY_BACKGROUND,
  },
  heading: {
    position: 'absolute',
    top: 25,
    height: 40,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    alignSelf: 'center',
    borderRadius: 25,
    elevation: 2,
    backgroundColor: 'white',
  },
  input: {
    marginBottom: 25,
  },
  button: {
    marginVertical: 10,
  },
});

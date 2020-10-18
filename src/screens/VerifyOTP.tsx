import React, {useState} from 'react';
import {View, StyleSheet, ImageBackground, Image} from 'react-native';
import {BLUE, GRAY_BACKGROUND, GRAY} from '../utils/colors';
import CustomInput from '../components/CustomInput';
import {CustomButton} from '../components/CustomButton';
import showSnackbar from '../utils/snackbar';
import {useDispatch} from 'react-redux';
import {LoadingModal} from '../components/LoadingModal';
import {resetPassAction} from '../redux/actions/auth';

export interface VerifyOtpScreenProps {}

export const VerifyOtpScreen: React.SFC<VerifyOtpScreenProps> = () => {
  const [otp, setOtp] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [loading, setLoading] = useState(false);

  const mailFormat: RegExp = /^[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,4}$/;
  const dispatch = useDispatch();

  const setPass = (): void => {
    if (!otp) {
      showSnackbar('Enter OTP');
    } else if (password1.length < 4) {
      showSnackbar('Password must have minimum 4 characters');
    } else if (password1 !== password2) {
      showSnackbar('Passwords donot match');
    } else {
      setLoading(true);
      dispatch(
        resetPassAction(otp, password1, () => {
          setLoading(false);
        }),
      );
    }
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
            value={otp}
            onChangeText={setOtp}
            validation={(text: string): boolean => otp.trim().length === 4}
            placeholder="OTP"
            placeholderTextColor="grey"
            style={styles.input}
            keyboardType="number-pad"
          />

          <CustomInput
            value={password1}
            onChangeText={setPassword1}
            validation={(text: string): boolean => text.length >= 4}
            placeholder="New Password"
            placeholderTextColor="grey"
            style={styles.input}
            secureTextEntry
          />

          <CustomInput
            value={password2}
            onChangeText={setPassword2}
            validation={(text: string): boolean => text == password1}
            placeholder="Re-enter Password"
            placeholderTextColor="grey"
            style={styles.input}
            secureTextEntry
          />

          <CustomButton
            text="Set Password"
            onPress={setPass}
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

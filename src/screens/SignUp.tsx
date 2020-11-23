import React, {useState} from 'react';
import {View, StyleSheet, ImageBackground, Image} from 'react-native';
import {BLUE, GRAY_BACKGROUND, GRAY} from '../utils/colors';
import CustomInput from '../components/CustomInput';
import {CustomButton} from '../components/CustomButton';
import showSnackbar from '../utils/snackbar';
import {useDispatch} from 'react-redux';
import {LoadingModal} from '../components/LoadingModal';
import {StackNavigationProp} from '@react-navigation/stack';
import {signUpAction} from '../redux/actions/auth';

export interface SignUpScreenProps {
  navigation: StackNavigationProp<any>;
}

export const SignUpScreen: React.FunctionComponent<SignUpScreenProps> = ({
  navigation,
}) => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const mailFormat: RegExp = /^[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,4}$/;
  const dispatch = useDispatch();

  const signup = (): void => {
    if (firstName == '' || lastName == '') {
      showSnackbar('Enter your name');
    } else if (phone.trim().length !== 10) {
      showSnackbar('Enter a valid phone number');
    } else {
      setLoading(true);
      dispatch(
        signUpAction(
          firstName,
          lastName,
          email,
          phone,
          () => {
            setLoading(false);
            navigation.navigate('VerifyOtp', {phone, isregister: true});
          },
          () => {
            setLoading(false);
          },
        ),
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
            value={firstName}
            onChangeText={setFirstName}
            validation={(text: string): boolean => text.trim().length > 0}
            placeholder="First Name"
            placeholderTextColor="grey"
            style={styles.input}
          />

          <CustomInput
            value={lastName}
            onChangeText={setLastName}
            validation={(text: string): boolean => text.trim().length > 0}
            placeholder="Last Name"
            placeholderTextColor="grey"
            style={styles.input}
          />

          <CustomInput
            value={email}
            onChangeText={setEmail}
            validation={(text: string): boolean => mailFormat.test(text.trim())}
            placeholder="Email"
            placeholderTextColor="grey"
            style={styles.input}
          />

          <CustomInput
            value={phone}
            onChangeText={setPhone}
            validation={(text: string): boolean => text.trim().length === 10}
            placeholder="Phone Number"
            placeholderTextColor="grey"
            style={styles.input}
            keyboardType="phone-pad"
            maxLength={10}
          />

          <CustomButton
            text="Sign Up"
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
  selectPlan: {
    marginTop: -10,
  },
});

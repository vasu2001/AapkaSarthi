import React, {useState} from 'react';
import {View, Text, StyleSheet, ImageBackground, Image} from 'react-native';
import {ORANGE, GRAY_BACKGROUND, GRAY, RED} from '../utils/colors';
import CustomInput from '../components/CustomInput';
import {CustomButton} from '../components/CustomButton';
import showSnackbar from '../utils/snackbar';
import {useDispatch} from 'react-redux';
import {loginAction} from '../redux/actions';
import {LoadingModal} from '../components/LoadingModal';

export interface LoginScreenProps {}

export const LoginScreen: React.SFC<LoginScreenProps> = () => {
  const [email, setEmail] = useState('');
  const [] = useState('');
  const [loading, setLoading] = useState(false);
  const mailFormat: RegExp = /^[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,4}$/;
  const dispatch = useDispatch();

  const login = (): void => {
    if (!mailFormat.test(email.trim())) {
      showSnackbar('Enter a valid email');
      // } else if (password.length < 4) {
      //   showSnackbar('Enter a valid password');
    } else {
      // call login API
      setLoading(true);
      dispatch(
        loginAction(email.trim(), () => {
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
            value={email}
            onChangeText={setEmail}
            validation={(text: string): boolean => mailFormat.test(text.trim())}
            placeholder="Email"
            placeholderTextColor="grey"
            style={styles.input}
          />

          {/* <CustomInput
          value={password}
          onChangeText={setPassword}
          validation={(text: string): boolean => text.length >= 4}
          placeholder="Password"
          placeholderTextColor="grey"
          style={styles.input}
          secureTextEntry
        /> */}

          <CustomButton
            text="Next"
            onPress={login}
            style={styles.button}
            disabled={loading}
          />

          {/* <View style={styles.row}>
          <Text style={styles.text0}>Don't have an account? </Text>
          <TouchableOpacity>
            <Text style={styles.text1}>SignUp</Text>
          </TouchableOpacity>
        </View> */}
          <View style={{flexDirection: 'row', width: 220, marginTop: 10}}>
            <Text style={{color: RED}}>* </Text>
            <Text style={styles.tncText}>
              The Aapka Sarthi Auto Caller service is currently free since it is
              in the beta phase. The final version of the service, which is
              expected to be launched soon, will be a paid service.
            </Text>
          </View>
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
    marginVertical: 15,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
  },
  text0: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 13,
    color: 'black',
  },
  text1: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 15,
    color: ORANGE,
  },
  tncText: {
    color: GRAY,
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
  },
});

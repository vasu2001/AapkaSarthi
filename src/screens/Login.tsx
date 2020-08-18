import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
} from 'react-native';
import {
  YELLOW,
  ORANGE,
  GRAY_LIGHT,
  GRAY,
  GRAY_DARK,
  GRAY_BACKGROUND,
} from '../utils/colors';
import CustomInput from '../components/CustomInput';
import {CustomButton} from '../components/CustomButton';
import showSnackbar from '../utils/snackbar';
import {useSelector, useDispatch} from 'react-redux';
import {stateType} from '../redux/utils';
import {loginAction} from '../redux/actions';

export interface LoginScreenProps {}

export const LoginScreen: React.SFC<LoginScreenProps> = (
  props: LoginScreenProps,
) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const mailFormat: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const dispatch = useDispatch();

  const login = (): void => {
    if (!mailFormat.test(email)) {
      showSnackbar('Enter a valid email');
      // } else if (password.length < 4) {
      //   showSnackbar('Enter a valid password');
    } else {
      // call login API
      setLoading(true);
      dispatch(
        loginAction(email, () => {
          setLoading(false);
        }),
      );
    }
  };

  return (
    <ImageBackground
      source={require('../assets/background/1.png')}
      style={styles.mainContainer}
      resizeMode="stretch">
      <Text style={styles.heading}>Aapka Sarthi</Text>
      <View style={styles.container}>
        <CustomInput
          value={email}
          onChangeText={setEmail}
          validation={(text: string): boolean => mailFormat.test(text)}
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
      </View>
    </ImageBackground>
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
    fontFamily: 'Raleway-SemiBold',
    position: 'absolute',
    top: 25,
    fontSize: 30,
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
    fontFamily: 'Raleway-Medium',
    fontSize: 13,
  },
  text1: {
    fontFamily: 'Raleway-SemiBold',
    fontSize: 15,
    color: ORANGE,
  },
});

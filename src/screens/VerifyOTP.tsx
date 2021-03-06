import React, {useState, FunctionComponent, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import {BLUE, GRAY_BACKGROUND, GRAY} from '../utils/colors';
import CustomInput from '../components/CustomInput';
import {CustomButton} from '../components/CustomButton';
import showSnackbar from '../utils/snackbar';
import {useDispatch} from 'react-redux';
import {LoadingModal} from '../components/LoadingModal';
import {StackNavigationProp} from '@react-navigation/stack';
import {loginAction, sendOtp, verifyAccount} from '../redux/actions/auth';
import {NavigatorScreenParams} from '@react-navigation/native';

export interface LoginScreenProps {
  navigation: StackNavigationProp<any>;
  route: NavigatorScreenParams<any>;
}

export const VerifyOtpScreen: FunctionComponent<LoginScreenProps> = ({
  route,
}) => {
  const {phone, isregister} = route.params;
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  const timerRef = useRef<NodeJS.Timeout>();
  const dispatch = useDispatch();

  const login = (): void => {
    if (otp.length !== 6) {
      showSnackbar('Enter a valid OTP');
    } else {
      setLoading(true);
      const dispatchFunc = isregister ? verifyAccount : loginAction;

      dispatch(
        dispatchFunc(
          phone,
          otp,
          () => {
            setLoading(false);
          },
          () => {
            setLoading(false);
          },
        ),
      );
    }
  };

  const resendOtp = () => {
    setLoading(true);

    dispatch(
      sendOtp(
        phone,
        isregister,
        () => {
          setLoading(false);
          startTimer();
        },
        () => {
          setLoading(false);
        },
      ),
    );
  };

  const startTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setTimer(300);

    timerRef.current = setInterval(() => {
      setTimer((timer) => {
        if (timer === 1) {
          clearInterval(timerRef.current!);
          timerRef.current = undefined;
        }
        return timer - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    startTimer();

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  return (
    <>
      <ImageBackground
        source={require('../assets/background/1.png')}
        style={styles.mainContainer}
        resizeMode="stretch">
        <Image
          source={require('../assets/logo/logo-dark.png')}
          resizeMode="contain"
          style={styles.heading}
        />

        <View style={styles.container}>
          <CustomInput
            value={otp}
            onChangeText={setOtp}
            validation={(text: string): boolean => text.length === 6}
            placeholder="OTP"
            placeholderTextColor="grey"
            style={styles.input}
            keyboardType="number-pad"
            maxLength={6}
          />

          <CustomButton
            text={isregister ? 'Register' : 'Login'}
            onPress={login}
            style={styles.button}
            disabled={loading}
          />

          <View style={styles.row}>
            <Text style={styles.text0}>Didn't get OTP? </Text>
            <TouchableOpacity onPress={resendOtp}>
              <Text style={styles.text1}>Resend OTP</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.timer}>
            OTP exipiring in {formatSeconds(timer)}
          </Text>
        </View>
      </ImageBackground>
      <LoadingModal visible={loading} />
    </>
  );
};

const formatSeconds = (timer: number): string => {
  const seconds = (timer % 60).toString().padStart(2, '0');

  if (timer < 60) {
    return seconds + 's';
  } else {
    return `${Math.floor(timer / 60)}m ${seconds}s`;
  }
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
    marginBottom: 30,
  },
  button: {
    marginBottom: 15,
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
    color: BLUE,
  },
  timer: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 13,
    color: GRAY,
    marginTop: 5,
  },
});

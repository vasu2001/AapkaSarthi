import React, {useState, FunctionComponent} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import {BLUE, GRAY_BACKGROUND, GRAY, RED} from '../utils/colors';
import CustomInput from '../components/CustomInput';
import {CustomButton} from '../components/CustomButton';
import showSnackbar from '../utils/snackbar';
import {useDispatch} from 'react-redux';
import {LoadingModal} from '../components/LoadingModal';
import {StackNavigationProp} from '@react-navigation/stack';
import {sendOtp} from '../redux/actions/auth';

export interface LoginScreenProps {
  navigation: StackNavigationProp<any>;
}

export const LoginScreen: FunctionComponent<LoginScreenProps> = ({
  navigation,
}) => {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const login = (): void => {
    if (phone.length !== 10) {
      showSnackbar('Enter a valid phone number');
    } else {
      setLoading(true);
      dispatch(
        sendOtp(
          phone,
          false,
          () => {
            setLoading(false);
            navigation.navigate('VerifyOtp', {phone});
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
            value={phone}
            onChangeText={setPhone}
            validation={(text: string): boolean => text.length === 10}
            placeholder="Phone"
            placeholderTextColor="grey"
            style={styles.input}
            keyboardType="number-pad"
            maxLength={10}
          />

          <CustomButton
            text="Send OTP"
            onPress={login}
            style={styles.button}
            disabled={loading}
          />

          <View style={styles.row}>
            <Text style={styles.text0}>Don't have an account? </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('SignUp');
              }}>
              <Text style={styles.text1}>SignUp</Text>
            </TouchableOpacity>
          </View>

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
    marginBottom: 20,
  },
  button: {
    marginBottom: 25,
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
  tncText: {
    color: GRAY,
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
  },
});

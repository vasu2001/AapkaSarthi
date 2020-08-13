import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
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
import {forHorizontalIOS} from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/CardStyleInterpolators';

export interface LoginScreenProps {}

export const LoginScreen: React.SFC<LoginScreenProps> = (
  props: LoginScreenProps,
) => {
  const [email, setEmail] = useState('');
  const mailFormat: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const [password, setPassword] = useState('');

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.heading}>AapkaSarthi</Text>
      <View style={styles.container}>
        <CustomInput
          value={email}
          onChangeText={setEmail}
          validation={(text: string): boolean => mailFormat.test(text)}
          placeholder="Email"
          placeholderTextColor="grey"
          style={styles.input}
        />

        <CustomInput
          value={password}
          onChangeText={setPassword}
          validation={(text: string): boolean => text.length >= 4}
          placeholder="Password"
          placeholderTextColor="grey"
          style={styles.input}
          secureTextEntry
        />

        <CustomButton text="Login" onPress={() => {}} style={styles.button} />

        <View style={styles.row}>
          <Text style={styles.text0}>Don't have an account? </Text>
          <TouchableOpacity>
            <Text style={styles.text1}>SignUp</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
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

import * as React from 'react';
import {View, Text, StyleSheet, ImageBackground, StatusBar} from 'react-native';
import {CustomButton} from '../components/CustomButton';
import {NavigationProp} from '@react-navigation/native';
import {BLUE, PRIMARY_BLUE} from '../utils/colors';

interface WelcomeScreenProps {
  width: number;
}

const WelcomeScreen: React.SFC<WelcomeScreenProps> = ({
  width,
}: WelcomeScreenProps) => {
  return (
    <ImageBackground
      source={require('../assets/background/2.png')}
      style={[styles.mainContainer, {width}]}>
      <View style={styles.textContainer}>
        <Text style={styles.text1}>Welcome</Text>
        <Text style={styles.text2}>to</Text>
        <Text style={styles.text1}>Aapka Sarthi</Text>
      </View>
    </ImageBackground>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text1: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 25,
    color: 'black',
  },
  text2: {
    fontSize: 20,
    fontFamily: 'Montserrat-Regular',
    color: 'black',
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

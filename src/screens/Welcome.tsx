import * as React from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';

interface WelcomeScreenProps {
  width: number;
}

const WelcomeScreen: React.FunctionComponent<WelcomeScreenProps> = ({
  width,
}: WelcomeScreenProps) => {
  return (
    <ImageBackground
      source={require('../assets/background/2.webp')}
      style={[styles.mainContainer, {width}]}>
      <View style={styles.textContainer}>
        <Text style={styles.text1}>Welcome</Text>
        <Text style={[styles.text2, {marginBottom: 5}]}>to</Text>
        <Text style={styles.text1}>CallSpace</Text>
        <Text style={styles.text2}>Aapka Sarthi Auto Dialler</Text>
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

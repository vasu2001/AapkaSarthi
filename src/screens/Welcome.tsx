import * as React from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import {CustomButton} from '../components/CustomButton';
import {NavigationProp} from '@react-navigation/native';

interface WelcomeScreenProps {
  navigation: NavigationProp<any>;
}

const WelcomeScreen: React.SFC<WelcomeScreenProps> = ({
  navigation,
}: WelcomeScreenProps) => {
  return (
    <ImageBackground
      source={require('../assets/background/2.png')}
      style={styles.mainContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.text1}>Welcome</Text>
        <Text style={styles.text2}>to</Text>
        <Text style={styles.text1}>Aapka Sarthi</Text>
      </View>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <CustomButton
          text="Get Started"
          onPress={() => {
            navigation.navigate('Login');
          }}
        />
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

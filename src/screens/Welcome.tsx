import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {YELLOW} from '../utils/colors';
import {CustomButton} from '../components/CustomButton';
import {NavigationProp} from '@react-navigation/native';

interface WelcomeScreenProps {
  navigation: NavigationProp<any>;
}

const WelcomeScreen: React.SFC<WelcomeScreenProps> = ({
  navigation,
}: WelcomeScreenProps) => {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.text1}>Welcome</Text>
      <Text style={styles.text2}>to</Text>
      <Text style={styles.text1}>AapkaSarthi</Text>
      <CustomButton
        style={{marginTop: 50}}
        text="Next"
        onPress={() => {
          navigation.navigate('Login');
        }}
      />
    </View>
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
    fontFamily: 'Raleway-SemiBold',
    fontSize: 25,
    color: 'black',
  },
  text2: {
    fontSize: 20,
    fontFamily: 'Raleway-Regular',
    color: 'black',
  },
});

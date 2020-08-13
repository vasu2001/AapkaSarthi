import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {GRAY_BACKGROUND} from '../utils/colors';

export interface AboutUsProps {}

export function AboutUs(props: AboutUsProps) {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.heading}>About Us</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: GRAY_BACKGROUND,
  },
  heading: {
    fontFamily: 'Raleway-SemiBold',
    fontSize: 22,
    paddingVertical: 15,
    textAlign: 'center',
    backgroundColor: 'white',
    marginBottom: 15,
    elevation: 1,
  },
});

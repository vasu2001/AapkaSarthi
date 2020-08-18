import React from 'react';
import {Text, StyleSheet, ScrollView} from 'react-native';
import {GRAY_BACKGROUND} from '../utils/colors';

export interface AboutUsProps {}

export function AboutUs() {
  return (
    <ScrollView style={styles.mainContainer}>
      <Text style={styles.heading}>About Us</Text>
      <Text style={styles.aboutText}>
        Commodo sit adipisicing reprehenderit aute laboris veniam est aliquip
        minim nulla quis. Amet consequat magna esse dolor non et aliquip id
        deserunt ipsum ipsum officia. Irure dolor eu consequat eu. Eu nostrud ut
        anim consequat culpa. Commodo duis non laboris aliquip sit. Aliqua
        voluptate pariatur consectetur laboris. Ea consectetur minim occaecat
        laborum ullamco.
      </Text>
    </ScrollView>
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
  aboutText: {
    textAlign: 'center',
    fontFamily: 'Raleway-Regular',
    margin: 10,
    paddingHorizontal: 25,
    marginBottom: 30,
  },
});

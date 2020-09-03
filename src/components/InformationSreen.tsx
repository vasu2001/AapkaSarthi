import React from 'react';
import {Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {GRAY_BACKGROUND, GRAY_DARK} from '../utils/colors';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import AntDesign from 'react-native-vector-icons/AntDesign';

export interface InformationScreenProps {
  navigation: DrawerNavigationProp<any>;
  heading: string;
  data: string;
}

export function InformationScreen({
  navigation,
  heading,
  data,
}: InformationScreenProps) {
  return (
    <>
      <Text style={styles.heading}>{heading}</Text>

      <TouchableOpacity
        style={styles.hamburger}
        onPress={() => navigation.toggleDrawer()}>
        <AntDesign name="menu-unfold" size={25} color={GRAY_DARK} />
      </TouchableOpacity>

      <ScrollView style={styles.mainContainer}>
        <Text style={styles.aboutText}>{data}</Text>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: GRAY_BACKGROUND,
  },
  heading: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 22,
    paddingVertical: 15,
    textAlign: 'center',
    backgroundColor: 'white',
    // marginBottom: 15,
    elevation: 1,
    color: 'black',
  },
  aboutText: {
    textAlign: 'justify',
    fontFamily: 'Montserrat-Regular',
    margin: 10,
    paddingHorizontal: 25,
    color: 'black',
    marginBottom: 30,
    paddingTop: 15,
  },
  hamburger: {
    position: 'absolute',
    top: 18,
    right: 20,
    elevation: 3,
  },
});

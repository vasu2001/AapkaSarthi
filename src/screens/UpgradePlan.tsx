import {DrawerNavigationProp} from '@react-navigation/drawer';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {GRAY_DARK, GRAY_BACKGROUND} from '../utils/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';

export interface UpgradePlanProps {
  navigation: DrawerNavigationProp<any>;
}

export function UpgradePlan({navigation}: UpgradePlanProps) {
  return (
    <>
      <Text style={styles.heading}>Upgrade Plan</Text>

      <TouchableOpacity
        style={styles.hamburger}
        onPress={() => navigation.toggleDrawer()}>
        <AntDesign name="menu-unfold" size={25} color={GRAY_DARK} />
      </TouchableOpacity>
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

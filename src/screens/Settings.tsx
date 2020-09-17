import React from 'react';
import {Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {BLUE, GRAY_BACKGROUND, GRAY_DARK} from '../utils/colors';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import {stateType} from '../redux/utils';
import {signoutAction, upgradePlanAction} from '../redux/actions';

export interface InformationScreenProps {
  navigation: DrawerNavigationProp<any>;
}

export function Settings({navigation}: InformationScreenProps) {
  const {email, freePlan} = useSelector((state: stateType) => state);
  const dispatch = useDispatch();

  return (
    <>
      <Text style={styles.heading}>Settings</Text>

      <TouchableOpacity
        style={styles.hamburger}
        onPress={() => navigation.toggleDrawer()}>
        <AntDesign name="menu-unfold" size={25} color={GRAY_DARK} />
      </TouchableOpacity>

      <ScrollView style={styles.mainContainer}>
        <Text style={styles.aboutText}>{email}</Text>
        {freePlan && (
          <TouchableOpacity
            onPress={() => {
              dispatch(upgradePlanAction());
            }}>
            <Text
              style={[
                styles.aboutText,
                {color: BLUE, textDecorationLine: 'underline'},
              ]}>
              Upgrade to Premium Plan
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={() => {
            dispatch(signoutAction());
          }}>
          <Text
            style={[
              styles.aboutText,
              {color: BLUE, textDecorationLine: 'underline'},
            ]}>
            Signout
          </Text>
        </TouchableOpacity>
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
    marginVertical: 15,
  },
  hamburger: {
    position: 'absolute',
    top: 18,
    right: 20,
    elevation: 3,
  },
});

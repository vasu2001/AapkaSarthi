import React from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';

import {BLUE, GRAY_BACKGROUND, GRAY_DARK} from '../utils/colors';
import {stateType} from '../redux/utils';
import {signout} from '../redux/actions/auth';
import {CustomButton} from '../components/CustomButton';

interface SettingsScreenProps {
  navigation: DrawerNavigationProp<any>;
}

export function Settings({navigation}: SettingsScreenProps) {
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

      <View style={styles.mainContainer}>
        <Text style={styles.aboutText}>{email}</Text>
        {/* <Text style={styles.aboutText}>{phNo}</Text> */}
        <Text style={styles.aboutText}>
          {freePlan ? 'Free Plan' : 'Premium plan'}
        </Text>
        {freePlan && (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Upgrade Plan');
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

        <View style={{flex: 1}} />

        <CustomButton
          text="Signout"
          onPress={() => {
            dispatch(signout());
          }}
          style={styles.signout}
        />
      </View>
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
  signout: {
    marginBottom: 20,
  },
});

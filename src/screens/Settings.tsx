import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Share,
  Linking,
} from 'react-native';
import {BLUE, GRAY_BACKGROUND, GRAY_DARK} from '../utils/colors';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import {stateType} from '../redux/utils';
import {signout, upgradePlan} from '../redux/actions/auth';
import {LoadingModal} from '../components/LoadingModal';

interface InformationScreenProps {
  navigation: DrawerNavigationProp<any>;
}

const PLAYSTORE_LINK =
  'https://play.google.com/store/apps/details?id=com.aapkasarthi&hl=en_IN';

export function Settings({navigation}: InformationScreenProps) {
  const [loading, setLoading] = useState(false);

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
              setLoading(true);
              dispatch(
                upgradePlan(() => {
                  setLoading(false);
                }),
              );
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
            dispatch(signout());
          }}>
          <Text
            style={[
              styles.aboutText,
              {color: BLUE, textDecorationLine: 'underline'},
            ]}>
            Signout
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            Share.share(
              {
                message: PLAYSTORE_LINK,
              },
              {
                dialogTitle: 'Share CallSpace',
              },
            );
          }}>
          <Text
            style={[
              styles.aboutText,
              {color: BLUE, textDecorationLine: 'underline'},
            ]}>
            Share CallSpace
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            Linking.openURL(PLAYSTORE_LINK);
          }}>
          <Text
            style={[
              styles.aboutText,
              {color: BLUE, textDecorationLine: 'underline'},
            ]}>
            Like CallSpace? Rate us on PlayStore
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <LoadingModal visible={loading} />
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

import {DrawerNavigationProp} from '@react-navigation/drawer';
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import {RouteProp} from '@react-navigation/native';
import moment from 'moment';

import {
  GRAY_DARK,
  GRAY_BACKGROUND,
  GRAY,
  PRIMARY_BLUE,
  WHITE,
} from '../utils/colors';
import {stateType} from '../redux/utils';
import {CustomButton} from '../components/CustomButton';
import {LoadingModal} from '../components/LoadingModal';
import {upgradePlan} from '../redux/actions/payment';
import showSnackbar from '../utils/snackbar';
import {setNewUser} from '../redux/actions/auth';

export interface UpgradePlanProps {
  navigation: DrawerNavigationProp<any>;
  route: RouteProp<any, any>;
}

export function UpgradePlan({navigation, route}: UpgradePlanProps) {
  const {freePlan, expiryDate} = useSelector((state: stateType) => state);
  const dispatch = useDispatch();
  const newUser: boolean | undefined = route.params?.newUser;

  // console.log({newUser});
  useEffect(() => {
    if (newUser) {
      dispatch(setNewUser(false));
    }
  }, []);

  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(newUser ? -1 : freePlan ? 0 : 1);

  const onUpgrade = () => {
    if (freePlan || moment(expiryDate).isBefore()) {
      setLoading(true);
      dispatch(upgradePlan(setLoading, () => navigation.goBack()));
    } else {
      showSnackbar('Current plan expiring ' + moment(expiryDate).fromNow());
    }
  };

  const proceedSignup = () => {
    const resetAction = {
      index: 0,
      routes: [{name: 'Home'}],
    };

    if (selected === 1) {
      setLoading(true);
      dispatch(
        upgradePlan(setLoading, () => {
          navigation.reset(resetAction);
        }),
      );
    } else {
      navigation.reset(resetAction);
    }
  };

  return (
    <>
      <Text style={styles.heading}>
        {freePlan ? 'Upgrade Plan' : 'Renew Plan'}
      </Text>

      <TouchableOpacity
        style={styles.hamburger}
        onPress={() => navigation.toggleDrawer()}>
        <AntDesign name="menu-unfold" size={25} color={GRAY_DARK} />
      </TouchableOpacity>

      <LoadingModal visible={loading} />

      <View style={styles.body}>
        <TouchableOpacity
          // disabled={!newUser}
          onPress={() => setSelected(0)}
          style={[styles.planBox, selected === 0 && styles.activePlanBox]}>
          {selected === 0 && <Text style={styles.activeLabel}>Active</Text>}

          <Text style={styles.headingText}>Free Plan</Text>
          <Text style={styles.aboutText}>
            Only single list allowed at a time
          </Text>
          <Text style={styles.aboutText}>25 contacts allowed per list</Text>
        </TouchableOpacity>

        <TouchableOpacity
          disabled={!newUser && !freePlan}
          onPress={() => setSelected(1)}
          style={[styles.planBox, selected === 1 && styles.activePlanBox]}>
          {selected === 1 && (newUser || !freePlan) && (
            <Text style={styles.activeLabel}>Active</Text>
          )}

          <Text style={styles.headingText}>Premium Plan</Text>
          {!newUser && !freePlan && (
            <Text style={styles.aboutTextMini}>
              Expiring {moment(expiryDate).fromNow()}
              {`\nYou can renew your premium plan for free uptil 30th April, 2021`}
            </Text>
          )}

          <Text style={styles.aboutText}>Create unlimited lists</Text>
          <Text style={styles.aboutText}>1000 contacts allowed per list</Text>
          <Text style={styles.aboutText}>No ads</Text>
        </TouchableOpacity>
      </View>

      <CustomButton
        style={styles.upgradeButton}
        text={newUser ? 'Proceed' : freePlan ? 'Upgrade Plan' : 'Renew Plan'}
        onPress={newUser ? proceedSignup : onUpgrade}
        disabled={selected === -1 || (!newUser && selected !== 1)}
      />
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
    marginBottom: 5,
    elevation: 1,
    color: 'black',
  },
  hamburger: {
    position: 'absolute',
    top: 18,
    right: 20,
    elevation: 3,
  },
  body: {
    flex: 1,
    // flexDirection: 'row',
  },
  planBox: {
    flex: 1,
    borderRadius: 20,
    margin: 10,
    borderWidth: 3,
    borderColor: GRAY,
    backgroundColor: WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  activePlanBox: {
    elevation: 2,
    borderColor: PRIMARY_BLUE,
  },
  activeLabel: {
    top: 0,
    left: 0,
    position: 'absolute',
    fontFamily: 'Montserrat-Regular',
    backgroundColor: PRIMARY_BLUE,
    color: WHITE,
    padding: 8,
    paddingEnd: 10,
    borderBottomRightRadius: 20,
  },
  upgradeButton: {
    margin: 10,
  },

  headingText: {
    fontFamily: 'Montserrat-SemiBold',
    color: 'black',
    fontSize: 16,
    marginBottom: 15,
  },
  aboutText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
  },
  aboutTextMini: {
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular',
    paddingHorizontal: 35,
    color: GRAY,
    marginBottom: 15,
    fontSize: 12,
    marginTop: -15,
  },
});

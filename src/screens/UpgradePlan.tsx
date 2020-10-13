import {DrawerNavigationProp} from '@react-navigation/drawer';
import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';

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
import {upgradePlan} from '../redux/actions/auth';

export interface UpgradePlanProps {
  navigation: DrawerNavigationProp<any>;
}

export function UpgradePlan({navigation}: UpgradePlanProps) {
  const {freePlan} = useSelector((state: stateType) => state);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  return (
    <>
      <Text style={styles.heading}>Upgrade Plan</Text>

      <TouchableOpacity
        style={styles.hamburger}
        onPress={() => navigation.toggleDrawer()}>
        <AntDesign name="menu-unfold" size={25} color={GRAY_DARK} />
      </TouchableOpacity>

      <LoadingModal visible={loading} />

      <View style={styles.body}>
        <View style={[styles.planBox, freePlan ? styles.activePlanBox : null]}>
          <Text style={styles.activeLabel}>Active</Text>
          <Text>Free Plan</Text>
        </View>

        <View style={[styles.planBox, !freePlan ? styles.activePlanBox : null]}>
          <Text>Premium Plan</Text>
        </View>
      </View>

      <CustomButton
        style={styles.upgradeButton}
        text={freePlan ? 'Upgrade Plan' : 'Renew Plan'}
        onPress={() => {
          setLoading(true);
          dispatch(
            upgradePlan(() => {
              setLoading(false);
            }),
          );
        }}
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
    flexDirection: 'row',
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
});

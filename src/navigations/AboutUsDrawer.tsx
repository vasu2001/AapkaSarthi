import React from 'react';
import {Linking, ScrollView, Share} from 'react-native';
import {createDrawerNavigator, DrawerItem} from '@react-navigation/drawer';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';

import {AboutUs} from '../screens/AboutUs';
import {Tnc} from '../screens/TnC';
import {PrivacyPolicy} from '../screens/PrivacyPolicy';
import {PRIMARY_BLUE, WHITE, GRAY_DARK} from '../utils/colors';
import {Settings} from '../screens/Settings';
import {stateType} from '../redux/utils';
import {UpgradePlan} from '../screens/UpgradePlan';

export interface AboutUsDrawerProps {}

const Drawer = createDrawerNavigator();
const PLAYSTORE_LINK =
  'https://play.google.com/store/apps/details?id=com.aapkasarthi&hl=en_IN';

export function AboutUsDrawer() {
  const {freePlan} = useSelector((state: stateType) => state);

  return (
    <Drawer.Navigator
      initialRouteName="Settings"
      drawerPosition="right"
      drawerContent={(props) => {
        // console.log(props.state.index);
        const items = [
          {label: 'Settings', icon: 'setting'},
          {label: 'About Us', icon: 'info'},
          {label: 'Terms and Conditions', icon: 'copy1'},
          {label: 'Privacy Policy', icon: 'lock1'},
          {label: 'Upgrade Plan', icon: 'totop'},
        ];
        return (
          <ScrollView>
            {items.map(({label, icon}, i) => (
              <DrawerItem
                label={label}
                icon={({size, color}) => (
                  <AntDesign name={icon} size={size} color={color} />
                )}
                onPress={() => {
                  props.navigation.navigate(label);
                }}
                labelStyle={{fontFamily: 'Montserrat-Medium', marginLeft: -10}}
                inactiveTintColor={i == props.state.index ? WHITE : GRAY_DARK}
                inactiveBackgroundColor={
                  i == props.state.index ? PRIMARY_BLUE : undefined
                }
              />
            ))}

            <DrawerItem
              label="Share"
              onPress={() => {
                Share.share(
                  {
                    message: PLAYSTORE_LINK,
                  },
                  {
                    dialogTitle: 'Share CallSpace',
                  },
                );
              }}
              icon={({size, color}) => (
                <AntDesign name="sharealt" size={size} color={color} />
              )}
              labelStyle={{fontFamily: 'Montserrat-Medium', marginLeft: -10}}
              inactiveTintColor={GRAY_DARK}
            />

            <DrawerItem
              label="Rate Us"
              onPress={() => {
                Linking.openURL(PLAYSTORE_LINK);
              }}
              icon={({size, color}) => (
                <AntDesign name="like2" size={size} color={color} />
              )}
              labelStyle={{fontFamily: 'Montserrat-Medium', marginLeft: -10}}
              inactiveTintColor={GRAY_DARK}
            />
          </ScrollView>
        );
      }}>
      <Drawer.Screen component={Settings} name="Settings" />
      <Drawer.Screen component={AboutUs} name="About Us" />
      <Drawer.Screen component={Tnc} name="Terms and Conditions" />
      <Drawer.Screen component={PrivacyPolicy} name="Privacy Policy" />
      {freePlan && (
        <Drawer.Screen component={UpgradePlan} name="Upgrade Plan" />
      )}
    </Drawer.Navigator>
  );
}

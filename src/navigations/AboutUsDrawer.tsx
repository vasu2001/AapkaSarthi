import React from 'react';
import {Linking, ScrollView, Share} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerItem,
} from '@react-navigation/drawer';
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
      drawerContent={(props) => (
        <DrawerContent freePlan={freePlan} {...props} />
      )}
      screenOptions={{header: () => null}}>
      <Drawer.Screen component={Settings} name="Settings" />
      <Drawer.Screen component={AboutUs} name="About Us" />
      <Drawer.Screen component={Tnc} name="Terms and Conditions" />
      <Drawer.Screen component={PrivacyPolicy} name="Privacy Policy" />
      <Drawer.Screen component={UpgradePlan} name="Upgrade Plan" />
    </Drawer.Navigator>
  );
}

interface DrawerContentProps {
  freePlan: boolean;
}

const DrawerContent = (
  props: DrawerContentComponentProps<DrawerContentProps>,
) => {
  // console.log(props.state.index);
  const {freePlan} = props;

  const items = [
    {label: 'Settings', icon: 'setting', name: 'Settings'},
    {label: 'About Us', icon: 'info', name: 'About Us'},
    {
      label: 'Terms and Conditions',
      icon: 'copy1',
      name: 'Terms and Conditions',
    },
    {label: 'Privacy Policy', icon: 'lock1', name: 'Privacy Policy'},
    {
      label: freePlan ? 'Upgrade Plan' : 'Renew Plan',
      icon: 'totop',
      name: 'Upgrade Plan',
    },
  ];

  return (
    <ScrollView>
      {items.map(({label, icon, name}, i) => (
        <DrawerItem
          label={label}
          icon={({size, color}) => (
            <AntDesign name={icon} size={size} color={color} />
          )}
          onPress={() => {
            props.navigation.navigate(name);
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
};

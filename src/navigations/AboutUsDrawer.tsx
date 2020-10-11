import React from 'react';
import {ScrollView} from 'react-native';
import {createDrawerNavigator, DrawerItemList} from '@react-navigation/drawer';
import {AboutUs} from '../screens/AboutUs';
import {Tnc} from '../screens/TnC';
import {PrivacyPolicy} from '../screens/PrivacyPolicy';
import {PRIMARY_BLUE, WHITE, GRAY_DARK} from '../utils/colors';
import {Settings} from '../screens/Settings';
import {useSelector} from 'react-redux';
import {stateType} from '../redux/utils';
import {UpgradePlan} from '../screens/UpgradePlan';

export interface AboutUsDrawerProps {}

const Drawer = createDrawerNavigator();

export function AboutUsDrawer() {
  const {freePlan} = useSelector((state: stateType) => state);

  return (
    <Drawer.Navigator
      initialRouteName="Settings"
      drawerPosition="right"
      drawerContent={(props) => (
        <ScrollView>
          <DrawerItemList
            {...props}
            labelStyle={{fontFamily: 'Montserrat-Medium'}}
            activeBackgroundColor={PRIMARY_BLUE}
            activeTintColor={WHITE}
            inactiveTintColor={GRAY_DARK}
          />
        </ScrollView>
      )}>
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

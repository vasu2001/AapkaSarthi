import React from 'react';
import {ScrollView} from 'react-native';
import {createDrawerNavigator, DrawerItemList} from '@react-navigation/drawer';
import {AboutUs} from '../screens/AboutUs';
import {Tnc} from '../screens/TnC';
import {PrivacyPolicy} from '../screens/PrivacyPolicy';
import {PRIMARY_BLUE, WHITE, GRAY_DARK} from '../utils/colors';

export interface AboutUsDrawerProps {}

const Drawer = createDrawerNavigator();

export function AboutUsDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="About Us"
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
      <Drawer.Screen component={AboutUs} name="About Us" />
      <Drawer.Screen component={Tnc} name="Terms and Conditions" />
      <Drawer.Screen component={PrivacyPolicy} name="Privacy Policy" />
    </Drawer.Navigator>
  );
}

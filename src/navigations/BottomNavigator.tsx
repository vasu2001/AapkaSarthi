import React from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Dashboard} from '../screens/Dashboard';
import {YELLOW, GRAY, GRAY_DARK} from '../utils/colors';
import {AboutUs} from '../screens/AboutUs';
import {createStackNavigator} from '@react-navigation/stack';
import {ListNavigation} from './ListNavigation';
import {ContactUs} from '../screens/ContactUs';

export interface BottomNavigatorProps {}
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export function BottomNavigator() {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: YELLOW,
          inactiveTintColor: GRAY,
          activeBackgroundColor: GRAY_DARK,
          inactiveBackgroundColor: GRAY_DARK,
        }}
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName: string = '';
            switch (route.name) {
              case 'Home':
                iconName = 'home';
                break;
              case 'List':
                iconName = 'bars';
                break;
              case 'About Us':
                iconName = 'team';
                break;
              case 'Contact Us':
                iconName = 'phone';
                break;
            }
            return <AntDesign name={iconName} {...{size, color}} />;
          },
          tabBarLabel: ({focused}) => {
            return focused ? (
              <Text style={styles.label}>{route.name}</Text>
            ) : null;
          },
        })}>
        <Tab.Screen name="Home" component={Dashboard} />
        <Tab.Screen name="List" component={ListNavigation} />
        <Tab.Screen name="About Us" component={AboutUs} />
        <Tab.Screen name="Contact Us" component={ContactUs} />
      </Tab.Navigator>
    </>
  );
}

const styles = StyleSheet.create({
  label: {
    fontFamily: 'Raleway-Regular',
    color: YELLOW,
    fontSize: 11,
    margin: 0,
    padding: 0,
  },
});

import React from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import WelcomeScreen from '../screens/Welcome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Dashboard} from '../screens/Dashboard';
import {YELLOW, GRAY, GRAY_DARK} from '../utils/colors';
import {PhoneList} from '../screens/PhoneList';
import {AboutUs} from '../screens/AboutUs';

export interface BottomNavigatorProps {}
const Tab = createBottomTabNavigator();

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
              case 'Phone List':
                iconName = 'team';
                break;
              case 'About Us':
                iconName = 'customerservice';
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
        <Tab.Screen name="Phone List" component={PhoneList} />
        <Tab.Screen name="About Us" component={AboutUs} />
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

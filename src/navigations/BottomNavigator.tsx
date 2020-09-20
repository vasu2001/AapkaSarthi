import React, {useEffect} from 'react';
import {Text, StyleSheet, StatusBar} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Dashboard} from '../screens/Dashboard';
import {WHITE, GRAY, GRAY_DARK} from '../utils/colors';
import {ListNavigation} from './ListNavigation';
import {ContactUs} from '../screens/ContactUs';
import {ScheduledList} from '../screens/ScheduledList';
import {AboutUsDrawer} from './AboutUsDrawer';
import {useDispatch} from 'react-redux';
import {updateLists} from '../redux/actions';

export interface BottomNavigatorProps {}
const Tab = createBottomTabNavigator();

export function BottomNavigator() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateLists());
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: WHITE,
          inactiveTintColor: GRAY,
          activeBackgroundColor: GRAY_DARK,
          inactiveBackgroundColor: GRAY_DARK,
        }}
        screenOptions={({route}) => ({
          tabBarIcon: ({color, size}) => {
            let iconName: string = '';
            switch (route.name) {
              case 'Home':
                iconName = 'home';
                break;
              case 'List':
                iconName = 'bars';
                break;
              case 'Settings':
                iconName = 'setting';
                break;
              case 'Contact Us':
                iconName = 'phone';
                break;
              case 'Scheduled':
                iconName = 'clockcircleo';
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
        <Tab.Screen name="Scheduled" component={ScheduledList} />
        <Tab.Screen name="List" component={ListNavigation} />
        <Tab.Screen name="Settings" component={AboutUsDrawer} />
        <Tab.Screen name="Contact Us" component={ContactUs} />
      </Tab.Navigator>
    </>
  );
}

const styles = StyleSheet.create({
  label: {
    fontFamily: 'Montserrat-Regular',
    color: WHITE,
    fontSize: 11,
    margin: 0,
    padding: 0,
  },
});

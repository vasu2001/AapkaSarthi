import React from 'react';
import {View, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {AddNewList} from '../screens/AddNewList';
import {PhoneList} from '../screens/PhoneList';
import {contactType} from '../redux/utils';

const Stack = createStackNavigator();
export interface ListNavigationProps {}

export function ListNavigation(props: ListNavigationProps) {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Phone List" component={PhoneList} />
      <Stack.Screen name="Add New List" component={AddNewList} />
    </Stack.Navigator>
  );
}

export type ListNavParamsList = {
  'Phone List': undefined;
  'Add New List': {callback: (x: contactType[]) => void};
};

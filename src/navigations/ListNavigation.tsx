import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AddNewList} from '../screens/AddNewList';
import {PhoneList} from '../screens/PhoneList';
import {contactType} from '../redux/utils';
import {AddNewListPhonebook} from '../screens/AddNewListPhonebook';

const Stack = createStackNavigator();
export interface ListNavigationProps {}

export function ListNavigation(props: ListNavigationProps) {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Phone List" component={PhoneList} />
      <Stack.Screen name="Add New List" component={AddNewList} />
      <Stack.Screen
        name="Add New List Phonebook"
        component={AddNewListPhonebook}
      />
    </Stack.Navigator>
  );
}

export type ListNavParamsList = {
  'Phone List': undefined;
  'Add New List': {
    callback: (
      x: {[x: string]: string},
      successCallback: () => void,
      failCallback: () => void,
    ) => void;
    name: string;
  };
  'Add New List Phonebook': {
    callback: (
      x: contactType[],
      successCallback: () => void,
      failCallback: () => void,
    ) => void;
    name: string;
  };
};

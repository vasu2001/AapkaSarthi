import React, {useState} from 'react';
import {View, Text, StyleSheet, PermissionsAndroid} from 'react-native';
import {CustomButton} from './CustomButton';
import {selectContactPhone} from 'react-native-select-contact';
import showSnackbar from '../utils/snackbar';
import {contactType} from '../redux/utils';
import {NavigationProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

export interface ImportComponentProps {
  callback: (x: contactType[]) => void;
  navigation: StackNavigationProp<any>;
  onCancel: () => void;
  name: string | undefined;
}

export function ImportComponent({
  callback,
  navigation,
  onCancel,
  name,
}: ImportComponentProps) {
  return (
    <View style={styles.mainContainer}>
      <CustomButton
        style={styles.button}
        text="Import from PhoneBook"
        onPress={() => {
          phoneBook(callback);
        }}
      />
      <CustomButton
        style={styles.button}
        text="Import from File"
        onPress={() => {
          fileImport(callback);
        }}
      />
      <CustomButton
        text="Add Contacts"
        onPress={() => {
          if (name === '') showSnackbar('Enter a name for the list');
          else {
            navigation.navigate('Add New List', {callback});
            onCancel();
          }
        }}
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    padding: 10,
  },
  button: {
    marginBottom: 15,
    elevation: 1,
  },
});

const phoneBook = async (
  callback: (x: [contactType]) => void,
): Promise<void> => {
  try {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
    );

    const selection = await selectContactPhone();
    if (!selection) return;

    const contacts: [contactType] = [
      {
        name: selection.contact.name,
        phNo: selection.selectedPhone.number,
        reschedule: null,
        status: 'upcoming',
      },
    ];

    // console.log(contacts);
    callback(contacts);
  } catch (err) {
    console.log(err);
  }
};

const fileImport = async (
  callback: (x: contactType[]) => void,
): Promise<void> => {};

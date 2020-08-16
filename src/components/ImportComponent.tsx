import React, {useState} from 'react';
import {View, Text, StyleSheet, PermissionsAndroid} from 'react-native';
import {CustomButton} from './CustomButton';
import {selectContactPhone} from 'react-native-select-contact';
import showSnackbar from '../utils/snackbar';
import {contactType} from '../redux/utils';
import {NavigationProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import DocumentPicker, {
  DocumentPickerOptions,
} from 'react-native-document-picker';
import {parse} from 'papaparse';
import RNFS from 'react-native-fs';

export interface ImportComponentProps {
  callback: (x: contactType[]) => void;
  navigation: StackNavigationProp<any>;
  onCancel: () => void;
  disabled?: boolean;
}

export function ImportComponent({
  callback,
  navigation,
  onCancel,
  disabled = true,
}: ImportComponentProps) {
  return (
    <View style={styles.mainContainer}>
      <CustomButton
        style={styles.button}
        text="Import from PhoneBook"
        onPress={() => {
          phoneBook(callback);
        }}
        disabled={disabled}
      />
      <CustomButton
        style={styles.button}
        text="Import from File"
        onPress={() => {
          fileImport(callback);
        }}
        disabled={disabled}
      />
      <CustomButton
        text="Add Contacts"
        onPress={() => {
          navigation.navigate('Add New List', {callback});
          onCancel();
        }}
        style={styles.button}
        disabled={disabled}
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
): Promise<void> => {
  const config: DocumentPickerOptions<'android'> = {
    type: ['*/*'],
  };
  try {
    const file = await DocumentPicker.pick(config);
    console.log(file);

    const data = await RNFS.readFile(file.uri);
    // console.log(typeof data);

    parse<any>(data, {
      encoding: 'base64',
      complete: function (res) {
        if (res.errors.length > 0) {
          showSnackbar('Select a valid file');
        } else {
          const regExp: RegExp = /([0-9]{10})/;
          let hasHeaders = false;
          res?.data[0]?.forEach((ele: string) => {
            // console.log(ele);
            hasHeaders = hasHeaders || regExp.test(ele);
          });
          // console.log(hasHeaders);
          hasHeaders = !hasHeaders;
        }
      },
    });
  } catch (err) {
    console.log(err);
  }
};

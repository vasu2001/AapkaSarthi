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
import RNFS, {uploadFiles} from 'react-native-fs';

export interface ImportComponentProps {
  callback: (x: contactType[], callback: () => void) => void;
  navigation: StackNavigationProp<any>;
  onCancel: () => void;
  disabled?: boolean;
  uploadFile: (data: string, hasHeaders: boolean, callback: () => void) => void;
}

export function ImportComponent({
  callback,
  navigation,
  onCancel,
  disabled = true,
  uploadFile,
}: ImportComponentProps) {
  const [loading, setLoading] = useState(false);

  return (
    <View style={styles.mainContainer}>
      <CustomButton
        style={styles.button}
        text="Import from PhoneBook"
        onPress={() => {
          phoneBook(callback, setLoading);
        }}
        disabled={disabled || loading}
      />
      <CustomButton
        style={styles.button}
        text="Import from File"
        onPress={() => {
          fileImport(uploadFile, setLoading);
        }}
        disabled={disabled || loading}
      />
      <CustomButton
        text="Add Contacts"
        onPress={() => {
          navigation.navigate('Add New List', {callback});
          onCancel();
        }}
        style={styles.button}
        disabled={disabled || loading}
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
  callback: (x: [contactType], callback: () => void) => void,
  setLoading: (x: boolean) => void,
): Promise<void> => {
  try {
    setLoading(true);
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
    callback(contacts, () => {
      setLoading(false);
    });
  } catch (err) {
    console.log(err);
    setLoading(false);
  }
};

const fileImport = async (
  uploadFile: (data: string, hasHeaders: boolean, callback: () => void) => void,
  setLoading: (x: boolean) => void,
): Promise<void> => {
  const config: DocumentPickerOptions<'android'> = {
    type: ['*/*'],
  };
  try {
    setLoading(true);
    const file = await DocumentPicker.pick(config);
    console.log(file);

    const data = await RNFS.readFile(file.uri);
    // console.log(typeof data);

    parse<any>(data, {
      encoding: 'base64',
      complete: (res) => {
        if (res.errors.length > 0) {
          showSnackbar('Select a valid csv file');
          setLoading(false);
        } else {
          const regExp: RegExp = /([0-9]{10})/;
          let hasHeaders = false;
          res?.data[0]?.forEach((ele: string) => {
            // console.log(ele);
            hasHeaders = hasHeaders || regExp.test(ele);
          });
          // console.log(hasHeaders);
          hasHeaders = !hasHeaders;
          uploadFile(data, hasHeaders, () => {
            setLoading(false);
          });
        }
      },
    });
  } catch (err) {
    console.log(err);
    showSnackbar('Select a valid csv file');
    setLoading(false);
  }
};

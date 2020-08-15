import React, {useState} from 'react';
import {View, Text, StyleSheet, PermissionsAndroid} from 'react-native';
import {CustomButton} from './CustomButton';
import CustomInput from './CustomInput';
import {selectContactPhone} from 'react-native-select-contact';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import showSnackbar from '../utils/snackbar';
import {contactType} from '../redux/utils';

export interface ImportComponentProps {
  callback: (x: contactType[]) => void;
}

export function ImportComponent({callback}: ImportComponentProps) {
  const initDetails: contactType = {
    name: '',
    phNo: '',
    comment: '',
    status: 'upcoming',
    reschedule: null,
  };

  const [manualDetails, setManualDetails] = useState(initDetails);

  const manualAdd = (): void => {
    if (manualDetails.name.length === 0 || manualDetails.phNo.length !== 10) {
      showSnackbar('Enter valid name or phone');
      return;
    }
    callback([manualDetails]);
    setManualDetails(initDetails);
  };

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

      <View style={styles.inputContainer}>
        <CustomInput
          value={manualDetails.name}
          validation={(text) => text.length > 0}
          style={styles.input}
          onChangeText={(text) => {
            setManualDetails({...manualDetails, name: text});
          }}
          placeholder="Name"
        />
        <CustomInput
          value={manualDetails.phNo}
          style={styles.input}
          validation={(text) => text.length === 10}
          maxLength={10}
          onChangeText={(text) => {
            setManualDetails({...manualDetails, phNo: text});
          }}
          placeholder="Phone Number"
          keyboardType="phone-pad"
        />
        <CustomInput
          value={manualDetails.comment ?? ''}
          style={[styles.input, {marginBottom: 30}]}
          onChangeText={(text) => {
            setManualDetails({...manualDetails, comment: text});
          }}
          placeholder="Comments.."
        />
        <CustomButton text="Add" onPress={manualAdd} style={styles.button} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    padding: 10,
  },
  inputContainer: {
    alignSelf: 'stretch',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 15,
    elevation: 1,
    paddingBottom: 5,
  },
  button: {
    marginBottom: 15,
    elevation: 1,
  },
  input: {
    width: '75%',
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

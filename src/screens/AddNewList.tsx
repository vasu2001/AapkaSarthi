import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {GRAY_BACKGROUND, YELLOW} from '../utils/colors';
import {contactType} from '../redux/utils';
import CustomInput from '../components/CustomInput';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {CustomButton} from '../components/CustomButton';
import showSnackbar from '../utils/snackbar';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {ListNavParamsList} from '../navigations/ListNavigation';

export interface AddNewListProps {
  navigation: StackNavigationProp<any>;
  route: RouteProp<ListNavParamsList, 'Add New List'>;
}

export function AddNewList({route, navigation}: AddNewListProps) {
  const initDetails: contactType = {
    name: '',
    phNo: '',
    comment: '',
    status: 'upcoming',
    reschedule: null,
  };
  const contactArray: contactType[] = [];

  const [manualDetails, setManualDetails] = useState(initDetails);
  const [noOfContacts, setNoOfContact] = useState(0);

  const addContact = (): void => {
    if (manualDetails.name === '' || manualDetails.phNo.length !== 10) {
      showSnackbar('Enter valid data');
    } else {
      contactArray.push(manualDetails);
      setManualDetails(initDetails);
      setNoOfContact(noOfContacts + 1);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.heading}>Add New List</Text>

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
        <View style={styles.addButtonContainer}>
          <TouchableOpacity style={styles.addButton} onPress={addContact}>
            <AntDesign name="plus" size={35} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.row}>
        <Text style={styles.text0}>Number of Contacts: </Text>
        <Text style={styles.text1}>{noOfContacts}</Text>
      </View>

      <CustomButton
        text="Add List"
        onPress={() => {
          route.params.callback(contactArray);
          navigation.goBack();
        }}
        disabled={noOfContacts === 0}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: GRAY_BACKGROUND,
  },
  heading: {
    fontFamily: 'Raleway-SemiBold',
    fontSize: 22,
    paddingVertical: 15,
    textAlign: 'center',
    backgroundColor: 'white',
    marginBottom: 15,
    elevation: 1,
  },
  inputContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 15,
    elevation: 1,
    paddingTop: 25,
    marginBottom: 30,
    marginHorizontal: 50,
  },
  input: {
    width: '75%',
    marginBottom: 25,
  },
  addButtonContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    marginRight: -20,
    marginBottom: -20,
  },
  addButton: {
    zIndex: 99,
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: YELLOW,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 25,
  },
  text0: {
    fontFamily: 'Raleway-Regular',
    fontSize: 18,
    marginRight: 5,
  },
  text1: {
    fontFamily: 'Raleway-Medium',
    fontSize: 20,
  },
});

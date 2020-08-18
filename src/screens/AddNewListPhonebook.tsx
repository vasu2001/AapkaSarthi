import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import {GRAY_BACKGROUND, YELLOW} from '../utils/colors';
import {contactType} from '../redux/utils';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {CustomButton} from '../components/CustomButton';
import showSnackbar from '../utils/snackbar';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {ListNavParamsList} from '../navigations/ListNavigation';
import {selectContactPhone} from 'react-native-select-contact';

export interface AddNewListPhonebookProps {
  navigation: StackNavigationProp<any>;
  route: RouteProp<ListNavParamsList, 'Add New List'>;
}

export function AddNewListPhonebook({
  route,
  navigation,
}: AddNewListPhonebookProps) {
  const [manualDetails, setManualDetails] = useState<contactType[]>([]);
  const [loading, setLoading] = useState(false);
  const i = manualDetails.length;

  const addContact = async (): Promise<void> => {
    try {
      setLoading(true);
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      );

      const selection = await selectContactPhone();
      if (!selection) {
        setLoading(false);
        showSnackbar('Select a contact');
        return;
      }

      const contact: contactType = {
        name: selection.contact.name,
        phNo: selection.selectedPhone.number,
        reschedule: null,
        status: 'upcoming',
        id: null,
      };

      setManualDetails([...manualDetails, contact]);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.heading}>Add New List</Text>

      <TouchableOpacity
        style={styles.addButton}
        onPress={addContact}
        disabled={loading}>
        <AntDesign name="plus" size={35} color="white" />
      </TouchableOpacity>

      <View style={styles.row}>
        <Text style={styles.text0}>Number of Contacts: </Text>
        <Text style={styles.text1}>{i}</Text>
      </View>

      <CustomButton
        text="Add List"
        onPress={() => {
          setLoading(true);
          route.params.callback(
            manualDetails,
            () => {
              setLoading(false);
              navigation.goBack();
            },
            () => {
              setLoading(false);
            },
          );
        }}
        disabled={i === 0 || loading}
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
  addButton: {
    zIndex: 99,
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: YELLOW,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    alignSelf: 'center',
    marginBottom: 25,
    marginTop: 15,
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

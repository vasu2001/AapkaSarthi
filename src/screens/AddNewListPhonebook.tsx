import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import {GRAY_BACKGROUND, PRIMARY_BLUE} from '../utils/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {CustomButton} from '../components/CustomButton';
import showSnackbar from '../utils/snackbar';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {ListNavParamsList} from '../navigations/ListNavigation';
import {selectContactPhone} from 'react-native-select-contact';
import {LoadingModal} from '../components/LoadingModal';

export interface AddNewListPhonebookProps {
  navigation: StackNavigationProp<any>;
  route: RouteProp<ListNavParamsList, 'Add New List'>;
}

export function AddNewListPhonebook({
  route,
  navigation,
}: AddNewListPhonebookProps) {
  const [loading, setLoading] = useState(false);
  const [i, setI] = useState(0);
  const list = useRef<{[x: string]: string}>({}).current;

  const addContact = async (): Promise<void> => {
    try {
      setLoading(true);
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      );

      const selection = await selectContactPhone();

      if (!selection) {
        setLoading(false);
        setTimeout(() => {
          showSnackbar('Select a contact');
        }, 250);

        return;
      }

      if (list[selection.selectedPhone.number]) {
        // console.log('duplicate');
        setTimeout(() => {
          showSnackbar('Dulicates not allowed');
        }, 250);
      } else {
        list[selection.selectedPhone.number] = selection.contact.name;
        setI((i) => i + 1);
      }

      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <>
      <LoadingModal visible={loading} />
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
          text={`Add Contacts to ${route.params.name}`}
          onPress={() => {
            setLoading(true);
            route.params.callback(
              list,
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
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: GRAY_BACKGROUND,
  },
  heading: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 22,
    paddingVertical: 15,
    textAlign: 'center',
    backgroundColor: 'white',
    marginBottom: 15,
    elevation: 1,
    color: 'black',
  },
  addButton: {
    zIndex: 99,
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: PRIMARY_BLUE,
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
    fontFamily: 'Montserrat-Regular',
    fontSize: 18,
    marginRight: 5,
    color: 'black',
  },
  text1: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 20,
    color: 'black',
  },
});

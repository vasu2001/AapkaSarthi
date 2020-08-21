import React, {useState, useRef} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {GRAY_BACKGROUND, YELLOW} from '../utils/colors';
import CustomInput from '../components/CustomInput';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {CustomButton} from '../components/CustomButton';
import showSnackbar from '../utils/snackbar';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {ListNavParamsList} from '../navigations/ListNavigation';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {LoadingModal} from '../components/LoadingModal';

export interface AddNewListProps {
  navigation: StackNavigationProp<any>;
  route: RouteProp<ListNavParamsList, 'Add New List'>;
}

export function AddNewList({route, navigation}: AddNewListProps) {
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState({name: '', phNo: ''});
  const [i, setI] = useState(0);

  let list = useRef<{[x: string]: string}>({}).current;

  const addContact = (): void => {
    if (details.name === '' || details.phNo.length !== 10) {
      showSnackbar('Enter valid data');
    } else {
      if (list[details.phNo]) {
        showSnackbar('Dulicates not allowed');
      } else {
        list[details.phNo] = details.name;
        setDetails({name: '', phNo: ''});
        setI((i) => i + 1);
      }
    }
  };

  return (
    <>
      <LoadingModal visible={loading} />
      <View style={styles.mainContainer}>
        <Text style={styles.heading}>Add New List</Text>

        <View style={styles.inputContainer}>
          <CustomInput
            value={details.name}
            validation={(text) => text.length > 0}
            style={styles.input}
            onChangeText={(text) => {
              setDetails({...details, name: text});
            }}
            placeholder="Name"
          />
          <CustomInput
            value={details.phNo}
            style={styles.input}
            validation={(text) => text.length === 10}
            maxLength={10}
            onChangeText={(text) => {
              setDetails({...details, phNo: text});
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
                // setManualDetails([initDetails])
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

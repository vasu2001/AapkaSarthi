import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {GRAY} from '../utils/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';

export interface PhoneGroupItemProps {
  name: string;
  noOfContacts: number;
  deleteContact: () => void;
}

export function PhoneGroupItem({
  name,
  noOfContacts,
  deleteContact,
}: PhoneGroupItemProps) {
  return (
    <View style={styles.mainContainer}>
      <View>
        <Text style={styles.text0}>{name}</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.text1}>No of Contacts</Text>
          <Text style={styles.text2}>{noOfContacts}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={deleteContact}>
        <AntDesign name="delete" size={30} color={GRAY} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    paddingVertical: 15,
    marginVertical: 10,
    marginHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    elevation: 2,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text0: {
    fontFamily: 'Raleway-SemiBold',
    fontSize: 18,
    marginBottom: 5,
  },
  text1: {
    fontFamily: 'Raleway-Regular',
    fontSize: 14,
    color: GRAY,
    marginRight: 8,
  },
  text2: {
    fontFamily: 'Raleway-Medium',
    fontSize: 14,
  },
});

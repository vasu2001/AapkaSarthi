import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {GRAY, LAVENDER, BLUE} from '../utils/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';

export interface PhoneGroupItemProps {
  name: string;
  noOfContacts: number;
  deleteContact: () => void;
  active?: boolean;
  onPress: () => void;
}

export function PhoneGroupItem({
  name,
  noOfContacts,
  deleteContact,
  active,
  onPress,
}: PhoneGroupItemProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.mainContainer, active && {borderWidth: 2}]}>
      <View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={[styles.text0]}>{name}</Text>
          {active && <Text style={styles.active}>Active</Text>}
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            opacity: noOfContacts >= 0 ? 1 : 0,
          }}>
          <Text style={styles.text1}>No of Contacts</Text>
          <Text style={styles.text2}>{noOfContacts}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={deleteContact}>
        <AntDesign name="delete" size={30} color={GRAY} />
      </TouchableOpacity>
    </TouchableOpacity>
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
    borderColor: LAVENDER,
  },
  text0: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    marginBottom: 5,
    color: 'black',
  },
  text1: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: GRAY,
    marginRight: 8,
  },
  text2: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    color: 'black',
  },
  active: {
    fontSize: 10,
    marginLeft: 10,
    color: BLUE,
    fontFamily: 'Montserrat-Regular',
  },
});

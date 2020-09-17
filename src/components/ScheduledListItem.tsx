import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {BLUE, GRAY, LAVENDER, RED} from '../utils/colors';
import moment from 'moment';

export interface PhoneGroupItemProps {
  name: string;
  phNo: string;
  reschedule: string | null;
  onPress: (number: string) => void;
}

export function ScheduledListItem({
  name,
  phNo,
  reschedule,
  onPress,
}: PhoneGroupItemProps) {
  const isPending = moment(reschedule).isBefore();

  return (
    <TouchableOpacity
      style={[
        styles.mainContainer,
        isPending && {
          borderWidth: 2,
        },
      ]}
      onPress={() => {
        onPress(phNo);
      }}>
      <View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={[styles.text0]}>{name}</Text>
          {isPending && <Text style={styles.pendingText}>Pending</Text>}
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.text1}>{phNo}</Text>
        </View>
      </View>
      <View>
        <Text style={styles.text3}>Scheduled for</Text>
        <Text style={[styles.text2, isPending && {color: BLUE}]}>
          {moment(reschedule).format('MMM Do, hh:mm a')}
        </Text>
      </View>
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
  text3: {
    color: GRAY,
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
  },
  pendingText: {
    color: BLUE,
    fontFamily: 'Montserrat-Regular',
    fontSize: 10,
    marginLeft: 10,
  },
});

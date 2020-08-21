import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {GRAY, LAVENDER} from '../utils/colors';
import moment from 'moment';

export interface PhoneGroupItemProps {
  name: string;
  phNo: string;
  reschedule: string | null;
}

export function ScheduledListItem({
  name,
  phNo,
  reschedule,
}: PhoneGroupItemProps) {
  return (
    <View style={[styles.mainContainer]}>
      <View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={[styles.text0]}>{name}</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.text1}>{phNo}</Text>
        </View>
      </View>
      <View>
        <Text style={styles.text3}>Scheduled for</Text>
        <Text style={styles.text2}>
          {moment(reschedule).format('MMM Do, hh:mm:a')}
        </Text>
      </View>
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
});

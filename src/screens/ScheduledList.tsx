import React from 'react';
import {Text, StyleSheet, View, FlatList} from 'react-native';
import {GRAY_BACKGROUND, GRAY} from '../utils/colors';
import {useSelector} from 'react-redux';
import {stateType} from '../redux/utils';
import {ScheduledListItem} from '../components/ScheduledListItem';

export interface AboutUsProps {}

export function ScheduledList() {
  const {callData, activeList} = useSelector((state: stateType) => state);
  const list =
    activeList >= 0
      ? callData[activeList]?.list?.filter(
          (item) => item.status === 'rescheduled',
        ) ?? []
      : [];

  //   console.log(list);

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.heading}>Scheduled Contacts</Text>

      <FlatList
        data={list}
        keyExtractor={(item) => item.id ?? ''}
        renderItem={({item}) => <ScheduledListItem {...item} />}
        ListEmptyComponent={
          <Text style={styles.text}>No Scheduled Calls for the moment.</Text>
        }
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
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 22,
    paddingVertical: 15,
    textAlign: 'center',
    backgroundColor: 'white',
    marginBottom: 15,
    elevation: 1,
    color: 'black',
  },
  text: {
    alignSelf: 'center',
    fontSize: 18,
    fontFamily: 'Montserrat-Regular',
    color: GRAY,
    marginTop: 20,
  },
});

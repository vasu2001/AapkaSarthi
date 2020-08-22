import React, {useState, useRef} from 'react';
import {Text, StyleSheet, View, FlatList} from 'react-native';
import {GRAY_BACKGROUND, GRAY} from '../utils/colors';
import {useSelector} from 'react-redux';
import {stateType} from '../redux/utils';
import {ScheduledListItem} from '../components/ScheduledListItem';
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
import {TimerModal} from '../components/TimerModal';

export interface AboutUsProps {}

export function ScheduledList() {
  const {callData, activeList} = useSelector((state: stateType) => state);
  const [timerModal, setTimerModal] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const numberRef = useRef<string>();

  const list =
    activeList >= 0
      ? callData[activeList]?.list?.filter(
          (item) => item.status === 'rescheduled',
        ) ?? []
      : [];

  const call = () => {
    RNImmediatePhoneCall.immediatePhoneCall(numberRef.current);
    setTimerModal(false);
  };

  const onPress = (number: string) => {
    if (/^[0-9]{10}$/.test(number)) {
      setTimerModal(true);
      numberRef.current = number;
      timeoutRef.current = setTimeout(call, 3000);
    }
  };

  return (
    <>
      <TimerModal
        visible={timerModal}
        onCancel={() => {
          timeoutRef.current && clearTimeout(timeoutRef.current);
          setTimerModal(false);
        }}
        onSkip={() => {
          timeoutRef.current && clearTimeout(timeoutRef.current);
          call();
        }}
      />
      <View style={styles.mainContainer}>
        <Text style={styles.heading}>Rescheduled Contacts</Text>

        <FlatList
          data={list}
          keyExtractor={(item) => item.id ?? ''}
          renderItem={({item}) => <ScheduledListItem {...{...item, onPress}} />}
          ListEmptyComponent={
            <Text style={styles.text}>No Scheduled Calls for the moment.</Text>
          }
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
  text: {
    alignSelf: 'center',
    fontSize: 18,
    fontFamily: 'Montserrat-Regular',
    color: GRAY,
    marginTop: 20,
  },
});

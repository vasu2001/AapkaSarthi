import React, {useState, useRef, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  AppState,
  AppStateStatus,
} from 'react-native';
import {GRAY_BACKGROUND, GRAY} from '../utils/colors';
import {useDispatch, useSelector} from 'react-redux';
import {stateType} from '../redux/utils';
import {ScheduledListItem} from '../components/ScheduledListItem';
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
import {TimerModal} from '../components/TimerModal';
import {StaticHeader} from '../components/StaticHeader';
import {CallFeedbackModal} from '../components/CallFeeddackModal';
import {submitCallAction} from '../redux/actions';
import {LoadingModal} from '../components/LoadingModal';

export interface AboutUsProps {}

export function ScheduledList() {
  const {callData, activeList} = useSelector((state: stateType) => state);
  const dispatch = useDispatch();

  const [timerModal, setTimerModal] = useState(false);
  const [feedbackModal, setFeedbackModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout>();
  const numberRef = useRef<string>();
  const callStateRef = useRef(0);
  const callingIndex = useRef(-1);

  const list =
    activeList >= 0
      ? callData[activeList]?.list
          ?.map((item, index) => ({
            item,
            index,
          }))
          ?.filter(({item}) => item.status === 'rescheduled') ?? []
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
      callStateRef.current = 1;
    }
  };

  const endCall = (
    comment: string,
    reschedule: string,
    status: 'rescheduled' | 'done',
    callback: () => void,
  ) => {
    setLoading(true);
    dispatch(
      submitCallAction(
        status,
        comment,
        reschedule,
        callingIndex.current,
        () => {
          setLoading(false);
          callback();
        },
      ),
    );
  };

  useEffect(() => {
    const listener = (state: AppStateStatus) => {
      // console.log(state, callStateRef);
      if (state === 'active') {
        if (callStateRef.current === 1) callStateRef.current++;
        else if (callStateRef.current === 2) {
          console.log('call ended');
          setFeedbackModal(true);
          callStateRef.current = 0;
        }
      }
    };

    AppState.addEventListener('change', listener);

    return () => {
      AppState.removeEventListener('change', listener);
    };
  }, []);

  return (
    <>
      <CallFeedbackModal
        visible={feedbackModal}
        onCancel={() => {
          setFeedbackModal(false);
        }}
        endCall={endCall}
        callAgain={() => {
          onPress(numberRef.current ?? '');
        }}
        nextDisabled
      />
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
      <LoadingModal visible={loading} />
      <View style={styles.mainContainer}>
        {/* <Text style={styles.heading}>Rescheduled Contacts</Text> */}
        <StaticHeader />

        <FlatList
          data={list}
          keyExtractor={({item}) => item.id ?? ''}
          renderItem={({item: {item, index}}) => (
            <ScheduledListItem
              {...item}
              onPress={(number) => {
                // setFeedbackModal(true);
                // setCallingIndex(index);
                callingIndex.current = index;
                onPress(number);
              }}
            />
          )}
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

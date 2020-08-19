import React, {useState, useCallback, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  PermissionsAndroid,
  AppState,
  AppStateStatus,
} from 'react-native';
import {GRAY_BACKGROUND, GRAY, PINK, PURPLE, BLUE} from '../utils/colors';
import {CustomButton} from '../components/CustomButton';
import Pie from 'react-native-pie';
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
import {CallFeedbackModal} from '../components/CallFeeddackModal';
import {useSelector, useDispatch} from 'react-redux';
import {stateType} from '../redux/utils';
import {submitCallAction} from '../redux/actions';
import showSnackbar from '../utils/snackbar';
import {TimerModal} from '../components/TimerModal';

export interface DashboardProps {}

export function Dashboard() {
  const [modal, setModal] = useState(false);
  const [timerModal, setTimerModal] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  let prevIndex = useRef<number>(-1);
  let phoneCallInProgress = useRef<number>(0);
  let timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const state = useSelector((state: stateType) => state);
  let phoneList = state.callData[0]?.list ?? [];
  const dispatch = useDispatch();
  // console.log('rerender');

  const initFrequency = {
    rescheduled: 0,
    done: 0,
    upcoming: 0,
  };
  const [frequency, setFrequency] = useState(initFrequency);
  const totalNo = frequency.rescheduled + frequency.done + frequency.upcoming;

  useEffect(() => {
    nextCall();
    const handler = (state: AppStateStatus) => {
      // console.log(state, phoneCallInProgress);
      if (state === 'active') {
        if (phoneCallInProgress.current === 1) phoneCallInProgress.current++;
        else if (phoneCallInProgress.current === 2) {
          console.log('call ended');
          setModal(true);
          phoneCallInProgress.current = 0;
        }
      }
    };
    AppState.addEventListener('change', handler);

    return () => {
      AppState.removeEventListener('change', handler);
    };
  }, []);

  useEffect(() => {
    // phoneList = state.callData[0]?.list ?? [];
    const newFrequency = {...initFrequency};
    phoneList?.forEach((item) => {
      ++newFrequency[item.status];
    });

    setFrequency(newFrequency);

    if (phoneList.length === 0) setActiveIndex(-1);

    if (activeIndex == -1) {
      for (let i = 0; i < phoneList.length; i++) {
        if (phoneList[i].status !== 'done') {
          console.log('activeIndex after adding ' + i);
          setActiveIndex(i);
          break;
        }
      }
    }
  }, [state]);

  const startCalling = useCallback(
    async (activeIndex: number, callAgain?: boolean) => {
      try {
        callAgain && (prevIndex.current = activeIndex);

        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CALL_PHONE,
        );

        if (activeIndex === -1) {
          showSnackbar('No more calls remaining');
          return;
        }

        setTimerModal(true);
        timeoutRef.current = setTimeout(() => {
          setTimerModal(false);
          phoneCallInProgress.current++;
          console.log(activeIndex);
          RNImmediatePhoneCall.immediatePhoneCall(phoneList[activeIndex].phNo);
        }, 3000);
      } catch (err) {
        console.log(err);
      }
    },
    [phoneList],
  );

  const endCall = useCallback(
    (
      comment: string,
      rescheduled: string,
      status: 'done' | 'rescheduled',
      callback: (index: number) => void,
      // closeModal: boolean = false,
    ): void => {
      dispatch(
        submitCallAction(status, comment, rescheduled, activeIndex, 0, () => {
          callback(nextCall());
        }),
      );
    },
    [activeIndex],
  );

  const nextCall = (): number => {
    let newActiveIndex = -1;

    prevIndex.current = activeIndex;

    for (let i = activeIndex + 1; i < phoneList.length; i++) {
      if (phoneList[i].status !== 'done') {
        newActiveIndex = i;
        break;
      }
    }
    setActiveIndex(newActiveIndex);
    console.log('new activeIndex ' + newActiveIndex);
    return newActiveIndex;
  };

  const setPrevIndex = () => {
    console.log('setting to prevIndex ' + prevIndex.current);
    setActiveIndex(prevIndex.current);
  };

  return (
    <>
      <CallFeedbackModal
        visible={modal}
        onCancel={() => {
          setModal(false);
        }}
        endCall={endCall}
        callAgain={() => {
          startCalling(activeIndex, true);
        }}
        startCalling={startCalling}
        callDisabled={activeIndex === -1}
      />
      <TimerModal
        visible={timerModal}
        onCancel={() => {
          timeoutRef.current && clearTimeout(timeoutRef.current);
          modal && setPrevIndex();
          setTimerModal(false);
        }}
      />
      <View style={styles.mainContainer}>
        <Text style={styles.heading}>My Dashboard</Text>

        {/* <View style={{height: 250, width: 300, backgroundColor: 'white'}} /> */}
        <Pie
          radius={70}
          innerRadius={45}
          sections={[
            {
              percentage: Math.max(
                2,
                totalNo > 0
                  ? Math.floor((frequency.rescheduled / totalNo) * 100)
                  : 0,
              ),
              color: PINK,
            },
            {
              percentage: Math.max(
                2,
                totalNo > 0 ? Math.floor((frequency.done / totalNo) * 100) : 0,
              ),
              color: PURPLE,
            },
            {
              percentage: Math.max(
                2,
                totalNo > 0
                  ? Math.floor((frequency.upcoming / totalNo) * 100)
                  : 0,
              ),
              color: BLUE,
            },
          ]}
          dividerSize={6}
          strokeCap={'butt'}
        />

        <View style={styles.legendContainer}>
          <View style={styles.legendRow}>
            <View style={[styles.legendColor, {backgroundColor: PINK}]} />
            <Text style={styles.legendLabel}>Rescheduled</Text>
          </View>
          <View style={styles.legendRow}>
            <View style={[styles.legendColor, {backgroundColor: PURPLE}]} />
            <Text style={styles.legendLabel}>Done</Text>
          </View>
          <View style={styles.legendRow}>
            <View style={[styles.legendColor, {backgroundColor: BLUE}]} />
            <Text style={styles.legendLabel}>Upcoming</Text>
          </View>
        </View>

        <CustomButton
          text="Start Calling"
          onPress={() => {
            startCalling(activeIndex);
          }}
          style={styles.startCalling}
          disabled={activeIndex === -1}
        />

        <View style={styles.statConatiner}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel} numberOfLines={1}>
              Rescheduled
            </Text>
            <Text style={styles.statValue}>{frequency['rescheduled']}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel} numberOfLines={1}>
              Done
            </Text>
            <Text style={styles.statValue}>{frequency['done']}</Text>
          </View>
          <View style={[styles.statCard, {borderRightWidth: 0}]}>
            <Text style={styles.statLabel} numberOfLines={1}>
              Upcoming
            </Text>
            <Text style={styles.statValue}>{frequency['upcoming']}</Text>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: GRAY_BACKGROUND,
  },
  heading: {
    fontFamily: 'Raleway-SemiBold',
    fontSize: 22,
    paddingVertical: 15,
    alignSelf: 'stretch',
    textAlign: 'center',
    backgroundColor: 'white',
    marginBottom: 25,
    elevation: 1,
  },
  legendContainer: {
    marginBottom: 15,
    alignSelf: 'flex-end',
    marginRight: 20,
    marginTop: -25,
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 3,
  },
  legendColor: {
    height: 20,
    width: 25,
    marginRight: 5,
    borderRadius: 5,
  },
  legendLabel: {
    fontFamily: 'Raleway-Regular',
    fontSize: 14,
    color: GRAY,
  },
  startCalling: {
    marginVertical: 25,
  },
  statConatiner: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 15,
    elevation: 2,
    marginHorizontal: 30,
    padding: 10,
    marginTop: 10,
  },
  statCard: {
    flex: 1,
    padding: 10,
    borderRightWidth: 2,
    borderColor: GRAY,
    alignItems: 'center',
  },
  statLabel: {
    fontFamily: 'Raleway-Medium',
    fontSize: 14,
    color: GRAY,
  },
  statValue: {
    fontFamily: 'Raleway-SemiBold',
    fontSize: 20,
  },
});

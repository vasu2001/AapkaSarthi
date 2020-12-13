import React, {useState, useCallback, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  PermissionsAndroid,
  AppState,
  AppStateStatus,
  TouchableOpacity,
} from 'react-native';
import {CustomButton} from '../components/CustomButton';
import {useSelector, useDispatch} from 'react-redux';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import Pie from 'react-native-pie';
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';

import {GRAY_BACKGROUND, GRAY, PINK, PURPLE, BLUE, RED} from '../utils/colors';
import {CallFeedbackModal} from '../components/CallFeeddackModal';
import {stateType} from '../redux/utils';
import showSnackbar from '../utils/snackbar';
import {TimerModal} from '../components/TimerModal';
import {LoadingModal} from '../components/LoadingModal';
import {StaticHeader} from '../components/StaticHeader';
import {submitCallAction} from '../redux/actions/core';
import moment from 'moment';
import {setNewUser} from '../redux/actions/auth';

export interface DashboardProps {
  navigation: BottomTabNavigationProp<any>;
}

export function Dashboard({navigation}: DashboardProps) {
  const [modal, setModal] = useState(false);
  const [timerModal, setTimerModal] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [loading, setLoading] = useState(false);

  let prevIndex = useRef<number>(-1);
  let phoneCallInProgress = useRef<number>(0);
  let timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const state = useSelector((state: stateType) => state);
  const {activeList, expiryDate, freePlan, newUser} = state;
  const daysRem = moment(expiryDate).diff(moment(), 'd') + 1;

  let phoneList = state.callData[activeList]?.list ?? [];
  const dispatch = useDispatch();

  const initFrequency = {
    rescheduled: 0,
    done: 0,
    upcoming: 0,
  };
  const [frequency, setFrequency] = useState(initFrequency);
  const totalNo = frequency.rescheduled + frequency.done + frequency.upcoming;

  //state useffect listeners for getting end call event and open plan if new user
  useEffect(() => {
    if (newUser) {
      navigation.navigate('Settings', {
        screen: 'Upgrade Plan',
      });
      dispatch(setNewUser(false));
    }

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

  //useEffect hook to reset the data when list changes
  useEffect(() => {
    let newIndex = -1;
    for (let i = 0; i < phoneList.length; i++) {
      if (phoneList[i].status === 'upcoming') {
        newIndex = i;
        break;
      }
    }
    setActiveIndex(newIndex);
    console.log('list change activeIndex ' + newIndex);
  }, [activeList]);

  //update frequency as the calls are being made
  useEffect(() => {
    const newFrequency = {...initFrequency};
    phoneList?.forEach((item) => {
      ++newFrequency[item.status];
    });

    setFrequency(newFrequency);
  }, [state]);

  //timeout handler for making calls
  const timeoutHandler = (_activeIndex = activeIndex) => {
    setTimerModal(false);
    phoneCallInProgress.current = 1;
    console.log('calling index at ' + _activeIndex);
    phoneList[_activeIndex]?.phNo &&
      RNImmediatePhoneCall.immediatePhoneCall(phoneList[_activeIndex].phNo);
  };

  //request permission and setup timer modal to call after 3s
  const startCalling = useCallback(
    async (_activeIndex: number, callAgain?: boolean) => {
      try {
        setModal(false);
        callAgain && (prevIndex.current = _activeIndex);

        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CALL_PHONE,
        );

        if (_activeIndex === -1 || _activeIndex === phoneList.length) {
          showSnackbar('No more calls remaining');
          return;
        }

        setTimerModal(true);
        timeoutRef.current = setTimeout(() => {
          timeoutHandler(_activeIndex);
        }, 3000);
      } catch (err) {
        console.log(err);
      }
    },
    [phoneList],
  );

  //submit the call status and prepare states for next call
  const endCall = useCallback(
    (
      comment: string,
      rescheduled: string,
      status: 'done' | 'rescheduled',
      callback: (index: number) => void,
    ): void => {
      setLoading(true);
      dispatch(
        submitCallAction(status, comment, rescheduled, activeIndex, () => {
          setLoading(false);
          callback(nextCall());
        }),
      );
    },
    [activeIndex],
  );

  //set activeIndex to next index after the call submission
  const nextCall = (): number => {
    let newActiveIndex = -1;

    prevIndex.current = activeIndex;

    for (let i = activeIndex + 1; i < phoneList.length; i++) {
      if (phoneList[i].status === 'upcoming') {
        newActiveIndex = i;
        break;
      }
    }
    if (newActiveIndex !== activeIndex) {
      setActiveIndex(newActiveIndex);

      console.log('new activeIndex ' + activeIndex + ' -> ' + newActiveIndex);
      if (newActiveIndex === -1)
        setTimeout(() => {
          showSnackbar('No more calls remaining');
        }, 250);
    }

    return newActiveIndex;
  };

  //set activeIndex to prevIndex in case of cancel from timerModal
  const setPrevIndex = () => {
    console.log('setting to prevIndex ' + prevIndex.current);
    setActiveIndex(prevIndex.current);
  };

  const pieChartSections = [
    {
      percentage:
        totalNo > 0 ? Math.floor((frequency.rescheduled / totalNo) * 100) : 0,
      color: PINK,
    },
    {
      percentage:
        totalNo > 0 ? Math.floor((frequency.done / totalNo) * 100) : 0,
      color: PURPLE,
    },
    {
      percentage:
        totalNo > 0 ? Math.floor((frequency.upcoming / totalNo) * 100) : 0,
      color: BLUE,
    },
  ];

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
        onSkip={() => {
          timeoutRef.current && clearTimeout(timeoutRef.current);
          timeoutHandler();
        }}
      />
      <LoadingModal visible={loading} />
      <View style={styles.mainContainer}>
        {/* <Text style={styles.heading}>My Dashboard</Text> */}
        <StaticHeader />

        <Pie
          radius={70}
          innerRadius={45}
          sections={pieChartSections}
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

        <TouchableOpacity
          style={{marginTop: 20}}
          onPress={() => {
            navigation.navigate('List');
          }}>
          <Text style={styles.selectActiveListWarning}>
            {activeList === -1
              ? 'Select a list to work on'
              : phoneList.length === 0
              ? 'Add a new list to start calling'
              : null}
          </Text>
        </TouchableOpacity>
      </View>

      {!freePlan && daysRem <= 3 && (
        <TouchableOpacity
          style={styles.renewButton}
          onPress={() =>
            navigation.navigate('Settings', {
              screen: 'Upgrade Plan',
            })
          }>
          <Text style={styles.renewText}>
            Plan expiring in {daysRem} days. Renew
          </Text>
        </TouchableOpacity>
      )}
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
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 22,
    paddingVertical: 15,
    alignSelf: 'stretch',
    textAlign: 'center',
    backgroundColor: 'white',
    marginBottom: 25,
    elevation: 1,
    color: 'black',
  },
  legendContainer: {
    marginBottom: 15,
    alignSelf: 'flex-end',
    marginRight: 10,
    marginTop: -25,
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 3,
  },
  legendColor: {
    height: 15,
    width: 20,
    marginRight: 5,
    borderRadius: 5,
  },
  legendLabel: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 13,
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
    marginHorizontal: 15,
    paddingVertical: 10,
    marginTop: 10,
  },
  statCard: {
    flex: 1,
    paddingVertical: 10,
    borderRightWidth: 2,
    borderColor: GRAY,
    alignItems: 'center',
  },
  statLabel: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
    color: GRAY,
    marginBottom: 2,
  },
  statValue: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 20,
    color: 'black',
  },
  selectActiveListWarning: {
    color: BLUE,
    fontFamily: 'Montserrat-Regular',
    textDecorationLine: 'underline',
    fontSize: 17,
  },
  renewButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'red',
    paddingVertical: 7,
    paddingHorizontal: 15,
    borderRadius: 15,
    margin: 10,
    elevation: 2,
  },
  renewText: {
    color: 'white',
    fontFamily: 'Montserrat-Medium',
    fontSize: 13,
  },
});

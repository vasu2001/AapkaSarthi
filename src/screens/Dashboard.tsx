import React, {useState, useCallback, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  PermissionsAndroid,
  AppState,
  AppStateStatus,
} from 'react-native';
import {
  GRAY_LIGHT,
  GRAY_BACKGROUND,
  GRAY,
  YELLOW,
  PINK,
  PURPLE,
  BLUE,
} from '../utils/colors';
import {CustomButton} from '../components/CustomButton';
import Pie from 'react-native-pie';
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
import {CallFeedbackModal} from '../components/CallFeeddackModal';
import {useSelector, useDispatch} from 'react-redux';
import {stateType} from '../redux/utils';
import {act} from 'react-test-renderer';
import {submitCallAction} from '../redux/actions';
import showSnackbar from '../utils/snackbar';

export interface DashboardProps {}

export function Dashboard(props: DashboardProps) {
  const [modal, setModal] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  let phoneCallInProgress = useRef(0);

  const state = useSelector((state: stateType) => state);
  const phoneList = state.callData[0]?.list;
  const dispatch = useDispatch();
  // console.log('rerender');

  const initFrequency = {
    rescheduled: 0,
    done: 0,
    upcoming: 0,
  };
  const [frequency, setFrequency] = useState(initFrequency);

  useEffect(() => {
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
    const newFrequency = {...initFrequency};
    phoneList?.forEach((item) => {
      ++newFrequency[item.status];
    });

    setFrequency(newFrequency);

    const n = phoneList?.length ?? 0;
    let setValue = -1;

    for (let i = activeIndex + 1; i < n; i++) {
      if (phoneList[i].status !== 'done') {
        setValue = i;
        break;
      }
    }

    console.log('setting new active : ' + setValue);
    setActiveIndex(setValue);
  }, [state]);

  const startCalling = useCallback(async () => {
    try {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CALL_PHONE,
      );

      phoneCallInProgress.current++;
      RNImmediatePhoneCall.immediatePhoneCall(phoneList[activeIndex].phNo);
    } catch (err) {
      console.log(err);
    }
  }, [activeIndex]);

  const endCall = useCallback(
    (comment: string, rescheduled?: string): void => {
      dispatch(
        submitCallAction(comment, rescheduled ?? null, activeIndex, 0, '0'),
      );
    },
    [activeIndex],
  );

  return (
    <>
      <CallFeedbackModal
        visible={modal}
        onCancel={() => {
          setModal(false);
        }}
        nextCall={() => {
          if (activeIndex === -1) showSnackbar('No calls remaining');
          else startCalling();
        }}
        endCall={endCall}
      />
      <View style={styles.mainContainer}>
        <Text style={styles.heading}>My Dashboard</Text>

        {/* <View style={{height: 250, width: 300, backgroundColor: 'white'}} /> */}
        <Pie
          radius={70}
          innerRadius={45}
          sections={[
            {
              percentage: 20,
              color: PINK,
            },
            {
              percentage: 40,
              color: PURPLE,
            },
            {
              percentage: 40,
              color: BLUE,
            },
          ]}
          dividerSize={6}
          strokeCap={'butt'}
        />

        <View style={styles.legendContainer}>
          <View style={styles.legendRow}>
            <View style={[styles.legendColor, {backgroundColor: PINK}]} />
            <Text style={styles.legendLabel}>Pending</Text>
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
          onPress={startCalling}
          style={styles.startCalling}
          disabled={activeIndex === -1}
        />

        <View style={styles.statConatiner}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Rescheduled</Text>
            <Text style={styles.statValue}>{frequency['rescheduled']}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Done</Text>
            <Text style={styles.statValue}>{frequency['done']}</Text>
          </View>
          <View style={[styles.statCard, {borderRightWidth: 0}]}>
            <Text style={styles.statLabel}>Upcoming</Text>
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

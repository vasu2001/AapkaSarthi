import React, {useState, useCallback, useEffect} from 'react';
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

export interface DashboardProps {}

export function Dashboard(props: DashboardProps) {
  const [modal, setModal] = useState(false);
  let phoneNo = '1234567890';
  let phoneCallInProgress: number = 0;

  useEffect(() => {
    const handler = (state: AppStateStatus) => {
      // console.log(state, phoneCallInProgress);
      if (state === 'active') {
        if (phoneCallInProgress === 1) phoneCallInProgress++;
        else if (phoneCallInProgress === 2) {
          console.log('call ended');
          setModal(true);
          phoneCallInProgress = 0;
        }
      }
    };

    AppState.addEventListener('change', handler);

    return () => {
      AppState.removeEventListener('change', handler);
    };
  }, []);

  const startCalling = useCallback(async () => {
    try {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CALL_PHONE,
      );

      phoneCallInProgress++;
      RNImmediatePhoneCall.immediatePhoneCall(phoneNo);
    } catch (err) {
      console.log(err);
    }
  }, [phoneNo]);

  return (
    <>
      <CallFeedbackModal
        visible={modal}
        onCancel={() => {
          setModal(false);
        }}
        nextCall={() => {
          // do something for the current call and get new no
          phoneNo = '22222222222222';
          startCalling();
        }}
        submitFeedback={(text: string) => console.log(text)}
        rescheduleCall={(text: string) => console.log(text)}
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
        />

        <View style={styles.statConatiner}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Pending</Text>
            <Text style={styles.statValue}>0</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Done</Text>
            <Text style={styles.statValue}>3</Text>
          </View>
          <View style={[styles.statCard, {borderRightWidth: 0}]}>
            <Text style={styles.statLabel}>Upcoming</Text>
            <Text style={styles.statValue}>12</Text>
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
    marginHorizontal: 40,
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

import React, {useState, useCallback} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import BottomModal from './BottomModal';
import CustomInput from './CustomInput';
import {CustomButton} from './CustomButton';
import showSnackbar from '../utils/snackbar';
import DatePicker from 'react-native-datepicker';
import {YELLOW, GRAY} from '../utils/colors';
import RNPickerSelect from 'react-native-picker-select';

export interface CallFeedbackModalProps {
  visible: boolean;
  onCancel: () => void;
  nextCall: () => void;
  endCall: (
    comment: string,
    reschedule: string,
    status: 'done' | 'rescheduled',
    callback: () => void,
  ) => void;
}

export function CallFeedbackModal({
  visible,
  onCancel,
  nextCall,
  endCall,
}: CallFeedbackModalProps) {
  const [comment, setComment] = useState('');
  const [reschedule, setReschedule] = useState('');
  const [status, setStatus] = useState<'done' | 'rescheduled'>('done');

  const cancel = () => {
    endCall(comment, reschedule, status, () => {
      // if (cleanUp())
      onCancel();
    });
  };

  const cleanUp = () => {
    if (status === 'rescheduled' && reschedule === '') {
      showSnackbar('Select a rescheduling date');
      return false;
    }
    setComment('');
    setReschedule('');
    setStatus('done');
    return true;
  };

  return (
    <BottomModal
      {...{visible}}
      onCancel={cancel}
      validation={cleanUp}
      contentHeight={420}>
      <Text style={styles.heading}>Feedback</Text>
      {/* <View style={styles.card}> */}
      <RNPickerSelect
        value={status}
        onValueChange={setStatus}
        items={[
          {label: 'Done', value: 'done'},
          {label: 'Reschedule', value: 'rescheduled'},
        ]}
        placeholder={{}}
        style={dropDownStyles}
      />
      {/* </View> */}

      <View style={[styles.card, {opacity: status === 'done' ? 0.75 : 1}]}>
        <DatePicker
          style={styles.dateInput}
          date={reschedule}
          mode="date"
          placeholder="Reschedule Date"
          format="YYYY-MM-DD"
          minDate="2020-05-01"
          maxDate="2021-06-01"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateText: styles.dateInputText,
            dateInput: {
              borderWidth: 0,
              flex: 1,
              alignItems: 'flex-start',
            },
            placeholderText: [styles.dateInputText, {color: GRAY}],
          }}
          onDateChange={setReschedule}
          disabled={status === 'done'}
        />
      </View>
      <View style={styles.card}>
        <CustomInput
          value={comment}
          onChangeText={setComment}
          placeholder="Comments.."
          style={styles.input}
        />
      </View>

      <View style={styles.buttonRow}>
        <CustomButton
          text="Next Call"
          onPress={() => {
            endCall(comment, reschedule, status, () => {
              if (cleanUp()) setTimeout(nextCall, 1000);
              // nextCall();
            });
          }}
          style={styles.button}
        />

        <CustomButton
          text="Call Again"
          onPress={nextCall}
          style={styles.button}
        />
      </View>
    </BottomModal>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontFamily: 'Raleway-SemiBold',
    fontSize: 24,
    marginBottom: 20,
  },
  card: {
    padding: 10,
    alignSelf: 'stretch',
    backgroundColor: 'white',
    borderRadius: 20,
    marginBottom: 10,
    elevation: 1,
    flexDirection: 'row',
    alignItems: 'center',
    // marginBottom: 50,
  },
  input: {
    flex: 1,
  },
  button: {
    elevation: 3,
  },
  buttonRow: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 5,
  },
  dateInput: {
    width: 200,
    borderBottomWidth: 1,
    padding: 5,
    marginBottom: 10,
    flex: 1,
    borderColor: YELLOW,
  },
  dateInputText: {
    fontSize: 16,
    fontFamily: 'Raleway-Medium',
    borderWidth: 0,
  },
});

const dropDownStyles = StyleSheet.create({
  inputAndroid: styles.dateInputText,
  inputAndroidContainer: {
    backgroundColor: 'white',
    borderWidth: 1,
  },
  viewContainer: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    marginBottom: 10,
    elevation: 1,
  },
});

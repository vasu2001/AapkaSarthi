import React, {useState, useCallback} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import BottomModal from './BottomModal';
import CustomInput from './CustomInput';
import {CustomButton} from './CustomButton';
import showSnackbar from '../utils/snackbar';
import DatePicker from 'react-native-datepicker';
import {YELLOW, GRAY} from '../utils/colors';
import RNPickerSelect from 'react-native-picker-select';
import AntDesign from 'react-native-vector-icons/AntDesign';

export interface CallFeedbackModalProps {
  visible: boolean;
  onCancel: () => void;
  endCall: (
    comment: string,
    reschedule: string,
    status: 'done' | 'rescheduled',
    callback: (index: number) => void,
  ) => void;
  callAgain: () => void;
  startCalling: (index: number) => Promise<void>;
  callDisabled: boolean;
}

export function CallFeedbackModal({
  visible,
  onCancel,
  endCall,
  callAgain,
  startCalling,
  callDisabled,
}: CallFeedbackModalProps) {
  const [comment, setComment] = useState('');
  const [reschedule, setReschedule] = useState('');
  const [status, setStatus] = useState<'done' | 'rescheduled'>('done');
  const [statusSubmit, setStatusSubmit] = useState(false);

  const cancel = () => {
    endCall(comment, reschedule, status, () => {
      // if (cleanUp())
      cleanUp();
      onCancel();
    });
  };

  const cleanUp = () => {
    setComment('');
    setReschedule('');
    setStatus('done');
    setStatusSubmit(false);
  };

  return (
    <BottomModal
      {...{visible}}
      onCancel={() => {}}
      validation={() => false}
      contentHeight={450}>
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
            endCall(comment, reschedule, status, (index) => {
              cleanUp();
              startCalling(index);
            });
          }}
          style={[styles.button, {marginRight: 8}]}
          disabled={
            (status === 'rescheduled' && reschedule === '' ? true : false) ||
            callDisabled
          }
        />

        <CustomButton
          text="Call Again"
          onPress={callAgain}
          style={[styles.button, {marginLeft: 8}]}
          disabled={callDisabled}
        />
      </View>
      <TouchableOpacity
        onPress={cancel}
        style={[styles.closeButton]}
        disabled={status === 'rescheduled' && reschedule === '' ? true : false}>
        <AntDesign name="close" size={25} color={GRAY} />
      </TouchableOpacity>
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
    paddingHorizontal: 30,
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
  closeButton: {
    position: 'absolute',
    right: -10,
    top: -10,
    padding: 5,
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

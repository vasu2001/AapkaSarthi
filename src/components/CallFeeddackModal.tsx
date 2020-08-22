import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import BottomModal from './BottomModal';
import CustomInput from './CustomInput';
import {CustomButton} from './CustomButton';
import {YELLOW, GRAY, RED} from '../utils/colors';
import RNPickerSelect from 'react-native-picker-select';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import Autocomplete from 'react-native-autocomplete-input';

const suggestionData = ['abcd', 'abcdef', 'eedasgsab', 'sdnksnuasfb'];

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
  const [dateTimeModal, setDateTimeModal] = useState(false);
  // const [statusSubmit, setStatusSubmit] = useState(false);

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
    setDateTimeModal(false);
  };

  return (
    <>
      <BottomModal
        {...{visible}}
        onCancel={() => {}}
        validation={() => false}
        contentHeight={450}>
        <Text style={styles.heading}>Feedback</Text>

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

        <View
          style={[
            styles.card,
            {opacity: status === 'done' ? 0.75 : 1, marginBottom: 90},
          ]}>
          <TouchableOpacity
            onPress={() => {
              setDateTimeModal(true);
            }}
            disabled={status === 'done'}
            style={{flex: 1, flexDirection: 'row'}}>
            <Text
              style={[
                styles.dateInput,
                styles.dateInputText,
                status === 'done' || reschedule === '' ? {color: GRAY} : null,
                status === 'rescheduled' && reschedule === ''
                  ? {borderColor: RED}
                  : null,
              ]}>
              {reschedule === ''
                ? 'Reschedule Date'
                : moment(reschedule).format('MMM Do, hh:mm:a')}
            </Text>
          </TouchableOpacity>
        </View>
        {/* <View style={styles.card}>
        <CustomInput
            value={comment}
            onChangeText={setComment}
            placeholder="Comments.."
            style={styles.input}
          />
        </View> */}

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
            onPress={() => {
              cleanUp();
              callAgain();
            }}
            style={[styles.button, {marginLeft: 8}]}
            disabled={callDisabled}
          />
        </View>

        <View
          style={{
            position: 'absolute',
            alignItems: 'stretch',
            right: 0,
            left: 0,
            top: 205,
          }}>
          <Autocomplete
            data={suggestionData.filter(
              (data) =>
                data.startsWith(comment.toLowerCase()) &&
                data !== comment.toLowerCase() &&
                comment !== '',
            )}
            onChangeText={setComment}
            value={comment}
            placeholder="Comments.."
            renderItem={({item}) => (
              <TouchableOpacity onPress={() => setComment(item)}>
                <Text style={styles.suggestedText}>{item}</Text>
              </TouchableOpacity>
            )}
            inputContainerStyle={[
              styles.card,
              {
                borderWidth: 0,
                marginBottom: 0,
              },
            ]}
            renderTextInput={({
              value = '',
              onChangeText = () => {},
              placeholder = '',
            }) => (
              <CustomInput
                {...{value, onChangeText, placeholder}}
                style={styles.input}
              />
            )}
            listContainerStyle={{
              top: -10,
              elevation: 1,
            }}
          />
        </View>

        <TouchableOpacity
          onPress={cancel}
          style={[styles.closeButton]}
          disabled={
            status === 'rescheduled' && reschedule === '' ? true : false
          }>
          <AntDesign name="close" size={25} color={GRAY} />
        </TouchableOpacity>
      </BottomModal>
      <DateTimePickerModal
        isVisible={dateTimeModal}
        mode="datetime"
        minimumDate={moment().toDate()}
        onConfirm={(date) => {
          setReschedule(date.toISOString());
          setDateTimeModal(false);
        }}
        onCancel={() => {
          setDateTimeModal(false);
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 24,
    marginBottom: 20,
    color: 'black',
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
    fontFamily: 'Montserrat-Medium',
    borderWidth: 0,
    color: 'black',
  },
  closeButton: {
    position: 'absolute',
    right: -10,
    top: -10,
    padding: 5,
  },
  suggestedText: {
    color: GRAY,
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
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

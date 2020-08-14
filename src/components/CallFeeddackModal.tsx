import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import BottomModal from './BottomModal';
import CustomInput from './CustomInput';
import {CustomButton} from './CustomButton';
import showSnackbar from '../utils/snackbar';

export interface CallFeedbackModalProps {
  visible: boolean;
  onCancel: () => void;
  nextCall: () => void;
  submitFeedback: (x: string) => void;
  rescheduleCall: (x: string) => void;
}

export function CallFeedbackModal({
  visible,
  onCancel,
  nextCall,
  submitFeedback,
  rescheduleCall,
}: CallFeedbackModalProps) {
  const [comment, setComment] = useState('');
  const [reschedule, setReschedule] = useState('');

  const cancel = () => {
    if (comment.length > 0) submitFeedback(comment);
    onCancel();
  };

  return (
    <BottomModal {...{visible}} onCancel={cancel} contentHeight={360}>
      <Text style={styles.heading}>Feedback</Text>
      <View style={styles.card}>
        <CustomInput
          value={comment}
          onChangeText={setComment}
          placeholder="Comments.."
          style={styles.input}
        />
      </View>
      <View style={styles.card}>
        <CustomInput
          value={reschedule}
          onChangeText={setReschedule}
          style={{flex: 1, marginRight: 10}}
          placeholder="Reschedule Date"
        />
        <CustomButton
          text={'Reschedule\nCall'}
          onPress={() => {
            if (reschedule.length > 0) rescheduleCall(reschedule);
            else showSnackbar('Enter reschedule time');
          }}
          style={[styles.button, {elevation: 2}]}
        />
      </View>
      <View style={styles.buttonRow}>
        <CustomButton
          text="Next Call"
          onPress={() => {
            if (comment.length > 0) submitFeedback(comment);
            nextCall();
          }}
          style={styles.button}
        />
        {/* <CustomButton text="Close" onPress={onCancel} style={styles.button} /> */}
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
});

import React from 'react';
import {View, Text, Modal, ViewBase, StatusBar, StyleSheet} from 'react-native';
import {MODAL_BACKDROP} from '../utils/colors';
import {CustomButton} from './CustomButton';

export interface ConfirmationModalProps {
  visible: boolean;
  onYes: () => void;
  onNo: () => void;
  label: string;
}

export function ConfirmationModal({
  visible,
  onNo,
  onYes,
  label,
}: ConfirmationModalProps) {
  return (
    <Modal visible={visible} transparent>
      <StatusBar backgroundColor={MODAL_BACKDROP} />
      <View style={styles.backdrop}>
        <View style={styles.mainCard}>
          <Text style={styles.text}>Do you want to {label}?</Text>

          <View style={styles.row}>
            <CustomButton text="Yes" onPress={onYes} style={styles.button} />
            <CustomButton text="No" onPress={onNo} style={styles.button} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: MODAL_BACKDROP,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainCard: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 15,
  },
  text: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 16,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  button: {
    padding: 10,
  },
});

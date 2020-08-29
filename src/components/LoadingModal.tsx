import * as React from 'react';
import {View, Modal, ActivityIndicator, StatusBar} from 'react-native';
import {MODAL_BACKDROP, PRIMARY_BLUE} from '../utils/colors';

export interface LoadingModalProps {
  visible: boolean;
}

export function LoadingModal({visible}: LoadingModalProps) {
  return (
    <Modal visible={visible} transparent>
      <StatusBar backgroundColor={MODAL_BACKDROP} />
      <View
        style={{
          flex: 1,
          backgroundColor: MODAL_BACKDROP,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={{backgroundColor: 'white', borderRadius: 15, padding: 30}}>
          <ActivityIndicator size="large" color={PRIMARY_BLUE} />
        </View>
      </View>
    </Modal>
  );
}

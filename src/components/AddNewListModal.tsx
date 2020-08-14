import React, {useState} from 'react';
import BottomModal from './BottomModal';
import CustomInput from './CustomInput';
import {ImportComponent} from './ImportComponent';

export interface AddNewListModalProps {
  visible: boolean;
  onCancel: () => void;
}

export function AddNewListModal({visible, onCancel}: AddNewListModalProps) {
  const [name, setName] = useState('');

  return (
    <BottomModal {...{visible, onCancel}} contentHeight={510}>
      <CustomInput
        value={name}
        onChangeText={setName}
        placeholder="List Name"
        style={{
          width: '80%',
          fontSize: 17,
        }}
        validation={(text) => text.length > 0}
      />
      <ImportComponent
        callback={(x) => {
          console.log(x);
          onCancel();
        }}
      />
    </BottomModal>
  );
}

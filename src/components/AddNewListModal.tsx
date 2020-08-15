import React, {useState, useCallback} from 'react';
import BottomModal from './BottomModal';
import CustomInput from './CustomInput';
import {ImportComponent} from './ImportComponent';
import {useDispatch} from 'react-redux';
import {contactType} from '../redux/utils';
import {newListAction} from '../redux/actions';
import showSnackbar from '../utils/snackbar';

export interface AddNewListModalProps {
  visible: boolean;
  onCancel: () => void;
}

export function AddNewListModal({visible, onCancel}: AddNewListModalProps) {
  const [name, setName] = useState('');
  const dispatch = useDispatch();

  const addList = useCallback(
    (list: contactType[]): void => {
      if (name === '') showSnackbar('Enter a name for the list');
      else
        dispatch(
          newListAction(list, name, () => {
            setName('');
            onCancel();
          }),
        );
    },
    [name],
  );

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
      <ImportComponent callback={addList} />
    </BottomModal>
  );
}

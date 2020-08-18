import React, {useState, useCallback} from 'react';
import BottomModal from './BottomModal';
import CustomInput from './CustomInput';
import {ImportComponent} from './ImportComponent';
import {useDispatch} from 'react-redux';
import {contactType} from '../redux/utils';
import {newListAction, uploadFileAction} from '../redux/actions';
import showSnackbar from '../utils/snackbar';
import {StackNavigationProp} from '@react-navigation/stack';

export interface AddNewListModalProps {
  visible: boolean;
  onCancel: () => void;
  navigation: StackNavigationProp<any>;
}

export function AddNewListModal({
  visible,
  onCancel,
  navigation,
}: AddNewListModalProps) {
  const [name, setName] = useState('');
  const dispatch = useDispatch();

  const addList = useCallback(
    (
      list: contactType[],
      successCallback: () => void,
      failCallback: () => void,
    ): void => {
      dispatch(
        newListAction(
          list,
          name,
          () => {
            setName('');
            onCancel();
            successCallback();
          },
          failCallback,
        ),
      );
    },
    [name],
  );

  const uploadFile = useCallback(
    (data: string, hasHeaders: boolean, type: string, callback: () => void) => {
      dispatch(
        uploadFileAction(data, name, hasHeaders, type, () => {
          setName('');
          onCancel();
          callback();
        }),
      );
    },
    [name],
  );

  return (
    <BottomModal
      {...{visible}}
      onCancel={() => {
        onCancel();
        setName('');
      }}
      contentHeight={510}>
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
        callback={addList}
        navigation={navigation}
        onCancel={onCancel}
        disabled={name.length === 0}
        uploadFile={uploadFile}
      />
    </BottomModal>
  );
}

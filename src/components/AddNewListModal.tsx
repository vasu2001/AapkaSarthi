import React, {useState, useCallback, useRef, useEffect} from 'react';
import BottomModal from './BottomModal';
import CustomInput from './CustomInput';
import {ImportComponent} from './ImportComponent';
import {useDispatch} from 'react-redux';
import {newListAction, uploadFileAction} from '../redux/actions';
import {StackNavigationProp} from '@react-navigation/stack';
import {TextInput} from 'react-native';

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

  const inputRef = useRef<TextInput>();

  useEffect(() => {
    if (visible) {
      inputRef.current?.focus();
      // inputRef.current?.
    }
  }, [visible]);

  const addList = useCallback(
    (
      list: {[x: string]: string},
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
        setName('');
        onCancel();
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
        textRef={(ref) => {
          inputRef.current = ref;
        }}
      />
      <ImportComponent
        callback={addList}
        navigation={navigation}
        onCancel={() => {
          setName('');
          onCancel();
        }}
        disabled={name.length === 0}
        uploadFile={uploadFile}
        name={name}
      />
    </BottomModal>
  );
}

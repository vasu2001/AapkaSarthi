import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {GRAY_BACKGROUND} from '../utils/colors';
import {PhoneGroupItem} from '../components/PhoneGroupItem';
import {CustomButton} from '../components/CustomButton';
import {AddNewListModal} from '../components/AddNewListModal';
import {useSelector, useDispatch} from 'react-redux';
import {stateType} from '../redux/utils';
import {StackNavigationProp} from '@react-navigation/stack';
import {deleteListAction} from '../redux/actions';

export interface PhoneListProps {
  navigation: StackNavigationProp<any>;
}

export function PhoneList({navigation}: PhoneListProps) {
  const [addModal, setAddModal] = useState(false);
  const {callData} = useSelector((state: stateType) => state);
  const dispatch = useDispatch();

  const deleteList = (listIndex: number) => {
    dispatch(deleteListAction(listIndex));
  };

  return (
    <>
      <AddNewListModal
        visible={addModal}
        onCancel={() => {
          setAddModal(false);
        }}
        navigation={navigation}
      />
      <View style={styles.mainContainer}>
        <Text style={styles.heading}>Phone List</Text>
        <FlatList
          data={callData}
          keyExtractor={({id}) => id}
          renderItem={({item, index}) => (
            <PhoneGroupItem
              name={item.name ?? ''}
              noOfContacts={item.list.length}
              deleteContact={() => {
                deleteList(index);
              }}
            />
          )}
          ListFooterComponent={
            <CustomButton
              text="Add a new list"
              onPress={() => {
                setAddModal(true);
              }}
              style={styles.listFooter}
            />
          }
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: GRAY_BACKGROUND,
  },
  heading: {
    fontFamily: 'Raleway-SemiBold',
    fontSize: 22,
    paddingVertical: 15,
    textAlign: 'center',
    backgroundColor: 'white',
    marginBottom: 15,
    elevation: 1,
  },
  listFooter: {
    alignSelf: 'center',
    marginVertical: 10,
  },
});

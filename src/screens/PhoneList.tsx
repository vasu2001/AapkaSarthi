import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {GRAY_BACKGROUND, GRAY} from '../utils/colors';
import {PhoneGroupItem} from '../components/PhoneGroupItem';
import {CustomButton} from '../components/CustomButton';
import {AddNewListModal} from '../components/AddNewListModal';
import {useSelector, useDispatch} from 'react-redux';
import {stateType} from '../redux/utils';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  deleteListAction,
  changeActiveListAction,
  deleteAllAction,
} from '../redux/actions';
import showSnackbar from '../utils/snackbar';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ConfirmationModal} from '../components/ConfirmationModal';
import {StaticHeader} from '../components/StaticHeader';

export interface PhoneListProps {
  navigation: StackNavigationProp<any>;
}

export function PhoneList({navigation}: PhoneListProps) {
  const [addModal, setAddModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const {callData, activeList} = useSelector((state: stateType) => state);
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

      <ConfirmationModal
        visible={deleteModal}
        label="Delete Everything"
        onNo={() => {
          setDeleteModal(false);
        }}
        onYes={() => {
          dispatch(deleteAllAction());
          setDeleteModal(false);
        }}
      />

      <View style={styles.mainContainer}>
        {/* <Text style={styles.heading}>Phone List</Text> */}
        <StaticHeader />

        <TouchableOpacity
          onPress={() => {
            setDeleteModal(true);
          }}
          style={styles.deleteAll}>
          <AntDesign name="delete" size={30} color={GRAY} />
        </TouchableOpacity>

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
              active={activeList === index}
              onPress={() => {
                dispatch(changeActiveListAction(index));
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
          ListEmptyComponent={
            <Text style={styles.emptyList}>
              Add a new list to start calling
            </Text>
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
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 22,
    paddingVertical: 15,
    textAlign: 'center',
    backgroundColor: 'white',
    marginBottom: 15,
    elevation: 1,
    color: 'black',
  },
  listFooter: {
    alignSelf: 'center',
    marginVertical: 10,
  },
  deleteAll: {
    position: 'absolute',
    elevation: 2,
    right: 10,
    top: 20,
  },
  emptyList: {
    alignSelf: 'center',
    color: GRAY,
    fontFamily: 'Montserrat-Regular',
    fontSize: 18,
    marginBottom: 10,
    marginHorizontal: 25,
    textAlign: 'center',
  },
});

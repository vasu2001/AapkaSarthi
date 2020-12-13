import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {GRAY_BACKGROUND, GRAY, RED} from '../utils/colors';
import {PhoneGroupItem} from '../components/PhoneGroupItem';
import {CustomButton} from '../components/CustomButton';
import {AddNewListModal} from '../components/AddNewListModal';
import {useSelector, useDispatch} from 'react-redux';
import {stateType} from '../redux/utils';
import {StackNavigationProp} from '@react-navigation/stack';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ConfirmationModal} from '../components/ConfirmationModal';
import {StaticHeader} from '../components/StaticHeader';
import {LoadingModal} from '../components/LoadingModal';
import {
  deleteListAction,
  deleteAllAction,
  changeActiveListAction,
} from '../redux/actions/core';

export interface PhoneListProps {
  navigation: StackNavigationProp<any>;
}

export function PhoneList({navigation}: PhoneListProps) {
  const [addModal, setAddModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const {callData, activeList, freePlan} = useSelector(
    (state: stateType) => state,
  );
  const dispatch = useDispatch();

  const deleteList = (listIndex: number) => {
    setLoading(true);
    dispatch(
      deleteListAction(listIndex, () => {
        setLoading(false);
      }),
    );
  };

  const newListDisabled = freePlan && callData.length > 0;

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
          setLoading(true);
          dispatch(
            deleteAllAction(() => {
              setLoading(false);
            }),
          );
          setDeleteModal(false);
        }}
      />

      <LoadingModal visible={loading} />

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
          keyExtractor={({id}) => id.toString()}
          renderItem={({item, index}) => (
            <PhoneGroupItem
              name={item.name ?? ''}
              noOfContacts={item.loaded ? item.list.length : -1}
              deleteContact={() => {
                deleteList(index);
              }}
              active={activeList === index}
              onPress={() => {
                setLoading(true);
                dispatch(
                  changeActiveListAction(index, () => {
                    setLoading(false);
                  }),
                );
              }}
            />
          )}
          ListFooterComponent={
            <>
              <CustomButton
                text="Add a new list"
                onPress={() => {
                  if (newListDisabled) {
                    navigation.navigate('Settings', {
                      screen: 'Upgrade Plan',
                    });
                  } else setAddModal(true);
                }}
                style={styles.listFooter}
                // disabled={newListDisabled}
              />
              {newListDisabled && (
                <Text style={styles.freePlanText}>
                  Only 1 list allowed in Free Plan
                </Text>
              )}
            </>
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
  freePlanText: {
    alignSelf: 'center',
    color: RED,
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
  },
});

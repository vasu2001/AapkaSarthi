import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {GRAY_BACKGROUND} from '../utils/colors';
import {PhoneGroupItem} from '../components/PhoneGroupItem';
import {CustomButton} from '../components/CustomButton';
import {AddNewListModal} from '../components/AddNewListModal';

export interface PhoneListProps {}

const dummyData = [
  {
    name: 'List#1',
    id: '1',
    data: [
      {
        name: 'Person#1',
        phNo: '1234567890',
        comment:
          'Proident officia qui consectetur sit occaecat deserunt excepteur commodo occaecat aute sunt aliqua do.',
        status: 'done',
        scheduledFor: null,
      },
      {
        name: 'Person#2',
        phNo: '1234567890',
        comment:
          'Proident officia qui consectetur sit occaecat deserunt excepteur commodo occaecat aute sunt aliqua do.',
        status: 'pending',
        scheduledFor: null,
      },
      {
        name: 'Person#3',
        phNo: '1234567890',
        comment:
          'Proident officia qui consectetur sit occaecat deserunt excepteur commodo occaecat aute sunt aliqua do.',
        status: 'upcoming',
        scheduledFor: null,
      },
    ],
  },
  {
    name: 'List#2',
    id: '2',
    data: [
      {
        name: 'Person#1',
        phNo: '1234567890',
        comment:
          'Proident officia qui consectetur sit occaecat deserunt excepteur commodo occaecat aute sunt aliqua do.',
        status: 'done',
        scheduledFor: null,
      },
      {
        name: 'Person#2',
        phNo: '1234567890',
        comment:
          'Proident officia qui consectetur sit occaecat deserunt excepteur commodo occaecat aute sunt aliqua do.',
        status: 'pending',
        scheduledFor: null,
      },
      {
        name: 'Person#3',
        phNo: '1234567890',
        comment:
          'Proident officia qui consectetur sit occaecat deserunt excepteur commodo occaecat aute sunt aliqua do.',
        status: 'upcoming',
        scheduledFor: null,
      },
    ],
  },
];

export function PhoneList(props: PhoneListProps) {
  const [addModal, setAddModal] = useState(false);

  return (
    <>
      <AddNewListModal
        visible={addModal}
        onCancel={() => {
          setAddModal(false);
        }}
      />
      <View style={styles.mainContainer}>
        <Text style={styles.heading}>Phone List</Text>
        <FlatList
          data={dummyData}
          keyExtractor={({id}) => id}
          renderItem={({item}) => (
            <PhoneGroupItem name={item.name} noOfContacts={item.data.length} />
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

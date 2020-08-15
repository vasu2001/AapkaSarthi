import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Linking} from 'react-native';
import {GRAY_BACKGROUND} from '../utils/colors';
import CustomInput from '../components/CustomInput';
import {CustomButton} from '../components/CustomButton';
import showSnackbar from '../utils/snackbar';

export interface AboutUsProps {}

const contactNo = '9876543210';

export function AboutUs(props: AboutUsProps) {
  const [query, setQuery] = useState('');

  return (
    <ScrollView style={styles.mainContainer}>
      <Text style={styles.heading}>About Us</Text>
      <Text style={styles.aboutText}>
        Commodo sit adipisicing reprehenderit aute laboris veniam est aliquip
        minim nulla quis. Amet consequat magna esse dolor non et aliquip id
        deserunt ipsum ipsum officia. Irure dolor eu consequat eu. Eu nostrud ut
        anim consequat culpa. Commodo duis non laboris aliquip sit. Aliqua
        voluptate pariatur consectetur laboris. Ea consectetur minim occaecat
        laborum ullamco.
      </Text>
      <View style={styles.card}>
        <Text style={styles.subHeading}>Contact Us</Text>
        <CustomInput
          value={query}
          onChangeText={setQuery}
          placeholder="Message us on Whatsapp"
          style={styles.input}
        />
        <CustomButton
          text="Send"
          onPress={() => {
            if (query == '') {
              showSnackbar('Enter a query to send');
              return;
            }
            Linking.openURL(
              'whatsapp://send?text=' + query + '&phone=91' + contactNo,
            ).catch((err) => {
              showSnackbar('Make sure you have WhatsApp installed.');
            });
          }}
        />
      </View>
    </ScrollView>
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
  aboutText: {
    textAlign: 'center',
    fontFamily: 'Raleway-Regular',
    margin: 10,
    paddingHorizontal: 25,
    marginBottom: 30,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    elevation: 2,
    padding: 20,
    marginHorizontal: 30,
    alignItems: 'center',
    marginBottom: 20,
  },
  subHeading: {
    fontFamily: 'Raleway-Medium',
    fontSize: 18,
    marginBottom: 20,
  },
  input: {
    width: '90%',
    marginBottom: 20,
  },
});

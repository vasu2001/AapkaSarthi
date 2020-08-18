import React, {useState} from 'react';
import {View, Text, StyleSheet, Linking} from 'react-native';
import {GRAY_BACKGROUND} from '../utils/colors';
import CustomInput from '../components/CustomInput';
import {CustomButton} from '../components/CustomButton';
import showSnackbar from '../utils/snackbar';

export interface ContactUsProps {}
const contactNo = '8447944871';

export function ContactUs(props: ContactUsProps) {
  const [query, setQuery] = useState('');
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.heading}>Contact Us</Text>
      <View style={styles.card}>
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
              showSnackbar('Enter a message to send');
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
    </View>
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
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    elevation: 2,
    padding: 20,
    marginHorizontal: 30,
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    width: '90%',
    marginBottom: 20,
  },
});

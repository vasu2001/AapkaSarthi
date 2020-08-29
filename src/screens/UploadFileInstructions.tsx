import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {GRAY_BACKGROUND} from '../utils/colors';

export interface UploadFileInstructionsProps {}

export function UploadFileInstructions(props: UploadFileInstructionsProps) {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.heading}>Upload File Instructions</Text>
      <View style={styles.card}>
        <Text style={styles.cardHeading}>From WhatsApp</Text>
        <Text style={styles.aboutText}>
          {
            'Internal Storage -> WhatsApp -> Media -> WhatsApp Documents -> Select the file'
          }
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardHeading}>From Email</Text>
        <Text style={[styles.aboutText, {marginBottom: 5}]}>
          Download the file from the email.
        </Text>
        <Text style={styles.aboutText}>
          {'Internal Storage -> Download -> Select the file'}
        </Text>
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
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 22,
    paddingVertical: 15,
    textAlign: 'center',
    backgroundColor: 'white',
    marginBottom: 15,
    elevation: 1,
    color: 'black',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    elevation: 2,
    padding: 20,
    marginHorizontal: 30,
    marginBottom: 20,
  },
  cardHeading: {
    textAlign: 'center',
    fontFamily: 'Montserrat-Medium',
    color: 'black',
    fontSize: 16,
    marginBottom: 10,
    alignSelf: 'center',
  },
  aboutText: {
    fontFamily: 'Montserrat-Regular',
    color: 'black',
    fontSize: 14,
  },
});

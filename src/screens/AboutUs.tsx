import React from 'react';
import {Text, StyleSheet, ScrollView} from 'react-native';
import {GRAY_BACKGROUND} from '../utils/colors';
import {StaticHeader} from '../components/StaticHeader';

export interface AboutUsProps {}

export function AboutUs() {
  return (
    <ScrollView style={styles.mainContainer}>
      {/* <Text style={styles.heading}>About Us</Text> */}
      <StaticHeader />
      <Text style={styles.aboutText}>
        Aapka Sarthi is one of the leading IT solution providers across India.
        With more than a decade's experience, our technical team actualizes IT
        solutions to help you scale your business quickly. Aapka Sarthi is a
        trusted name for managed IT services, IT project delivery, and cloud
        computing solutions for financial advisors. We provide complete training
        and support to budding financial advisors and comprehensive IT solutions
        to well established financial advisors. One of our main products is the
        Aapka Sarthi Auto Caller (ASAC). It enables financial advisors and
        managers to handle all the issues related to outbound calling. Anyone
        who is a part of a sales team knows the importance of a telephonic call
        in generating leads. It is more personalized than an email, but dialing
        numbers manually can significantly drain your productive time. Aapka
        Sarthi Auto Caller comes to the rescue by allowing you to call multiple
        numbers without having to dial them manually. Simply upload a list of
        numbers or add them from your phonebook and start calling. The product
        is straightforward, efficient, and easy to use.
      </Text>
    </ScrollView>
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
  aboutText: {
    textAlign: 'justify',
    fontFamily: 'Montserrat-Regular',
    margin: 10,
    paddingHorizontal: 25,
    color: 'black',
    marginBottom: 30,
  },
});

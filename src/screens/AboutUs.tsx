import React from 'react';
import {Text, StyleSheet, ScrollView} from 'react-native';
import {GRAY_BACKGROUND} from '../utils/colors';

export interface AboutUsProps {}

export function AboutUs() {
  return (
    <ScrollView style={styles.mainContainer}>
      <Text style={styles.heading}>About Us</Text>
      <Text style={styles.aboutText}>
        Aapka Sarthi is one of the leading IT solution providers across the
        globe. With more than a decade's experience, our technical team
        actualizes IT solutions to help you scale your business quickly. Aapka
        Sarthi is a trusted name for managed IT services, IT project delivery
        and cloud computing solutions for financial advisors. We provide
        complete training and support to budding financial advisors and
        comprehensive IT solutions to well established financial advisors. One
        of our main products is the Aapka Sarthi Auto Caller (ASAC). It enables
        financial advisors and managers to handle all the issues related to
        outbound calling. The product is straightforward, efficient and easy to
        use. ASAC would allow you to call multiple people and generate leads
        automatically. The agents can run the dialer by installing a mobile
        application without needing a dedicated system and an expensive dialer.
        The advisors can monitor the calling efficiency of the agents on the
        easy to view dashboard.
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
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular',
    margin: 10,
    paddingHorizontal: 25,
    color: 'black',
    marginBottom: 30,
  },
});

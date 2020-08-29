import * as React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

export interface StaticHeaderProps {}

export function StaticHeader(props: StaticHeaderProps) {
  return (
    <View style={styles.header}>
      <Image
        source={require('../assets/logo/beta-dark.png')}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    alignSelf: 'stretch',
    backgroundColor: 'white',
    marginBottom: 25,
    elevation: 1,
    color: 'black',
    alignItems: 'center',
    height: 60,
    justifyContent: 'center',
  },
  image: {
    height: 30,
  },
});

import React from 'react';
import {View, Text} from 'react-native';

export interface Intro1Props {
  width: number;
}

export function Intro1({width}: Intro1Props) {
  return (
    <View style={{borderWidth: 3, width}}>
      <Text>Intro1</Text>
    </View>
  );
}

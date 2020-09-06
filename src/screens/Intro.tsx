import React from 'react';
import {View, Text, Image, ImageBackground} from 'react-native';
import {PRIMARY_BLUE, BLUE, MODAL_BACKDROP} from '../utils/colors';

export interface Intro1Props {
  width: number;
  source: number;
}

export function Intro1({width, source}: Intro1Props) {
  return (
    <ImageBackground
      source={require('../assets/background/2.png')}
      style={{
        width,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        source={source}
        style={{
          width,
          flex: 1,
          // position: 'absolute',
        }}
        resizeMode="contain"
      />
    </ImageBackground>
  );
}

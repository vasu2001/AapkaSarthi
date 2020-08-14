import * as React from 'react';
import {
  View,
  Text,
  StyleProp,
  StyleSheet,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import {YELLOW} from '../utils/colors';

export interface CustomButtonProps {
  style?: StyleProp<ViewStyle>;
  text: string;
  onPress: () => void;
}

export function CustomButton({style, text, onPress}: CustomButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.conatiner, style ?? null]}
      onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  conatiner: {
    alignSelf: 'center',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: YELLOW,
    paddingHorizontal: 40,
    borderRadius: 25,
    elevation: 4,
  },
  text: {
    fontSize: 18,
    fontFamily: 'Raleway-Medium',
    textAlign: 'center',
  },
});

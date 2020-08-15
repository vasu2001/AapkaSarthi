import * as React from 'react';
import {
  View,
  Text,
  StyleProp,
  StyleSheet,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import {YELLOW, GRAY_LIGHT, GRAY, GRAY_BACKGROUND} from '../utils/colors';

export interface CustomButtonProps {
  style?: StyleProp<ViewStyle>;
  text: string;
  onPress: () => void;
  disabled?: boolean;
}

export function CustomButton({
  style,
  text,
  onPress,
  disabled = false,
}: CustomButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.conatiner, style ?? null]}
      disabled={disabled}
      onPress={onPress}>
      <Text style={[styles.text, {color: disabled ? GRAY : 'black'}]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  conatiner: {
    alignSelf: 'center',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    borderRadius: 25,
    elevation: 4,
    backgroundColor: YELLOW,
  },
  text: {
    fontSize: 18,
    fontFamily: 'Raleway-Medium',
    textAlign: 'center',
  },
});

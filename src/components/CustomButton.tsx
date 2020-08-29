import * as React from 'react';
import {
  Text,
  StyleProp,
  StyleSheet,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import {
  YELLOW,
  GRAY,
  DISABLED_YELLOW,
  BUTTON_BLUE,
  BLUE,
} from '../utils/colors';

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
      style={[
        styles.conatiner,
        {backgroundColor: disabled ? BLUE : BUTTON_BLUE},
        style ?? null,
      ]}
      disabled={disabled}
      onPress={onPress}>
      <Text style={[styles.text, {color: disabled ? GRAY : 'white'}]}>
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
    borderRadius: 6,
    elevation: 4,
  },
  text: {
    fontSize: 18,
    fontFamily: 'Montserrat-Medium',
    textAlign: 'center',
  },
});

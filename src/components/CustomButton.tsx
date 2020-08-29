import * as React from 'react';
import {
  Text,
  StyleProp,
  StyleSheet,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import {PRIMARY_BLUE} from '../utils/colors';

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
        {
          opacity: disabled ? 0.6 : 1,
        },
        style ?? null,
      ]}
      disabled={disabled}
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
    paddingHorizontal: 40,
    borderRadius: 6,
    elevation: 4,
    backgroundColor: PRIMARY_BLUE,
  },
  text: {
    fontSize: 18,
    fontFamily: 'Montserrat-Medium',
    textAlign: 'center',
    color: 'white',
  },
});

import React, {useState, useEffect} from 'react';
import {TextInput, TextStyle, StyleSheet} from 'react-native';
import {YELLOW, RED} from '../utils/colors';

interface CustomInputProps {
  value: string;
  onChangeText: (text: string) => void;
  style?: TextStyle;
  validation?: (text: string) => boolean;
  placeholder?: string;
  placeholderTextColor?: string;
  secureTextEntry?: boolean;
}

const CustomInput: React.SFC<CustomInputProps> = ({
  value,
  onChangeText,
  style,
  validation = (text) => true,
  placeholder = '',
  placeholderTextColor = '',
  secureTextEntry = false,
}: CustomInputProps) => {
  const [validated, setValidated] = useState(true);
  let timeout: NodeJS.Timeout | null = null;

  useEffect(() => {
    if (value.length > 0) {
      timeout && clearTimeout(timeout);
      timeout = setTimeout(() => {
        setValidated(validation(value));
      }, 500);
    }

    return () => {
      timeout && clearTimeout(timeout);
    };
  }, [value]);

  return (
    <TextInput
      style={[
        styles.input,
        {borderColor: validated ? YELLOW : RED},
        style ?? null,
      ]}
      spellCheck={false}
      autoCorrect={false}
      autoCompleteType="off"
      {...{
        value,
        onChangeText,
        placeholder,
        placeholderTextColor,
        secureTextEntry,
      }}
    />
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  input: {
    width: 200,
    borderBottomWidth: 1,
    fontFamily: 'Raleway-Medium',
    padding: 5,
    fontSize: 16,
    marginBottom: 10,
  },
});

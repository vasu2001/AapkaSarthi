import React, {useState, useEffect, useRef} from 'react';
import {TextInput, TextStyle, StyleSheet, StyleProp} from 'react-native';
import {PRIMARY_BLUE, RED, GRAY} from '../utils/colors';

interface CustomInputProps {
  value: string;
  onChangeText: (text: string) => void;
  style?: StyleProp<TextStyle>;
  validation?: (text: string) => boolean;
  placeholder?: string;
  placeholderTextColor?: string;
  secureTextEntry?: boolean;
  maxLength?: number | undefined;
  keyboardType?:
    | 'default'
    | 'email-address'
    | 'numeric'
    | 'phone-pad'
    | 'number-pad'
    | 'decimal-pad'
    | 'visible-password'
    | 'ascii-capable'
    | 'numbers-and-punctuation'
    | 'url'
    | 'name-phone-pad'
    | 'twitter'
    | 'web-search'
    | undefined;
  editable?: boolean;
  textRef?: (ref: TextInput) => void;
  onSubmitEditing?: () => void;
}

const CustomInput: React.FunctionComponent<CustomInputProps> = ({
  value,
  onChangeText,
  style,
  validation = () => true,
  placeholder = '',
  placeholderTextColor = GRAY,
  secureTextEntry = false,
  keyboardType,
  maxLength,
  editable = true,
  textRef,
  onSubmitEditing,
}: CustomInputProps) => {
  const [validated, setValidated] = useState(true);
  // let timeoutRef.current: NodeJS.Timeout | null = null;
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (value.length > 0) {
      timeoutRef.current && clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setValidated(validation(value));
      }, 500);
    }

    return () => {
      timeoutRef.current && clearTimeout(timeoutRef.current);
    };
  }, [value, validation]);

  return (
    <TextInput
      style={[
        styles.input,
        {borderColor: validated ? PRIMARY_BLUE : RED},
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
        keyboardType,
        maxLength,
        editable,
        ref: textRef,
        onSubmitEditing,
      }}
    />
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  input: {
    width: 200,
    borderBottomWidth: 1,
    fontFamily: 'Montserrat-Medium',
    padding: 5,
    fontSize: 16,
    marginBottom: 10,
    color: 'black',
  },
});

import React from 'react';
import {TextInput, StyleSheet, View, Text} from 'react-native';

interface CustomTextFieldProps {
  style?: TextStyle;
  onChangeText: (text: string) => void;
  value: string | undefined;
  placeholder?: string;
  error: string | undefined;
  keyboardType?: 'default' | 'numeric' | 'email-address';
  secureTextEntry?: boolean;
}

const CustomTextField = ({
  style,
  onChangeText,
  value,
  placeholder,
  error,
  keyboardType,
  secureTextEntry,
}: CustomTextFieldProps): Jsx.Element => {
  return (
    <View style={[styles.container, style]}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 12,
    borderRadius: 10,
    width: '100%',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
});

export default CustomTextField;

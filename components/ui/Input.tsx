import React from "react";
import { Controller } from "react-hook-form";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewStyle,
} from "react-native";

interface InputProps {
  name: string;
  control: any;
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
  secureTextEntry?: boolean;
  keyboardType?: any;
  rules?: object;
}

export default function Input({
  name,
  control,
  placeholder,
  style,
  secureTextEntry,
  keyboardType,
  rules,
}: InputProps) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules} // pass rules here
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <View style={style}>
          <TextInput
            style={[styles.input, error && styles.errorBorder]}
            placeholder={placeholder}
            placeholderTextColor="#9E9E9E"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
          />
          {error && <Text style={styles.errorText}>{error.message}</Text>}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    width: "100%",
    height: 52,
    borderWidth: 1,
    borderColor: "#D0D0D0",
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  errorBorder: {
    borderColor: "#ff4d4d",
  },
  errorText: {
    color: "#ff4d4d",
    marginTop: 4,
    fontSize: 12,
  },
});

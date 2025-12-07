import { useThemeColor } from "@/hooks/use-theme-color";
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
  const textColor = useThemeColor({}, "text");
  const inputBgColor = useThemeColor({}, "inputBackground");
  const borderColor = useThemeColor({}, "inputBorder");
  const placeholderColor = useThemeColor({}, "inputPlaceholder");

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <View style={style}>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: inputBgColor,
                borderColor: error ? "#ff4d4d" : borderColor,
                color: textColor,
              },
            ]}
            placeholder={placeholder}
            placeholderTextColor={placeholderColor}
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
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 13,
    fontFamily: "Inter_400Regular",
  },
  errorText: {
    color: "#ff4d4d",
    marginTop: 4,
    fontSize: 12,
  },
});

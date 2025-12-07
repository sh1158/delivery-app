import { useThemeColor } from "@/hooks/use-theme-color";
import { Eye, EyeOff } from "lucide-react-native";
import React, { useState } from "react";
import { Controller } from "react-hook-form";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function PasswordInput({ name, control, placeholder }: any) {
  const [show, setShow] = useState(false);

  const textColor = useThemeColor({}, "text");
  const inputBgColor = useThemeColor({}, "inputBackground");
  const borderColor = useThemeColor({}, "inputBorder");
  const placeholderColor = useThemeColor({}, "inputPlaceholder");
  const iconColor = useThemeColor({}, "icon");

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <View>
          <View
            style={[
              styles.inputWrapper,
              {
                backgroundColor: inputBgColor,
                borderColor: error ? "#ff4d4d" : borderColor,
              },
            ]}
          >
            <TextInput
              style={[styles.input, { color: textColor }]}
              placeholder={placeholder}
              placeholderTextColor={placeholderColor}
              secureTextEntry={!show}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />

            <TouchableOpacity onPress={() => setShow((s) => !s)}>
              {show ? (
                <EyeOff size={20} color={iconColor} />
              ) : (
                <Eye size={20} color={iconColor} />
              )}
            </TouchableOpacity>
          </View>

          {error && <Text style={styles.errorText}>{error.message}</Text>}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    height: 52,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    fontSize: 13,
    fontFamily: "Inter_400Regular",
  },
  errorText: {
    color: "#ff4d4d",
    marginTop: 4,
    fontSize: 12,
  },
});

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

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <View>
          <View style={[styles.inputWrapper, error && styles.errorBorder]}>
            <TextInput
              style={styles.input}
              placeholder={placeholder}
              placeholderTextColor="#9E9E9E"
              secureTextEntry={!show}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />

            <TouchableOpacity onPress={() => setShow((s) => !s)}>
              {show ? <EyeOff size={20} /> : <Eye size={20} />}
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
    borderColor: "#D0D0D0",
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    fontSize: 16,
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

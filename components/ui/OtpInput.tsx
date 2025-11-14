import React, { useRef, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

interface OtpInputProps {
  length?: number;
  onChange?: (code: string) => void;
}

export default function OtpInput({ length = 4, onChange }: OtpInputProps) {
  const [otp, setOtp] = useState(Array(length).fill(""));
  const inputsRef = useRef<TextInput[]>([]);

  const handleChange = (text: string, index: number) => {
    if (/^\d*$/.test(text)) {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);
      onChange && onChange(newOtp.join(""));

      if (text && index < length - 1) {
        inputsRef.current[index + 1].focus();
      }
      if (!text && index > 0) {
        inputsRef.current[index - 1].focus();
      }
    }
  };

  return (
    <View style={styles.container}>
      {otp.map((digit, index) => (
        <TextInput
          key={index}
          ref={(ref) => {
            if (ref) inputsRef.current[index] = ref;
          }}
          value={digit}
          onChangeText={(text) => handleChange(text, index)}
          keyboardType="numeric"
          maxLength={1}
          style={[
            styles.input,
            index !== length - 1 && { marginRight: 10 }, // spacing between inputs
          ]}
          textAlign="center"
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
  },
  input: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: "#D0D0D0",
    borderRadius: 12,
    fontSize: 24,
    backgroundColor: "#fff",
  },
});

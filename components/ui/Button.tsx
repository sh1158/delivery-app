import { Colors } from "@/constants/theme";
import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

interface ButtonProps {
  label?: string;
  onPress: () => void;
  variant?: "primary" | "secondary";
  loading?: boolean;
  disabled?: boolean;
  style?: object;
}

export const Button = ({
  label,
  onPress,
  variant = "primary",
  loading = false,
  disabled = false,
  style,
}: ButtonProps) => {
  const bgColor = variant === "primary" ? Colors.primary : "white";
  const textColor = variant === "primary" ? "white" : Colors.primary;
  const borderColor = variant === "primary" ? Colors.primary : "#D1D5DB";
  const borderwidth = variant === "primary" ? 0 : 1;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        {
          backgroundColor: disabled ? "#D1D5DB" : bgColor,
          opacity: loading ? 0.8 : 1,
          borderWidth: borderwidth,
          borderColor: borderColor,
        },
        style,
      ]}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text
          style={[
            styles.buttonText,
            {
              color: textColor,
            },
          ]}
        >
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    paddingVertical: 16,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
  },
});

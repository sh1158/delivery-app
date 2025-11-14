import { ThemedText } from "@/components/themed-text";
import { Colors } from "@/constants/theme";
import React from "react";
import { StyleSheet, TextProps } from "react-native";

interface AppTextProps extends TextProps {
  children: React.ReactNode;
}

export function TextH1({ children, style, ...props }: AppTextProps) {
  return (
    <ThemedText {...props} style={[styles.h1, style]}>
      {children}
    </ThemedText>
  );
}

export function TextH2({ children, style, ...props }: AppTextProps) {
  return (
    <ThemedText {...props} style={[styles.h2, style]}>
      {children}
    </ThemedText>
  );
}

export function TextH3({ children, style, ...props }: AppTextProps) {
  return (
    <ThemedText {...props} style={[styles.h3, style]}>
      {children}
    </ThemedText>
  );
}

export function TextH4({ children, style, ...props }: AppTextProps) {
  return (
    <ThemedText {...props} style={[styles.h4, style]}>
      {children}
    </ThemedText>
  );
}

export function TextP({ children, style, ...props }: AppTextProps) {
  return (
    <ThemedText {...props} style={[styles.p, style]}>
      {children}
    </ThemedText>
  );
}

export function TextSmall({ children, style, ...props }: AppTextProps) {
  return (
    <ThemedText {...props} style={[styles.small, style]}>
      {children}
    </ThemedText>
  );
}

export function TextMuted({ children, style, ...props }: AppTextProps) {
  return (
    <ThemedText {...props} style={[styles.muted, style]}>
      {children}
    </ThemedText>
  );
}

export function TextLink({
  children,
  style,
  underline = false,
  onPress,
  ...props
}: AppTextProps & { underline?: boolean }) {
  return (
    <ThemedText
      {...props}
      onPress={onPress}
      style={[styles.link, underline && styles.linkUnderline, style]}
    >
      {children}
    </ThemedText>
  );
}

const styles = StyleSheet.create({
  h1: {
    fontSize: 36,
    lineHeight: 42,
    fontWeight: "700",
    fontFamily: "NunitoSans_700Bold",
    color: "#000",
  },
  h2: {
    fontSize: 30,
    lineHeight: 36,
    fontWeight: "700",
    fontFamily: "NunitoSans_700Bold",
    color: "#000",
  },
  h3: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "600",
    fontFamily: "NunitoSans_600SemiBold",
    color: "#000",
  },
  h4: {
    fontSize: 20,
    lineHeight: 26,
    fontWeight: "600",
    fontFamily: "NunitoSans_600SemiBold",
    color: "#000",
  },
  p: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: "Inter_400Regular",
    color: "#000",
  },
  small: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: "Inter_400Regular",
    color: "#000",
  },
  muted: {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: "Inter_400Regular",
    color: "#6e6e6e",
  },
  link: {
    fontSize: 14,
    lineHeight: 20,
    color: Colors.primary,
    fontFamily: "Inter_600SemiBold",
  },

  linkUnderline: {
    textDecorationLine: "underline",
  },
});

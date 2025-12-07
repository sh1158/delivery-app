import { ThemedText } from "@/components/themed-text";
import { Colors } from "@/constants/theme";
import { useThemeColor } from "@/hooks/use-theme-color";
import React from "react";
import { StyleSheet, TextProps } from "react-native";

interface AppTextProps extends TextProps {
  children: React.ReactNode;
}

export function TextH1({ children, style, ...props }: AppTextProps) {
  const textColor = useThemeColor({}, "text");
  return (
    <ThemedText {...props} style={[styles.h1, { color: textColor }, style]}>
      {children}
    </ThemedText>
  );
}

export function TextH2({ children, style, ...props }: AppTextProps) {
  const textColor = useThemeColor({}, "text");
  return (
    <ThemedText {...props} style={[styles.h2, { color: textColor }, style]}>
      {children}
    </ThemedText>
  );
}

export function TextH3({ children, style, ...props }: AppTextProps) {
  const textColor = useThemeColor({}, "text");
  return (
    <ThemedText {...props} style={[styles.h3, { color: textColor }, style]}>
      {children}
    </ThemedText>
  );
}

export function TextH4({ children, style, ...props }: AppTextProps) {
  const textColor = useThemeColor({}, "text");
  return (
    <ThemedText {...props} style={[styles.h4, { color: textColor }, style]}>
      {children}
    </ThemedText>
  );
}

export function TextP({ children, style, ...props }: AppTextProps) {
  const textColor = useThemeColor({}, "text");
  return (
    <ThemedText {...props} style={[styles.p, { color: textColor }, style]}>
      {children}
    </ThemedText>
  );
}

export function TextSmall({ children, style, ...props }: AppTextProps) {
  const textColor = useThemeColor({}, "text");
  return (
    <ThemedText {...props} style={[styles.small, { color: textColor }, style]}>
      {children}
    </ThemedText>
  );
}

export function TextMuted({ children, style, ...props }: AppTextProps) {
  const mutedColor = useThemeColor({}, "icon");
  return (
    <ThemedText {...props} style={[styles.muted, { color: mutedColor }, style]}>
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
    fontFamily: "NunitoSans_800ExtraBold",
  },
  h2: {
    fontSize: 30,
    lineHeight: 36,
    fontFamily: "NunitoSans_700Bold",
  },
  h3: {
    fontSize: 24,
    lineHeight: 30,
    fontFamily: "NunitoSans_700Bold",
  },
  h4: {
    fontSize: 18,
    lineHeight: 26,
    fontFamily: "NunitoSans_700Bold",
  },
  p: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: "Inter_400Regular",
  },
  small: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: "Inter_400Regular",
  },
  muted: {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: "Inter_400Regular",
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

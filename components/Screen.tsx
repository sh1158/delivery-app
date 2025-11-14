import React, { ReactNode } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

interface ScreenProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  scroll?: boolean;
  backgroundColor?: string;
  footer?: ReactNode;
  noPaddingTop?: boolean;
}

export default function Screen({
  children,
  style,
  scroll = true,
  backgroundColor = "white",
  footer,
  noPaddingTop = false,
}: ScreenProps) {
  const insets = useSafeAreaInsets();

  const contentStyle = [
    styles.container,
    { paddingTop: noPaddingTop ? 0 : insets.top + 12 },
    style,
  ];

  if (scroll) {
    return (
      <SafeAreaView
        style={[styles.safeArea, { backgroundColor }]}
        edges={["top"]}
      >
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={[contentStyle, { paddingBottom: 100 }]}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {children}
          </ScrollView>
        </KeyboardAvoidingView>

        {footer && (
          <SafeAreaView edges={["bottom"]} style={styles.footerContainer}>
            <View style={styles.footer}>{footer}</View>
          </SafeAreaView>
        )}
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor }]}
      edges={["top"]}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={[contentStyle, { flex: 1 }]}>{children}</View>
      </KeyboardAvoidingView>

      {footer && (
        <SafeAreaView edges={["bottom"]} style={styles.footerContainer}>
          <View style={styles.footer}>{footer}</View>
        </SafeAreaView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  footerContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
  },
  footer: {
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
});

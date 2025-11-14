import { router } from "expo-router";
import { CircleArrowLeft } from "lucide-react-native";
import React, { ReactNode } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { ThemedView } from "../themed-view";

interface HeaderProps {
  title: string;
  leftIcon?: ReactNode; // optional custom left icon
  rightIcon?: ReactNode; // optional right icon
  onLeftPress?: () => void; // override left action
  style?: object;
}

export function Header({
  title,
  leftIcon,
  rightIcon,
  onLeftPress,
  style,
}: HeaderProps) {
  const handleLeftPress = () => {
    if (onLeftPress) {
      onLeftPress();
    } else {
      router.back();
    }
  };

  return (
    <ThemedView style={[styles.container, style]}>
      <Pressable onPress={handleLeftPress} style={styles.leftIcon}>
        {leftIcon ? leftIcon : <CircleArrowLeft size={35} />}
      </Pressable>

      <Text style={styles.title}>{title}</Text>

      <View style={styles.rightIcon}>{rightIcon || null}</View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: 56,
  },
  leftIcon: {
    justifyContent: "center",
    alignItems: "center",
  },
  rightIcon: {
    justifyContent: "center",
    alignItems: "center",
  },
  backText: {
    fontSize: 20,
    color: "#0a7ea4", // primary color
  },
  title: {
    flex: 1,
    fontSize: 18,
    marginLeft: 15,
    fontWeight: "600",
    textAlign: "left",
    color: "#000",
  },
});

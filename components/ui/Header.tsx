import { useThemeColor } from "@/hooks/use-theme-color";
import { router } from "expo-router";
import { CircleArrowLeft } from "lucide-react-native";
import React, { ReactNode } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { ThemedView } from "../themed-view";
import { TextH4 } from "./typography/Text";

interface HeaderProps {
  title: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onLeftPress?: () => void;
  style?: object;
}

export function Header({
  title,
  leftIcon,
  rightIcon,
  onLeftPress,
  style,
}: HeaderProps) {
  const textColor = useThemeColor({}, "text");
  const iconColor = useThemeColor({}, "icon");

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
        {leftIcon ? leftIcon : <CircleArrowLeft size={35} color={iconColor} />}
      </Pressable>

      <TextH4 style={[styles.title, { color: textColor }]}>{title}</TextH4>

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
  title: {
    flex: 1,
    fontSize: 18,
    marginLeft: 13,
    textAlign: "left",
  },
});

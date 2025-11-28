import { stringToHSL } from "@/utils/color";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface AvatarProps {
  name: string;
  size?: number;
}

export default function Avatar({ name, size = 80 }: AvatarProps) {
  const initial = name.charAt(0).toUpperCase();

  const color = stringToHSL(name);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: color,
          width: size,
          height: size,
          borderRadius: size / 2,
        },
      ]}
    >
      <Text style={[styles.text, { fontSize: size / 2 }]}>{initial}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontWeight: "700",
  },
});

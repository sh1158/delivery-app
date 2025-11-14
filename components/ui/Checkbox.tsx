import { Colors } from "@/constants/theme";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface CheckboxProps {
  value: boolean;
  onChange: (val: boolean) => void;
  label: string | React.ReactNode;
}

export function Checkbox({ value, onChange, label }: CheckboxProps) {
  return (
    <Pressable style={styles.container} onPress={() => onChange(!value)}>
      <View style={[styles.box, value && styles.checked]}>
        {value && <Text style={styles.tick}>✓</Text>}
      </View>
      <View style={{ marginLeft: 8 }}>
        {typeof label === "string" ? <Text>{label}</Text> : label}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  box: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  checked: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  tick: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
});

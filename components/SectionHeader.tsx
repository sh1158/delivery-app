import { ChevronRight } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props {
  title: string;
  onPressViewAll?: () => void;
  showViewAll?: boolean;
}

export default function SectionHeader({
  title,
  onPressViewAll,
  showViewAll = true,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {showViewAll && (
        <TouchableOpacity style={styles.viewAll} onPress={onPressViewAll}>
          <Text style={styles.viewAllText}>View All</Text>
          <ChevronRight size={16} color="#000" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    paddingLeft: 15,
    paddingRight: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  viewAll: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#888",
  },
});

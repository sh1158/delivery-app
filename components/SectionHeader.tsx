import { ChevronRight } from "lucide-react-native";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { TextH4, TextP } from "./ui/typography/Text";

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
      <TextH4>{title}</TextH4>
      {showViewAll && (
        <TouchableOpacity style={styles.viewAll} onPress={onPressViewAll}>
          <TextP style={styles.viewAllText}>View All</TextP>
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
  },
  viewAll: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: "500",
  },
});

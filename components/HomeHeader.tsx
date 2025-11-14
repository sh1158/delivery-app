import { Search } from "lucide-react-native";
import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { ThemedView } from "./themed-view";

interface HomeHeaderProps {
  onCartPress?: () => void;
  onProfilePress?: () => void;
  onNotificationPress?: () => void;
  onSearchChange?: (text: string) => void;
}

export default function HomeHeader({
  onCartPress,
  onProfilePress,
  onNotificationPress,
  onSearchChange,
}: HomeHeaderProps) {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.searchContainer}>
        <Search size={20} color="#666" style={{ marginRight: 8 }} />
        <TextInput
          placeholder="Search..."
          style={styles.searchInput}
          onChangeText={onSearchChange}
        />
      </View>

      {/* <View style={styles.iconContainer}>
        <Pressable onPress={onNotificationPress} style={styles.iconButton}>
          <Bell size={24} color="#0a7ea4" />
        </Pressable>
        <Pressable onPress={onCartPress} style={styles.iconButton}>
          <ShoppingCart size={24} color="#0a7ea4" />
        </Pressable>
        <Pressable onPress={onProfilePress} style={styles.iconButton}>
          <User size={24} color="#0a7ea4" />
        </Pressable>
      </View> */}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    // paddingVertical: 15,
    marginVertical: 10,
    borderRadius: 12,

    justifyContent: "space-between",
    // backgroundColor: Colors.primary,
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F1F1",
    borderRadius: 12,
    paddingHorizontal: 10,
    height: 40,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    marginLeft: 12,
  },
});

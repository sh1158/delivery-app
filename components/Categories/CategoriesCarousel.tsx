import React from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { TextH4 } from "../ui/typography/Text";

interface Category {
  id: string;
  name: string;
  icon: any;
  bgColor: string;
}

interface Props {
  categories: Category[];
  onSelectCategory?: (category: Category) => void;
}

export default function CategoriesCarousel({
  categories,
  onSelectCategory,
}: Props) {
  return (
    <FlatList
      data={categories}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.card}
          onPress={() => onSelectCategory?.(item)}
        >
          <View
            style={[styles.iconContainer, { backgroundColor: item.bgColor }]}
          >
            <item.icon size={32} color="#fff" />
          </View>
          <TextH4 style={{ fontSize: 14 }}>{item.name}</TextH4>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  card: {
    width: 80,
    marginRight: 10,
    borderRadius: 50,
    // backgroundColor: "#fff",
    alignItems: "center",
    paddingVertical: 10,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
});

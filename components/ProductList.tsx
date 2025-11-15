import ProductCard from "@/components/ProductCard";
import { Product } from "@/types/Product";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { ThemedView } from "./themed-view";

interface ProductListProps {
  items: Product[];
  onPressItem: (item: Product) => void;
}

export default function ProductList({ items, onPressItem }: ProductListProps) {
  return (
    <ThemedView>
      <View style={styles.container}>
        <FlatList
          data={items}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <View style={styles.cardWrapper}>
              <ProductCard item={item} onPress={onPressItem} />
            </View>
          )}
          columnWrapperStyle={styles.row}
        />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    // paddingHorizontal: 10,
  },
  row: {
    flex: 1,
  },
  cardWrapper: {
    width: "50%",
    padding: 5,
  },
});

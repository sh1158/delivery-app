import ProductList from "@/components/ProductList";
import Screen from "@/components/Screen";
import { Header } from "@/components/ui/Header";
import { useFavoriteStore } from "@/store/useFavoriteStore";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function FavouritesScreen() {
  const favorites = useFavoriteStore((state) => state.favorites);

  const handlePressItem = (item: any) => {
    console.log("Item pressed");
  };

  const isEmpty = favorites.length === 0;

  return (
    <Screen noPaddingTop scroll={!isEmpty}>
      <Header title="Favourites" />

      <View style={styles.contentWrapper}>
        {isEmpty ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No favourites yet ❤️</Text>
            <Text style={styles.emptySubText}>
              Add items by tapping the heart icon.
            </Text>
          </View>
        ) : (
          <ProductList items={favorites} onPressItem={handlePressItem} />
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  contentWrapper: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: "600",
  },
  emptySubText: {
    fontSize: 14,
    marginTop: 6,
    color: "#666",
  },
});

import FavouritesSkeleton from "@/components/Favorites/FavouritesSkeleton";
import ProductList from "@/components/ProductList";
import Screen from "@/components/Screen";
import { Header } from "@/components/ui/Header";
import { TextH4, TextP } from "@/components/ui/typography/Text";
import { useFavoriteStore } from "@/store/useFavoriteStore";
import { router, useFocusEffect } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function FavouritesScreen() {
  const favorites = useFavoriteStore((state) => state.favorites);
  const [loading, setLoading] = React.useState(true);

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      const timer = setTimeout(() => setLoading(false), 400);
      return () => clearTimeout(timer);
    }, [])
  );

  const handlePressItem = (item: any) => {
    router.push({
      pathname: "/product/[id]",
      params: { id: item.id.toString() },
    });
  };

  const isEmpty = favorites.length === 0;

  return (
    <Screen noPaddingTop scroll={!isEmpty && !loading}>
      <Header title="Favourites" />

      <View style={styles.contentWrapper}>
        {loading ? (
          <FavouritesSkeleton />
        ) : isEmpty ? (
          <View style={styles.emptyContainer}>
            <TextH4>No favourites yet ❤️</TextH4>
            <TextP style={styles.emptySubText}>
              Add items by tapping the heart icon.
            </TextP>
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

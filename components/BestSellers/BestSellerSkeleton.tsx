import React from "react";
import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import SkeletonShimmer from "../skeleton/SkeletonShimmer";

const { width } = Dimensions.get("window");

export default function BestSellerSkeleton() {
  const data = [1, 2, 3, 4, 5];

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={data}
      keyExtractor={(item) => item.toString()}
      contentContainerStyle={styles.container}
      renderItem={() => (
        <View style={styles.card}>
          <SkeletonShimmer width="100%" height={135} borderRadius={16} />
          <SkeletonShimmer
            width={50}
            height={20}
            borderRadius={12}
            style={styles.pricePlaceholder}
          />
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  card: {
    width: width * 0.3,
    height: 135,
    marginRight: 15,
    borderRadius: 16,
    overflow: "hidden",
    position: "relative",
  },
  pricePlaceholder: {
    position: "absolute",
    top: 8,
    right: 8,
  },
});

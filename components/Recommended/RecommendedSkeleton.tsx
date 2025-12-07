import React from "react";
import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import SkeletonShimmer from "../skeleton/SkeletonShimmer";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 30 - 10) / 2;

export default function RecommendedSkeleton() {
  return (
    <FlatList
      data={[1, 2, 3, 4]}
      numColumns={2}
      scrollEnabled={false}
      keyExtractor={(item) => item.toString()}
      renderItem={() => (
        <View style={styles.cardWrapper}>
          <SkeletonShimmer width={CARD_WIDTH} height={120} borderRadius={12} />
          <SkeletonShimmer
            width={CARD_WIDTH * 0.6}
            height={10}
            borderRadius={4}
            style={{ marginTop: 8 }}
          />
          <SkeletonShimmer
            width={CARD_WIDTH * 0.4}
            height={10}
            borderRadius={4}
            style={{ marginTop: 4 }}
          />
        </View>
      )}
      columnWrapperStyle={styles.row}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 10,
    gap: 10,
  },
  cardWrapper: {},
});

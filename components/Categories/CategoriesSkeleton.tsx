import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import SkeletonShimmer from "../skeleton/SkeletonShimmer";

export default function CategoriesSkeleton() {
  return (
    <FlatList
      data={[1, 2, 3, 4, 5]}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.toString()}
      contentContainerStyle={styles.container}
      renderItem={() => (
        <View style={styles.card}>
          <SkeletonShimmer
            width={60}
            height={60}
            borderRadius={30}
            style={{ marginBottom: 8 }}
          />
          <SkeletonShimmer width={50} height={10} borderRadius={4} />
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: { paddingVertical: 5, paddingHorizontal: 5 },
  card: { width: 80, marginRight: 10, alignItems: "center" },
});

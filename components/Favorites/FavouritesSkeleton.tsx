import SkeletonShimmer from "@/components/skeleton/SkeletonShimmer";
import { ThemedView } from "@/components/themed-view";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function FavouritesSkeleton() {
  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <ThemedView key={item} style={styles.card}>
            <SkeletonShimmer
              width="100%"
              height={150}
              borderRadius={8}
              style={styles.imageSkeleton}
            />
            <SkeletonShimmer
              width="80%"
              height={16}
              borderRadius={4}
              style={styles.textSkeleton}
            />
            <SkeletonShimmer width="50%" height={14} borderRadius={4} />
          </ThemedView>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    marginBottom: 15,
    borderRadius: 12,
  },
  imageSkeleton: {
    marginBottom: 8,
  },
  textSkeleton: {
    marginBottom: 6,
  },
});

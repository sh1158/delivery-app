import SkeletonShimmer from "@/components/skeleton/SkeletonShimmer";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function OrdersSkeleton() {
  return (
    <View style={styles.container}>
      {[1, 2, 3, 4].map((item) => (
        <View key={item} style={styles.orderCard}>
          <View style={styles.row}>
            <SkeletonShimmer width={80} height={14} borderRadius={4} />
            <SkeletonShimmer width={100} height={14} borderRadius={4} />
          </View>

          <View style={styles.row}>
            <SkeletonShimmer width={60} height={14} borderRadius={4} />
            <SkeletonShimmer width={90} height={14} borderRadius={4} />
          </View>

          <View style={styles.row}>
            <SkeletonShimmer width={50} height={14} borderRadius={4} />
            <SkeletonShimmer width={120} height={14} borderRadius={4} />
          </View>

          <SkeletonShimmer
            width="100%"
            height={45}
            borderRadius={8}
            style={styles.button}
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
  },
  orderCard: {
    marginVertical: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
    alignItems: "center",
  },
  button: {
    marginTop: 10,
  },
});

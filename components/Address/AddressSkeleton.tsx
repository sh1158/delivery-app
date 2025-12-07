import SkeletonShimmer from "@/components/skeleton/SkeletonShimmer";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function AddressSkeleton() {
  return (
    <View style={styles.container}>
      {[1, 2, 3].map((item) => (
        <View key={item} style={styles.addressCard}>
          <SkeletonShimmer
            width="60%"
            height={18}
            borderRadius={4}
            style={styles.nameShimmer}
          />

          <SkeletonShimmer
            width="90%"
            height={14}
            borderRadius={4}
            style={styles.textShimmer}
          />

          <SkeletonShimmer
            width="80%"
            height={14}
            borderRadius={4}
            style={styles.textShimmer}
          />

          <SkeletonShimmer
            width="70%"
            height={14}
            borderRadius={4}
            style={styles.textShimmer}
          />

          <SkeletonShimmer
            width="50%"
            height={14}
            borderRadius={4}
            style={styles.textShimmer}
          />

          <View style={styles.buttonRow}>
            <SkeletonShimmer width={80} height={35} borderRadius={6} />
            <SkeletonShimmer width={80} height={35} borderRadius={6} />
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 100,
  },
  title: {
    marginBottom: 12,
  },
  addressCard: {
    marginBottom: 12,
  },
  nameShimmer: {
    marginBottom: 10,
  },
  textShimmer: {
    marginBottom: 6,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 12,
  },
});

import React from "react";
import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import SkeletonShimmer from "../skeleton/SkeletonShimmer";

const { width } = Dimensions.get("window");
const CARD_HEIGHT = 80;

export default function CartSkeleton() {
  return (
    <FlatList
      data={[1, 2, 3, 4]}
      keyExtractor={(item) => item.toString()}
      renderItem={() => (
        <View style={styles.itemWrapper}>
          <SkeletonShimmer
            width={60}
            height={60}
            borderRadius={12}
            style={{ marginRight: 10 }}
          />
          <View style={{ flex: 1 }}>
            <SkeletonShimmer width={"80%"} height={12} borderRadius={4} />
            <SkeletonShimmer
              width={"60%"}
              height={12}
              borderRadius={4}
              style={{ marginTop: 6 }}
            />
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  itemWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
});

import React from "react";
import { Dimensions, FlatList, View } from "react-native";
import SkeletonShimmer from "../skeleton/SkeletonShimmer";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.9;
const SIDE_MARGIN = (width - CARD_WIDTH) / 6;

export default function OffersSkeleton() {
  const data = [1, 2, 3]; // match number of mock offers

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={data}
      keyExtractor={(item) => item.toString()}
      contentContainerStyle={{ paddingHorizontal: SIDE_MARGIN, marginTop: 10 }}
      renderItem={() => (
        <View style={{ width: CARD_WIDTH, alignItems: "center" }}>
          <SkeletonShimmer
            width={CARD_WIDTH * 0.97}
            height={180}
            borderRadius={16}
          />
        </View>
      )}
    />
  );
}

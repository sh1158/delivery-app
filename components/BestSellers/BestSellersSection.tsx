import SectionHeader from "@/components/SectionHeader";
import { useBestSellers } from "@/hooks/useBestSellers";
import React from "react";
import { View } from "react-native";
import BestSellerCarousel from "./BestSellerCarousel";
import BestSellerSkeleton from "./BestSellerSkeleton";

export default function BestSellersSection() {
  const { items: bestSellers, loading } = useBestSellers();

  return (
    <View>
      <SectionHeader
        title="Best Sellers"
        onPressViewAll={() => console.log("View All pressed")}
      />

      {loading ? (
        <BestSellerSkeleton />
      ) : (
        <BestSellerCarousel
          items={bestSellers}
          onSelectItem={(item) => console.log(item.name)}
        />
      )}
    </View>
  );
}

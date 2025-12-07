import SectionHeader from "@/components/SectionHeader";
import { useFavoriteStore } from "@/store/useFavoriteStore";
import { recommendedItems } from "@/utils/data";
import { router, useFocusEffect } from "expo-router";
import React, { useState } from "react";
import ProductList from "../ProductList";
import { ThemedView } from "../themed-view";
import RecommendedSkeleton from "./RecommendedSkeleton";

export const RecommendedSection = () => {
  useFavoriteStore((state) => state.favorites);

  const [loading, setLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      const timer = setTimeout(() => setLoading(false), 400);
      return () => clearTimeout(timer);
    }, [])
  );

  return (
    <ThemedView style={{ marginTop: 10 }}>
      <SectionHeader
        title="Recommended for you"
        onPressViewAll={() => console.log("View All pressed")}
      />

      {loading ? (
        <RecommendedSkeleton />
      ) : (
        <ProductList
          items={recommendedItems}
          onPressItem={(item) =>
            router.push({
              pathname: "/product/[id]",
              params: { id: item.id.toString() },
            })
          }
        />
      )}
    </ThemedView>
  );
};

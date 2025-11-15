import { useFavoriteStore } from "@/store/useFavoriteStore";
import { recommendedItems } from "@/utils/data";
import { router } from "expo-router";
import ProductList from "./ProductList";
import { ThemedView } from "./themed-view";

export const RecommendedSection = () => {
  useFavoriteStore((state) => state.favorites);

  return (
    <ThemedView style={{ marginHorizontal: 10 }}>
      <ProductList
        items={recommendedItems}
        onPressItem={(item) =>
          router.push({
            pathname: "/product/[id]",
            params: { id: item.id.toString() },
          })
        }
      />
    </ThemedView>
  );
};

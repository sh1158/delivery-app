import { fetchBestSellers } from "@/api/bestSellers";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";

interface BestSellerItem {
  id: number;
  name: string;
  price: number;
  rating: number;
  image: any;
}

export const useBestSellers = () => {
  const [items, setItems] = useState<BestSellerItem[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      fetchBestSellers().then((data: any) => {
        setItems(data);
        setLoading(false);
      });
    }, [])
  );

  return { items, loading };
};

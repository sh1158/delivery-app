import { fetchOffers } from "@/api/offers";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";

export interface Offer {
  id: string;
  image: any;
  price: number;
  rating: number;
}

export const useOffers = () => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      fetchOffers().then((data) => {
        setOffers(data);
        setLoading(false);
      });
    }, [])
  );

  return { offers, loading };
};

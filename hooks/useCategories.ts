import { fetchCategories } from "@/api/categories";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";

interface Category {
  id: string;
  name: string;
  icon: any;
  bgColor: string;
}

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      fetchCategories().then((data) => {
        setCategories(data);
        setLoading(false);
      });
    }, [])
  );

  return { categories, loading };
};

import { Product } from "@/types/Product";
import { create } from "zustand";

interface FavoriteStore {
  favorites: Product[];
  toggleFavorite: (item: Product) => void;
  isFavorite: (id: number | string) => boolean;
}

export const useFavoriteStore = create<FavoriteStore>((set, get) => ({
  favorites: [],

  toggleFavorite: (item) => {
    const { favorites } = get();
    const exists = favorites.some((f) => f.id === item.id);

    if (exists) {
      set({ favorites: favorites.filter((f) => f.id !== item.id) });
    } else {
      set({ favorites: [...favorites, item] });
    }
  },

  isFavorite: (id) => {
    return get().favorites.some((f) => f.id === id);
  },
}));

import { Product } from "@/types/Product";
import { create } from "zustand";

export interface CartItem extends Product {
  quantity: number;
}

interface CartStore {
  cart: CartItem[];

  addToCart: (item: Product) => void;
  removeFromCart: (id: number) => void;
  increaseQty: (id: number) => void;
  decreaseQty: (id: number) => void;

  isInCart: (id: number) => boolean;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>((set, get) => ({
  cart: [],

  addToCart: (item) => {
    const cart = get().cart;
    const exists = cart.find((c) => c.id === item.id);

    if (exists) {
      // increase quantity
      set({
        cart: cart.map((c) =>
          c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
        ),
      });
    } else {
      // add new item
      set({ cart: [...cart, { ...item, quantity: 1 }] });
    }
  },

  removeFromCart: (id) => {
    set({ cart: get().cart.filter((c) => c.id !== id) });
  },

  increaseQty: (id) => {
    set({
      cart: get().cart.map((c) =>
        c.id === id ? { ...c, quantity: c.quantity + 1 } : c
      ),
    });
  },

  decreaseQty: (id) => {
    set({
      cart: get()
        .cart.map((c) => (c.id === id ? { ...c, quantity: c.quantity - 1 } : c))
        .filter((c) => c.quantity > 0), // remove if quantity goes to 0
    });
  },

  isInCart: (id) => {
    return get().cart.some((c) => c.id === id);
  },

  clearCart: () => set({ cart: [] }),
}));

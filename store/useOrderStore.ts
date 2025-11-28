import { Order } from "@/types/Order";
import { nanoid } from "nanoid/non-secure";
import { create } from "zustand";

interface OrderStore {
  orders: Order[];
  addOrder: (order: Omit<Order, "id" | "createdAt" | "status">) => void;
  getOrderById: (id: string) => Order | undefined;
  updateOrderStatus: (id: string, status: Order["status"]) => void;
}

export const useOrderStore = create<OrderStore>((set, get) => ({
  orders: [],

  addOrder: (orderData) =>
    set((state) => {
      const newOrder: Order = {
        ...orderData,
        id: nanoid(),
        status: "pending",
        createdAt: new Date().toISOString(),
      };

      return {
        orders: [newOrder, ...state.orders], // newest first
      };
    }),

  getOrderById: (id) => {
    return get().orders.find((order) => order.id === id);
  },

  updateOrderStatus: (id, status) =>
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === id ? { ...order, status } : order
      ),
    })),
}));

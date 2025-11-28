import { CartItem } from "@/store/useCartStore";
import { Address } from "@/types/Address";

export interface Order {
  id: string;
  items: CartItem[];
  address: Address;
  total: number;
  status: "pending" | "confirmed" | "delivered" | "cancelled";
  createdAt: string;
}

import { Address } from "@/types/Address";
import { nanoid } from "nanoid/non-secure";
import { create } from "zustand";

interface AddressState {
  addresses: Address[];
  selectedAddressId: string | null;
  addAddress: (address: Omit<Address, "id">) => void;
  selectAddress: (id: string) => void;
}

export const useAddressStore = create<AddressState>((set) => ({
  addresses: [],
  selectedAddressId: null,

  addAddress: (address) =>
    set((state) => {
      const newAddress = { ...address, id: nanoid() };
      return {
        addresses: [...state.addresses, newAddress],
        selectedAddressId: newAddress.id,
      };
    }),

  selectAddress: (id) => set({ selectedAddressId: id }),
}));

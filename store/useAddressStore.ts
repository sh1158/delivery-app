import { Address } from "@/types/Address";
import { nanoid } from "nanoid";
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
    set((state) => ({
      addresses: [...state.addresses, { ...address, id: nanoid() }],
      selectedAddressId:
        state.selectedAddressId ?? state.addresses[0]?.id ?? null,
    })),

  selectAddress: (id) => set({ selectedAddressId: id }),
}));

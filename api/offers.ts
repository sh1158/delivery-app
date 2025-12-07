import { offers as mockOffers } from "@/utils/data";

export const fetchOffers = (): Promise<typeof mockOffers> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockOffers);
    }, 400);
  });
};

import { bestSellers } from "@/utils/data";

export const fetchBestSellers = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(bestSellers);
    }, 800);
  });
};

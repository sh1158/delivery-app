import { CategoriesData } from "@/types/Categories";
import { categories } from "@/utils/data";

export const fetchCategories = (): Promise<CategoriesData[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(categories);
    }, 1000);
  });
};

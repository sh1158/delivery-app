import CategoriesCarousel from "@/components/Categories/CategoriesCarousel";
import { useCategories } from "@/hooks/useCategories";
import React from "react";
import CategoriesSkeleton from "./CategoriesSkeleton";

export default function CategoriesSection() {
  const { categories, loading } = useCategories();

  if (loading) return <CategoriesSkeleton />;

  return <CategoriesCarousel categories={categories} />;
}

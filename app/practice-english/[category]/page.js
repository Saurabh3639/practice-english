import React from "react";
import PracticeCategoryPage from "../_components/PracticeCategoryPage";
import { categoriesData } from "../_components/PracticeEngData";

export default async function CategoryPage({ params }) {
  const { category } = await params;

  // Get the data based on the category
  const games = categoriesData[category?.toLowerCase()];
  const title = games
    ? `Practice ${category.charAt(0).toUpperCase() + category.slice(1)}`
    : "Category Not Found";

  return <PracticeCategoryPage title={title} games={games} />;
}

import React from "react";
import PracticeCategoryPage from "../_components/PracticeCategoryPage";

const categoriesData = {
  vocabulary: [
    { id: 1, name: "Daily Vocab" },
    { id: 2, name: "Synonym and Antonym" },
    { id: 3, name: "Choose the Correct Word" },
    { id: 4, name: "Scrambled Word" },
  ],
  grammar: [
    { id: 1, name: "Verb Tenses" },
    { id: 2, name: "Nouns" },
    { id: 3, name: "Pronouns" },
    { id: 4, name: "Preposition" },
    { id: 5, name: "Adjectives & Adverbs" },
    { id: 6, name: "Sentence Types" },
  ],
};

export default async function CategoryPage({ params }) {
  const { category } = await params;

  // Get the data based on the category
  const games = categoriesData[category?.toLowerCase()];
  const title = `Practice ${
    category.charAt(0).toUpperCase() + category.slice(1)
  }`;

  return <PracticeCategoryPage title={title} games={games} />;
}

import React from "react";
import PracticeCategoryPage from "../_components/PracticeCategoryPage";

const categoriesData = {
  // vocabulary: [
  //   { id: 1, name: "Daily Vocab", gamesData: [{ id: 1, name: "Daily Vocab" }] },
  //   {
  //     id: 2,
  //     name: "Synonym and Antonym",
  //     gamesData: [{ id: 1, name: "Synonym and Antonym" }],
  //   },
  //   {
  //     id: 3,
  //     name: "Choose the Correct Word",
  //     gamesData: [{ id: 1, name: "Choose the Correct Word" }],
  //   },
  //   {
  //     id: 4,
  //     name: "Scrambled Word",
  //     gamesData: [{ id: 1, name: "Scrambled Word" }],
  //   },
  // ],
  grammar: [
    {
      id: 1,
      name: "Verb Tenses",
      gamesData: [
        { id: 1, name: "Rearrage in correct verbe tense" },
        { id: 2, name: "Choose the correct verb tense" },
        { id: 3, name: "Choose the correct form of verb" },
      ],
    },
    {
      id: 2,
      name: "Nouns",
      gamesData: [
        { id: 1, name: "Choose the correct noun" },
        { id: 2, name: "Types of nouns" },
        { id: 3, name: "Noun Puzzle" },
      ],
    },
    {
      id: 3,
      name: "Pronouns",
      gamesData: [
        { id: 1, name: "Fill in the blank with Reflexive Pronoun" },
        { id: 2, name: "Fill in the blank with Pronoun Case" },
        { id: 3, name: "Fill in the blank with Relative Pronoun" },
      ],
    },
    {
      id: 4,
      name: "Preposition",
      gamesData: [{ id: 1, name: "Choose the correct Preposition" }],
    },
    {
      id: 5,
      name: "Adjectives & Adverbs",
      gamesData: [
        { id: 1, name: "Choose the correct Adjective" },
        { id: 2, name: "Choose the correct Adverb" },
      ],
    },
    {
      id: 6,
      name: "Sentence Types",
      gamesData: [{ id: 1, name: "Determine the type of each sentence" }],
    },
  ],
  vocabulary: [
    { id: 1, name: "Daily Vocab" },
    { id: 2, name: "Synonym and Antonym" },
    { id: 3, name: "Choose the Correct Word" },
    { id: 4, name: "Scrambled Word" },
  ],
  // grammar: [
  //   { id: 1, name: "Verb Tenses" },
  //   { id: 2, name: "Nouns" },
  //   { id: 3, name: "Pronouns" },
  //   { id: 4, name: "Preposition" },
  //   { id: 5, name: "Adjectives & Adverbs" },
  //   { id: 6, name: "Sentence Types" },
  // ],
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

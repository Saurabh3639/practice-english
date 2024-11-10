"use client";

import React, { useState } from "react";
import QuizGame, { InfoSection } from "../../QuizGame";

const nounsInfo = {
  title: "Types of Nouns",
  types: {
    "Common Nouns": [
      "These are the general, everyday names that we use for people, places, or things. They don't refer to any specific entity. Common nouns are typically not capitalized unless they begin a sentence.",
      "For example: dog, city, book",
    ],
    "Proper Nouns": [
      "These are specific names for particular people, places, or things. They are always capitalized.",
      "For example: George, London, Christmas.",
    ],
    "Concrete Nouns": [
      "These refer to physical entities that can be perceived by at least one of the senses. They are things that you can see, hear, smell, taste, or touch.",
      "For example: cat, music, perfume.",
    ],
    "Abstract Nouns": [
      "These refer to ideas, qualities, and conditions - things that cannot be seen or touched and things which have no physical reality.",
      "For example: happiness, time, justice.",
    ],
    "Countable Nouns": [
      "These are things that we can count. They have a singular and a plural form.",
      "For example: one book, two books.",
    ],
    "Uncountable Nouns": [
      "These are things that we cannot count because they are seen as wholes or mass. They do not usually have a plural form.",
      "For example: milk, sugar, water",
    ],
    "Compound Nouns": [
      "These are nouns that are made up of two or more words. They can be one word, two words, or hyphenated.",
      "For example: bedroom, toothpaste, mother-in-law.",
    ],
    "Possessive Nouns": [
      "These are used to show ownership or association. Possessive nouns are formed by adding an apostrophe and an 's' to the end of a noun, or just an apostrophe to plural nouns already ending in 's'.",
      "For example: John's book, the dogs' bowls.",
    ],
  },
};

export default function TypesOfNouns({ category, gameName, totalQue }) {
  const [isStarted, setIsStarted] = useState(false);
  const [loading, setLoading] = useState(false);

  const onStartGame = async () => {
    setIsStarted(true);
    setLoading(true);
  };

  return (
    <>
      {isStarted ? (
        <QuizGame
          category={category}
          gameName={gameName}
          totalQue={totalQue}
          dataStructurePrompt={`{
        "question": "The sentence containing a noun which will be in bold. For identifying its type",
        "options": ["Option A", "Option B", "Option C", "Option D"],
        "correctAnswer": "The correct option from the options array (e.g., 'Option B')"
      }`}
        />
      ) : (
        <InfoSection loading={loading} info={nounsInfo} onClick={onStartGame} />
      )}
    </>
  );
}

"use client";

import React, { useState } from "react";
import QuizGame, { InfoSection } from "../../QuizGame";

const pronounInfo = {
  title: "Pronoun Case",
  content: `Pronoun case refers to the form a pronoun takes depending on its function in a sentence. English pronouns have three cases: subjective, objective, and possessive.
`,
  types: {
    "Subjective case":
      "Used when the pronoun is the subject of the verb. Examples: I, you, he, she, it, we, they.",
    "Objective case":
      "Used when the pronoun is the object of the verb or preposition. Examples: me, you, him, her, it, us, them.",
    "Possessive case":
      "Used to show ownership. Examples: my, mine, your, yours, his, her, hers, its, our, ours, their, theirs.",
  },
};

export default function PronounCase({ category, gameName, totalQue }) {
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
        "question": "The sentence with a blank space indicating a missing pronoun case.",
        "options": ["Option A", "Option B", "Option C", "Option D"],
        "correctAnswer": "The correct option from the options array (e.g., 'Option B')"
      }`}
        />
      ) : (
        <InfoSection
          loading={loading}
          info={pronounInfo}
          onClick={onStartGame}
        />
      )}
    </>
  );
}

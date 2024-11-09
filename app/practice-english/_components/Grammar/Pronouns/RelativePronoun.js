"use client";

import React, { useState } from "react";
import QuizGame, { InfoSection } from "../../QuizGame";

const pronounInfo = {
  title: "Relative pronouns",
  content: `Relative pronouns are used to link one phrase or clause to another phrase or clause. They provide more information about the antecedent. The relative pronouns are who, whom, whose, which, and that.
`,
};

export default function RelativePronoun({ category, gameName, totalQue }) {
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
        "question": "The sentence with a blank space indicating a missing relative pronoun.",
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

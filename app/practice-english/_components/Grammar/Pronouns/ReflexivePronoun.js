"use client";

import React, { useState } from "react";
import QuizGame, { InfoSection } from "../../QuizGame";

const pronounInfo = {
  title: "Reflexive pronouns",
  content: `Reflexive pronouns are used when the subject and the object of a sentence are the same person or thing. Reflexive pronouns end in "-self" (singular) or "-selves" (plural). Here's the full list: myself, yourself, himself, herself, itself, ourselves, yourselves, themselves.`,
};

export default function ReflexivePronoun({ category, gameName, totalQue }) {
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
        "question": "The sentence with a blank space indicating a missing reflexive pronoun.",
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

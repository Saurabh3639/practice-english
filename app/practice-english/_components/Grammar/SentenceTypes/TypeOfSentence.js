"use client";

import React, { useState } from "react";
import QuizGame, { InfoSection } from "../../QuizGame";

const sentencesInfo = {
  title: "Types of sentences",
  types: {
    "Declarative Sentence":
      "These sentences make a statement or express an opinion. They provide information and end with a period.",
    "Interrogative Sentence":
      "These sentences ask a question and end with a question mark.",
    "Imperative Sentence":
      "These sentences give an order, a request, or a piece of advice. They can end with a period or an exclamation mark",
    "Exclamatory Sentence":
      "These sentences express strong emotion or surprise and end with an exclamation mark.",
  },
};

export default function TypeOfSentence({ category, gameName, totalQue }) {
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
        "question": "The sentence to determine its type",
        "options": ["Option A", "Option B", "Option C", "Option D"],
        "correctAnswer": "The correct option from the options array (e.g., 'Option B')"
      }`}
        />
      ) : (
        <InfoSection
          loading={loading}
          info={sentencesInfo}
          onClick={onStartGame}
        />
      )}
    </>
  );
}

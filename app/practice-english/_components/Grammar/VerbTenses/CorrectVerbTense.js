import React from "react";
import QuizGame from "../../QuizGame";

export default function CorrectVerbTense({ category, gameName, totalQue }) {
  return (
    <QuizGame
      category={category}
      gameName={gameName}
      totalQue={totalQue}
      dataStructurePrompt={`{
        "question": "The sentence with a blank space indicating a missing verb tense.",
        "options": ["Option A", "Option B"],
        "correctAnswer": "The correct option from the options array (e.g., 'Option B')"
      }`}
    />
  );
}

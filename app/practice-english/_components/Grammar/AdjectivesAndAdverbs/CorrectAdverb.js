import React from "react";
import QuizGame from "../../QuizGame";

export default function CorrectAdverb({ category, gameName, totalQue }) {
  return (
    <QuizGame
      category={category}
      gameName={gameName}
      totalQue={totalQue}
      dataStructurePrompt={`{
        "question": "The sentence with a blank space indicating a missing adverb.",
        "options": ["Option A", "Option B", "Option C", "Option D"],
        "correctAnswer": "The correct option from the options array (e.g., 'Option B')"
      }`}
    />
  );
}

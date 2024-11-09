import React from "react";
import QuizGame from "../QuizGame";

export default function SynonymAntonym({ category, gameName, totalQue }) {
  return (
    <QuizGame
      category={category}
      gameName={gameName}
      totalQue={totalQue}
      dataStructurePrompt={`{
        "question": "Select the Synonym or Antonym of a particular word (e.g., 'Select the synonym for 'Word')",
        "options": ["Option A", "Option B", "Option C", "Option D"],
        "correctAnswer": "The correct option from the options array (e.g., 'Option B')"
      }`}
    />
  );
}

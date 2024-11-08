import React from "react";
import QuizGame from "../QuizGame";

export default function CorrectWord() {
  return (
    <QuizGame
      category="vocabulary"
      gameName="Choose the Correct Word"
      totalQue="10"
      dataStructurePrompt={`{
        "question": "The sentence with a blank space indicating a missing word.",
        "options": ["Option A", "Option B", "Option C", "Option D"],
        "correctAnswer": "The correct option from the options array (e.g., 'Option B')"
      }`}
    />
  );
}

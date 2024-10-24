"use client";

import { chatSession } from "@/utility/GeminiAIModal";
import React, { useState } from "react";

const gameName = "Choose the Correct Word";

export default function CorrectWord() {
  const [data, setData] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [score, setScore] = useState(0);

  console.log("data:", JSON.stringify(data));
  console.log("score:", score);

  const onGenerate = async () => {
    const InputPrompt = `Please generate 10 multiple-choice questions for a ${gameName} game. Each question should be represented as a JSON object with the following structure:
    {
      "question": "The sentence with a blank space indicating a missing word.",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": "The correct option from the options array (e.g., 'Option B')"
    }
    Provide the output as a JSON array containing these 10 question objects."
    `;

    const result = await chatSession.sendMessage(InputPrompt);
    const textResp = await result.response
      .text()
      .replace("```json", "")
      .replace("```", "");
    console.log("textResp:", textResp);

    setData(JSON.parse(textResp));

    setScore(0); // Reset score when new questions are generated
    setSelectedOptions({}); // Reset selected options
  };

  // Function to handle option click
  const handleOptionClick = (questionIndex, selectedOption) => {
    const correctAnswer = data[questionIndex].correctAnswer;

    // Check if the question has already been answered
    if (!selectedOptions[questionIndex]) {
      // If the selected option is correct, increment the score
      if (selectedOption === correctAnswer) {
        setScore((prevScore) => prevScore + 1);
      }

      // Update the selected options with the user's selected option
      setSelectedOptions((prev) => ({
        ...prev,
        [questionIndex]: {
          selectedOption,
          isCorrect: selectedOption === correctAnswer,
        },
      }));
    }
  };

  return (
    <>
      <div className="flex gap-4 items-center mb-4">
        <h4 className="text-lg font-semibold">
          {gameName}{" "}
          <span>
            [Score: {score} / {data?.length || 10}]
          </span>
        </h4>
        <button
          onClick={onGenerate}
          className="border border-red-500 rounded-lg text-red-500 px-4 py-2 cursor-pointer"
        >
          Generate
        </button>
      </div>

      <div>
        {data?.length > 0 &&
          data?.map((cval, questionIndex) => {
            return (
              <div key={questionIndex} className="mb-4">
                <p>
                  {questionIndex + 1}] {cval.question}
                </p>

                <ol>
                  {cval.options.map((option, optionIndex) => {
                    const isSelected =
                      selectedOptions[questionIndex]?.selectedOption === option;
                    const isCorrect = selectedOptions[questionIndex]?.isCorrect;

                    // Determine the class based on whether the user selected the option and whether it's correct
                    const selectedClass = isSelected
                      ? isCorrect
                        ? "text-green-500"
                        : "text-red-500"
                      : "";

                    return (
                      <li key={optionIndex}>
                        <span
                          className={`cursor-pointer ${selectedClass}`}
                          onClick={() =>
                            handleOptionClick(questionIndex, option)
                          }
                        >
                          {optionIndex + 1}. {option}
                        </span>
                      </li>
                    );
                  })}
                </ol>

                {/* <p className="text-green-500">{cval.correctAnswer}</p> */}
              </div>
            );
          })}
      </div>
    </>
  );
}

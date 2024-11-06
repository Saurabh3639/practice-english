"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const data = [
  {
    question:
      "The sun was shining brightly, and the birds were singing a cheerful _____.",
    options: ["tune", "song", "melody", "rhythm"],
    correctAnswer: "melody",
  },
  {
    question: "The detective carefully examined the _____, looking for clues.",
    options: ["evidence", "scene", "room", "location"],
    correctAnswer: "evidence",
  },
  {
    question: "The children were excited about the upcoming _____.",
    options: ["celebration", "party", "festival", "event"],
    correctAnswer: "party",
  },
  {
    question: "The old man had a ____ of stories to tell.",
    options: ["wealth", "collection", "variety", "treasure"],
    correctAnswer: "wealth",
  },
  {
    question: "The storm raged with ____ fury.",
    options: ["unbelievable", "intense", "powerful", "ferocious"],
    correctAnswer: "ferocious",
  },
  {
    question: "The artist used a ____ of colors in her painting.",
    options: ["palette", "range", "spectrum", "selection"],
    correctAnswer: "palette",
  },
  {
    question: "The doctor gave the patient a ____ examination.",
    options: ["thorough", "complete", "detailed", "comprehensive"],
    correctAnswer: "thorough",
  },
  {
    question: "The students listened ____ to the professor's lecture.",
    options: ["attentively", "carefully", "intently", "eagerly"],
    correctAnswer: "attentively",
  },
  {
    question: "The company's new product was a ____ success.",
    options: ["huge", "grand", "massive", "tremendous"],
    correctAnswer: "tremendous",
  },
  {
    question: "The athlete's ____ was amazing.",
    options: ["performance", "skill", "ability", "talent"],
    correctAnswer: "performance",
  },
];

export default function CorrectWord() {
  const router = useRouter();

  const [index, setIndex] = useState(0); // Track the current question index
  const [selectedOption, setSelectedOption] = useState(null); // Track selected option
  const [userResp, setUserResp] = useState([]); // Store responses

  const currentQuestion = data[index]; // Current question based on index

  const handleOptionClick = (option) => {
    setSelectedOption(option); // Set selected option
  };

  const handleSubmit = () => {
    if (selectedOption) {
      // Update userResp with the current question and answer
      setUserResp((prev) => [
        ...prev,
        {
          question: currentQuestion.question,
          options: currentQuestion.options,
          correctAnswer: currentQuestion.correctAnswer,
          userAnswer: selectedOption,
        },
      ]);

      // Move to the next question and reset selectedOption
      setIndex((prevIndex) => prevIndex + 1);
      setSelectedOption(null);
    }
  };

  useEffect(() => {
    if (index >= data?.length) {
      // router.push("/result"); // Navigate to the results page
      console.log("userResp :", userResp);
      // setIndex(0);
    }
  }, [index, userResp]); // Run when `index` changes

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh]">
      {index < data?.length ? (
        <div className="text-center">
          <div className="bg-[#FFFDFA] min-w-[60vw] py-4 border shadow-md rounded-lg">
            <h3 className="font-normal text-lg">
              <span className="text-2xl">
                Q {index + 1}
                <span className="text-sm">/{data?.length}</span>{" "}
              </span>
              {currentQuestion?.question}
            </h3>
          </div>
          <div className="my-8 grid grid-cols-2 gap-4">
            {currentQuestion?.options.map((option, i) => {
              return (
                <div
                  key={i}
                  onClick={() => handleOptionClick(option)}
                  className={`border-2 rounded-lg p-2 text-center text-lg font-normal ${
                    selectedOption === option
                      ? "text-primary border-primary"
                      : "text-[#4C4C4C] border-[#FFD9DD]"
                  }`}
                >
                  {option}
                </div>
              );
            })}
          </div>
          <button
            onClick={handleSubmit}
            className="rounded-lg py-2 px-10 text-center bg-primary text-white"
          >
            Submit
          </button>
        </div>
      ) : null}
    </div>
  );
}

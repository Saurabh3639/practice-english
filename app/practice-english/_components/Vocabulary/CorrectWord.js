"use client";

import { chatSession } from "@/utility/GeminiAIModal";
import React, { useEffect, useState } from "react";
import { IoArrowBack } from "react-icons/io5";

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
  const [index, setIndex] = useState(0); // Track the current question index
  const [selectedOption, setSelectedOption] = useState(null); // Track selected option
  const [userResp, setUserResp] = useState([]); // Store responses
  const [result, setResult] = useState({
    score: 0,
    feedback: null,
  });
  const [viewAnswers, setViewAnswers] = useState(false);

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

  const onGenerateResult = async (score) => {
    const overallPrompt = `In the Choose the correct word game, user's Total Score is ${score} out of 10. Based on this information. Provide overall feedback in short. Format the response as:
    { "feedback": "<feedback>",}`;

    try {
      const result = await chatSession.sendMessage(overallPrompt);
      const responseData = await result.response.text();

      // Use regex to extract the data between the first `{` and the last `}`
      const jsonMatch = responseData.match(/\{[\s\S]*\}/);

      if (jsonMatch && jsonMatch[0]) {
        const jsonData = jsonMatch[0];

        // Now you can parse and use this JSON data
        const aiFeedback = JSON.parse(jsonData);
        // console.log("Parsed AI Feedback :", aiFeedback);

        setResult((prevResult) => ({
          ...prevResult,
          feedback: aiFeedback?.feedback,
        }));

        // Call your function to submit the report
        // await submitReport(aiFeedback);
      } else {
        console.log("No valid JSON data found.");
      }
    } catch (error) {
      console.error("Error while generating:", error);
    }
  };

  useEffect(() => {
    if (index >= data?.length) {
      // Calculate score based on user responses
      const totalScore = userResp.reduce((acc, curr) => {
        return curr.correctAnswer === curr.userAnswer ? acc + 1 : acc;
      }, 0);

      setResult((prevResult) => ({
        ...prevResult,
        score: totalScore,
      }));

      onGenerateResult(totalScore);
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
      ) : (
        <>
          {result ? (
            <div className="bg-[#FFFDFA] border shadow-lg h-[480px] w-[500px] rounded-lg py-4 px-8 flex flex-col items-center justify-evenly overflow-clip scrollbar-hide">
              <div className="w-fit text-3xl font-normal text-center">
                Score : {result?.score || 0}/10
              </div>
              <p className="text-lg font-normal text-center">
                {result?.feedback || "Loading..."}
              </p>
              <button
                onClick={() => setViewAnswers(true)}
                className="px-4 py-2 bg-primary text-white text-base font-medium rounded-lg"
              >
                View your answers
              </button>
            </div>
          ) : (
            "Loading..."
          )}

          {/* View Answer pop up */}
          {viewAnswers && (
            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-700 bg-opacity-50 z-50">
              <div className="bg-white p-6 rounded-md h-[90vh] min-w-[50vw] overflow-scroll scrollbar-hide">
                <div className="flex items-center gap-4 mb-4 text-2xl">
                  <IoArrowBack
                    className="cursor-pointer"
                    onClick={() => setViewAnswers(false)}
                  />
                  <span className="text-primary">Your answers</span>
                </div>
                <div className="px-6 space-y-8">
                  {userResp?.length > 0 &&
                    userResp?.map((cval, index) => (
                      <div key={index} className="space-y-4">
                        <p className="text-lg text-[#414141] font-medium">
                          {index + 1}. {cval.question}
                        </p>
                        <div>
                          <h4 className="text-lg text-primary font-medium py-1">
                            Options
                          </h4>
                          <p className="text-base text-[#414141] font-medium">
                            {cval.options.join(", ")}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-lg text-primary font-medium py-1">
                            Correct answer
                          </h4>
                          <p className="text-base text-[#414141] font-medium">
                            {cval.correctAnswer}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-lg text-primary font-medium py-1">
                            Your answer
                          </h4>
                          <p className="text-base text-[#414141] font-medium">
                            {cval.userAnswer || "Answer not provided."}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

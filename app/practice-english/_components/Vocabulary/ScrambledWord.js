"use client";

import { chatSession } from "@/utility/GeminiAIModal";
import React, { useEffect, useState } from "react";
import { GoQuestion } from "react-icons/go";
import {
  InstructionsSection,
  ResultView,
  TextInputQuestion,
} from "../QuizGame";

const instructions = [
  "Read the scrambled word",
  "Rearrange the letters to form a word",
  "Write your answer in the provided space",
  <>
    View the hints by clicking on{" "}
    <GoQuestion className="mx-1 text-primary text-xl inline" />{" "}
  </>,
];

export default function ScrambledWord({ category, gameName, totalQue }) {
  const [loading, setLoading] = useState(false);
  const [isDataAdded, setIsDataAdded] = useState(false);
  const [index, setIndex] = useState(0); // Track the current question index
  const [data, setData] = useState(null);
  const [userResp, setUserResp] = useState([]); // Store user responses
  const [userInput, setUserInput] = useState(""); // Track user input
  const [result, setResult] = useState({ score: 0, feedback: null }); // Store result
  const [viewAnswers, setViewAnswers] = useState(false);
  const [viewHint, setViewHint] = useState(false);

  const currentQuestion = data && data[index]; // Current question based on index

  // Function to generate questions data for game
  const onGenerate = async () => {
    setLoading(true);

    const inputPrompt = `Please generate ${totalQue} questions for a ${gameName} game. Each question should follow this structure:
    {
        "word": "Scrambled Word which is getting used in Work, Study, IT sector and Buisness Vocabulary. Also make sure charcters should be correct. (e.g., itigd)",
        "hint": "Hint for the scrambled word",
        "correctAnswer": "The correct word (e.g, digit)"
      }
    Provide the output as a JSON array containing these ${totalQue} question objects.`;

    const result = await chatSession.sendMessage(inputPrompt);
    const textResp = await result.response
      .text()
      .replace("```json", "")
      .replace("```", "");
    // console.log("textResp:", JSON.parse(textResp));

    setData(JSON.parse(textResp));
    setLoading(false);
    setIsDataAdded(true);
  };

  // Function to update user response after submit
  const handleSubmit = () => {
    if (userInput) {
      // Update userResp with the current question and answer
      setUserResp((prev) => [
        ...prev,
        {
          word: currentQuestion?.word,
          hint: currentQuestion?.hint,
          correctAnswer: currentQuestion?.correctAnswer,
          userAnswer: userInput,
        },
      ]);

      // Move to the next question and reset userInput
      setIndex((prevIndex) => prevIndex + 1);
      setUserInput("");
    }
  };

  // Function to generate feeback as per user response
  const onGenerateResult = async (score) => {
    const overallPrompt = `In the ${gameName} game, user's Total Score is ${score} out of ${totalQue}. Based on this information, provide overall feedback in short as:
    { "feedback": "<feedback>" }`;

    try {
      const result = await chatSession.sendMessage(overallPrompt);
      const responseData = await result.response.text();

      // Use regex to extract the data between the first `{` and the last `}`
      const jsonMatch = responseData.match(/\{[\s\S]*\}/);

      if (jsonMatch && jsonMatch[0]) {
        // Parse and use this JSON data
        const jsonData = JSON.parse(jsonMatch[0]);
        // console.log("Parsed json data :", jsonData);

        setResult((prevResult) => ({
          ...prevResult,
          feedback: jsonData?.feedback,
        }));

        const dataToSubmit = {
          gameName,
          userResp,
          score,
          feedback: jsonData?.feedback,
          category,
        };
        console.log("dataToSubmit:", dataToSubmit);

        // Call your function to submit the report
        // await submitReport(dataToSubmit);
      } else {
        console.error("No valid JSON data found.");
      }
    } catch (error) {
      console.error("Error while generating feedback:", error);
    }
  };

  useEffect(() => {
    if (index >= data?.length) {
      // Calculate score based on user responses
      const totalScore = userResp.reduce(
        (acc, curr) => (curr.correctAnswer === curr.userAnswer ? acc + 1 : acc),
        0
      );
      setResult((prevResult) => ({ ...prevResult, score: totalScore }));
      onGenerateResult(totalScore);
    }
  }, [index, data?.length, userResp]);

  return (
    <>
      {isDataAdded ? (
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          {index < data?.length ? (
            <>
              <TextInputQuestion
                data={data}
                currentQuestion={currentQuestion}
                index={index}
                userInput={userInput}
                setUserInput={setUserInput}
                handleSubmit={handleSubmit}
                viewHint={viewHint}
                setViewHint={setViewHint}
              />
            </>
          ) : (
            <ResultView
              result={result}
              userResp={userResp}
              viewAnswers={viewAnswers}
              setViewAnswers={setViewAnswers}
            />
          )}
        </div>
      ) : (
        <InstructionsSection
          loading={loading}
          instructions={instructions}
          onClick={onGenerate}
        />
      )}
    </>
  );
}

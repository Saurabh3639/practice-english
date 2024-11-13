"use client";

import { chatSession } from "@/utility/GeminiAIModal";
import React, { useEffect, useRef, useState } from "react";
import { RearrangeSentence, ResultView } from "../../QuizGame";
import Loader from "@/utility/Loader";

export default function RearrangeVerbTense({ category, gameName, totalQue }) {
  const [data, setData] = useState(null);
  const [index, setIndex] = useState(0); // Track the current question index
  const [userResp, setUserResp] = useState([]); // Store user responses
  const [userInput, setUserInput] = useState(""); // Track user input
  const [result, setResult] = useState({ score: 0, feedback: null }); // Store result
  const [viewAnswers, setViewAnswers] = useState(false);

  // console.log("userResp :", userResp);

  const currentQuestion = data && data[index]; // Current question based on index

  // Function to generate questions data for game
  const onGenerate = async () => {
    const inputPrompt = `Please generate ${totalQue} multiple-choice questions for a ${gameName} game. Each question should follow this structure:
    {
        "question": "Rearrange the words to form a sentence in the correct verb tense",
        "words": ["Array of splitted words from sentence"],
        "correctAnswer": "The correct sentence by combining all words"
      }
    Provide the output as a JSON array containing these ${totalQue} question objects.`;

    const result = await chatSession.sendMessage(inputPrompt);
    const textResp = await result.response
      .text()
      .replace("```json", "")
      .replace("```", "");
    const parsedData = JSON.parse(textResp);
    // console.log("parsedData:", JSON.stringify(parsedData));

    setData(parsedData);
  };

  // Function to update user response after submit
  const handleSubmit = () => {
    if (userInput) {
      // Update userResp with the current question and answer
      setUserResp((prev) => [
        ...prev,
        {
          question: currentQuestion?.question,
          words: currentQuestion?.words,
          correctAnswer: currentQuestion?.correctAnswer,
          userAnswer: userInput + ".",
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

  // Create a ref to keep track of whether `onGenerate` has been called
  const hasCalledOnGenerate = useRef(false);

  useEffect(() => {
    // Only call `onGenerate` if it hasn't been called before
    if (!hasCalledOnGenerate.current) {
      onGenerate(); // Call `onGenerate` function once on component mount
      hasCalledOnGenerate.current = true; // Mark `onGenerate` as called
    }
  }, []); // Empty dependency array ensures this only runs once on mount

  useEffect(() => {
    if (index >= data?.length) {
      // Calculate score based on user responses
      const totalScore = userResp.reduce(
        (acc, curr) =>
          curr.correctAnswer.toLowerCase() === curr.userAnswer.toLowerCase()
            ? acc + 1
            : acc,
        0
      );
      setResult((prevResult) => ({ ...prevResult, score: totalScore }));
      onGenerateResult(totalScore);
    }
  }, [index, data?.length, userResp]);

  return (
    <div className="flex flex-col items-center justify-center relative min-h-[50vh]">
      {data == null ? (
        <div className="absolute bottom-6 right-6 w-[50%] h-[50%]">
          <Loader />
        </div>
      ) : (
        <>
          {index < data?.length ? (
            <RearrangeSentence
              index={index}
              data={data}
              currentQuestion={currentQuestion}
              userInput={userInput}
              setUserInput={setUserInput}
              handleSubmit={handleSubmit}
            />
          ) : (
            <ResultView
              result={result}
              userResp={userResp}
              viewAnswers={viewAnswers}
              setViewAnswers={setViewAnswers}
            />
          )}
        </>
      )}
    </div>
  );
}

"use client";

import { chatSession } from "@/utility/GeminiAIModal";
import React, { useEffect, useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { GoQuestion } from "react-icons/go";
import { v4 as uuidv4 } from "uuid";
import { ResultView } from "../QuizGame";
import { IoArrowBack } from "react-icons/io5";

const category = "vocabulary";
const gameName = "Scrambled Word";
const totalQue = 10;
const instructions = [
  "Read the scrambled word",
  "Rearrange the letters to form a word",
  "Write your answer in the provided space",
  <>
    View the hints by clicking on{" "}
    <GoQuestion className="mx-1 text-primary text-xl inline" />{" "}
  </>,
];

export default function ScrambledWord() {
  const [loading, setLoading] = useState(false);
  const [isDataAdded, setIsDataAdded] = useState(false);
  const [index, setIndex] = useState(0); // Track the current question index
  const [data, setData] = useState(null);
  const [userResp, setUserResp] = useState([]); // Store user responses
  const [userInput, setUserInput] = useState(""); // Track user input
  const [result, setResult] = useState({ score: 0, feedback: null }); // Store result
  const [viewAnswers, setViewAnswers] = useState(false);
  const [viewHint, setViewHint] = useState(true);

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
          mockId: uuidv4(), // Generate the new mockId here
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
  }, [index, userResp]);

  return (
    <>
      {isDataAdded ? (
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          {index < data?.length ? (
            <>
              <div className="flex flex-col gap-8">
                <div className="bg-[#FFFDFA] w-[50vw] px-3 py-4 border shadow-md rounded-lg">
                  <h3 className="font-normal text-lg flex items-center justify-between">
                    <span className="text-2xl">
                      Q {index + 1}
                      <span className="text-sm">/{data?.length}</span>
                      &nbsp;&nbsp;
                      <span className="text-3xl text-[#6A6A6A] tracking-[0.5rem] px-4">
                        {currentQuestion?.word}
                      </span>
                    </span>
                    <GoQuestion
                      className="mx-1 text-primary text-xl inline"
                      onClick={() => setViewHint(true)}
                    />
                  </h3>
                </div>
                <input
                  type="text"
                  name=""
                  id=""
                  value={userInput}
                  placeholder="Type the word here"
                  className="border-b-2 border-[#514F4F] focus:outline-none w-[50vw] text-lg font-normal"
                  onChange={(e) => setUserInput(e.target.value)}
                />
                <button
                  onClick={handleSubmit}
                  className="rounded-lg py-2 px-10 text-center bg-primary text-white w-fit"
                >
                  Submit
                </button>
              </div>

              {viewHint && (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-700 bg-opacity-50 z-50">
                  <div className="bg-white p-6 rounded-md w-[50vw] overflow-scroll scrollbar-hide">
                    <div className="flex items-center gap-4 mb-4 text-2xl">
                      <IoArrowBack
                        className="cursor-pointer"
                        onClick={() => setViewHint(false)}
                      />
                      <span className="text-primary">Hint</span>
                    </div>
                    <div className="font-medium text-xl px-6">
                      {currentQuestion?.hint}
                    </div>
                  </div>
                </div>
              )}
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
        <div>
          <div
            className="bg-white shadow-md rounded-lg px-8 pt-6 pb-4 mb-4"
            style={{
              width: "760px",
              boxShadow: "0px 2.3px 41.31px 0px #ED1C2412",
            }}
          >
            <AiOutlineInfoCircle className="my-4 text-primary text-xl" />
            <ol className="list-decimal pl-5 mb-2">
              {instructions?.map((point, index) => {
                return (
                  <li key={index} className="text-gray-700 text-base mb-2">
                    {point}
                  </li>
                );
              })}
            </ol>
          </div>
          <div className="flex justify-start mt-4">
            <button
              onClick={onGenerate}
              className="bg-primary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              style={{
                width: "268px",
                height: "50px",
                borderRadius: "8px",
              }}
            >
              {loading ? "Loading..." : "Next"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

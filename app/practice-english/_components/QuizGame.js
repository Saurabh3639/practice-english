"use client";

import { chatSession } from "@/utility/GeminiAIModal";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { IoArrowBack } from "react-icons/io5";
import { AiFillMeh } from "react-icons/ai";
import { AiFillSmile } from "react-icons/ai";

export default function QuizGame({
  category,
  gameName,
  totalQue,
  dataStructurePrompt,
}) {
  const [data, setData] = useState(null);
  const [index, setIndex] = useState(0); // Track the current question index
  const [selectedOption, setSelectedOption] = useState(null); // Track selected option
  const [userResp, setUserResp] = useState([]); // Store user responses
  const [result, setResult] = useState({ score: 0, feedback: null }); // Store result
  const [viewAnswers, setViewAnswers] = useState(false);

  const currentQuestion = data && data[index]; // Current question based on index

  // To update selected option
  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  // Function to generate questions data for game
  const onGenerate = async () => {
    const inputPrompt = `Please generate ${totalQue} multiple-choice questions for a ${gameName} game. Each question should follow this structure:
    ${dataStructurePrompt}
    Provide the output as a JSON array containing these ${totalQue} question objects.`;

    const result = await chatSession.sendMessage(inputPrompt);
    const textResp = await result.response
      .text()
      .replace("```json", "")
      .replace("```", "");
    // console.log("textResp:", JSON.parse(textResp));

    setData(JSON.parse(textResp));
  };

  // Function to update user response after submit
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
    onGenerate(); // Call onGenerate on component mount

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
    <div className="flex flex-col items-center justify-center min-h-[50vh]">
      {data == null ? (
        <>Loading...</>
      ) : (
        <>
          {index < data?.length ? (
            <div className="text-center">
              <div className="bg-[#FFFDFA] min-w-[60vw] py-4 border shadow-md rounded-lg">
                <h3 className="font-normal text-lg">
                  <span className="text-2xl">
                    Q {index + 1}
                    <span className="text-sm">/{data?.length}</span>&nbsp;&nbsp;
                  </span>
                  {currentQuestion?.question}
                </h3>
              </div>
              <div className="my-8 grid grid-cols-2 gap-4">
                {currentQuestion?.options.map((option, i) => (
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
                ))}
              </div>
              <button
                onClick={handleSubmit}
                className="rounded-lg py-2 px-10 text-center bg-primary text-white"
              >
                Submit
              </button>
            </div>
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

export function ResultView({ result, userResp, viewAnswers, setViewAnswers }) {
  return (
    <>
      {result ? (
        <div className="bg-[#FFFDFA] border shadow-lg h-[400px] w-[400px] relative rounded-lg py-4 px-8 flex flex-col items-center justify-evenly overflow-clip scrollbar-hide">
          {result?.feedback && result?.score >= 5 ? (
            <AiFillSmile className="text-9xl text-[#F9D65C] py-2" />
          ) : result?.feedback && result?.score < 5 ? (
            <AiFillMeh className="text-9xl text-[#F9D65C] py-2" />
          ) : null}
          <div className="w-fit text-3xl font-normal text-center">
            Score : {result?.score && result?.feedback ? result?.score : 0}/
            {userResp?.length || 0}
          </div>
          <p className="text-lg font-normal text-center">
            {result?.feedback || "Loading..."}
          </p>
          <button
            onClick={() => setViewAnswers(true)}
            className="px-4 py-2 my-2 bg-primary text-white text-base font-medium rounded-lg"
          >
            View your answers
          </button>
        </div>
      ) : (
        "Loading..."
      )}

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
                      {index + 1}. {cval.question ? cval.question : cval.word}
                    </p>
                    {cval.options && (
                      <AnswerSection
                        title="Options"
                        content={cval.options.join(", ")}
                      />
                    )}
                    <AnswerSection
                      title="Correct answer"
                      content={cval.correctAnswer}
                    />
                    <AnswerSection
                      title="Your answer"
                      content={cval.userAnswer || "Answer not provided."}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function AnswerSection({ title, content }) {
  return (
    <div className="ms-8">
      <h4 className="text-lg text-primary font-medium py-1">{title}</h4>
      <p className="text-base text-[#414141] font-medium">{content}</p>
    </div>
  );
}

export function HintPopup({ title, content, setViewPopUp }) {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-700 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-md w-[50vw] overflow-scroll scrollbar-hide">
        <div className="flex items-center gap-4 mb-4 text-2xl">
          <IoArrowBack
            className="cursor-pointer"
            onClick={() => setViewPopUp(false)}
          />
          <span className="text-primary">{title}</span>
        </div>
        <div className="font-medium text-xl px-6">{content}</div>
      </div>
    </div>
  );
}
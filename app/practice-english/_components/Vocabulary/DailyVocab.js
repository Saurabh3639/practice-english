"use client";

import React, { useEffect, useState } from "react";
import { chatSession } from "@/utility/GeminiAIModal";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

export default function DailyVocab({ gameName }) {
  const [data, setData] = useState(null);
  const [index, setIndex] = useState(0); // Track the current word index

  useEffect(() => {
    const onGenerate = async () => {
      const InputPrompt = `Please generate 5 words for a ${gameName} game. Each word should be represented as a JSON object with the following structure:
      {
        "word": "The word which is getting used in Work, Study, IT sector and Buisness Vocabulary.",
        "part_of_speech": "Part of speech like Noun, Pronoun, Verb, Adjective, Adverb, Preposition, Conjunction, Interjunction etc.",
        "meaning": "Meaning or Definition of that word",
        "example": "Example of that word in a sentence",
      }
      Provide the output as a JSON array containing these 5 word objects."
      `;

      const result = await chatSession.sendMessage(InputPrompt);
      const textResp = await result.response
        .text()
        .replace("```json", "")
        .replace("```", "");
      // console.log("textResp:", textResp);

      setData(JSON.parse(textResp));
      setIndex(0); // Reset to the first word
    };

    onGenerate(); // Call onGenerate on component mount
  }, []);

  const handleNext = () => {
    if (data && index < data.length - 1) {
      setIndex(index + 1);
    }
  };

  const handlePrevious = () => {
    if (data && index > 0) {
      setIndex(index - 1);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        {data && data[index] ? (
          <div className="bg-[#FFFDFA] shadow-lg h-[480px] w-[500px] rounded-lg py-4 px-8 flex flex-col items-center justify-evenly overflow-clip scrollbar-hide">
            {/* Word Number */}
            <div className="w-fit px-3 py-3.5 rounded-full drop-shadow-md bg-white text-3xl font-normal text-center">
              {index + 1}/{data.length}
            </div>
            {/* Word */}
            <h2 className="text-2xl text-[#414141] font-medium">
              {data[index].word}
            </h2>
            {/* Part of speech - (Noun, Pronoun, Verb, Adjective, Adverb, Preposition, Conjunction, Interjunction) */}
            <h4 className="text-lg text-[#5C5C5C] font-semibold">
              {data[index].part_of_speech}
            </h4>
            {/* Meaning / Definition */}
            <p className="text-lg font-normal text-center">
              {data[index].meaning}
            </p>
            {/* Example sentence */}
            <h4 className="text-lg text-[#5C5C5C] font-medium">Example</h4>
            <p className="text-base text-[#2F2E2E] font-normal text-center">
              {data[index].example}
            </p>
            <div className="w-full flex justify-evenly text-3xl text-[#414141]">
              <FaArrowLeft
                onClick={handlePrevious}
                className={`${
                  index === 0 ? "cursor-not-allowed" : "cursor-pointer"
                }`}
              />
              <FaArrowRight
                onClick={handleNext}
                className={`${
                  index === data.length - 1
                    ? "cursor-not-allowed"
                    : "cursor-pointer"
                }`}
              />
            </div>
          </div>
        ) : (
          <>Loading...</>
        )}
      </div>
    </>
  );
}

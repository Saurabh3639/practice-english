"use client";

import { chatSession } from "@/utility/GeminiAIModal";
import React, { useState } from "react";

const gameName = "Choose the Correct Word";

export default function CorrectWord() {
  const [data, setData] = useState(null);

  console.log("data:", data);

  const onSubmit = async () => {
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
  };

  return (
    <>
      <div className="flex gap-4 items-center">
        <h4>{gameName}</h4>
        <button
          onClick={onSubmit}
          className="border border-red-500 rounded-lg text-red-500 px-4 py-2 cursor-pointer"
        >
          Generate
        </button>
      </div>

      <div>
        {data?.length > 0 &&
          data?.map((cval, i) => {
            return (
              <div key={i}>
                <p>{cval.question}</p>
                <p>{cval.correctAnswer}</p>
              </div>
            );
          })}
      </div>
    </>
  );
}

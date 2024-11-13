"use client";

import React, { useState, useEffect } from "react";
import { GameCompletedMsg } from "../../QuizGame";
import { chatSession } from "@/utility/GeminiAIModal";
import WordPuzzle from "../../WordPuzzle";

// Main Noun Puzzle Component
export default function NounPuzzle({ category, gameName, totalQue }) {
  const [data, setData] = useState(null);
  const [nouns, setNouns] = useState(null);
  const [foundWords, setFoundWords] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Function to generate questions data for game
  const onGenerate = async () => {
    setLoading(true);

    const inputPrompt = `Please generate ${totalQue} questions for a ${gameName} game. I want any random type of noun like Common Nouns, Proper Nouns, Concrete Nouns, Abstract Nouns, Collective Nouns, Countable Nouns, Uncountable Nouns, Compound Nouns etc. with their example. Each question should follow this structure:
    {
        "type_of_noun": "Particular type of nouns (Common Nouns, Proper Nouns, Concrete Nouns, Abstract Nouns, Collective Nouns, Countable Nouns, Uncountable Nouns, Compound Nouns etc.)",
        "ex": [Array of 2 simple words which is having following type of nouns],
      }
    Provide the output as a JSON array containing these ${totalQue} question objects.`;

    const result = await chatSession.sendMessage(inputPrompt);
    const textResp = await result.response
      .text()
      .replace("```json", "")
      .replace("```", "");
    const parsedData = JSON.parse(textResp);
    console.log("parsedData:", parsedData);
    setData(parsedData);

    const extractedNouns = parsedData.flatMap((item) => item.ex);
    console.log("extractedNouns:", JSON.stringify(extractedNouns));
    setNouns(extractedNouns);

    setLoading(false);
  };

  useEffect(() => {
    // onGenerate();

    if (nouns) {
      // Check if all words in `nouns` are in `foundWords`
      const allFound = nouns.every((word) => foundWords.includes(word));
      setIsCompleted(allFound);
    }
  }, [foundWords, nouns]);

  return (
    <>
      <div className="flex justify-evenly">
        <div className="w-[50%]">
          {loading ? (
            "Loading..."
          ) : (
            <ul className="list-disc list-inside">
              {data &&
                data?.map((cval, index) => (
                  <li
                    key={index}
                    className="border rounded-lg py-2 px-4 shadow-md mb-4"
                  >
                    <span className="text-lg font-medium">
                      {cval?.type_of_noun} :
                    </span>
                    <p className="text-base font-normal text-[#6A6A6A] ps-5">
                      {cval?.ex.length > 0 && cval?.ex.join(", ")}
                    </p>
                  </li>
                ))}
            </ul>
          )}

          {/* Found words block */}
          {foundWords && foundWords?.length > 0 &&
          <div className="border rounded-lg py-2 px-4 shadow-md my-4">
            <span className="text-lg font-medium text-primary">
              Found Words :{" "}
            </span>
            <span className="text-base font-normal">
              {foundWords && foundWords.join(", ")}
            </span>
          </div>}

          <button onClick={onGenerate}>Generate</button>
        </div>
        <div className="w-[50%] flex flex-col items-center">
          {/* {nouns && nouns?.length > 0 && ( */}
          {/* {nouns && ( */}
            <WordPuzzle
              // words={nouns}
              words={["apple", "tree", "house", "water", "flower"]}
              setFoundWords={setFoundWords}
            />
          {/* )} */}
        </div>
      </div>

      {isCompleted && <GameCompletedMsg message="Game Completed!" />}
    </>
  );
}

// import React from "react";

// export default function NounPuzzle({ category, gameName, totalQue }) {
//   return (
//     <div>
//       NounPuzzle: category={category}, gameName={gameName}, totalQue={totalQue}
//     </div>
//   );
// }

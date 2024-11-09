"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { use } from "react";
import { IoArrowBack } from "react-icons/io5";
import DailyVocab from "../../_components/Vocabulary/DailyVocab";
import SynonymAntonym from "../../_components/Vocabulary/SynonymAntonym";
import CorrectWord from "../../_components/Vocabulary/CorrectWord";
import ScrambledWord from "../../_components/Vocabulary/ScrambledWord";
import CorrectVerbTense from "../../_components/Grammar/VerbTenses/CorrectVerbTense";
import CorrectFormOfVerb from "../../_components/Grammar/VerbTenses/CorrectFormOfVerb";
import RearrangeVerbTense from "../../_components/Grammar/VerbTenses/RearrangeVerbTense";

export default function GamePage({ params }) {
  const router = useRouter();
  const pathname = usePathname();
  const basePath = pathname.split("/").slice(0, 2).join("/");

  const unwrappedParams = use(params); // Use the `use` hook to unwrap `params`
  const { category, game } = unwrappedParams; // Access the properties from the unwrapped `params`

  return (
    <div className="px-6 py-4">
      {/* block 1 */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4 mb-4">
          <IoArrowBack
            className="cursor-pointer text-2xl"
            onClick={() => router.push(`${basePath}/${category}`)}
          />
          <span className="text-primary text-xl font-medium">
            {game.replace(/-/g, " ").replace(/^\w/, (c) => c.toUpperCase())}
          </span>
        </div>
      </div>

      {/* block 2 - Load game component */}
      <div>
        {game.replace(/-/g, " ") == "daily vocab" ? (
          <DailyVocab gameName={game.replace(/-/g, " ")} />
        ) : game.replace(/-/g, " ") == "synonym and antonym" ? (
          <SynonymAntonym
            category={category}
            gameName={game.replace(/-/g, " ")}
            totalQue={10}
          />
        ) : game.replace(/-/g, " ") == "choose the correct word" ? (
          <CorrectWord
            category={category}
            gameName={game.replace(/-/g, " ")}
            totalQue={10}
          />
        ) : game.replace(/-/g, " ") == "scrambled word" ? (
          <ScrambledWord
            category={category}
            gameName={game.replace(/-/g, " ")}
            totalQue={10}
          />
        ) : game.replace(/-/g, " ") == "rearrange in correct verb tense" ? (
          <RearrangeVerbTense
            category={category}
            gameName={game.replace(/-/g, " ")}
            totalQue={10}
          />
        ) : game.replace(/-/g, " ") == "choose the correct verb tense" ? (
          <CorrectVerbTense
            category={category}
            gameName={game.replace(/-/g, " ")}
            totalQue={10}
          />
        ) : game.replace(/-/g, " ") == "choose the correct form of verb" ? (
          <CorrectFormOfVerb
            category={category}
            gameName={game.replace(/-/g, " ")}
            totalQue={10}
          />
        ) : (
          <>No Game Available Yet!</>
        )}
      </div>
    </div>
  );
}

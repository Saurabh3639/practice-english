"use client";

import { useState } from "react";
import CorrectWord from "./_components/Vocabulary/CorrectWord";

const categories = ["Practice Vocabulary", "Practice Grammar"];

export default function PracticeEnglishPage() {
  const [category, setCategory] = useState(categories[0]);

  return (
    <div className="px-6 py-4">
      <div className="flex gap-4 my-4">
        {categories?.map((cval, i) => {
          return (
            <div
              key={i}
              className={`p-2 rounded-lg cursor-pointer border ${
                cval == category
                  ? "text-red-500 border-red-500"
                  : "text-black border-black"
              }`}
              onClick={() => setCategory(cval)}
            >
              {cval}
            </div>
          );
        })}
      </div>

      <div className="border border-black p-2">
        <CorrectWord />
      </div>
    </div>
  );
}

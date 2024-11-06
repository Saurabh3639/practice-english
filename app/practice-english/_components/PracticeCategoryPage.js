"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { MdArrowForwardIos } from "react-icons/md";

const buttonStyle = {
  height: "90px",
  borderRadius: "9px",
  boxShadow: "0px 2px 11px 0px #ED1C241F",
};

export default function PracticeCategoryPage({ title, games }) {
  const router = useRouter();
  const pathname = usePathname();
  const basePath = pathname.split("/").slice(0, 2).join("/");
  const [selectedGame, setSelectedGame] = useState(null);

  const handleGameClick = (game) => {
    if (game.gamesData) {
      setSelectedGame(game);
    } else {
      router.push(
        `${pathname}/${game?.name.toLowerCase().replace(/\s+/g, "-")}`
      );
    }
  };

  return (
    <div className="px-6 py-4">
      {/* block 1 */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4 mb-4">
          <IoArrowBack
            className="cursor-pointer text-2xl"
            onClick={() => {
              if (selectedGame) {
                setSelectedGame(null);
              } else {
                router.push(basePath);
              }
            }}
          />
          <span className="text-primary text-xl font-medium">
            {selectedGame ? selectedGame?.name : title}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 my-8">
        {selectedGame
          ? selectedGame?.gamesData?.map((subGame, i) => {
              return (
                <button
                  key={i}
                  style={buttonStyle}
                  className="w-full flex mb-2 items-center justify-between px-4 text-black font-semibold border-2 border-transparent hover:border-[#FFA6AA] p-4 transition-all"
                  onClick={() =>
                    router.push(
                      `${pathname}/${subGame?.name
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`
                    )
                  }
                >
                  <div className="bg-[#FFD9DD] mr-5 flex items-center justify-center w-[45px] h-[45px] rounded-lg ring-offset ring-8 ring-[#FFEEF0]">
                    <span className="text-2xl font-normal text-black">
                      {subGame?.name.charAt(0)}
                    </span>
                  </div>
                  <span className="flex-grow text-left text-lg font-normal">
                    {subGame?.name}
                  </span>
                  <div className="flex items-center justify-center">
                    <MdArrowForwardIos className="text-black text-lg" />
                  </div>
                </button>
              );
            })
          : games?.map((game, i) => {
              return (
                <button
                  key={i}
                  style={buttonStyle}
                  className="w-full flex mb-2 items-center justify-between px-4 text-black font-semibold border-2 border-transparent hover:border-[#FFA6AA] p-4 transition-all"
                  onClick={() => handleGameClick(game)}
                >
                  <div className="bg-[#FFD9DD] mr-5 flex items-center justify-center w-[45px] h-[45px] rounded-lg ring-offset ring-8 ring-[#FFEEF0]">
                    <span className="text-2xl font-normal text-black">
                      {game?.name.charAt(0)}
                    </span>
                  </div>
                  <span className="flex-grow text-left text-lg font-normal">
                    {game?.name}
                  </span>
                  <div className="flex items-center justify-center">
                    <MdArrowForwardIos className="text-black text-lg" />
                  </div>
                </button>
              );
            })}
      </div>
    </div>
  );
}

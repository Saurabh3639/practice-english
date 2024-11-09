"use client";

import { usePathname, useRouter } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";
import { MdArrowForwardIos } from "react-icons/md";

const buttonStyle = {
  height: "90px",
  // width: "700px",
  borderRadius: "9px",
  boxShadow: "0px 2px 11px 0px #ED1C241F",
};

const categories = [
  { id: 1, name: "Practice Vocabulary", type: "Vocabulary" },
  { id: 2, name: "Practice Grammar", type: "Grammar" },
];

export default function PracticeEnglish() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="px-6 py-4">
      {/* block 1 */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4 mb-4">
          <IoArrowBack
            className="cursor-pointer text-2xl"
            // onClick={}
          />
          <span className="text-primary text-xl font-medium">
            Enhance English Skills
          </span>
        </div>
      </div>

      <div className="">
        <h3 className="text-primary text-xl font-medium my-2">
          What you want to do today?
        </h3>
        <div className="grid grid-cols-2 gap-4 my-8">
          {categories?.map((category, i) => {
            return (
              <button
                key={i}
                style={buttonStyle}
                className="w-full flex mb-2 items-center justify-between px-4 text-black font-semibold border-2 border-transparent hover:border-[#FFA6AA] p-4 transition-all"
                onClick={() =>
                  router.push(`${pathname}/${category?.type?.toLowerCase()}`)
                }
              >
                <div className="bg-[#FFD9DD] mr-5 flex items-center justify-center w-[45px] h-[45px] rounded-lg ring-offset ring-8 ring-[#FFEEF0]">
                  <span className="text-2xl font-normal text-black">
                    {category?.type?.charAt(0)}
                  </span>
                </div>

                <span className="flex-grow text-left text-lg font-normal">
                  {category?.name}
                </span>

                <div className="flex items-center justify-center">
                  <MdArrowForwardIos className="text-black text-lg" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

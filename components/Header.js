import React from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoSearch } from "react-icons/io5";

export default function Header() {
  return (
    <div className="p-4 mb-2 shadow-lg flex justify-between items-center headerDiv">
      <div className="headerOne">
        <span className="text-lg px-2 font-semibold">Good Morning!</span>
        <span className="text-base px-2 text-primary">
          “Have a productive and successful day!”
        </span>
      </div>
      <div className="flex items-center gap-4 headerTwo">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <button
              type="submit"
              className="p-1 focus:outline-none focus:shadow-outline"
            >
              <IoSearch className="w-6 h-6 text-gray-400" />
            </button>
          </span>
          <input
            type="search"
            name="q"
            className="py-2 text-sm rounded-md pl-10 pr-2 border-2 focus:outline-none focus:text-gray-900"
            placeholder="Search"
            autoComplete="off"
            // onClick={}
          />
        </div>

        <div className="text-lg px-2 cursor-pointer">
          <div className="flex-col justify-center items-center h-15">
            <IoMdNotificationsOutline className="w-7 h-7" />
          </div>
        </div>
      </div>
    </div>
  );
}

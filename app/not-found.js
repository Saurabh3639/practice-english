import Link from "next/link";
import React from "react";
import { RiArrowGoBackLine } from "react-icons/ri";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      <h1 className="text-6xl">404</h1>
      <p className="text-base">Page Not Found</p>
      <div className="mt-4">
        <Link
          href="/"
          className="cursor-pointer text-sm flex items-center gap-2"
        >
          <RiArrowGoBackLine />
          <span>Go Back</span>
        </Link>
      </div>
    </div>
  );
}

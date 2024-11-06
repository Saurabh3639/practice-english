"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { use } from "react";
import { IoArrowBack } from "react-icons/io5";

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

      <div>GamePage: {game.replace(/-/g, " ")}</div>
    </div>
  );
}

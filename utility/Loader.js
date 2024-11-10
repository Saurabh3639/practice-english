"use client";

import React from "react";
import { PulseLoader } from "react-spinners";

export default function Loader({
  color = "#ed1c24",
  loading = true,
  size = 16,
}) {
  return (
    <div className="absolute min-w-full min-h-full flex items-center justify-center top-0 right-0">
      <PulseLoader color={color} loading={loading} size={size} />
    </div>
  );
}

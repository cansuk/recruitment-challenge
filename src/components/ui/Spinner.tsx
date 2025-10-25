"use client";
import React from "react";

type Props = {
  size?: number;
  color?: string;
  className?: string;
};

export default function Spinner({
  size = 24,
  color = "#FF733C",
  className,
}: Props) {
  const strokeWidth = 4;
  const r = (size - strokeWidth) / 2;
  const c = 2 * Math.PI * r;
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={["animate-spin", className || ""].filter(Boolean).join(" ")}
      role="status"
      aria-label="Loading"
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="#FFE1D4"
        strokeWidth={strokeWidth}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={c}
        strokeDashoffset={c * 0.25}
        strokeLinecap="round"
      />
    </svg>
  );
}

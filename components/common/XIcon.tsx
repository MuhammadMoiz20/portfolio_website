"use client";

import React from "react";

interface XIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

/**
 * Simple X (formerly Twitter) brand icon.
 * Uses stroked lines so it adapts to currentColor and works well at small sizes.
 */
export default function XIcon({ size = 20, ...props }: XIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden={props["aria-label"] ? undefined : true}
      role={props["aria-label"] ? "img" : undefined}
      {...props}
    >
      <path
        d="M3 3L21 21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 3L3 21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

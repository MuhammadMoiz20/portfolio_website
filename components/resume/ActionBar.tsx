"use client";
import { FiPrinter, FiFileText, FiFile, FiLayout } from "react-icons/fi";

interface Props {
  variant: "markdown" | "structured";
}

export default function ActionBar({ variant }: Props) {
  return (
    <div className="sticky top-16 z-30 mb-6 flex flex-wrap items-center gap-2 rounded-lg border bg-white/80 p-2 backdrop-blur dark:border-gray-700 dark:bg-gray-900/80 md:top-20">
      <a
        href="/resume"
        className={`btn-xs ${variant === "structured" ? "btn-primary" : "btn-outline"}`}
      >
        <FiLayout className="mr-1" /> Structured
      </a>
      <a
        href="/resume/raw"
        className={`btn-xs ${variant === "markdown" ? "btn-primary" : "btn-outline"}`}
      >
        <FiFileText className="mr-1" /> Markdown
      </a>
      <a href="/resume.pdf" className="btn-xs btn-outline">
        <FiFile className="mr-1" /> PDF
      </a>
      <button onClick={() => window.print()} className="btn-xs btn-outline">
        <FiPrinter className="mr-1" /> Print
      </button>
      <span className="ml-auto hidden text-[11px] text-gray-500 dark:text-gray-400 sm:inline">
        Last Updated: Sep 2025
      </span>
    </div>
  );
}

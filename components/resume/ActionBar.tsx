"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback } from "react";
import { Download, Printer } from "lucide-react";

interface ActionBarProps {
  active?: "structured" | "markdown";
}

export default function ActionBar({ active }: ActionBarProps) {
  const pathname = usePathname();
  const current =
    active ?? (pathname?.includes("/resume/raw") ? "markdown" : "structured");

  const onPrint = useCallback(() => {
    if (typeof window !== "undefined") {
      window.print();
    }
  }, []);

  return (
    <div className="print:hidden sticky top-14 sm:top-16 z-40">
      <div className="container-custom">
        <div className="flex items-center gap-2 rounded-xl border bg-white/80 px-2 py-1.5 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-gray-800 dark:bg-gray-900/60 sm:px-3 sm:py-2">
          {/* Tabs */}
          <div className="flex min-w-0 shrink overflow-x-auto no-scrollbar">
            <div className="inline-flex shrink-0 overflow-hidden rounded-full border border-gray-200 bg-white/80 p-0.5 backdrop-blur dark:border-gray-800 dark:bg-gray-800/40">
              <Link
                href="/resume"
                aria-current={current === "structured" ? "page" : undefined}
                className={`px-3 py-1.5 text-xs font-medium tracking-wide transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:px-3.5 sm:text-sm ${
                  current === "structured"
                    ? "bg-accent text-white"
                    : "bg-transparent text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                }`}
              >
                Structured
              </Link>
              <Link
                href="/resume/raw"
                aria-current={current === "markdown" ? "page" : undefined}
                className={`px-3 py-1.5 text-xs font-medium tracking-wide transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:px-3.5 sm:text-sm ${
                  current === "markdown"
                    ? "bg-accent text-white"
                    : "bg-transparent text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                }`}
              >
                Markdown
              </Link>
            </div>
          </div>

          {/* Actions */}
          <div className="ml-auto flex items-center gap-2">
            <a
              href="/resume.pdf"
              className="btn-secondary h-9 rounded-lg px-2 text-xs font-medium sm:h-10 sm:px-3 sm:text-sm inline-flex items-center gap-1.5"
              download
              aria-label="Download resume PDF"
            >
              <Download className="h-4 w-4" aria-hidden />
              <span className="hidden sm:inline">Download</span>
            </a>
            <button
              onClick={onPrint}
              className="btn-outline h-9 rounded-lg px-2 text-xs font-medium sm:h-10 sm:px-3 sm:text-sm inline-flex items-center gap-1.5"
              aria-label="Print resume"
            >
              <Printer className="h-4 w-4" aria-hidden />
              <span className="hidden sm:inline">Print</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

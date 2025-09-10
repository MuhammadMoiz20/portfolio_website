import type { ProjectLogEntry } from "@/components/projects/ProjectLog";

// Add or edit log entries per project slug.
// Keep entries reverse-chronological (newest first).
export const projectLogs: Record<string, ProjectLogEntry[]> = {
  // Example entries; feel free to adjust or remove.
  nuggets: [
    {
      date: "2024-06-02",
      title: "Optimized LOS algorithm",
      content:
        "Refactored line-of-sight with early exits; ~18% faster on average maps.",
    },
    {
      date: "2024-05-14",
      content:
        "Tuned tick rate and packet size to keep sync <100ms under load.",
    },
  ],
  mantogo: [
    {
      date: "2025-02-01",
      title: "Open sourced",
      content:
        "UPDATE: We have made this app open source so this can be supported by the community after I and my team graduate.",
    },
  ],
  resumeai: [],
  "dartmouth-news-scraper": [],
  "tiny-search-engine": [],
  dispatch: [],
};

export function getProjectLog(slug: string): ProjectLogEntry[] {
  return projectLogs[slug] ?? [];
}

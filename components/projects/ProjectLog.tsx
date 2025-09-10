import React from "react";

export type ProjectLogEntry = {
  date: string; // ISO or readable date
  title?: string;
  content: string; // short note (markdown-lite allowed)
};

interface ProjectLogProps {
  entries: ProjectLogEntry[];
}

export default function ProjectLog({ entries }: ProjectLogProps) {
  if (!entries || entries.length === 0) {
    return (
      <section className="mt-12">
        <h2 className="mb-2 text-2xl font-semibold">Project Log</h2>
        <p className="text-muted-foreground">
          No log entries yet. I’ll share stories, insights, and progress notes
          here.
        </p>
      </section>
    );
  }

  return (
    <section className="mt-12">
      <h2 className="mb-4 text-2xl font-semibold">Project Log</h2>
      <ol className="relative border-l pl-6">
        {entries.map((e, i) => (
          <li key={i} className="mb-8">
            <div className="absolute -left-[7px] mt-1 h-3 w-3 rounded-full bg-gray-300 dark:bg-gray-600" />
            <time className="block text-xs uppercase tracking-wide text-muted-foreground">
              {e.date}
            </time>
            {e.title && <h3 className="mt-1 text-lg font-medium">{e.title}</h3>}
            <p className="mt-1 text-sm text-muted-foreground whitespace-pre-line">
              {e.content}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}

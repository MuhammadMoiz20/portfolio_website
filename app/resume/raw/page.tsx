import fs from "fs";
import path from "path";
import { compileContentMDX } from "@/lib/mdx";
import ActionBar from "@/components/resume/ActionBar";

export const dynamic = "force-static";

export const metadata = {
  title: "Resume (Markdown)",
};

export default async function RawResumePage() {
  const filePath = path.join(process.cwd(), "resume.md");
  const raw = fs.readFileSync(filePath, "utf8");
  // remove leading front separators if any extraneous
  const md = raw.trim();
  const content = await compileContentMDX(md);
  return (
    <>
      <ActionBar active="markdown" />
      <div className="container-custom pt-24 print:pt-4 print:pb-0 break-words px-4 sm:px-6">
        <div className="rounded-xl border bg-white/70 p-6 shadow-xl dark:border-gray-800 dark:bg-gray-900/60 print:shadow-none print:border-0 print:bg-transparent prose prose-wide resume-prose dark:prose-invert">
          <div className="not-prose mb-6 print:hidden">
            <h1 className="text-2xl font-bold">Resume (Markdown)</h1>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Rendered directly from resume.md
            </p>
          </div>
          {content}
        </div>
      </div>
    </>
  );
}

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
    <div className="container-custom max-w-4xl pt-24 pb-16 print:pt-4">
      <h1 className="mb-4 text-3xl font-bold tracking-tight print:text-2xl">
        Resume (Markdown)
      </h1>
      <div className="mb-4 print:hidden">
        <ActionBar variant="markdown" />
      </div>
      <article className="markdown-resume rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900 print:border-0 print:shadow-none">
        <div className="prose-sm prose dark:prose-invert max-w-none [&_*]:break-words">
          {content}
        </div>
      </article>
    </div>
  );
}

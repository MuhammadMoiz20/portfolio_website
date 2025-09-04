import { NextRequest, NextResponse } from "next/server";
import { projects } from "@/data/projects";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") || "").toLowerCase();
  const tag = searchParams.get("tag");

  let results = [...projects];

  if (tag && tag.trim().length > 0) {
    results = results.filter((p) => p.tags.includes(tag));
  }

  if (q) {
    results = results.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)),
    );
  }

  return NextResponse.json({ projects: results });
}

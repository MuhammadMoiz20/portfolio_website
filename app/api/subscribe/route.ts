import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import fs from "fs";
import path from "path";

const schema = z.object({
  email: z.string().email().max(200),
});

function ensureDataFile(fileName: string) {
  const dataDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  const filePath = path.join(dataDir, fileName);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "[]", "utf-8");
  }
  return filePath;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const filePath = ensureDataFile("subscribers.json");
    const raw = fs.readFileSync(filePath, "utf-8");
    const subscribers: { email: string; subscribedAt: string }[] =
      JSON.parse(raw);

    const exists = subscribers.some(
      (s) => s.email.toLowerCase() === parsed.data.email.toLowerCase(),
    );
    if (exists) {
      return NextResponse.json({
        success: true,
        message: "Already subscribed",
      });
    }

    subscribers.push({
      email: parsed.data.email,
      subscribedAt: new Date().toISOString(),
    });
    fs.writeFileSync(filePath, JSON.stringify(subscribers, null, 2), "utf-8");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Subscribe API error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

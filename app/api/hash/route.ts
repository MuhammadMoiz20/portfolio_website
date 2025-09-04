import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  const { text, algo = "sha256" } = await req.json();
  if (!text || typeof text !== "string") {
    return NextResponse.json({ error: "text is required" }, { status: 400 });
  }
  const supported = ["sha1", "sha256", "sha384", "sha512", "md5"];
  const algorithm = supported.includes(algo) ? algo : "sha256";
  const digest = crypto.createHash(algorithm).update(text).digest("hex");
  return NextResponse.json({ algorithm, digest });
}

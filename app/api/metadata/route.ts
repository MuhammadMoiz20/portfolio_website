import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();
    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "url is required" }, { status: 400 });
    }
    const res = await fetch(url, {
      method: "GET",
      redirect: "follow",
      headers: { "user-agent": "Mozilla/5.0 (+PortfolioTools)" },
    });
    const html = await res.text();

    const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : null;
    const descMatch =
      html.match(
        /<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["'][^>]*>/i,
      ) ||
      html.match(
        /<meta[^>]*content=["']([^"']+)["'][^>]*name=["']description["'][^>]*>/i,
      );
    const description = descMatch ? descMatch[1].trim() : null;
    const ogImageMatch = html.match(
      /<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["'][^>]*>/i,
    );
    const ogImage = ogImageMatch ? ogImageMatch[1].trim() : null;

    return NextResponse.json({ title, description, ogImage });
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to fetch metadata" },
      { status: 500 },
    );
  }
}

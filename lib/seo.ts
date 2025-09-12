import type { Metadata } from "next";

export function buildPostMetadata({
  title,
  description,
  slug,
  cover,
}: {
  title: string;
  description?: string;
  slug: string;
  cover?: string;
}): Metadata {
  const base = "https://www.moizofficial.com";
  const url = `${base}/blog/${slug}`;
  // Normalize cover to absolute URL; avoid Next image optimizer for OG
  const rawPath =
    cover && cover.trim().length > 0 ? cover.trim() : "/images/profile.jpg";
  const normalizedPath = rawPath.startsWith("http")
    ? rawPath
    : rawPath.startsWith("/")
      ? `${base}${rawPath}`
      : `${base}/${rawPath}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title,
      description,
      images: [{ url: normalizedPath, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      creator: "@zahid_moiz",
      images: [normalizedPath],
    },
  };
}

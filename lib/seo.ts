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
  const imagePath = cover ? cover : "/images/profile.jpg";
  const absoluteImage = imagePath.startsWith("http")
    ? imagePath
    : `${base}${imagePath}`;
  // Prefer Next.js optimizer for lighter previews (helps WhatsApp)
  const ogOptimized = imagePath.startsWith("/")
    ? `${base}/_next/image?url=${encodeURIComponent(imagePath)}&w=1200&q=70`
    : absoluteImage;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title,
      description,
      images: [
        { url: ogOptimized, width: 1200, height: 630, alt: title },
        { url: absoluteImage, width: 1200, height: 630, alt: title },
      ],
    },
    twitter: {
      card: "summary_large_image",
      creator: "@zahid_moiz",
      images: [ogOptimized],
    },
  };
}

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
  const image = imagePath.startsWith("http")
    ? imagePath
    : `${base}${imagePath}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      creator: "@zahid_moiz",
      images: [{ url: image, alt: title }],
    },
  };
}

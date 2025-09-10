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
  const url = `https://www.moizofficial.com/blog/${slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title,
      description,
      images: [cover ? cover : "/images/profile.jpg"],
    },
    twitter: {
      card: "summary_large_image",
      creator: "@zahid_moiz",
      images: [cover ? cover : "/images/profile.jpg"],
    },
  };
}

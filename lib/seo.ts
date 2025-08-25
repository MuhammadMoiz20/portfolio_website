import type { Metadata } from 'next';

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
      type: 'article',
      url,
      title,
      description,
      images: [
        cover
          ? cover
          : `/api/og?title=${encodeURIComponent(title)}`,
      ],
    },
    twitter: {
      card: 'summary_large_image',
      images: [
        cover
          ? cover
          : `/api/og?title=${encodeURIComponent(title)}`,
      ],
    },
  };
}



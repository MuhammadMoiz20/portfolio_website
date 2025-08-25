import { Content } from '@/lib/content';
import { compileContentMDX } from '@/lib/mdx';
import type { Metadata } from 'next';
import { buildPostMetadata } from '@/lib/seo';
import type { ContentItemMeta } from '@/lib/mdx';

interface Params { slug: string }

export function generateStaticParams() {
  // Exclude drafts
  const metas = Content.posts();
  return metas.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const { meta } = Content.post(slug);
  return buildPostMetadata({
    title: meta.title,
    description: meta.summary,
    slug: meta.slug,
    cover: meta.cover,
  });
}

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const { content, meta } = Content.post(slug);
  const mdx = await compileContentMDX(content);
  return (
    <article className="prose mx-auto pt-20">
      <header className="mb-8">
        <h1>{meta.title}</h1>
        <p className="text-sm text-muted-foreground">
          {new Date(meta.date).toLocaleDateString()} • {meta.readingTimeMinutes} min
        </p>
      </header>
      <script
        type="application/ld+json"
        // Note: we render JSON-LD in content for validation; small inline script, safe
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: meta.title,
            datePublished: meta.date,
            dateModified: meta.date,
            image: meta.cover ? [`https://www.moizofficial.com${meta.cover}`] : undefined,
            author: {
              '@type': 'Person',
              name: 'Muhammad Moiz',
              url: 'https://www.moizofficial.com',
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `https://www.moizofficial.com/blog/${meta.slug}`,
            },
          }),
        }}
      />
      {mdx}
    </article>
  );
}

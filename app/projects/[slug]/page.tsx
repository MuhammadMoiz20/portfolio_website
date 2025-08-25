import { Content } from '@/lib/content';
import { compileContentMDX } from '@/lib/mdx';
import type { Metadata } from 'next';

interface Params { slug: string }

export function generateStaticParams() {
  const metas = Content.projects();
  return metas.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const { meta } = Content.project(slug);
  return {
    title: meta.title,
    description: meta.summary,
    alternates: { canonical: `https://www.moizofficial.com/projects/${meta.slug}` },
    openGraph: {
      type: 'website',
      url: `https://www.moizofficial.com/projects/${meta.slug}`,
      title: meta.title,
      description: meta.summary,
    },
    twitter: { card: 'summary_large_image', creator: '@zahid_moiz' },
  };
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const { content, meta } = Content.project(slug);
  const mdx = await compileContentMDX(content);
  return (
    <article className="prose mx-auto pt-20">
      <header className="mb-8">
        <h1>{meta.title}</h1>
        {meta.summary && <p className="text-sm text-muted-foreground">{meta.summary}</p>}
      </header>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CreativeWork',
            name: meta.title,
            url: `https://www.moizofficial.com/projects/${meta.slug}`,
            image: meta.cover ? [`https://www.moizofficial.com${meta.cover}`] : undefined,
            description: meta.summary,
          }),
        }}
      />
      {mdx}
    </article>
  );
}



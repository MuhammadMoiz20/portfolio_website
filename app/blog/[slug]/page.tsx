import { Content } from "@/lib/content";
import { compileContentMDX } from "@/lib/mdx";
import type { Metadata } from "next";
import { buildPostMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";
import BlogPost from "@/components/blog/BlogPost";
import Image from "next/image";
import { blogPosts } from "@/data/blog";

interface Params {
  slug: string;
}

export function generateStaticParams() {
  // Include MDX posts + data-driven posts for pre-render
  const metas = Content.posts();
  const mdx = metas.map((m) => m.slug);
  const data = blogPosts.map((p) => p.slug);
  const unique = Array.from(new Set([...mdx, ...data]));
  return unique.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const { meta } = Content.post(slug);
    return buildPostMetadata({
      title: meta.title,
      description: meta.summary,
      slug: meta.slug,
      cover: meta.cover,
    });
  } catch {
    const post = blogPosts.find((p) => p.slug === slug);
    if (!post) return {};
    return buildPostMetadata({
      title: post.title,
      description: post.excerpt,
      slug: post.slug,
      cover: post.image,
    });
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  // Try MDX-backed post first
  try {
    const { content, meta } = Content.post(slug);
    const mdx = await compileContentMDX(content);
    return (
      <article className="relative mx-auto max-w-3xl px-4 pt-28 sm:px-6 lg:max-w-4xl">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-primary-500/10 via-background to-background dark:from-primary-400/10" />
        <header className="mb-10">
          {meta.cover && (
            <div className="relative mb-8 overflow-hidden rounded-2xl shadow-sm ring-1 ring-border/50">
              <Image
                src={meta.cover}
                alt={meta.title}
                width={1600}
                height={840}
                className="h-auto w-full object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-transparent mix-blend-multiply" />
            </div>
          )}
          <div className="space-y-4">
            <h1 className="bg-gradient-to-r from-primary-600 via-primary-500 to-primary-400 bg-clip-text text-3xl font-extrabold leading-tight tracking-tight text-transparent sm:text-4xl lg:text-5xl">
              {meta.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-muted-foreground">
              <time
                dateTime={meta.date}
                className="inline-flex items-center gap-1 rounded-full bg-primary-100/70 px-3 py-1 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300"
              >
                {new Date(meta.date).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <span className="inline-flex items-center gap-1 rounded-full bg-primary-50 px-3 py-1 text-primary-600 dark:bg-primary-900/60 dark:text-primary-300">
                {meta.readingTimeMinutes} min read
              </span>
            </div>
          </div>
        </header>
        <div className="prose prose-neutral mx-auto max-w-none dark:prose-invert prose-headings:scroll-mt-24 prose-headings:font-semibold prose-a:text-primary-600 hover:prose-a:underline dark:prose-a:text-primary-400 prose-img:rounded-xl">
          {mdx}
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: meta.title,
              datePublished: meta.date,
              dateModified: meta.date,
              image: meta.cover
                ? [`https://www.moizofficial.com${meta.cover}`]
                : undefined,
              author: {
                "@type": "Person",
                name: "Muhammad Moiz",
                url: "https://www.moizofficial.com",
              },
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": `https://www.moizofficial.com/blog/${meta.slug}`,
              },
            }),
          }}
        />
      </article>
    );
  } catch {
    // Fallback to data-driven post
    const post = blogPosts.find((p) => p.slug === slug);
    if (!post) return notFound();
    // Convert plain text content to simple HTML paragraphs
    const toHtml = (txt?: string) =>
      (txt || "")
        .trim()
        .split(/\n\n+/)
        .map((p) => `<p>${p.replace(/\n/g, "<br/>")}</p>`) // preserve single newlines
        .join("\n");
    const htmlContent = toHtml(post.content);
    return (
      <div className="pt-20">
        <div className="container-custom">
          <BlogPost post={{ ...post, content: htmlContent }} />
        </div>
      </div>
    );
  }
}

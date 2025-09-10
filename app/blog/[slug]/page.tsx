import { Content } from "@/lib/content";
import { compileContentMDX } from "@/lib/mdx";
import type { Metadata } from "next";
import { buildPostMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";
import BlogPost from "@/components/blog/BlogPost";
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
      <article className="prose mx-auto pt-20">
        <header className="mb-8">
          <h1>{meta.title}</h1>
          <p className="text-sm text-muted-foreground">
            {new Date(meta.date).toLocaleDateString()} •{" "}
            {meta.readingTimeMinutes} min
          </p>
        </header>
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
        {mdx}
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

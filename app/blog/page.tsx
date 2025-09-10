import { Content } from "@/lib/content";
import type { Metadata } from "next";
import PostCard from "@/components/blog/PostCard";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Blog | Muhammad Moiz",
  description: "Notes on building web products and ML features.",
  alternates: { canonical: "https://www.moizofficial.com/blog" },
  openGraph: {
    type: "website",
    url: "https://www.moizofficial.com/blog",
    title: "Blog",
    images: [
      {
        url: "/images/profile.jpg",
        width: 1200,
        height: 630,
        alt: "Blog – default image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@zahid_moiz",
    images: ["/images/profile.jpg"],
  },
};

export default function BlogPage() {
  const posts = Content.posts();
  return (
    <div className="pt-24">
      <section className="relative pb-10 pt-6 sm:pt-10">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-primary-500/10 via-transparent to-transparent dark:from-primary-400/10" />
        <div className="container-custom">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-5 bg-gradient-to-r from-primary-600 via-primary-500 to-primary-400 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
              Blog & Insights
            </h1>
            <p className="mx-auto max-w-2xl text-base text-muted-foreground sm:text-lg">
              Notes on building web products, ML features & entrepreneurial
              lessons. Fresh, concise & practical.
            </p>
          </div>
        </div>
      </section>
      <div className="container-custom pb-24">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-medium text-primary-600 dark:text-primary-400">
            <span className="inline-flex items-center rounded-full bg-primary-100 px-3 py-1 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300">
              {posts.length} Posts
            </span>
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <PostCard key={post.slug} post={post} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

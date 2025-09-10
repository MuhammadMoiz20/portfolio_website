import { Content } from "@/lib/content";
import type { Metadata } from "next";

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
    images: [{ url: "/images/profile.jpg", alt: "Blog – default image" }],
  },
};

export default function BlogPage() {
  const posts = Content.posts();
  return (
    <div className="pt-20">
      <section className="py-16">
        <div className="container-custom text-center">
          <h1 className="mb-4 text-5xl font-bold">Blog</h1>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Notes on building web products and ML features.
          </p>
        </div>
      </section>
      <div className="container-custom grid gap-6 pb-16 md:grid-cols-2">
        {posts.map((post) => (
          <a
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group rounded-lg border p-5 transition-colors hover:bg-muted"
          >
            <h3 className="mb-2 text-xl font-semibold group-hover:underline group-hover:underline-offset-4">
              {post.title}
            </h3>
            {post.summary && (
              <p className="text-sm text-muted-foreground">{post.summary}</p>
            )}
            <div className="mt-3 text-xs text-muted-foreground">
              {new Date(post.date).toLocaleDateString()} •{" "}
              {post.readingTimeMinutes} min
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

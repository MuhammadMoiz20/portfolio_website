import { Content } from "@/lib/content";
import type { ContentItemMeta } from "@/lib/mdx";
import { blogPosts } from "@/data/blog";

/**
 * Returns a unified list of all blog entries on the site:
 * - MDX posts from `content/posts`
 * - Data-driven posts from `data/blog.ts`
 *
 * The result conforms to `ContentItemMeta` used across the app.
 */
export function getAllBlogs(): ContentItemMeta[] {
  const mdxPosts = Content.posts();

  const dataPosts: ContentItemMeta[] = blogPosts.map((p) => {
    // Basic reading time estimate if content provided (200 wpm). Optional field.
    let readingTimeMinutes: number | undefined = undefined;
    if (p.content) {
      const wordCount = p.content.trim().split(/\s+/).length;
      readingTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));
    }

    return {
      title: p.title,
      date: p.date,
      summary: p.excerpt,
      tags: p.tags,
      cover: p.image,
      slug: p.slug,
      readingTimeMinutes,
    } as ContentItemMeta;
  });

  return [...mdxPosts, ...dataPosts].sort((a, b) => (a.date > b.date ? -1 : 1));
}

// Convenience export for static contexts
export const allBlogs: ContentItemMeta[] = getAllBlogs();

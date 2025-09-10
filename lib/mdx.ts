import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { z } from "zod";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";

export type ContentType = "posts" | "projects";

export const frontmatterSchema = z.object({
  title: z.string(),
  date: z.string(),
  summary: z.string().optional(),
  tags: z.array(z.string()).optional(),
  cover: z.string().optional(),
  draft: z.boolean().optional(),
  links: z
    .object({
      repo: z.string().url().optional(),
      backend: z.string().url().optional(),
      app: z.string().url().optional(),
      live: z.string().url().optional(),
      caseStudy: z.string().url().optional(),
    })
    .optional(),
  metrics: z
    .object({
      stars: z.number().optional(),
      users: z.number().optional(),
      downloads: z.number().optional(),
    })
    .optional(),
  gallery: z
    .object({
      images: z
        .array(
          z.union([
            z.string(),
            z.object({ src: z.string(), alt: z.string().optional() }),
          ]),
        )
        .optional(),
      videos: z
        .array(
          z.union([
            z.string(),
            z.object({
              src: z.string(),
              poster: z.string().optional(),
              title: z.string().optional(),
            }),
          ]),
        )
        .optional(),
    })
    .optional(),
});

export type Frontmatter = z.infer<typeof frontmatterSchema>;

export interface ContentItemMeta extends Frontmatter {
  slug: string;
  readingTimeMinutes?: number;
}

const CONTENT_DIR = path.join(process.cwd(), "content");

export function getContentDir(type: ContentType) {
  return path.join(CONTENT_DIR, type);
}

export function getAllSlugs(type: ContentType): string[] {
  const dir = getContentDir(type);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function readContentFile(type: ContentType, slug: string) {
  const fullPath = path.join(getContentDir(type), `${slug}.mdx`);
  const file = fs.readFileSync(fullPath, "utf8");
  const { content, data } = matter(file);
  const parsed = frontmatterSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error(
      `Invalid frontmatter for ${type}/${slug}: ${parsed.error.message}`,
    );
  }
  const stats = readingTime(content);
  return {
    content,
    meta: {
      ...parsed.data,
      slug,
      readingTimeMinutes: Math.ceil(stats.minutes),
    } as ContentItemMeta,
  };
}

export function getAllContent(type: ContentType): ContentItemMeta[] {
  return getAllSlugs(type)
    .map((slug) => readContentFile(type, slug).meta)
    .filter((m) => !m.draft)
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}

export async function compileContentMDX(source: string) {
  const prettyOptions = {
    theme: "github-dark",
  } as any;

  const { content } = await compileMDX<{ [key: string]: unknown }>({
    source,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        rehypePlugins: [
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: "wrap" }],
          [rehypePrettyCode, prettyOptions],
        ],
      },
    },
    components: {},
  });
  return content;
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

interface PostMetaLike {
  slug: string;
  title: string;
  summary?: string;
  date: string;
  readingTimeMinutes?: number;
  cover?: string;
}

interface PostCardProps {
  post: PostMetaLike;
  index: number;
}

/**
 * PostCard – modern elevated card for MDX driven posts
 */
export default function PostCard({ post, index }: PostCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block"
      aria-label={`Read ${post.title}`}
    >
      <motion.article
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.05 }}
        className="relative flex flex-col overflow-hidden rounded-xl border bg-gradient-to-br from-background/60 to-background/20 shadow-sm ring-1 ring-border/50 backdrop-blur-sm transition-all hover:shadow-xl hover:ring-primary-400/60 dark:hover:ring-primary-300/60"
      >
        {post.cover && (
          <div className="relative aspect-[16/9] w-full overflow-hidden">
            <Image
              src={post.cover}
              alt={post.title}
              fill
              sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              priority={index < 3}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-black/0 opacity-60 mix-blend-multiply dark:opacity-50" />
          </div>
        )}
        <div className="flex flex-1 flex-col p-5">
          <h3 className="mb-2 line-clamp-2 bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-xl font-semibold text-transparent dark:from-primary-400 dark:to-primary-300">
            {post.title}
          </h3>
          {post.summary && (
            <p className="mb-4 line-clamp-3 text-sm text-muted-foreground/90">
              {post.summary}
            </p>
          )}
          <div className="mt-auto flex items-center gap-2 pt-2 text-xs font-medium text-muted-foreground">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </time>
            <span>•</span>
            {post.readingTimeMinutes && (
              <span>{post.readingTimeMinutes} min read</span>
            )}
          </div>
          <div className="absolute inset-0 rounded-xl ring-0 ring-inset transition-all group-hover:ring-4 group-hover:ring-primary-500/20" />
        </div>
      </motion.article>
    </Link>
  );
}

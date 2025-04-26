'use client';

import { motion } from 'framer-motion';
import { BlogPost } from '@/data/blog';
import BlogCard from './BlogCard';

interface BlogGridProps {
  posts: BlogPost[];
  title?: string;
  description?: string;
  category?: string;
}

/**
 * BlogGrid component displays a collection of blog posts in a grid layout
 * Can optionally show a title, description, and filter posts by category
 */
export default function BlogGrid({ 
  posts, 
  title, 
  description, 
  category 
}: BlogGridProps) {
  // Filter posts by category if a category is provided
  const displayPosts = category 
    ? posts.filter(post => post.category === category)
    : posts;

  return (
    <div className="container-custom py-16">
      {/* Optional header section */}
      {(title || description) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          {title && <h2 className="mb-4 text-3xl font-bold">{title}</h2>}
          {description && (
            <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-400">
              {description}
            </p>
          )}
          {category && (
            <div className="mt-4">
              <span className="inline-block rounded-full bg-primary-100 px-4 py-2 text-sm font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300">
                Category: {category}
              </span>
            </div>
          )}
        </motion.div>
      )}

      {/* Blog posts grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {displayPosts.map((post, index) => (
          <BlogCard key={post.id} post={post} index={index} />
        ))}
      </div>

      {/* No posts message */}
      {displayPosts.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            No posts found{category ? ` in the "${category}" category` : ''}.
          </p>
        </div>
      )}
    </div>
  );
}

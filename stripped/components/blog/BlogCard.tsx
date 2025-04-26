'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCalendar } from 'react-icons/fi';
import { BlogPost } from '@/data/blog';

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

export default function BlogCard({ post, index }: BlogCardProps) {
  
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="card overflow-hidden"
    >
      <div className="relative mb-4 h-48 w-full overflow-hidden rounded-lg">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div>
        <div className="mb-3 flex items-center justify-between">
          <span className="inline-block rounded-full bg-primary-100 px-3 py-1 text-xs font-medium text-primary-600 dark:bg-primary-900 dark:text-primary-400">
            {post.category}
          </span>
          <span className="flex items-center text-xs text-gray-500 dark:text-gray-400">
            <FiCalendar className="mr-1" size={14} />
            {formattedDate}
          </span>
        </div>
        <h3 className="mb-2 text-xl font-bold hover:text-primary-600 dark:hover:text-primary-400">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>
        <p className="mb-4 text-gray-600 dark:text-gray-400">{post.excerpt}</p>
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
        >
          Read more <FiArrowRight className="ml-2" />
        </Link>
      </div>
    </motion.div>
  );
}

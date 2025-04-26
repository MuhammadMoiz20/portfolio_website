'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { FiCalendar, FiClock, FiUser, FiTag, FiShare2, FiTwitter, FiLinkedin, FiFacebook } from 'react-icons/fi';
import Badge from '@/components/ui/Badge';
import Breadcrumb from '@/components/navigation/Breadcrumb';
import { formatDate } from '@/utils/helpers';
import { BlogPost as BlogPostType } from '@/data/blog';

interface BlogPostProps {
    post: BlogPostType;
  
    relatedPosts?: BlogPostType[];
  
    showShareButtons?: boolean;
  
    showTableOfContents?: boolean;
  
    showAuthor?: boolean;
  
    readingTime?: number;
}

export default function BlogPost({
  post,
  relatedPosts = [],
  showShareButtons = true,
  showTableOfContents = true,
  showAuthor = true,
  readingTime,
}: BlogPostProps) {
  const pathname = usePathname();
  const [calculatedReadingTime, setCalculatedReadingTime] = useState(readingTime || 0);
  const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([]);
  
  
  useEffect(() => {
    if (!readingTime && post.content) {
      
      const wordCount = post.content.trim().split(/\s+/).length;
      setCalculatedReadingTime(Math.max(1, Math.ceil(wordCount / 225)));
    }
  }, [post.content, readingTime]);
  
  
  useEffect(() => {
    if (showTableOfContents && post.content) {
      
      const headingRegex = /<h([2-3])[^>]*id="([^"]*)"[^>]*>(.*?)<\/h\1>/g;
      const extractedHeadings: { id: string; text: string; level: number }[] = [];
      
      let match;
      while ((match = headingRegex.exec(post.content)) !== null) {
        extractedHeadings.push({
          level: parseInt(match[1], 10),
          id: match[2],
          text: match[3].replace(/<[^>]*>/g, ''), // Remove any HTML tags inside heading
        });
      }
      
      setHeadings(extractedHeadings);
    }
  }, [post.content, showTableOfContents]);
  
  // Generate share URLs
  const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}${pathname}` : '';
  const shareTitle = encodeURIComponent(post.title);
  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${shareTitle}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
  };

  return (
    <article className="mx-auto max-w-4xl">
      {}
      <Breadcrumb 
        autoGenerate={true}
        pathDisplayNames={{ blog: 'Blog' }}
        className="mb-6"
      />
      
      {}
      <div className="relative mb-8 h-64 w-full overflow-hidden rounded-xl sm:h-80 md:h-96">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
      </div>
      
      {}
      <header className="mb-8">
        <div className="mb-4 flex flex-wrap gap-2">
          <Badge 
            color="primary" 
            href={`/blog?category=${encodeURIComponent(post.category)}`}
            pill={true}
          >
            <FiTag className="mr-1" />
            {post.category}
          </Badge>
          
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <FiCalendar className="mr-1" />
            {formatDate(post.date)}
          </div>
          
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <FiClock className="mr-1" />
            {calculatedReadingTime} min read
          </div>
        </div>
        
        <h1 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl">
          {post.title}
        </h1>
        
        <p className="text-xl text-gray-600 dark:text-gray-400">
          {post.excerpt}
        </p>
      </header>
      
      <div className="flex flex-col lg:flex-row lg:gap-8">
        {}
        <div className="lg:w-2/3">
          {}
          {showAuthor && post.author && (
            <div className="mb-8 flex items-center rounded-xl bg-gray-50 p-4 dark:bg-gray-800">
              {post.author.avatar && (
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  width={50}
                  height={50}
                  className="mr-4 rounded-full"
                />
              )}
              <div>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <FiUser className="mr-1" />
                  Written by
                </div>
                <div className="font-medium">
                  {post.author.name}
                  {post.author.title && (
                    <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                      {post.author.title}
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {}
          <div 
            className="prose max-w-none prose-img:rounded-xl dark:prose-invert lg:prose-lg"
            dangerouslySetInnerHTML={{ __html: post.content || '' }}
          />
          
          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="my-8">
              <h3 className="mb-2 text-lg font-medium">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <Badge 
                    key={tag} 
                    color="secondary" 
                    href={`/blog?tag=${encodeURIComponent(tag)}`}
                    pill={true}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          {/* Share buttons */}
          {showShareButtons && (
            <div className="my-8 border-t border-b border-gray-200 py-6 dark:border-gray-700">
              <h3 className="mb-4 flex items-center text-lg font-medium">
                <FiShare2 className="mr-2" />
                Share this post
              </h3>
              <div className="flex gap-2">
                <a
                  href={shareLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1DA1F2] text-white transition-transform hover:scale-110"
                  aria-label="Share on Twitter"
                >
                  <FiTwitter size={18} />
                </a>
                <a
                  href={shareLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#4267B2] text-white transition-transform hover:scale-110"
                  aria-label="Share on Facebook"
                >
                  <FiFacebook size={18} />
                </a>
                <a
                  href={shareLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0A66C2] text-white transition-transform hover:scale-110"
                  aria-label="Share on LinkedIn"
                >
                  <FiLinkedin size={18} />
                </a>
              </div>
            </div>
          )}
        </div>
        
        {/* Sidebar column */}
        <div className="lg:w-1/3">
          <div className="sticky top-24">
            {/* Table of contents */}
            {showTableOfContents && headings.length > 0 && (
              <div className="mb-8 rounded-xl border border-gray-200 p-4 dark:border-gray-700">
                <h3 className="mb-4 text-lg font-medium">Table of Contents</h3>
                <nav>
                  <ul className="space-y-2 text-sm">
                    {headings.map((heading) => (
                      <li 
                        key={heading.id}
                        className={`${
                          heading.level === 2 ? 'ml-0' : 'ml-4'
                        }`}
                      >
                        <a
                          href={`#${heading.id}`}
                          className="text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                        >
                          {heading.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            )}
            
            {/* Related posts */}
            {relatedPosts.length > 0 && (
              <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-700">
                <h3 className="mb-4 text-lg font-medium">Related Posts</h3>
                <div className="space-y-4">
                  {relatedPosts.map((relatedPost) => (
                    <div key={relatedPost.id} className="flex items-start">
                      {relatedPost.image && (
                        <Link 
                          href={`/blog/${relatedPost.slug}`}
                          className="mr-3 block h-16 w-16 flex-shrink-0 overflow-hidden rounded-md"
                        >
                          <Image
                            src={relatedPost.image}
                            alt={relatedPost.title}
                            width={64}
                            height={64}
                            className="h-full w-full object-cover"
                          />
                        </Link>
                      )}
                      <div>
                        <Link
                          href={`/blog/${relatedPost.slug}`}
                          className="block font-medium hover:text-primary-600 dark:hover:text-primary-400"
                        >
                          {relatedPost.title}
                        </Link>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {formatDate(relatedPost.date)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Next/Prev navigation */}
      {(post.previousPost || post.nextPost) && (
        <div className="mt-12 grid gap-4 border-t border-gray-200 pt-8 dark:border-gray-700 sm:grid-cols-2">
          {post.previousPost && (
            <Link
              href={`/blog/${post.previousPost.slug}`}
              className="group flex flex-col rounded-lg border border-gray-200 p-4 transition-colors hover:border-primary-500 dark:border-gray-700 dark:hover:border-primary-500"
            >
              <span className="text-sm text-gray-500 dark:text-gray-400">Previous Post</span>
              <span className="mt-1 font-medium group-hover:text-primary-600 dark:group-hover:text-primary-400">
                {post.previousPost.title}
              </span>
            </Link>
          )}
          
          {post.nextPost && (
            <Link
              href={`/blog/${post.nextPost.slug}`}
              className="group flex flex-col rounded-lg border border-gray-200 p-4 text-right transition-colors hover:border-primary-500 dark:border-gray-700 dark:hover:border-primary-500"
            >
              <span className="text-sm text-gray-500 dark:text-gray-400">Next Post</span>
              <span className="mt-1 font-medium group-hover:text-primary-600 dark:group-hover:text-primary-400">
                {post.nextPost.title}
              </span>
            </Link>
          )}
        </div>
      )}
    </article>
  );
}

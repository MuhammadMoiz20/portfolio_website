'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { blogPosts } from '@/data/blog';
import BlogGrid from '@/components/blog/BlogGrid';


import SEO from '@/components/utils/SEO';

export default function BlogPage() {
  const allCategories = Array.from(new Set(blogPosts.map(post => post.category)));
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);


  useEffect(() => {
    let result = [...blogPosts];
    
    if (selectedCategory) {
      result = result.filter(post => post.category === selectedCategory);
    }
    

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        post => 
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.category.toLowerCase().includes(query)
      );
    }
    
    setFilteredPosts(result);
  }, [selectedCategory, searchQuery]);

  return (
    <>
      <SEO
        title="Blog & Insights | Muhammad Moiz Portfolio"
        description="Read articles, insights, and stories by Muhammad Moiz on technology, design, software engineering, and personal growth."
        canonicalUrl="https://www.moizofficial.com/blog"
        ogImage="/logo.png"
        keywords={["Muhammad Moiz", "Blog", "Insights", "Technology", "Software Engineering", "Personal Growth"]}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Blog",
          "name": "Blog & Insights | Muhammad Moiz Portfolio",
          "description": "Read articles, insights, and stories by Muhammad Moiz on technology, design, software engineering, and personal growth.",
          "url": "https://www.moizofficial.com/blog"
        }}
      />
      <div className="pt-20">
      {/* Header Section */}
      <section className="bg-gradient-to-b from-secondary-50 to-white py-16 dark:from-gray-900 dark:to-gray-800">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">Blog & Insights</h1>
            <p className="mx-auto mb-8 max-w-2xl text-gray-600 dark:text-gray-400">
              Thoughts, ideas, and insights on technology, design, and my journey as a Dartmouth student.
            </p>
            

            <div className="mx-auto mb-8 max-w-md">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 pr-10 focus:border-secondary-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
                <button
                  onClick={() => setSearchQuery('')}
                  className={`absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 ${
                    !searchQuery ? 'hidden' : ''
                  }`}
                  aria-label="Clear search"
                >
                  ✕
                </button>
              </div>
            </div>
            

            <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  selectedCategory === null
                    ? 'bg-secondary-600 text-white dark:bg-secondary-500'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                All
              </button>
              
              {allCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-secondary-600 text-white dark:bg-secondary-500'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Blog Grid Section */}
      <BlogGrid 
        posts={filteredPosts} 
        category={selectedCategory || undefined}
      />

      {/* Newsletter Section */}
      <section className="bg-gray-50 py-16 dark:bg-gray-900">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl rounded-xl bg-white p-8 shadow-xl dark:bg-gray-800">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="mb-4 text-2xl font-bold">Subscribe to my newsletter</h2>
              <p className="mb-6 text-gray-600 dark:text-gray-400">
                Get the latest posts and updates delivered straight to your inbox.
              </p>
              <form className="mx-auto flex max-w-md flex-col gap-4 sm:flex-row">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-secondary-500 focus:outline-none dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                  required
                />
                <button
                  type="submit"
                  className="rounded-lg bg-secondary-600 px-6 py-2 font-medium text-white transition-colors hover:bg-secondary-700 dark:bg-secondary-500 dark:hover:bg-secondary-600"
                >
                  Subscribe
                </button>
              </form>
              <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
                I respect your privacy. Unsubscribe at any time.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}

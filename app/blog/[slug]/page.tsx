'use client';

import { useEffect, useState } from 'react';
import type { BlogPost } from '@/data/blog';
import { notFound } from 'next/navigation';
import { blogPosts } from '@/data/blog';
import BlogPostComponent from '@/components/blog/BlogPost';
import SEO from '@/components/utils/SEO';
import Layout from '@/components/layout/Layout';
import Loading from '@/components/ui/Loading';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}


export default function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = params;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const currentPost = blogPosts.find((post) => post.slug === slug);
    
    if (!currentPost) {

      notFound();
      return;
    }
    

    const related = blogPosts
      .filter((p) => 
        p.id !== currentPost.id && // Not the current post
        (
          p.category === currentPost.category || // Same category
          (p.tags && currentPost.tags && 
           p.tags.some(tag => currentPost.tags.includes(tag))) // Common tags
        )
      )
      .slice(0, 3); // Limit to 3 related posts
    

    setTimeout(() => {
      setPost(currentPost);
      setRelatedPosts(related);
      setLoading(false);
    }, 300);
  }, [slug]);
  
  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto mt-20 px-4 py-16">
          <div className="flex items-center justify-center py-12">
            <Loading size="lg" text="Loading post..." />
          </div>
        </div>
      </Layout>
    );
  }

  if (!post) return null;
  return (
    <>
      <SEO
        title={post.title}
        description={post.excerpt}
        canonicalUrl={`https://www.moizofficial.com/blog/${post.slug}`}
        ogImage={post.image}
        keywords={post.tags || []}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": post.title,
          "description": post.excerpt,
          "image": `https://www.moizofficial.com${post.image}`,
          "author": {
            "@type": "Person",
            "name": "Muhammad Moiz",
            "url": "https://www.moizofficial.com/",
            "sameAs": [
              "https://x.com/zahid_moiz",
              "https://www.linkedin.com/in/moizofficial/",
              "https://github.com/MuhammadMoiz20"
            ]
          },
          "datePublished": post.date,
          "publisher": {
            "@type": "Person",
            "name": "Muhammad Moiz",
            "url": "https://www.moizofficial.com/"
          },
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://www.moizofficial.com/blog/${post.slug}`
          }
        }}
      />
      
      <Layout>
        <div className="container mx-auto mt-20 px-4 py-8">
          <BlogPostComponent post={post} relatedPosts={relatedPosts} />
        </div>
      </Layout>
    </>
  );
}

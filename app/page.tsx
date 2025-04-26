'use client';

import { useState, useEffect } from 'react';
import SEO from '@/components/utils/SEO';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCode, FiLayers, FiMonitor } from 'react-icons/fi';
import HeroSection from '@/components/home/HeroSection';
import SkillsSection from '@/components/home/SkillsSection';
import ProjectsPreview from '@/components/home/ProjectsPreview';
import ContactCTA from '@/components/home/ContactCTA';
import BlogGrid from '@/components/blog/BlogGrid';
import { blogPosts } from '@/data/blog';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      <SEO
        title="Muhammad Moiz – Dartmouth Junior, System Developer"
        description="Junior at Dartmouth College | Computer Science | System Developer | Seeking Software Engineering Roles | Infrastructure, Systems Design, React"
        canonicalUrl="https://www.moizofficial.com/"
        ogImage="/logo.png"
        keywords={["Muhammad Moiz", "Dartmouth", "System Developer", "Software Engineering", "React", "Portfolio"]}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Muhammad Moiz",
          "url": "https://www.moizofficial.com/",
          "sameAs": [
            "https://x.com/zahid_moiz",
            "https://www.linkedin.com/in/moizofficial/",
            "https://github.com/MuhammadMoiz20"
          ],
          "jobTitle": "Junior at Dartmouth College",
          "description": "Junior at Dartmouth College | Computer Science | System Developer | Seeking Software Engineering Roles | Infrastructure, Systems Design, React",
          "image": "/logo.png"
        }}
      />
      <div className="pt-16">
      <HeroSection />
      <SkillsSection />
      <ProjectsPreview />
      <section className="bg-gray-50 py-16 dark:bg-gray-900">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold">Achievements</h2>
            <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-400">
              Highlights from my academic and professional journey as a Dartmouth Junior.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card"
              >
                <div className="mb-4 rounded-full bg-primary-100 p-3 text-primary-600 dark:bg-primary-900 dark:text-primary-400">
                  <achievement.icon size={24} />
                </div>
                <h3 className="mb-2 text-xl font-bold">{achievement.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{achievement.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      <section className="py-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold">Latest Insights</h2>
            <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-400">
              Thoughts and perspectives on technology, design, and the digital landscape.
            </p>
          </motion.div>

          <BlogGrid
            posts={blogPosts.slice(0, 3)}
            title={undefined}
            description={undefined}
          />

          <div className="mt-10 text-center">
            <Link href="/blog" className="btn-outline">
              View all posts
            </Link>
          </div>
        </div>
      </section>

      <ContactCTA />
    </div>
    </>
  );
}

const achievements = [
  {
    title: 'Visionary Team Leader, Chief Architect of Maves Apparel Founder and Growth Strategist',
    description: 'Built and scaled Maves Apparel from the ground up into a fashion blog with 30,000 monthly visitors and a 20+ person team while still being a full-time student.',
    icon: FiCode,
  },  {
    title: 'UAF Hackathon',
    description: 'First place at the UAF Hackathon for innovative digital solution.',
    icon: FiLayers,
  },
  {
    title: 'Featured Projects from Dartmouth',
    description: 'A showcase of innovative tools including the Dartmouth News Scraper, Instagram Archive Pro, and YouTube Data Scraper, built to streamline digital content archiving and data collection.',
    icon: FiMonitor,
  },
];


'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiX, FiGithub, FiExternalLink } from 'react-icons/fi';
import { projects } from '@/data/projects';
import SEO from '@/components/utils/SEO';

export default function ProjectsPage() {
  const allTags = Array.from(new Set(projects.flatMap(project => project.tags)));
  
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProjects, setFilteredProjects] = useState(projects);

  useEffect(() => {
    let result = [...projects];
    

    if (selectedTag) {
      result = result.filter(project => project.tags.includes(selectedTag));
    }
    

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        project => 
          project.title.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query) ||
          project.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    setFilteredProjects(result);
  }, [selectedTag, searchQuery]);

  return (
    <>
      <SEO
        title="Projects | Muhammad Moiz Portfolio"
        description="A showcase of Muhammad Moiz's work, including web applications, design projects, and coding experiments."
        canonicalUrl="https://www.moizofficial.com/projects"
        ogImage="/logo.png"
        keywords={["Muhammad Moiz", "Projects", "Portfolio", "Web Development", "React", "Showcase"]}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Projects | Muhammad Moiz Portfolio",
          "description": "A showcase of Muhammad Moiz's work, including web applications, design projects, and coding experiments.",
          "url": "https://www.moizofficial.com/projects"
        }}
      />

    <div className="pt-20">

      <section className="bg-gradient-to-b from-blue-50 to-white py-16 dark:from-gray-900 dark:to-gray-800">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">My Projects</h1>
            <p className="mx-auto mb-8 max-w-2xl text-gray-600 dark:text-gray-400">
              A showcase of my work, including web applications, design projects, and coding experiments.
            </p>
            

            <div className="mx-auto mb-8 max-w-md">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-10 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-800"
                />
                <button
                  onClick={() => setSearchQuery('')}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-gray-500 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 ${!searchQuery ? 'hidden' : ''}`}
                  aria-label="Clear search"
                >
                  <FiX size={16} />
                </button>
              </div>
            </div>
            

            <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={() => setSelectedTag(null)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${selectedTag === null ? 'bg-blue-600 text-white dark:bg-blue-500' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'}`}
              >
                All
              </button>
              
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${selectedTag === tag ? 'bg-blue-600 text-white dark:bg-blue-500' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'}`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container-custom py-16">
        {filteredProjects.length === 0 ? (
          <div className="py-12 text-center text-gray-600 dark:text-gray-400">
            <p>No projects found{selectedTag ? ` with the tag "${selectedTag}"` : ''}.</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:-translate-y-1 hover:shadow-lg dark:bg-gray-800 dark:shadow-gray-900/30"
              >
                <div className="relative aspect-video w-full overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
                <div className="flex flex-grow flex-col p-6">
                  <div className="mb-4 flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-gray-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                    {project.title}
                  </h3>
                  <p className="mb-4 flex-grow text-gray-600 dark:text-gray-400">
                    {project.description}
                  </p>
                  <div className="mt-4 flex items-center gap-4">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-gray-700 transition-colors hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                        aria-label="View GitHub Repository"
                      >
                        <FiGithub className="mr-2" size={18} />
                        <span className="text-sm">Code</span>
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-gray-700 transition-colors hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                        aria-label="View Live Demo"
                      >
                        <FiExternalLink className="mr-2" size={18} />
                        <span className="text-sm">Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <section className="bg-gray-50 py-16 dark:bg-gray-900">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-4 text-3xl font-bold">Interested in working together?</h2>
            <p className="mx-auto mb-8 max-w-2xl text-gray-600 dark:text-gray-400">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>
            <a href="/contact" className="inline-block rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
              Get In Touch
            </a>
          </motion.div>
        </div>
      </section>
    </div>
    </>
  );
}

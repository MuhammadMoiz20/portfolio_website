'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import { Project } from '@/data/projects';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group rounded-3xl bg-white/30 dark:bg-gray-900/30 backdrop-blur-md shadow-2xl border border-white/20 dark:border-gray-800/40 overflow-hidden p-0 transition-all duration-500 hover:scale-[1.025] hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] hover:border-primary-400/60"
    >
      <div className="relative aspect-video w-full overflow-hidden max-h-[400px]">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110 group-hover:blur-[2px]"
          priority={index < 3}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-700/70 via-transparent to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      <div className="p-4 sm:p-6">
        <div className="mb-3 sm:mb-4 flex flex-wrap gap-2">
          {project.tags.map((tag, tagIndex) => (
            <span
              key={tagIndex}
              className="rounded-full bg-gradient-to-r from-primary-400 via-primary-200 to-secondary-400/80 px-3 py-1 text-xs font-semibold text-gray-800 dark:text-white shadow-md backdrop-blur-sm border border-white/30 dark:border-gray-700/30"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="mb-1 sm:mb-2 text-2xl font-extrabold tracking-tight transition-colors group-hover:text-primary-500 dark:group-hover:text-primary-300 drop-shadow-[0_2px_8px_rgba(14,165,233,0.08)]">
          {project.title}
        </h3>
        <p className="mb-3 sm:mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
          {project.description}
        </p>
        <div className="mt-4 sm:mt-6 flex flex-wrap items-center gap-3 sm:gap-4">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center rounded-full bg-white/40 dark:bg-gray-800/60 px-4 py-2 text-gray-800 dark:text-gray-200 shadow hover:bg-primary-500/80 hover:text-white dark:hover:bg-primary-400/80 dark:hover:text-gray-900 transition-all duration-300 backdrop-blur-md border border-white/20 dark:border-gray-700/30"
            aria-label="View GitHub Repository"
          >
            <FiGithub className="mr-2" size={18} />
            <span className="text-sm font-semibold">Code</span>
          </a>
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center rounded-full bg-gradient-to-r from-primary-500 via-secondary-400 to-primary-300 px-4 py-2 text-white shadow hover:from-primary-700 hover:to-secondary-600 transition-all duration-300 font-semibold"
            aria-label="View Live Demo"
          >
            <FiExternalLink className="mr-2" size={18} />
            <span className="text-sm">Demo</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
}

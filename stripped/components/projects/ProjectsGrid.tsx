'use client';

import { motion } from 'framer-motion';
import { Project } from '@/data/projects';
import ProjectCard from './ProjectCard';

interface ProjectsGridProps {
  projects: Project[];
  title?: string;
  description?: string;
  filteredTag?: string;
}

export default function ProjectsGrid({ 
  projects, 
  title, 
  description, 
  filteredTag 
}: ProjectsGridProps) {
  
  const displayProjects = filteredTag 
    ? projects.filter(project => project.tags.includes(filteredTag))
    : projects;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      {}
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
          {filteredTag && (
            <div className="mt-4">
              <span className="inline-block rounded-full bg-primary-100 px-4 py-2 text-sm font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300">
                Filtered by: {filteredTag}
              </span>
            </div>
          )}
        </motion.div>
      )}

      {}
      <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
        {displayProjects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>

      {}
      {displayProjects.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            No projects found{filteredTag ? ` with the tag "${filteredTag}"` : ''}.
          </p>
        </div>
      )}
    </div>
  );
}

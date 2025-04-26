'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FiExternalLink, FiChevronDown, FiChevronUp, FiBriefcase, FiCalendar, FiMapPin } from 'react-icons/fi';
import { TimelineItem } from './Timeline';

interface ExperienceTimelineItemProps {
    experience: TimelineItem & {
        logo?: string;
    
        responsibilities?: string[];
    
        technologies?: string[];
  };
  
    expandedByDefault?: boolean;
  
    initialResponsibilitiesShown?: number;
  
    className?: string;
}

export default function ExperienceTimelineItem({
  experience,
  expandedByDefault = false,
  initialResponsibilitiesShown = 2,
  className = '',
}: ExperienceTimelineItemProps) {
  const [expanded, setExpanded] = useState(expandedByDefault);
  
    const toggleExpanded = () => {
    setExpanded((prev) => !prev);
  };
  
  const {
    title,
    subtitle,
    date,
    location,
    logo,
    url,
    responsibilities = [],
    technologies = [],
  } = experience;
  
  
  const visibleResponsibilities = expanded
    ? responsibilities
    : responsibilities.slice(0, initialResponsibilitiesShown);
  
  
  const showExpandButton = responsibilities.length > initialResponsibilitiesShown;

  return (
    <div className={`rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800 ${className}`}>
      <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
        {}
        {logo && (
          <div className="flex-shrink-0">
            <div className="relative h-16 w-16 overflow-hidden rounded-md">
              <Image
                src={logo}
                alt={subtitle || title}
                fill
                sizes="64px"
                className="object-contain"
              />
            </div>
          </div>
        )}
        
        {}
        <div className="flex-grow">
          {}
          <div className="mb-2">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              {title}
              {url && (
                <a 
                  href={url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="ml-2 inline-flex items-center text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                  aria-label={`Visit ${subtitle || title} website`}
                >
                  <FiExternalLink size={18} />
                </a>
              )}
            </h3>
            
            {subtitle && (
              <p className="flex items-center text-base font-semibold text-gray-700 dark:text-gray-300">
                <FiBriefcase className="mr-1" size={16} />
                {subtitle}
              </p>
            )}
            
            <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500 dark:text-gray-400">
              {date && (
                <span className="flex items-center">
                  <FiCalendar className="mr-1" size={14} />
                  {date}
                </span>
              )}
              
              {location && (
                <span className="flex items-center">
                  <FiMapPin className="mr-1" size={14} />
                  {location}
                </span>
              )}
            </div>
          </div>
          
          {}
          {responsibilities.length > 0 && (
            <div className="mb-3">
              <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-700 dark:text-gray-300">
                Responsibilities & Achievements
              </h4>
              
              <ul className="list-inside list-disc space-y-1 text-gray-600 dark:text-gray-400">
                {visibleResponsibilities.map((responsibility, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className="text-sm"
                  >
                    {responsibility}
                  </motion.li>
                ))}
              </ul>
              
              {}
              {showExpandButton && (
                <button
                  onClick={toggleExpanded}
                  className="mt-2 flex items-center text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                >
                  {expanded ? (
                    <>
                      <FiChevronUp className="mr-1" size={16} />
                      Show less
                    </>
                  ) : (
                    <>
                      <FiChevronDown className="mr-1" size={16} />
                      Show more ({responsibilities.length - initialResponsibilitiesShown} more)
                    </>
                  )}
                </button>
              )}
            </div>
          )}
          
          {}
          {technologies.length > 0 && (
            <div>
              <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-700 dark:text-gray-300">
                Technologies
              </h4>
              
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-medium text-primary-700 dark:bg-primary-900/30 dark:text-primary-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

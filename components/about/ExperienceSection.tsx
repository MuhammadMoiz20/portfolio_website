'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiFilter, FiBriefcase } from 'react-icons/fi';
import SectionHeading from '@/components/ui/SectionHeading';
import Timeline from '@/components/timeline/Timeline';
import ExperienceTimelineItem from '@/components/timeline/ExperienceTimelineItem';
import { TimelineItem } from '@/components/timeline/Timeline';


export interface ExperienceItem extends TimelineItem {
  /**
   * Company/organization logo
   */
  logo?: string;
  
  /**
   * Detailed responsibilities or achievements
   */
  responsibilities?: string[];
  
  /**
   * Technologies or skills used
   */
  technologies?: string[];
  
  /**
   * Type of experience (e.g., "Full-time", "Contract", "Internship")
   */
  type?: string;
}

interface ExperienceSectionProps {
  /**
   * Section title
   * @default 'Professional Experience'
   */
  title?: string;
  
  /**
   * Section subtitle
   */
  subtitle?: string;
  
  /**
   * Array of experience items
   */
  experiences: ExperienceItem[];
  
  /**
   * Enable filtering by experience type
   * @default true
   */
  enableFiltering?: boolean;
  
  /**
   * Visual style for experience items
   * @default 'detailed'
   */
  displayStyle?: 'detailed' | 'timeline' | 'compact';
  
  /**
   * Show all responsibilities by default (otherwise shows 2 initially)
   * @default false
   */
  expandedByDefault?: boolean;
  
  /**
   * Custom CSS class
   */
  className?: string;
}

/**
 * ExperienceSection component
 * Displays professional experience in various formats
 */
export default function ExperienceSection({
  title = 'Professional Experience',
  subtitle,
  experiences,
  enableFiltering = true,
  displayStyle = 'detailed',
  expandedByDefault = false,
  className = '',
}: ExperienceSectionProps) {
  const [activeType, setActiveType] = useState<string | null>(null);
  
  // Extract all unique experience types
  const types = enableFiltering
    ? Array.from(new Set(experiences.filter(exp => exp.type).map(exp => exp.type)))
    : [];
  
  // Filter experiences by type
  const filteredExperiences = activeType
    ? experiences.filter(exp => exp.type === activeType)
    : experiences;
  
  // Sort experiences by date (most recent first)
  // Assuming date format is consistent and follows a "YYYY - YYYY" or "YYYY - Present" pattern
  const sortedExperiences = [...filteredExperiences].sort((a, b) => {
    // Extract end years or "Present"
    const aEndYear = a.date.split('-')[1]?.trim() || '';
    const bEndYear = b.date.split('-')[1]?.trim() || '';
    
    // Handle "Present" as the most recent
    if (aEndYear.toLowerCase().includes('present')) return -1;
    if (bEndYear.toLowerCase().includes('present')) return 1;
    
    // Compare end years numerically
    return parseInt(bEndYear) - parseInt(aEndYear);
  });

  return (
    <section className={`py-12 ${className}`}>
      <div className="container mx-auto px-4">
        {/* Section header */}
        <SectionHeading
          title={title}
          subtitle={subtitle}
          centered
          className="mb-10"
        />
        
        {/* Filters */}
        {enableFiltering && types.length > 0 && (
          <div className="mb-8 flex justify-center">
            <div className="flex items-center space-x-2">
              <FiFilter className="h-5 w-5 text-gray-500" />
              <span className="mr-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Filter:
              </span>
              
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveType(null)}
                  className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
                    activeType === null
                      ? 'bg-primary-600 text-white dark:bg-primary-500'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  All
                </button>
                
                {types.map((type) => (
                  <button
                    key={type ?? 'unknown'}
                    onClick={() => setActiveType(type ?? '')}
                    className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
                      activeType === type
                        ? 'bg-primary-600 text-white dark:bg-primary-500'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* Experience items */}
        {sortedExperiences.length > 0 ? (
          <div>
            {/* Timeline view */}
            {displayStyle === 'timeline' && (
              <Timeline
                items={sortedExperiences}
                linePosition="left"
                defaultIcon={<FiBriefcase size={16} className="text-white" />}
                animated
              />
            )}
            
            {/* Detailed view */}
            {displayStyle === 'detailed' && (
              <div className="space-y-8">
                {sortedExperiences.map((experience, index) => (
                  <motion.div
                    key={experience.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <ExperienceTimelineItem
                      experience={experience}
                      expandedByDefault={expandedByDefault}
                      initialResponsibilitiesShown={2}
                    />
                  </motion.div>
                ))}
              </div>
            )}
            
            {/* Compact view */}
            {displayStyle === 'compact' && (
              <div className="space-y-6">
                {sortedExperiences.map((experience, index) => (
                  <motion.div
                    key={experience.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="border-b border-gray-200 pb-6 dark:border-gray-700 last:border-b-0"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                          {experience.title}
                        </h3>
                        
                        {experience.subtitle && (
                          <p className="mt-1 text-base font-medium text-gray-700 dark:text-gray-300">
                            {experience.subtitle}
                          </p>
                        )}
                        
                        <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500 dark:text-gray-400">
                          {/* Date */}
                          <span>{experience.date}</span>
                          
                          {/* Location */}
                          {experience.location && (
                            <span>
                              {experience.location}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {/* Type */}
                      {experience.type && (
                        <span className="inline-flex rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                          {experience.type}
                        </span>
                      )}
                    </div>
                    
                    {/* Description */}
                    {experience.description && (
                      <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                        {experience.description}
                      </div>
                    )}
                    
                    {/* Technologies */}
                    {experience.technologies && experience.technologies.length > 0 && (
                      <div className="mt-3">
                        <div className="flex flex-wrap gap-1">
                          {experience.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="rounded-full bg-primary-50 px-2 py-0.5 text-xs font-medium text-primary-600 dark:bg-primary-900/30 dark:text-primary-300"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="py-8 text-center">
            <p className="text-lg text-gray-600 dark:text-gray-400">
              No experience entries found.
            </p>
            {activeType && (
              <button
                onClick={() => setActiveType(null)}
                className="mt-4 text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
              >
                Show all
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

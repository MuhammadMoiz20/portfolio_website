'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiCalendar, FiMapPin, FiBook, FiAward, FiFilter } from 'react-icons/fi';
import SectionHeading from '@/components/ui/SectionHeading';

export interface Education {
  id: string | number;
  
  degree: string;
  
  fieldOfStudy: string;
  
  institution: string;
  
  logo?: string;
  
  location?: string;
  
  startDate: string;
  
  endDate: string;
  
  grade?: string;
  
  description?: string;
  
  courses?: string[];
  

  honors?: string[];
  
  type?: string;
}

interface EducationSectionProps {
  title?: string;

  subtitle?: string;

  education: Education[];

  enableFiltering?: boolean;

  displayStyle?: 'cards' | 'timeline' | 'minimal';
  className?: string;
}

export default function EducationSection({
  title = 'Education',
  subtitle,
  education,
  enableFiltering = true,
  displayStyle = 'cards',
  className = '',
}: EducationSectionProps) {
  const [activeType, setActiveType] = useState<string | null>(null);
  
  const types = enableFiltering
    ? Array.from(new Set(education.filter(edu => edu.type).map(edu => edu.type)))
    : [];
  
  const filteredEducation = activeType
    ? education.filter(edu => edu.type === activeType)
    : education;
  
  const sortedEducation = [...filteredEducation].sort((a, b) => {
    if (a.endDate.toLowerCase().includes('present')) return -1;
    if (b.endDate.toLowerCase().includes('present')) return 1;
    
    return new Date(b.endDate).getTime() - new Date(a.endDate).getTime();
  });

  return (
    <section className={`py-12 ${className}`}>
      <div className="container mx-auto px-4">
        <SectionHeading
          title={title}
          subtitle={subtitle}
          centered
          className="mb-10"
        />
        
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
                  className={`rounded-full px-3 py-1 text-sm font-medium ${
                    activeType === null
                      ? 'bg-primary-600 text-white dark:bg-primary-500'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  All
                </button>
                
                {types.map((type) => (
                  <button
                    key={type}
                    onClick={() => setActiveType(type)}
                    className={`rounded-full px-3 py-1 text-sm font-medium ${
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
        
        {sortedEducation.length > 0 ? (
          <div className={displayStyle === 'timeline' ? 'relative' : ''}>
            {displayStyle === 'timeline' && (
              <div className="absolute left-0 top-0 h-full w-0.5 bg-gray-200 dark:bg-gray-700 md:left-1/2 md:ml-px" />
            )}
            

            <div className={`${
              displayStyle === 'cards'
                ? 'grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'
                : displayStyle === 'timeline'
                ? 'space-y-12'
                : 'space-y-8'
            }`}>
              {sortedEducation.map((edu, index) => {
                if (displayStyle === 'cards') {
                  return (
                    <motion.div
                      key={edu.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
                    >
                      <div className="flex items-start justify-between">
                        {edu.logo ? (
                          <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-md">
                            <Image
                              src={edu.logo}
                              alt={edu.institution}
                              fill
                              sizes="56px"
                              className="object-contain"
                            />
                          </div>
                        ) : (
                          <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-md bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-300">
                            <FiBook size={24} />
                          </div>
                        )}
                        
                        {edu.type && (
                          <span className="inline-flex rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                            {edu.type}
                          </span>
                        )}
                      </div>
                      
                      <h3 className="mt-4 text-lg font-bold text-gray-900 dark:text-white">
                        {edu.degree} in {edu.fieldOfStudy}
                      </h3>
                      
                      <p className="mt-1 text-base font-medium text-gray-700 dark:text-gray-300">
                        {edu.institution}
                      </p>
                      
                      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500 dark:text-gray-400">
                        <span className="flex items-center">
                          <FiCalendar className="mr-1" size={14} />
                          {edu.startDate} - {edu.endDate}
                        </span>
                        
                        {edu.location && (
                          <span className="flex items-center">
                            <FiMapPin className="mr-1" size={14} />
                            {edu.location}
                          </span>
                        )}
                      </div>
                      
                      {edu.grade && (
                        <div className="mt-3 flex items-center text-sm">
                          <FiAward className="mr-1 text-amber-500" size={14} />
                          <span className="font-medium text-gray-700 dark:text-gray-300">
                            {edu.grade}
                          </span>
                        </div>
                      )}
                      
                      {edu.description && (
                        <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                          {edu.description}
                        </p>
                      )}
                      
                      {edu.honors && edu.honors.length > 0 && (
                        <div className="mt-4">
                          <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                            Honors & Awards
                          </h4>
                          <ul className="list-inside list-disc space-y-1 pl-1 text-sm text-gray-600 dark:text-gray-400">
                            {edu.honors.map((honor, i) => (
                              <li key={i}>{honor}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {edu.courses && edu.courses.length > 0 && (
                        <div className="mt-4">
                          <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                            Relevant Courses
                          </h4>
                          <div className="flex flex-wrap gap-1">
                            {edu.courses.map((course, i) => (
                              <span
                                key={i}
                                className="inline-flex rounded-full bg-gray-50 px-2 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                              >
                                {course}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  );
                }
                
                if (displayStyle === 'timeline') {
                  return (
                    <div key={edu.id} className="relative">
                      <motion.div
                        initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className={`relative mx-auto w-full md:w-5/12 ${
                          index % 2 === 0 ? 'md:ml-0 md:mr-auto' : 'md:ml-auto md:mr-0'
                        }`}
                      >
                        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                          <div className="absolute -left-3 top-6 hidden h-6 w-6 rounded-full border-4 border-white bg-primary-500 dark:border-gray-900 md:-left-3 md:block">
                            {index % 2 === 1 && (
                              <div className="absolute -right-3 top-1/2 hidden h-px w-8 -translate-y-1/2 bg-gray-200 dark:bg-gray-700 md:block" />
                            )}
                          </div>
                          
                          <div className={`absolute top-6 hidden h-px w-8 bg-gray-200 dark:bg-gray-700 md:block ${
                            index % 2 === 0 ? 'left-full' : 'right-full'
                          }`} />
                          
                          <div className="flex items-center space-x-4">
                            {edu.logo ? (
                              <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-md">
                                <Image
                                  src={edu.logo}
                                  alt={edu.institution}
                                  fill
                                  sizes="48px"
                                  className="object-contain"
                                />
                              </div>
                            ) : (
                              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-md bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-300">
                                <FiBook size={24} />
                              </div>
                            )}
                            
                            <div>
                              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                {edu.degree}
                              </h3>
                              
                              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                {edu.fieldOfStudy}
                              </p>
                            </div>
                          </div>
                          
                          <div className="mt-4">
                            <p className="text-base font-medium text-gray-800 dark:text-gray-200">
                              {edu.institution}
                              {edu.type && (
                                <span className="ml-2 inline-flex rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                                  {edu.type}
                                </span>
                              )}
                            </p>
                            
                            <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500 dark:text-gray-400">
                              <span className="flex items-center">
                                <FiCalendar className="mr-1" size={14} />
                                {edu.startDate} - {edu.endDate}
                              </span>
                              
                              {edu.location && (
                                <span className="flex items-center">
                                  <FiMapPin className="mr-1" size={14} />
                                  {edu.location}
                                </span>
                              )}
                              
                              {edu.grade && (
                                <span className="flex items-center">
                                  <FiAward className="mr-1 text-amber-500" size={14} />
                                  {edu.grade}
                                </span>
                              )}
                            </div>
                          </div>
                          
                          {edu.description && (
                            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                              {edu.description}
                            </p>
                          )}
                          

                          <div className="mt-4 flex flex-wrap gap-4">
                            {edu.honors && edu.honors.length > 0 && (
                              <div className="flex-1">
                                <h4 className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                                  Honors
                                </h4>
                                <ul className="list-inside list-disc space-y-0.5 text-xs text-gray-600 dark:text-gray-400">
                                  {edu.honors.map((honor, i) => (
                                    <li key={i}>{honor}</li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {edu.courses && edu.courses.length > 0 && (
                              <div className="flex-1">
                                <h4 className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                                  Courses
                                </h4>
                                <div className="flex flex-wrap gap-1">
                                  {edu.courses.map((course, i) => (
                                    <span
                                      key={i}
                                      className="inline-flex rounded-full bg-gray-50 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                                    >
                                      {course}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  );
                }
                
                return (
                  <motion.div
                    key={edu.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="border-b border-gray-200 pb-6 dark:border-gray-700 last:border-b-0"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                          {edu.degree} in {edu.fieldOfStudy}
                        </h3>
                        
                        <p className="mt-1 text-base font-medium text-gray-700 dark:text-gray-300">
                          {edu.institution}
                        </p>
                        
                        <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500 dark:text-gray-400">
                          <span className="flex items-center">
                            <FiCalendar className="mr-1" size={14} />
                            {edu.startDate} - {edu.endDate}
                          </span>
                          
                          {edu.location && (
                            <span className="flex items-center">
                              <FiMapPin className="mr-1" size={14} />
                              {edu.location}
                            </span>
                          )}
                          
                          {edu.grade && (
                            <span className="flex items-center">
                              <FiAward className="mr-1 text-amber-500" size={14} />
                              {edu.grade}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {edu.type && (
                        <span className="inline-flex rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                          {edu.type}
                        </span>
                      )}
                    </div>
                    
                    {edu.description && (
                      <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                        {edu.description}
                      </p>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        ) : (

          <div className="py-8 text-center">
            <p className="text-lg text-gray-600 dark:text-gray-400">
              No education entries found.
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

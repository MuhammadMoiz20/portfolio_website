'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import AnimatedElement from '@/components/utils/AnimatedElement';

export interface TimelineItem {
  id: string | number;
  
  title: string;

  date: string;

  subtitle?: string;
  description?: ReactNode;
  
  icon?: ReactNode;
  
  iconBackgroundColor?: string;

  url?: string;

  location?: string;
  tags?: string[];
}

interface TimelineProps {
  items: TimelineItem[];
  
  linePosition?: 'left' | 'center' | 'right';
  defaultIcon?: ReactNode;

  alternateItems?: boolean;
  
  animated?: boolean;
  
  className?: string;
}

export default function Timeline({
  items,
  linePosition = 'left',
  defaultIcon,
  alternateItems = true,
  animated = true,
  className = '',
}: TimelineProps) {
  if (items.length === 0) {
    return null;
  }
  
  const getItemContainerClasses = (index: number) => {
    if (linePosition === 'left') {
      return 'ml-6';
    }
    
    if (linePosition === 'right') {
      return 'mr-6 items-end';
    }
    
    return alternateItems && index % 2 === 0
      ? 'mr-auto w-1/2 pr-8 text-right'
      : 'ml-auto w-1/2 pl-8';
  };
  
  const getDotClasses = (index: number) => {
    if (linePosition === 'left') {
      return 'absolute -left-3';
    }
    
    if (linePosition === 'right') {
      return 'absolute -right-3';
    }
    
    return 'absolute left-1/2 -translate-x-1/2';
  };
  
  return (
    <div className={`relative ${className}`}>
      <div
        className={`absolute bottom-0 top-0 w-0.5 bg-gray-200 dark:bg-gray-800 ${
          linePosition === 'left'
            ? 'left-0'
            : linePosition === 'right'
            ? 'right-0'
            : 'left-1/2 -translate-x-1/2'
        }`}
      />
      
      <div className="relative space-y-8">
        {items.map((item, index) => {
          const itemContent = (
            <>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {item.title}
              </h3>
              
              <time className="mb-1 block text-sm font-normal text-gray-500 dark:text-gray-400">
                {item.date}
              </time>
              
              {item.subtitle && (
                <p className="text-base font-semibold text-gray-700 dark:text-gray-300">
                  {item.subtitle}
                </p>
              )}
              
              {item.location && (
                <p className="mb-2 text-sm italic text-gray-500 dark:text-gray-400">
                  {item.location}
                </p>
              )}
              
              {item.description && (
                <div className="mb-4 text-base font-normal text-gray-600 dark:text-gray-400">
                  {item.description}
                </div>
              )}
              
              {item.tags && item.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              
              {item.url && (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-medium text-primary-600 hover:underline dark:text-primary-400"
                >
                  Learn more
                  <svg
                    className="ml-1 h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </a>
              )}
            </>
          );
          
          return (
            <div key={item.id} className="relative">
              {animated ? (
                <AnimatedElement
                  direction={
                    linePosition === 'center' && alternateItems
                      ? index % 2 === 0
                        ? 'left'
                        : 'right'
                      : linePosition === 'right'
                      ? 'left'
                      : 'right'
                  }
                  delay={index * 0.1}
                  className={getItemContainerClasses(index)}
                >
                  <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                    {itemContent}
                  </div>
                </AnimatedElement>
              ) : (
                <div className={getItemContainerClasses(index)}>
                  <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                    {itemContent}
                  </div>
                </div>
              )}
              
              <div className={getDotClasses(index)}>
                <div
                  className={`flex h-6 w-6 items-center justify-center rounded-full ring-4 ring-white dark:ring-gray-900 ${
                    item.iconBackgroundColor ||
                    'bg-primary-600 dark:bg-primary-500'
                  }`}
                >
                  {item.icon || defaultIcon || (
                    <div className="h-2 w-2 rounded-full bg-white" />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

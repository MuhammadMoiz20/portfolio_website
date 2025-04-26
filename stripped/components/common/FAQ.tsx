'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiMinus } from 'react-icons/fi';
import Accordion from '@/components/ui/Accordion';
import SectionHeading from '@/components/ui/SectionHeading';

export interface FAQItem {
    question: string;
  
    answer: React.ReactNode;
  
    category?: string;
}

interface FAQProps {
    items: FAQItem[];
  
    title?: string;
  
    subtitle?: string;
  
    enableFiltering?: boolean;
  
    className?: string;
}

export default function FAQ({
  items,
  title = 'Frequently Asked Questions',
  subtitle,
  enableFiltering = false,
  className = '',
}: FAQProps) {
  // State for category filtering
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  // Extract unique categories
  const categories = enableFiltering 
    ? Array.from(new Set(items.filter(item => item.category).map(item => item.category)))
    : [];
  
  // Filter items by active category
  const filteredItems = activeCategory
    ? items.filter(item => item.category === activeCategory)
    : items;
    
  // Convert FAQ items to Accordion format
  const accordionItems = filteredItems.map((item, index) => ({
    id: `faq-${index}`,
    title: item.question,
    content: item.answer,
  }));

  return (
    <div className={`${className}`}>
      {/* Section heading */}
      <SectionHeading 
        title={title}
        subtitle={subtitle}
      />
      
      {/* Category filters */}
      {enableFiltering && categories.length > 0 && (
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setActiveCategory(null)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              activeCategory === null
                ? 'bg-primary-600 text-white dark:bg-primary-500'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            All
          </button>
          
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => typeof category === 'string' ? setActiveCategory(category) : null}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                activeCategory === category
                  ? 'bg-primary-600 text-white dark:bg-primary-500'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}
      
      {}
      <div className="mx-auto max-w-3xl">
        <Accordion 
          items={accordionItems}
          borderStyle="top-bottom"
        />
        
        {}
        {filteredItems.length === 0 && (
          <div className="py-8 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              No questions found for this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

'use client';

import { useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';

/**
 * Props for a single accordion item
 */
export interface AccordionItemProps {
  /**
   * Unique identifier for the item
   */
  id: string | number;
  
  /**
   * Title/header of the accordion item
   */
  title: ReactNode;
  
  /**
   * Content to show when expanded
   */
  content: ReactNode;
  
  /**
   * Whether this item is initially expanded
   * @default false
   */
  isInitiallyExpanded?: boolean;
  
  /**
   * Custom icon to replace the default chevron
   */
  customIcon?: ReactNode;
}

/**
 * Props for the Accordion component
 */
interface AccordionProps {
  /**
   * Array of accordion items
   */
  items: AccordionItemProps[];
  
  /**
   * Whether multiple items can be expanded simultaneously
   * @default false
   */
  allowMultiple?: boolean;
  
  /**
   * Border style for accordion items
   * @default 'full'
   */
  borderStyle?: 'full' | 'top-bottom' | 'none';
  
  /**
   * Custom CSS class for the accordion container
   */
  className?: string;
}

/**
 * Accordion component
 * Provides expandable/collapsible content sections
 */
export default function Accordion({
  items,
  allowMultiple = false,
  borderStyle = 'full',
  className = '',
}: AccordionProps) {
  // Track which items are expanded
  const [expandedItems, setExpandedItems] = useState<Set<string | number>>(() => {
    // Initialize with any items marked as initially expanded
    const initiallyExpanded = new Set<string | number>();
    items.forEach(item => {
      if (item.isInitiallyExpanded) {
        initiallyExpanded.add(item.id);
      }
    });
    return initiallyExpanded;
  });

  /**
   * Toggle the expanded state of an accordion item
   */
  const toggleItem = (id: string | number) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      
      if (newSet.has(id)) {
        // If already expanded, collapse it
        newSet.delete(id);
      } else {
        // If collapsed, expand it
        // If not allowing multiple, clear other items first
        if (!allowMultiple) {
          newSet.clear();
        }
        newSet.add(id);
      }
      
      return newSet;
    });
  };

  // Determine border classes based on borderStyle
  const getBorderClasses = (index: number, isLast: boolean) => {
    switch (borderStyle) {
      case 'full':
        return 'border border-gray-200 dark:border-gray-700';
      case 'top-bottom':
        return `${index === 0 ? 'border-t' : ''} border-b border-gray-200 dark:border-gray-700`;
      case 'none':
      default:
        return '';
    }
  };

  return (
    <div className={`w-full overflow-hidden ${className}`}>
      {items.map((item, index) => {
        const isExpanded = expandedItems.has(item.id);
        const isLast = index === items.length - 1;
        
        return (
          <div 
            key={item.id}
            className={`${
              getBorderClasses(index, isLast)
            } ${
              index !== 0 && borderStyle === 'full' ? 'border-t-0' : ''
            }`}
          >
            <button
              onClick={() => toggleItem(item.id)}
              className="flex w-full items-center justify-between px-4 py-4 text-left"
              aria-expanded={isExpanded}
              aria-controls={`accordion-content-${item.id}`}
            >
              <span className="text-base font-medium text-gray-900 dark:text-white">
                {item.title}
              </span>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-gray-500 dark:text-gray-400"
              >
                {item.customIcon || <FiChevronDown size={20} />}
              </motion.div>
            </button>
            
            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.div
                  id={`accordion-content-${item.id}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 pt-0">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

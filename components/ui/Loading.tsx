'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Loading spinner types
 */
type SpinnerType = 'circle' | 'dots' | 'pulse';

interface LoadingProps {
  /**
   * Type of loading spinner to display
   * @default 'circle'
   */
  type?: SpinnerType;
  
  /**
   * Text to display below the spinner
   */
  text?: string;
  
  /**
   * Size of the spinner
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
  
  /**
   * Whether to show as full page overlay
   * @default false
   */
  fullPage?: boolean;
  
  /**
   * Delay in ms before showing the loader (prevents flashing for quick loads)
   * @default 300
   */
  delay?: number;
}

/**
 * Loading component
 * Displays various types of loading indicators with optional text
 */
export default function Loading({
  type = 'circle',
  text,
  size = 'md',
  fullPage = false,
  delay = 300,
}: LoadingProps) {
  const [show, setShow] = useState(delay === 0);
  
  // Apply delay to prevent flash of loading state
  useEffect(() => {
    if (delay === 0) return;
    
    const timer = setTimeout(() => {
      setShow(true);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay]);
  
  // Size mappings
  const sizeMap = {
    sm: {
      container: 'h-6 w-6',
      circle: 'h-6 w-6 border-2',
      dots: 'h-1.5 w-1.5',
      text: 'text-xs',
    },
    md: {
      container: 'h-10 w-10',
      circle: 'h-10 w-10 border-3',
      dots: 'h-2.5 w-2.5',
      text: 'text-sm',
    },
    lg: {
      container: 'h-16 w-16',
      circle: 'h-16 w-16 border-4',
      dots: 'h-3 w-3',
      text: 'text-base',
    },
  };
  
  // Function to render spinner based on type
  const renderSpinner = () => {
    switch (type) {
      case 'circle':
        return (
          <div className={`${sizeMap[size].circle} animate-spin rounded-full border-solid border-gray-200 border-t-primary-600 dark:border-gray-700 dark:border-t-primary-400`} />
        );
        
      case 'dots':
        return (
          <div className="flex space-x-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: 'easeInOut',
                }}
                className={`${sizeMap[size].dots} rounded-full bg-primary-600 dark:bg-primary-400`}
              />
            ))}
          </div>
        );
        
      case 'pulse':
        return (
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className={`${sizeMap[size].circle} rounded-full bg-primary-600 dark:bg-primary-400`}
          />
        );
        
      default:
        return null;
    }
  };
  
  // Wrapper component
  const LoadingContent = () => (
    <div className="flex flex-col items-center justify-center">
      <div className={`${sizeMap[size].container} flex items-center justify-center`}>
        {renderSpinner()}
      </div>
      {text && (
        <p className={`mt-3 ${sizeMap[size].text} font-medium text-gray-600 dark:text-gray-400`}>
          {text}
        </p>
      )}
    </div>
  );
  
  // If fullPage, render as overlay
  if (fullPage) {
    return (
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-80 dark:bg-gray-900 dark:bg-opacity-80"
          >
            <LoadingContent />
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
  
  // Regular display
  return show ? <LoadingContent /> : null;
}

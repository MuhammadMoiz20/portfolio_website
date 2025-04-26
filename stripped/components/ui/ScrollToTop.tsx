'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowUp } from 'react-icons/fi';

interface ScrollToTopProps {
    scrollThreshold?: number;
  
    bottom?: string;
  
    right?: string;
  
    smooth?: boolean;
}

export default function ScrollToTop({
  scrollThreshold = 300,
  bottom = 'bottom-6',
  right = 'right-6',
  smooth = true,
}: ScrollToTopProps) {
  const [isVisible, setIsVisible] = useState(false);

  
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > scrollThreshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    
    window.addEventListener('scroll', toggleVisibility);

    
    toggleVisibility();

    
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, [scrollThreshold]);

    const scrollToTop = () => {
    if (smooth) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } else {
      window.scrollTo(0, 0);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.2 }}
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className={`fixed ${bottom} ${right} z-30 flex h-10 w-10 items-center justify-center rounded-full bg-primary-600 text-white shadow-lg transition-transform hover:bg-primary-700 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:bg-primary-500 dark:hover:bg-primary-600`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FiArrowUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

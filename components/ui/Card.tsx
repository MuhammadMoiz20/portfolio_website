'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

/**
 * Card variant options
 */
type CardVariant = 'default' | 'elevated' | 'bordered' | 'flat';

/**
 * Props for the Card component
 */
interface CardProps {
  /**
   * Card content
   */
  children: ReactNode;
  
  /**
   * Visual style variant of the card
   * @default 'default'
   */
  variant?: CardVariant;
  
  /**
   * Whether to add hover effect
   * @default false
   */
  hoverable?: boolean;
  
  /**
   * Whether to animate on scroll into view
   * @default false
   */
  animate?: boolean;
  
  /**
   * Animation delay in seconds (if animated)
   * @default 0
   */
  delay?: number;
  
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Function called when card is clicked
   */
  onClick?: () => void;
}

/**
 * Card component
 * A reusable container with consistent styling and optional animation
 */
export default function Card({
  children,
  variant = 'default',
  hoverable = false,
  animate = false,
  delay = 0,
  className = '',
  onClick,
}: CardProps) {
  // Base classes for all card variants
  const baseClasses = 'rounded-xl overflow-hidden';
  
  // Classes specific to each variant
  const variantClasses = {
    default: 'bg-white dark:bg-gray-800 shadow-md',
    elevated: 'bg-white dark:bg-gray-800 shadow-xl',
    bordered: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700',
    flat: 'bg-gray-50 dark:bg-gray-900',
  };
  
  // Hover effect classes
  const hoverClasses = hoverable
    ? 'transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer'
    : '';
  
  // Combined classes
  const cardClasses = `${baseClasses} ${variantClasses[variant]} ${hoverClasses} ${className}`;
  
  // If animation is enabled, wrap with motion.div
  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        viewport={{ once: true }}
        className={cardClasses}
        onClick={onClick}
      >
        {children}
      </motion.div>
    );
  }
  
  // Without animation
  return (
    <div className={cardClasses} onClick={onClick}>
      {children}
    </div>
  );
}

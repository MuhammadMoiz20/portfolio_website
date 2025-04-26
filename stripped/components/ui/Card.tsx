'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

type CardVariant = 'default' | 'elevated' | 'bordered' | 'flat';

interface CardProps {
    children: ReactNode;
  
    variant?: CardVariant;
  
    hoverable?: boolean;
  
    animate?: boolean;
  
    delay?: number;
  
    className?: string;
  
    onClick?: () => void;
}

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
  
  
  const variantClasses = {
    default: 'bg-white dark:bg-gray-800 shadow-md',
    elevated: 'bg-white dark:bg-gray-800 shadow-xl',
    bordered: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700',
    flat: 'bg-gray-50 dark:bg-gray-900',
  };
  
  
  const hoverClasses = hoverable
    ? 'transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer'
    : '';
  
  
  const cardClasses = `${baseClasses} ${variantClasses[variant]} ${hoverClasses} ${className}`;
  
  
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
  
  
  return (
    <div className={cardClasses} onClick={onClick}>
      {children}
    </div>
  );
}

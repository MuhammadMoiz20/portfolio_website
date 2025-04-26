'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
    value: number;
  
    max?: number;
  
    label?: string;
  
    showValue?: boolean;
  
    valueFormat?: string;
  
    height?: string;
  
    color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'gray';
  
    animate?: boolean;
  
    animationDuration?: number;
  
    striped?: boolean;
  
    animated?: boolean;
  
    className?: string;
}

export default function ProgressBar({
  value,
  max = 100,
  label,
  showValue = false,
  valueFormat = '{value}%',
  height = 'h-2',
  color = 'primary',
  animate = true,
  animationDuration = 0.5,
  striped = false,
  animated = false,
  className = '',
}: ProgressBarProps) {
  // Ensure value is within bounds and calculate percentage
  const boundedValue = Math.max(0, Math.min(value, max));
  const percentage = (boundedValue / max) * 100;
  
  // For the animation effect
  const [displayValue, setDisplayValue] = useState(animate ? 0 : percentage);
  
  // Update the display value when the actual value changes
  useEffect(() => {
    if (animate) {
      setDisplayValue(percentage);
    }
  }, [percentage, animate]);
  
  // Format the display text
  const formattedValue = valueFormat.replace('{value}', Math.round(percentage).toString());
  
  // Color mapping for different states
  const colorClasses = {
    primary: 'bg-primary-600 dark:bg-primary-500',
    secondary: 'bg-secondary-600 dark:bg-secondary-500',
    success: 'bg-green-600 dark:bg-green-500',
    danger: 'bg-red-600 dark:bg-red-500',
    warning: 'bg-amber-500 dark:bg-amber-400',
    info: 'bg-blue-600 dark:bg-blue-500',
    gray: 'bg-gray-600 dark:bg-gray-500',
  };

  
  const stripedClasses = striped 
    ? 'bg-gradient-to-r from-white/20 via-transparent to-transparent bg-[length:20px_20px]' 
    : '';
  
  // Animation for striped pattern
  const animatedClasses = striped && animated 
    ? 'animate-progress-stripes' 
    : '';

  return (
    <div className={`w-full ${className}`}>
      {/* Label row with value */}
      {(label || showValue) && (
        <div className="mb-1 flex items-center justify-between">
          {label && (
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {label}
            </span>
          )}
          {showValue && (
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {formattedValue}
            </span>
          )}
        </div>
      )}
      
      {/* Progress bar container */}
      <div 
        className={`w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700 ${height}`}
        role="progressbar"
        aria-valuenow={boundedValue}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label || 'Progress bar'}
      >
        {}
        <motion.div
          initial={{ width: animate ? '0%' : `${percentage}%` }}
          animate={{ width: `${displayValue}%` }}
          transition={{ duration: animationDuration, ease: 'easeOut' }}
          className={`h-full ${colorClasses[color]} ${stripedClasses} ${animatedClasses}`}
        />
      </div>
    </div>
  );
}

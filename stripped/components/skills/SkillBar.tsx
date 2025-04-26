'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface SkillBarProps {
    label: string;
  
    value: number;
  
    color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | string;
  
    showValue?: boolean;
  
    height?: number;
  
    animate?: boolean;
  
    animationDuration?: number;
  
    animationDelay?: number;
  
    valueFormat?: string;
  
    variant?: 'default' | 'striped' | 'gradient' | 'thin';
  
    className?: string;
}

export default function SkillBar({
  label,
  value,
  color = 'primary',
  showValue = true,
  height = 8,
  animate = true,
  animationDuration = 1,
  animationDelay = 0,
  valueFormat = '{value}%',
  variant = 'default',
  className = '',
}: SkillBarProps) {
  const [isVisible, setIsVisible] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  
  // Ensure value is within valid range
  const normalizedValue = Math.min(100, Math.max(0, value));
  
  // Format the value display
  const formattedValue = valueFormat.replace('{value}', normalizedValue.toString());

  // Modern glassmorphism/gradient color class
  const getColorClass = () => {
    if (color.startsWith('#') || color.startsWith('rgb')) {
      return color;
    }
    switch (color) {
      case 'secondary':
        return 'bg-gradient-to-r from-indigo-400 via-indigo-600 to-purple-500';
      case 'success':
        return 'bg-gradient-to-r from-green-400 via-green-600 to-emerald-500';
      case 'info':
        return 'bg-gradient-to-r from-blue-400 via-blue-600 to-cyan-500';
      case 'warning':
        return 'bg-gradient-to-r from-amber-400 via-amber-600 to-orange-500';
      case 'primary':
      default:
        return 'bg-gradient-to-r from-primary-400 via-primary-600 to-blue-500';
    }
  };
  
  
  const getGradientClass = () => {
    switch (variant) {
      case 'striped':
        return `${getColorClass()} bg-stripes`;
      case 'gradient':
        return getGradientClass();
      case 'thin':
        return getColorClass();
      case 'default':
      default:
        return getColorClass();
    }
  };

  
  const barContainerClass = `relative w-full rounded-full bg-white/40 dark:bg-gray-800/40 backdrop-blur-md shadow-glass-md border border-white/20 dark:border-gray-700/30 overflow-hidden transition-all duration-500 ${className}`;

  
  const barStyle = {
    width: animate && isVisible ? `${normalizedValue}%` : '0%',
    height: `${height}px`,
    transition: `width ${animationDuration}s cubic-bezier(0.4,0,0.2,1) ${animationDelay}s`,
  };

  
  const valueLabelClass = 'absolute right-2 top-1/2 -translate-y-1/2 text-xs font-bold text-primary-700 dark:text-primary-300 drop-shadow-neon';
  
  
  useEffect(() => {
    if (!animate) {
      setIsVisible(true);
      return;
    }
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (barRef.current) {
      observer.observe(barRef.current);
    }
    
    return () => {
      observer.disconnect();
    };
  }, [animate]);

  return (
    <div ref={barRef} className={`mb-4 ${className}`}>
      {}
      <div className="mb-1 flex justify-between">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </span>
        
        {showValue && (
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {formattedValue}
          </span>
        )}
      </div>
      
      {}
      <div
        ref={barRef}
        className={barContainerClass}
        style={{ height }}
      >
        <motion.div
          className={getColorClass()}
          style={barStyle}
          initial={{ width: 0 }}
          animate={{ width: animate && isVisible ? `${normalizedValue}%` : '0%' }}
          transition={{ duration: animationDuration, delay: animationDelay, ease: [0.4, 0, 0.2, 1] }}
        />
        {showValue && (
          <span className={valueLabelClass}>{formattedValue}</span>
        )}
      </div>
    </div>
  );
}

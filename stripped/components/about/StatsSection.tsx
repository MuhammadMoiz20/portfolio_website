'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiAward, FiCode, FiCoffee, FiUsers } from 'react-icons/fi';
import SectionHeading from '@/components/ui/SectionHeading';

interface StatItem {
    id: string | number;
  
    value: number;
  
    label: string;
  
    unit?: string;
  
    icon?: React.ReactNode;
  
    description?: string;
  
    color?: string;
  
    precision?: number;
}

interface StatsSectionProps {
    title?: string;
  
    subtitle?: string;
  
    stats: StatItem[];
  
    layout?: 'grid' | 'row' | 'cards';
  
    animationDuration?: number;
  
    showDividers?: boolean;
  
    backgroundStyle?: 'light' | 'dark' | 'gradient' | 'transparent';
  
    className?: string;
}

export default function StatsSection({
  title = 'By the Numbers',
  subtitle,
  stats,
  layout = 'grid',
  animationDuration = 2,
  showDividers = false,
  backgroundStyle = 'light',
  className = '',
}: StatsSectionProps) {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Set up intersection observer to trigger animation when section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldAnimate(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  /**
   * Get background style class
   */
  const getBackgroundClass = () => {
    switch (backgroundStyle) {
      case 'dark':
        return 'bg-gray-900 text-white';
      case 'gradient':
        return 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white';
      case 'transparent':
        return '';
      case 'light':
      default:
        return 'bg-gray-50 dark:bg-gray-800';
    }
  };
  
    const getContainerClasses = () => {
    switch (layout) {
      case 'row':
        return 'flex flex-wrap justify-center items-center gap-8';
      case 'cards':
        return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6';
      case 'grid':
      default:
        return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6';
    }
  };
  
    const getStatItemClasses = (index: number) => {
    const baseClasses = 'flex flex-col items-center text-center p-4';
    
    if (layout === 'cards') {
      return `${baseClasses} bg-white dark:bg-gray-700 rounded-lg shadow-md`;
    }
    
    if (layout === 'row' && showDividers && index < stats.length - 1) {
      return `${baseClasses} relative pr-8 after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:h-12 after:w-px after:bg-gray-300 dark:after:bg-gray-600`;
    }
    
    return baseClasses;
  };
  
    const AnimatedCounter = ({ 
    value, 
    unit = '', 
    precision = 0,
    duration = animationDuration 
  }: { 
    value: number; 
    unit?: string; 
    precision?: number;
    duration?: number;
  }) => {
    const [displayValue, setDisplayValue] = useState(0);
    
    useEffect(() => {
      if (!shouldAnimate) return;
      
      let startTime: number;
      let animationFrame: number;
      
      const updateValue = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        
        setDisplayValue(Math.floor(progress * value));
        
        if (progress < 1) {
          animationFrame = requestAnimationFrame(updateValue);
        } else {
          setDisplayValue(value);
        }
      };
      
      animationFrame = requestAnimationFrame(updateValue);
      
      return () => cancelAnimationFrame(animationFrame);
    }, [value, duration, shouldAnimate]);
    
    return (
      <span>
        {displayValue.toLocaleString(undefined, {
          minimumFractionDigits: precision,
          maximumFractionDigits: precision,
        })}
        {unit}
      </span>
    );
  };

  return (
    <section
      ref={sectionRef}
      className={`py-12 ${getBackgroundClass()} ${className}`}
    >
      <div className="container mx-auto px-4">
        {/* Section header */}
        {(title || subtitle) && (
          <SectionHeading
            title={title}
            subtitle={subtitle}
            centered
            className="mb-10"
          />
        )}
        
        {/* Stats grid/row */}
        <div className={getContainerClasses()}>
          {stats.map((stat, index) => (
            <div
              key={stat.id}
              className={getStatItemClasses(index)}
            >
              {/* Icon */}
              {stat.icon && (
                <div 
                  className={`mb-4 flex h-16 w-16 items-center justify-center rounded-full ${
                    stat.color || 'bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-300'
                  }`}
                >
                  {stat.icon}
                </div>
              )}
              
              {}
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={shouldAnimate ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="mb-2 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl"
              >
                <AnimatedCounter 
                  value={stat.value} 
                  unit={stat.unit} 
                  precision={stat.precision || 0} 
                />
              </motion.div>
              
              {}
              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                {stat.label}
              </h3>
              
              {}
              {stat.description && (
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {stat.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

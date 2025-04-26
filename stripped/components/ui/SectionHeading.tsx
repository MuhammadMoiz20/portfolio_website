'use client';

import AnimatedElement from '@/components/utils/AnimatedElement';

interface SectionHeadingProps {
    title: string;
  
    subtitle?: string;
  
    centered?: boolean;
  
    withAccent?: boolean;
  
    subtitleMaxWidth?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  centered = true,
  withAccent = true,
  subtitleMaxWidth = 'max-w-2xl',
}: SectionHeadingProps) {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
      <AnimatedElement direction="up" delay={0.1}>
        <h2 className="mb-4 text-3xl font-bold md:text-4xl">{title}</h2>
        
        {withAccent && (
          <div className={`${centered ? 'mx-auto' : ''} mb-4 h-1 w-20 bg-primary-600 dark:bg-primary-500`} />
        )}
        
        {subtitle && (
          <p 
            className={`text-gray-600 dark:text-gray-400 ${centered ? 'mx-auto' : ''} ${subtitleMaxWidth}`}
          >
            {subtitle}
          </p>
        )}
      </AnimatedElement>
    </div>
  );
}

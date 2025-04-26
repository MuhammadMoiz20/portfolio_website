'use client';

import { useState, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface OptimizedImageProps extends Omit<ImageProps, 'onLoadingComplete'> {
    withPlaceholder?: boolean;
  
    fadeIn?: boolean;
  
    fadeInDuration?: number;
  
    customPlaceholder?: React.ReactNode;
  
    containerClassName?: string;
  
    aspectRatio?: number;
  
    blurLevel?: number;
  
    onLoad?: () => void;
  
    onError?: () => void;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  withPlaceholder = true,
  fadeIn = true,
  fadeInDuration = 0.5,
  customPlaceholder,
  className = '',
  containerClassName = '',
  aspectRatio,
  blurLevel = 20,
  onLoad,
  onError,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  
  // Reset loading state when src changes
  useEffect(() => {
    setIsLoading(true);
    setError(false);
  }, [src]);
  
  /**
   * Handle image load complete
   */
  const handleLoadingComplete = () => {
    setIsLoading(false);
    if (onLoad) onLoad();
  };
  
  /**
   * Handle image load error
   */
  const handleError = () => {
    setIsLoading(false);
    setError(true);
    if (onError) onError();
  };
  
  // Calculate aspect ratio styles if needed
  const aspectRatioStyles = aspectRatio
    ? {
        paddingBottom: `${(1 / aspectRatio) * 100}%`,
        position: 'relative' as const,
      }
    : {};
    
  
  if (error) {
    return (
      <div 
        className={`relative flex items-center justify-center overflow-hidden bg-gray-100 dark:bg-gray-800 ${containerClassName}`}
        style={{ 
          width: typeof width === 'number' ? `${width}px` : width,
          height: typeof height === 'number' ? `${height}px` : height,
          ...aspectRatioStyles,
        }}
      >
        <div className="text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Failed to load image
          </p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`relative overflow-hidden ${containerClassName}`}
      style={{ 
        width: typeof width === 'number' ? `${width}px` : width,
        ...aspectRatioStyles,
      }}
    >
      {}
      <AnimatePresence mode="wait">
        <motion.div
          key={src?.toString() || 'image'}
          initial={fadeIn ? { opacity: 0 } : { opacity: 1 }}
          animate={
            isLoading
              ? { opacity: 0 }
              : { opacity: 1 }
          }
          transition={{ duration: fadeInDuration }}
          style={{ 
            position: aspectRatio ? 'absolute' : 'relative',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        >
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={`object-cover ${className}`}
            onLoadingComplete={handleLoadingComplete}
            onError={handleError}
            {...props}
          />
        </motion.div>
      </AnimatePresence>

      {}
      {withPlaceholder && isLoading && (
        <div 
          className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800"
          style={{ 
            backdropFilter: `blur(${blurLevel}px)`,
          }}
        >
          {customPlaceholder || (
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-primary-500" />
          )}
        </div>
      )}
    </div>
  );
}

'use client';

import { CSSProperties } from 'react';

/**
 * Props for the Skeleton component
 */
interface SkeletonProps {
  /**
   * Width of the skeleton
   * @default '100%'
   */
  width?: string | number;
  
  /**
   * Height of the skeleton
   * @default '1rem'
   */
  height?: string | number;
  
  /**
   * Border radius
   * @default '0.25rem'
   */
  borderRadius?: string | number;
  
  /**
   * Whether to animate the skeleton
   * @default true
   */
  animate?: boolean;
  
  /**
   * Shape variant of the skeleton
   * @default 'rectangle'
   */
  variant?: 'rectangle' | 'circle' | 'text';
  
  /**
   * Custom CSS class
   */
  className?: string;
  
  /**
   * Number of skeleton items to display
   * @default 1
   */
  count?: number;
  
  /**
   * Gap between multiple skeletons
   * @default '0.5rem'
   */
  gap?: string | number;
}

/**
 * Skeleton component
 * Provides loading placeholders for content that is still loading
 */
export default function Skeleton({
  width = '100%',
  height = '1rem',
  borderRadius = '0.25rem',
  animate = true,
  variant = 'rectangle',
  className = '',
  count = 1,
  gap = '0.5rem',
}: SkeletonProps) {
  // Convert the width and height to style values
  const widthValue = typeof width === 'number' ? `${width}px` : width;
  const heightValue = typeof height === 'number' ? `${height}px` : height;
  const radiusValue = typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius;
  const gapValue = typeof gap === 'number' ? `${gap}px` : gap;
  
  // Adjust radius for the circle variant
  const variantStyles: { [key: string]: CSSProperties } = {
    rectangle: { borderRadius: radiusValue },
    circle: { borderRadius: '50%' },
    text: { 
      borderRadius: radiusValue,
      // For text-like skeletons, adjust height for text lines
      marginBottom: '0.3rem',
      // Make the width slightly different for each item in a row to look natural
      width: count > 1 ? `calc(${widthValue} - ${Math.random() * 10}%)` : widthValue
    },
  };
  
  // Base styles for the skeleton
  const baseStyle: CSSProperties = {
    height: heightValue,
    width: widthValue,
    ...variantStyles[variant],
  };
  
  // Container style for multiple skeletons
  const containerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: gapValue,
  };

  // If there's only one skeleton, return a single element
  if (count === 1) {
    return (
      <div
        style={baseStyle}
        className={`bg-gray-200 dark:bg-gray-700 ${
          animate ? 'animate-pulse' : ''
        } ${className}`}
        aria-hidden="true"
      />
    );
  }

  // For multiple skeletons, return a container with multiple elements
  return (
    <div style={containerStyle}>
      {Array.from({ length: count }).map((_, index) => {
        // For text variant, vary the width slightly to make it look more natural
        const individualStyle = { ...baseStyle };
        if (variant === 'text') {
          const variationPercentage = Math.random() * 20;
          individualStyle.width = 
            index === count - 1 
              ? `calc(${widthValue} - ${20 + variationPercentage}%)` // Last line shorter
              : `calc(${widthValue} - ${variationPercentage}%)`;
        }
        
        return (
          <div
            key={index}
            style={individualStyle}
            className={`bg-gray-200 dark:bg-gray-700 ${
              animate ? 'animate-pulse' : ''
            } ${className}`}
            aria-hidden="true"
          />
        );
      })}
    </div>
  );
}

'use client';

import { CSSProperties } from 'react';

interface SkeletonProps {
    width?: string | number;
  
    height?: string | number;
  
    borderRadius?: string | number;
  
    animate?: boolean;
  
    variant?: 'rectangle' | 'circle' | 'text';
  
    className?: string;
  
    count?: number;
  
    gap?: string | number;
}

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
  
  const widthValue = typeof width === 'number' ? `${width}px` : width;
  const heightValue = typeof height === 'number' ? `${height}px` : height;
  const radiusValue = typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius;
  const gapValue = typeof gap === 'number' ? `${gap}px` : gap;
  
  
  const variantStyles: { [key: string]: CSSProperties } = {
    rectangle: { borderRadius: radiusValue },
    circle: { borderRadius: '50%' },
    text: { 
      borderRadius: radiusValue,
      
      marginBottom: '0.3rem',
      
      width: count > 1 ? `calc(${widthValue} - ${Math.random() * 10}%)` : widthValue
    },
  };
  
  
  const baseStyle: CSSProperties = {
    height: heightValue,
    width: widthValue,
    ...variantStyles[variant],
  };
  
  
  const containerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: gapValue,
  };

  
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

  
  return (
    <div style={containerStyle}>
      {Array.from({ length: count }).map((_, index) => {
        
        const individualStyle = { ...baseStyle };
        if (variant === 'text') {
          const variationPercentage = Math.random() * 20;
          individualStyle.width = 
            index === count - 1 
              ? `calc(${widthValue} - ${20 + variationPercentage}%)` 
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

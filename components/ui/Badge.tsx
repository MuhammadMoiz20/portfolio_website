'use client';

import { ReactNode } from 'react';
import Link from 'next/link';

/**
 * Badge color variants
 */
type BadgeColor = 
  | 'primary' 
  | 'secondary' 
  | 'success' 
  | 'danger' 
  | 'warning' 
  | 'info' 
  | 'gray';

/**
 * Badge size variants
 */
type BadgeSize = 'sm' | 'md' | 'lg';

interface BadgeProps {
  /**
   * Badge content (text or icon)
   */
  children: ReactNode;
  
  /**
   * Color variant of the badge
   * @default 'primary'
   */
  color?: BadgeColor;
  
  /**
   * Size variant of the badge
   * @default 'md'
   */
  size?: BadgeSize;
  
  /**
   * Visual variant (solid or outline)
   * @default 'solid'
   */
  variant?: 'solid' | 'outline';
  
  /**
   * Whether the badge should be rounded as a pill
   * @default false
   */
  pill?: boolean;
  
  /**
   * Optional icon to display before the text
   */
  icon?: ReactNode;
  
  /**
   * Whether to add a remove/close button
   * @default false
   */
  removable?: boolean;
  
  /**
   * Handler for remove button click
   */
  onRemove?: () => void;
  
  /**
   * URL for clickable badges
   */
  href?: string;
  
  /**
   * Whether the link should open in a new tab
   * @default false
   */
  external?: boolean;
  
  /**
   * Custom CSS class
   */
  className?: string;
}

/**
 * Badge component
 * Used for displaying tags, labels, and status indicators
 */
export default function Badge({
  children,
  color = 'primary',
  size = 'md',
  variant = 'solid',
  pill = false,
  icon,
  removable = false,
  onRemove,
  href,
  external = false,
  className = '',
}: BadgeProps) {
  // Color variants mapping
  const colorMap = {
    solid: {
      primary: 'bg-primary-600 text-white dark:bg-primary-500',
      secondary: 'bg-secondary-600 text-white dark:bg-secondary-500',
      success: 'bg-green-600 text-white dark:bg-green-500',
      danger: 'bg-red-600 text-white dark:bg-red-500',
      warning: 'bg-amber-500 text-white dark:bg-amber-400',
      info: 'bg-blue-600 text-white dark:bg-blue-500',
      gray: 'bg-gray-600 text-white dark:bg-gray-500',
    },
    outline: {
      primary: 'border border-primary-500 text-primary-700 dark:border-primary-400 dark:text-primary-400',
      secondary: 'border border-secondary-500 text-secondary-700 dark:border-secondary-400 dark:text-secondary-400',
      success: 'border border-green-500 text-green-700 dark:border-green-400 dark:text-green-400',
      danger: 'border border-red-500 text-red-700 dark:border-red-400 dark:text-red-400',
      warning: 'border border-amber-500 text-amber-700 dark:border-amber-400 dark:text-amber-400',
      info: 'border border-blue-500 text-blue-700 dark:border-blue-400 dark:text-blue-400',
      gray: 'border border-gray-500 text-gray-700 dark:border-gray-400 dark:text-gray-400',
    },
  };
  
  // Size variants mapping
  const sizeMap = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
  };
  
  // Build the base classes
  const baseClasses = `
    inline-flex items-center font-medium
    ${pill ? 'rounded-full' : 'rounded-md'}
    ${colorMap[variant][color]}
    ${sizeMap[size]}
    ${className}
  `;
  
  // Badge content with optional icon
  const content = (
    <>
      {icon && <span className="mr-1.5">{icon}</span>}
      <span>{children}</span>
      {removable && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            if (onRemove) onRemove();
          }}
          className={`ml-1.5 inline-flex h-4 w-4 items-center justify-center rounded-full text-xs
            ${variant === 'solid' ? 'bg-white/20 hover:bg-white/30' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}
          `}
          aria-label="Remove"
        >
          ✕
        </button>
      )}
    </>
  );
  
  // If href is provided, render as a link
  if (href) {
    const linkProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};
    
    return (
      <Link href={href} className={`${baseClasses} cursor-pointer hover:opacity-90`} {...linkProps}>
        {content}
      </Link>
    );
  }
  
  // Otherwise, render as a span
  return <span className={baseClasses}>{content}</span>;
}

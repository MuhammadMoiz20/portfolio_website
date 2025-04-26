'use client';

import { FiGithub, FiTwitter, FiLinkedin, FiYoutube, FiInstagram, FiDribbble, FiCodepen, FiMail, FiGlobe } from 'react-icons/fi';
import { motion } from 'framer-motion';

/**
 * Social media link interface
 */
export interface SocialLink {
  /**
   * Platform name
   */
  platform: string;
  
  /**
   * URL to profile
   */
  url: string;
  
  /**
   * Custom label (optional)
   */
  label?: string;
  
  /**
   * Custom icon (optional)
   */
  icon?: React.ReactNode;
}

interface SocialLinksProps {
  /**
   * Array of social links
   */
  links: SocialLink[];
  
  /**
   * Visual style variant
   * @default 'default'
   */
  variant?: 'default' | 'outline' | 'filled' | 'minimal' | 'text';
  
  /**
   * Size of icons
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
  
  /**
   * Whether to animate icons on hover
   * @default true
   */
  animated?: boolean;
  
  /**
   * Whether to show labels next to icons
   * @default false
   */
  showLabels?: boolean;
  
  /**
   * Color theme
   * @default 'default'
   */
  colorTheme?: 'default' | 'monochrome' | 'colored' | 'muted';
  
  /**
   * Custom CSS class
   */
  className?: string;
}

/**
 * SocialLinks component
 * Displays a collection of social media profile links
 */
export default function SocialLinks({
  links,
  variant = 'default',
  size = 'md',
  animated = true,
  showLabels = false,
  colorTheme = 'default',
  className = '',
}: SocialLinksProps) {
  /**
   * Get icon by platform name
   */
  const getIcon = (link: SocialLink) => {
    // If custom icon is provided, use it
    if (link.icon) {
      return link.icon;
    }
    
    // Default icons for common platforms
    const platform = link.platform.toLowerCase();
    const iconSize = size === 'sm' ? 16 : size === 'lg' ? 24 : 20;
    
    switch (platform) {
      case 'github':
        return <FiGithub size={iconSize} />;
      case 'twitter':
      case 'x':
        return <FiTwitter size={iconSize} />;
      case 'linkedin':
        return <FiLinkedin size={iconSize} />;
      case 'youtube':
        return <FiYoutube size={iconSize} />;
      case 'instagram':
        return <FiInstagram size={iconSize} />;
      case 'dribbble':
        return <FiDribbble size={iconSize} />;
      case 'codepen':
        return <FiCodepen size={iconSize} />;
      case 'email':
        return <FiMail size={iconSize} />;
      default:
        return <FiGlobe size={iconSize} />;
    }
  };
  
  /**
   * Get color class based on platform and theme
   */
  const getColorClass = (link: SocialLink) => {
    if (colorTheme === 'monochrome') {
      return 'text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white';
    }
    
    if (colorTheme === 'muted') {
      return 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300';
    }
    
    if (colorTheme === 'colored') {
      const platform = link.platform.toLowerCase();
      
      switch (platform) {
        case 'github':
          return 'text-gray-800 hover:text-black dark:text-gray-300 dark:hover:text-white';
        case 'twitter':
        case 'x':
          return 'text-blue-400 hover:text-blue-500 dark:text-blue-300 dark:hover:text-blue-400';
        case 'linkedin':
          return 'text-blue-600 hover:text-blue-700 dark:text-blue-500 dark:hover:text-blue-400';
        case 'youtube':
          return 'text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-400';
        case 'instagram':
          return 'text-pink-600 hover:text-pink-700 dark:text-pink-400 dark:hover:text-pink-300';
        case 'dribbble':
          return 'text-pink-500 hover:text-pink-600 dark:text-pink-400 dark:hover:text-pink-300';
        case 'codepen':
          return 'text-gray-800 hover:text-black dark:text-gray-300 dark:hover:text-white';
        default:
          return 'text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300';
      }
    }
    
    // Default theme
    return 'text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400';
  };
  
  /**
   * Get size-related classes
   */
  const getSizeClass = () => {
    switch (size) {
      case 'sm':
        return showLabels ? 'text-xs p-1.5' : 'p-1.5';
      case 'lg':
        return showLabels ? 'text-base p-3' : 'p-3';
      case 'md':
      default:
        return showLabels ? 'text-sm p-2' : 'p-2';
    }
  };
  
  /**
   * Get variant-specific classes
   */
  const getVariantClass = () => {
    switch (variant) {
      case 'outline':
        return 'border border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600';
      case 'filled':
        return 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700';
      case 'minimal':
        return '';
      case 'text':
        return 'underline-offset-2 hover:underline';
      case 'default':
      default:
        return 'hover:bg-gray-100 dark:hover:bg-gray-800';
    }
  };
  
  /**
   * Get shape class
   */
  const getShapeClass = () => {
    return variant === 'minimal' || variant === 'text' 
      ? '' 
      : 'rounded-full';
  };
  
  /**
   * Generate full class string for link
   */
  const getLinkClass = (link: SocialLink) => {
    let baseClass =
      'inline-flex items-center justify-center rounded-xl bg-white/40 dark:bg-gray-900/40 shadow-glass-sm backdrop-blur-md border border-white/20 dark:border-gray-700/30 transition-all duration-300 focus:outline-none hover:scale-110 hover:bg-primary-100/60 dark:hover:bg-primary-800/40';
    return `${baseClass} ${getColorClass(link)} ${getSizeClass()} ${getVariantClass()} ${getShapeClass()}`;
  };
  
  /**
   * Get label for a social link
   */
  const getLabel = (link: SocialLink) => {
    if (link.label) {
      return link.label;
    }
    
    // Capitalize first letter of platform
    return link.platform.charAt(0).toUpperCase() + link.platform.slice(1);
  };

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {links.map((link, index) => (
        <motion.a
          key={index}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={getLinkClass(link)}
          aria-label={getLabel(link)}
          whileHover={animated ? { scale: 1.1 } : {}}
          whileTap={animated ? { scale: 0.97 } : {}}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          {getIcon(link)}
          {showLabels && (
            <span className="ml-2">{getLabel(link)}</span>
          )}
        </motion.a>
      ))}
    </div>
  );
}

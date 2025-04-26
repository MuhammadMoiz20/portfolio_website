'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';

interface CallToActionProps {
  /**
   * CTA title/headline
   */
  title: string;
  
  /**
   * CTA description
   */
  description?: string;
  
  /**
   * Primary button text
   */
  primaryButtonText: string;
  
  /**
   * Primary button URL
   */
  primaryButtonUrl: string;
  
  /**
   * Secondary button text
   */
  secondaryButtonText?: string;
  
  /**
   * Secondary button URL
   */
  secondaryButtonUrl?: string;
  
  /**
   * Visual style variant
   * @default 'default'
   */
  variant?: 'default' | 'gradient' | 'image' | 'simple' | 'newsletter';
  
  /**
   * Background image URL (for 'image' variant)
   */
  backgroundImage?: string;
  
  /**
   * Background color style
   * @default 'primary'
   */
  backgroundColor?: 'primary' | 'dark' | 'light' | 'accent';
  
  /**
   * Custom CSS class
   */
  className?: string;
}

/**
 * CallToAction component
 * A versatile call-to-action section with multiple visual styles
 */
export default function CallToAction({
  title,
  description,
  primaryButtonText,
  primaryButtonUrl,
  secondaryButtonText,
  secondaryButtonUrl,
  variant = 'default',
  backgroundImage,
  backgroundColor = 'primary',
  className = '',
}: CallToActionProps) {
  /**
   * Get background color classes based on color style
   */
  const getBackgroundColorClasses = () => {
    switch (backgroundColor) {
      case 'dark':
        return 'bg-gray-900 text-white';
      case 'light':
        return 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white';
      case 'accent':
        return 'bg-indigo-600 text-white dark:bg-indigo-700';
      case 'primary':
      default:
        return 'bg-primary-600 text-white dark:bg-primary-700';
    }
  };
  
  /**
   * Render CTA based on variant
   */
  const renderCTA = () => {
    // Default variant (solid background)
    if (variant === 'default') {
      return (
        <div className={`px-8 py-14 rounded-3xl bg-white/30 dark:bg-gray-900/40 backdrop-blur-lg shadow-glass-lg border border-white/20 dark:border-gray-800/40 ${className} transition-all duration-500`}> 
          <div className="mx-auto text-center">
            <h2 className="mb-4 text-4xl font-extrabold leading-tight tracking-tight bg-gradient-to-r from-primary-600 via-secondary-400 to-indigo-500 bg-clip-text text-transparent md:text-5xl drop-shadow-neon">
              {title}
            </h2>
            {description && (
              <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-800 dark:text-gray-200 opacity-90">
                {description}
              </p>
            )}
            <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Button
                href={primaryButtonUrl}
                variant="primary"
                size="lg"
                className="rounded-full shadow-glass-md px-8 py-3 text-lg font-bold transition-all duration-300 hover:scale-105 hover:shadow-glass-lg"
              >
                {primaryButtonText}
              </Button>
              {secondaryButtonText && secondaryButtonUrl && (
                <Button
                  href={secondaryButtonUrl}
                  variant="outline"
                  size="lg"
                  className="rounded-full border-2 border-primary-500 text-primary-600 dark:text-primary-300 bg-white/60 dark:bg-gray-900/60 hover:bg-primary-50 dark:hover:bg-primary-900/30 shadow-glass-sm px-8 py-3 text-lg font-semibold transition-all duration-300 hover:scale-105"
                >
                  {secondaryButtonText}
                </Button>
              )}
            </div>
          </div>
        </div>
      );
    }
    
    // Gradient variant
    if (variant === 'gradient') {
      return (
        <div className={`px-6 py-12 bg-gradient-to-r ${
          backgroundColor === 'primary'
            ? 'from-primary-600 to-indigo-700'
            : backgroundColor === 'dark'
            ? 'from-gray-900 to-gray-800'
            : backgroundColor === 'light'
            ? 'from-gray-100 to-white dark:from-gray-800 dark:to-gray-900'
            : 'from-indigo-600 to-purple-700'
        } rounded-xl text-white ${className}`}>
          <div className="mx-auto text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-4 text-3xl font-bold leading-tight md:text-4xl"
            >
              {title}
            </motion.h2>
            
            {description && (
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="mx-auto mb-8 max-w-2xl text-lg opacity-90"
              >
                {description}
              </motion.p>
            )}
            
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
            >
              <Button
                href={primaryButtonUrl}
                variant="secondary"
                size="lg"
              >
                {primaryButtonText}
              </Button>
              
              {secondaryButtonText && secondaryButtonUrl && (
                <Button
                  href={secondaryButtonUrl}
                  variant="ghost"
                  size="lg"
                >
                  {secondaryButtonText}
                </Button>
              )}
            </motion.div>
          </div>
        </div>
      );
    }
    
    // Image background variant
    if (variant === 'image' && backgroundImage) {
      return (
        <div className={`relative overflow-hidden rounded-xl ${className}`}>
          {/* Background image */}
          <div className="absolute inset-0">
            <Image
              src={backgroundImage}
              alt="Background"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1200px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
          
          {/* Content */}
          <div className="relative px-6 py-16 text-center text-white">
            <h2 className="mb-4 text-3xl font-bold leading-tight md:text-4xl">
              {title}
            </h2>
            
            {description && (
              <p className="mx-auto mb-8 max-w-2xl text-lg">
                {description}
              </p>
            )}
            
            <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Button
                href={primaryButtonUrl}
                variant="secondary"
                size="lg"
              >
                {primaryButtonText}
              </Button>
              
              {secondaryButtonText && secondaryButtonUrl && (
                <Button
                  href={secondaryButtonUrl}
                  variant="ghost"
                  size="lg"
                >
                  {secondaryButtonText}
                </Button>
              )}
            </div>
          </div>
        </div>
      );
    }
    
    // Simple variant
    if (variant === 'simple') {
      return (
        <div className={`px-6 py-8 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 ${className}`}>
          <div className="flex flex-col items-center justify-between text-center md:flex-row md:text-left">
            <div className="mb-6 md:mb-0 md:mr-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {title}
              </h2>
              
              {description && (
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  {description}
                </p>
              )}
            </div>
            
            <div className="flex flex-shrink-0 flex-col space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">
              <Button
                href={primaryButtonUrl}
                variant="primary"
              >
                {primaryButtonText}
              </Button>
              
              {secondaryButtonText && secondaryButtonUrl && (
                <Button
                  href={secondaryButtonUrl}
                  variant="outline"
                >
                  {secondaryButtonText}
                </Button>
              )}
            </div>
          </div>
        </div>
      );
    }
    
    // Newsletter variant
    if (variant === 'newsletter') {
      return (
        <div className={`px-6 py-12 rounded-xl ${
          backgroundColor === 'light'
            ? 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
            : getBackgroundColorClasses()
        } ${className}`}>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className={`mb-4 text-3xl font-bold ${
              backgroundColor === 'light' ? 'text-gray-900 dark:text-white' : 'text-white'
            }`}>
              {title}
            </h2>
            
            {description && (
              <p className={`mb-6 text-lg ${
                backgroundColor === 'light' ? 'text-gray-600 dark:text-gray-300' : 'text-white/90'
              }`}>
                {description}
              </p>
            )}
            
            {/* Newsletter form */}
            <form 
              action={primaryButtonUrl} 
              method="post" 
              className="flex flex-col space-y-4 sm:flex-row sm:space-x-2 sm:space-y-0"
            >
              <div className="flex-1">
                <label htmlFor="email-address" className="sr-only">Email address</label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className={`w-full rounded-lg border-gray-300 px-4 py-3 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white ${
                    backgroundColor !== 'light' ? 'bg-white/10 border-white/20 placeholder-white/80' : ''
                  }`}
                />
              </div>
              <button
                type="submit"
                className={`rounded-lg bg-primary-600 px-6 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:bg-primary-500 dark:hover:bg-primary-600 dark:focus:ring-primary-400 ${backgroundColor !== 'light' ? 'bg-white/20 text-white border-white/30' : ''}`}
              >
                {primaryButtonText}
              </button>
            </form>
            {secondaryButtonText && (
              <p className={`mt-4 text-sm ${
                backgroundColor === 'light' ? 'text-gray-500 dark:text-gray-400' : 'text-white/80'
              }`}>
                {secondaryButtonText}
              </p>
            )}
          </div>
        </div>
      );
    }
    
    return null;
  };

  return renderCTA();
}

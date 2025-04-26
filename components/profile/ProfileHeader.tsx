'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { SocialLink } from '@/components/common/SocialLinks';
import SocialLinks from '@/components/common/SocialLinks';

interface ProfileHeaderProps {
  /**
   * Full name
   */
  name: string;
  
  /**
   * Job title or position
   */
  title: string;
  
  /**
   * Profile image URL
   */
  imageUrl: string;
  
  /**
   * Background image URL (optional)
   */
  backgroundImageUrl?: string;
  
  /**
   * Short bio or description
   */
  bio?: string;
  
  /**
   * Location
   */
  location?: string;
  
  /**
   * Available for work status
   */
  available?: boolean;
  
  /**
   * Social media links
   */
  socialLinks?: SocialLink[];
  
  /**
   * Contact email
   */
  contactEmail?: string;
  
  /**
   * Layout style variant
   * @default 'default'
   */
  variant?: 'default' | 'cover' | 'compact' | 'centered';
  
  /**
   * Custom CSS class
   */
  className?: string;
  
  /**
   * Custom actions/buttons
   */
  actions?: React.ReactNode;
}

/**
 * ProfileHeader component
 * Displays personal profile information in a header format
 */
export default function ProfileHeader({
  name,
  title,
  imageUrl,
  backgroundImageUrl,
  bio,
  location,
  available,
  socialLinks = [],
  contactEmail,
  variant = 'default',
  className = '',
  actions,
}: ProfileHeaderProps) {
  const renderDefault = () => (
    <div className={`relative overflow-hidden rounded-3xl bg-white/30 dark:bg-gray-900/40 shadow-glass-lg backdrop-blur-lg border border-white/20 dark:border-gray-800/40 transition-all duration-500 ${className}`}>
      {backgroundImageUrl && (
        <div className="relative h-48 w-full">
          <Image 
            src={backgroundImageUrl}
            alt="Profile background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-700/70 via-transparent to-transparent opacity-90" />
        </div>
      )}
      
      <div className={`px-10 pb-10 ${backgroundImageUrl ? '-mt-16' : 'pt-10'}`}>
        <div className="flex flex-col items-center md:flex-row md:items-start gap-8">
          <div className="relative h-32 w-32 flex-shrink-0 overflow-hidden rounded-full border-4 border-white/40 bg-white/60 shadow-glass-md dark:border-gray-700/60 dark:bg-gray-900/60 backdrop-blur-md transition-all duration-500">
            <Image 
              src={imageUrl}
              alt={name}
              fill
              className="object-cover"
            />
          </div>
          
          <div className="mt-6 text-center md:ml-8 md:mt-0 md:text-left">
            <div className="flex flex-col items-center md:flex-row md:items-center gap-3">
              <h1 className="text-3xl font-extrabold bg-gradient-to-r from-primary-600 via-secondary-400 to-indigo-500 bg-clip-text text-transparent tracking-tight drop-shadow-neon">{name}</h1>
              {available && (
                <span className="ml-0 mt-2 inline-flex items-center rounded-full bg-green-400/20 px-3 py-0.5 text-xs font-bold text-green-700 dark:bg-green-900/40 dark:text-green-300 shadow-glass-sm md:ml-3 md:mt-0 animate-pulse">
                  Available for work
                </span>
              )}
            </div>
            
            <p className="mt-1 text-lg text-gray-700 dark:text-gray-300 font-light">{title}</p>
            
            {location && (
              <p className="mt-2 text-sm text-primary-600 dark:text-primary-400 font-medium">
                {location}
              </p>
            )}
            
            {bio && (
              <p className="mt-4 text-base text-gray-800 dark:text-gray-200 md:max-w-lg leading-relaxed">
                {bio}
              </p>
            )}
            
            <div className="mt-6 flex flex-wrap justify-center gap-3 md:justify-start">
              {socialLinks && socialLinks.length > 0 && (
                <SocialLinks 
                  links={socialLinks} 
                  size="sm"
                  variant="filled"
                  colorTheme="default"
                  className="rounded-xl bg-white/40 dark:bg-gray-900/40 shadow-glass-sm backdrop-blur-md border border-white/20 dark:border-gray-700/30 p-1"
                />
              )}
              
              {contactEmail && (
                <a
                  href={`mailto:${contactEmail}`}
                  className="inline-flex items-center rounded-full bg-gradient-to-r from-primary-500 via-secondary-400 to-primary-300 px-4 py-2 text-white shadow hover:from-primary-700 hover:to-secondary-600 transition-all duration-300 font-semibold ml-2"
                >
                  Contact
                </a>
              )}
              
              {actions}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
  const renderCover = () => (
    <div className={`relative h-80 overflow-hidden rounded-xl ${className}`}>
      {/* Background image */}
      {backgroundImageUrl ? (
        <Image 
          src={backgroundImageUrl}
          alt="Cover background"
          fill
          className="object-cover"
        />
      ) : (
        <div className="h-full w-full bg-gradient-to-r from-primary-600 to-indigo-600" />
      )}
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      
      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-white/50 shadow-lg"
        >
          <Image 
            src={imageUrl}
            alt={name}
            fill
            className="object-cover"
          />
        </motion.div>
        
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-4 text-3xl font-bold"
        >
          {name}
        </motion.h1>
        
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-2 text-lg text-white/80"
        >
          {title}
        </motion.p>
        
        {bio && (
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-3 max-w-lg text-white/70"
          >
            {bio}
          </motion.p>
        )}
        
        {socialLinks && socialLinks.length > 0 && (
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-6"
          >
            <SocialLinks 
              links={socialLinks} 
              variant="minimal"
              colorTheme="monochrome"
            />
          </motion.div>
        )}
      </div>
    </div>
  );
  
  const renderCompact = () => (
    <div className={`flex items-center space-x-4 rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800 ${className}`}>
      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full">
        <Image 
          src={imageUrl}
          alt={name}
          fill
          className="object-cover"
        />
      </div>
      
      <div>
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">{name}</h2>
        <p className="text-gray-600 dark:text-gray-400">{title}</p>
        
        {location && (
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
            {location}
          </p>
        )}
      </div>
      
      <div className="ml-auto flex items-center">
        {available && (
          <span className="mr-4 inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">
            Available
          </span>
        )}
        
        {actions}
      </div>
    </div>
  );
  
  const renderCentered = () => (
    <div className={`flex flex-col items-center justify-center text-center ${className}`}>
      <div className="relative h-28 w-28 overflow-hidden rounded-full">
        <Image 
          src={imageUrl}
          alt={name}
          fill
          className="object-cover"
        />
      </div>
      
      <h1 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">{name}</h1>
      <p className="mt-1 text-gray-600 dark:text-gray-400">{title}</p>
      
      {location && (
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-500">
          {location}
        </p>
      )}
      
      {bio && (
        <p className="mt-4 max-w-md text-center text-gray-600 dark:text-gray-400">
          {bio}
        </p>
      )}
      
      {socialLinks && socialLinks.length > 0 && (
        <div className="mt-4">
          <SocialLinks 
            links={socialLinks} 
            variant="outline"
            colorTheme="default"
          />
        </div>
      )}
      
      {actions && (
        <div className="mt-6">
          {actions}
        </div>
      )}
    </div>
  );
  
  // Render based on selected variant
  switch (variant) {
    case 'cover':
      return renderCover();
    case 'compact':
      return renderCompact();
    case 'centered':
      return renderCentered();
    case 'default':
    default:
      return renderDefault();
  }
}

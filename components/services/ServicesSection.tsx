'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import SectionHeading from '@/components/ui/SectionHeading';

*
 * Service item interface
 
export interface Service {
  *
   * Unique identifier
   
  id: string | number;
  
  *
   * Service title
   
  title: string;
  
  *
   * Short description
   
  description: string;
  
  *
   * Service icon or image
   
  icon: React.ReactNode | string;
  
  *
   * URL to service details page
   
  url?: string;
  
  *
   * Service category
   
  category?: string;
  
  *
   * Featured service (will be highlighted)
   
  featured?: boolean;
  
  *
   * Service features or bullets
   
  features?: string[];
  
  *
   * Custom color for the service card
   
  color?: string;
}

interface ServicesSectionProps {
  *
   * Section title
   * @default 'Services'
   
  title?: string;
  
  *
   * Section subtitle
   
  subtitle?: string;
  
  *
   * Array of services
   
  services: Service[];
  
  *
   * Visual layout style
   * @default 'grid'
   
  layout?: 'grid' | 'list' | 'carousel' | 'featured';
  
  *
   * Whether to show a "View All Services" link
   * @default false
   
  showViewAllLink?: boolean;
  
  *
   * Link to all services page
   
  viewAllUrl?: string;
  
  *
   * Whether to enable category filtering
   * @default false
   
  enableFiltering?: boolean;
  
  *
   * Custom CSS class
   
  className?: string;
}

*
 * ServicesSection component
 * Displays professional services or offerings in various layouts
 
export default function ServicesSection({
  title = 'Services',
  subtitle,
  services,
  layout = 'grid',
  showViewAllLink = false,
  viewAllUrl = '/services',
  enableFiltering = false,
  className = '',
}: ServicesSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
   Extract unique categories
  const categories = enableFiltering
    ? Array.from(new Set(services.filter(service => service.category).map(service => service.category)))
    : [];
  
   Filter services by category
  const filteredServices = activeCategory
    ? services.filter(service => service.category === activeCategory)
    : services;
  
   Get featured services
  const featuredServices = services.filter(service => service.featured);
  
   Helper to render service icon (supports both React components and image URLs)
  const renderIcon = (icon: React.ReactNode | string) => {
    if (typeof icon === 'string') {
       If icon is a string (URL), render an image
      return (
        <div className="relative h-12 w-12">
          <Image
            src={icon}
            alt="Service icon"
            fill
            sizes="48px"
            className="object-contain"
          />
        </div>
      );
    } else {
       Otherwise, render the React node
      return icon;
    }
  };
  
   Render services in grid layout
  const renderGridLayout = (items: Service[]) => (
    <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((service, index) => (
        <motion.div
          key={service.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          className={`group rounded-lg border border-gray-200 p-6 transition-shadow hover:shadow-md dark:border-gray-700 dark:hover:shadow-gray-800/30 ${
            service.featured
              ? 'bg-primary-50 dark:bg-primary-900/20'
              : 'bg-white dark:bg-gray-800'
          }`}
        >
          { Icon }
          <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-lg ${
            service.color || 'bg-primary-100 text-primary-600 dark:bg-primary-900/50 dark:text-primary-400'
          }`}>
            {renderIcon(service.icon)}
          </div>
          
          { Title }
          <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
            {service.title}
            
            { Category badge }
            {service.category && (
              <span className="ml-2 inline-flex rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                {service.category}
              </span>
            )}
          </h3>
          
          { Description }
          <p className="mb-4 text-gray-600 dark:text-gray-400">
            {service.description}
          </p>
          
          { Features }
          {service.features && service.features.length > 0 && (
            <ul className="mb-4 list-inside list-disc space-y-1 text-sm text-gray-600 dark:text-gray-400">
              {service.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
          )}
          
          { Service link }
          {service.url && (
            <Link
              href={service.url}
              className="group inline-flex items-center text-sm font-medium text-primary-600 transition-colors hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
            >
              Learn more
              <FiArrowRight className="ml-1 transition-transform group-hover:translate-x-1" />
            </Link>
          )}
        </motion.div>
      ))}
    </div>
  );
  
   Render services in list layout
  const renderListLayout = (items: Service[]) => (
    <div className="mt-10 space-y-6">
      {items.map((service, index) => (
        <motion.div
          key={service.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          className={`flex rounded-lg border border-gray-200 p-6 transition-shadow hover:shadow-md dark:border-gray-700 dark:hover:shadow-gray-800/30 ${
            service.featured
              ? 'bg-primary-50 dark:bg-primary-900/20'
              : 'bg-white dark:bg-gray-800'
          }`}
        >
          { Icon }
          <div className={`mr-6 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-lg ${
            service.color || 'bg-primary-100 text-primary-600 dark:bg-primary-900/50 dark:text-primary-400'
          }`}>
            {renderIcon(service.icon)}
          </div>
          
          { Content }
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {service.title}
                </h3>
                
                { Category badge }
                {service.category && (
                  <span className="mt-1 inline-flex rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                    {service.category}
                  </span>
                )}
              </div>
              
              { Service link }
              {service.url && (
                <Link
                  href={service.url}
                  className="group flex-shrink-0 text-sm font-medium text-primary-600 transition-colors hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                >
                  <span className="flex items-center">
                    Learn more
                    <FiArrowRight className="ml-1 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              )}
            </div>
            
            { Description }
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {service.description}
            </p>
            
            { Features }
            {service.features && service.features.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {service.features.map((feature, i) => (
                  <span
                    key={i}
                    className="inline-flex rounded-full bg-gray-50 px-2.5 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
  
   Render services in featured layout (one featured service at top, grid below)
  const renderFeaturedLayout = () => {
     If no featured services, fall back to grid layout
    if (featuredServices.length === 0) {
      return renderGridLayout(filteredServices);
    }
    
     Get the first featured service and remaining services
    const mainService = featuredServices[0];
    const remainingServices = filteredServices.filter(
      service => service.id !== mainService.id
    );
    
    return (
      <div className="mt-10 space-y-10">
        { Main featured service }
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden rounded-xl bg-gradient-to-r from-primary-600 to-primary-800 shadow-lg dark:from-primary-700 dark:to-primary-900"
        >
          <div className="flex flex-col p-8 text-white md:flex-row md:items-center md:space-x-8">
            { Content }
            <div className="md:w-2/3">
              <h3 className="mb-4 text-2xl font-bold text-white md:text-3xl">
                {mainService.title}
              </h3>
              
              <p className="mb-6 text-lg text-white/90">
                {mainService.description}
              </p>
              
              { Features }
              {mainService.features && mainService.features.length > 0 && (
                <ul className="mb-6 space-y-2">
                  {mainService.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <svg
                        className="mr-2 h-5 w-5 text-primary-200"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http:www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              )}
              
              { Link }
              {mainService.url && (
                <Link
                  href={mainService.url}
                  className="group inline-flex items-center rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-primary-700 hover:bg-primary-50"
                >
                  Learn more
                  <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              )}
            </div>
            
            { Icon }
            <div className="mt-6 flex justify-center md:mt-0 md:w-1/3">
              <div className="flex h-32 w-32 items-center justify-center rounded-full bg-white/10 p-4">
                <div className="text-white">{renderIcon(mainService.icon)}</div>
              </div>
            </div>
          </div>
        </motion.div>
        
        { Remaining services }
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {remainingServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
              className="rounded-lg border border-gray-200 bg-white p-6 transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:shadow-gray-800/30"
            >
              { Icon }
              <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg ${
                service.color || 'bg-primary-100 text-primary-600 dark:bg-primary-900/50 dark:text-primary-400'
              }`}>
                {renderIcon(service.icon)}
              </div>
              
              { Title }
              <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
                {service.title}
                
                { Category badge }
                {service.category && (
                  <span className="ml-2 inline-flex rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                    {service.category}
                  </span>
                )}
              </h3>
              
              { Description }
              <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                {service.description}
              </p>
              
              { Service link }
              {service.url && (
                <Link
                  href={service.url}
                  className="group inline-flex items-center text-sm font-medium text-primary-600 transition-colors hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                >
                  Learn more
                  <FiArrowRight className="ml-1 transition-transform group-hover:translate-x-1" />
                </Link>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    );
  };
  
  return (
    <section className={`py-12 ${className}`}>
      <div className="container mx-auto px-4">
        { Section header }
        <SectionHeading
          title={title}
          subtitle={subtitle}
          centered
        />
        
        { Category filters }
        {enableFiltering && categories.length > 0 && (
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setActiveCategory(null)}
              className={`rounded-full px-4 py-2 text-sm font-medium ${
                activeCategory === null
                  ? 'bg-primary-600 text-white dark:bg-primary-500'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              All Services
            </button>
            
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-4 py-2 text-sm font-medium ${
                  activeCategory === category
                    ? 'bg-primary-600 text-white dark:bg-primary-500'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}
        
        { Services render based on layout }
        {filteredServices.length > 0 ? (
          <>
            {layout === 'grid' && renderGridLayout(filteredServices)}
            {layout === 'list' && renderListLayout(filteredServices)}
            {layout === 'featured' && renderFeaturedLayout()}
            {layout === 'carousel' && (
              <div className="mt-10">
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Note: Carousel layout would be implemented using a carousel component.
                  For a complete implementation, consider using libraries like embla-carousel or swiper.
                </p>
                {renderGridLayout(filteredServices)}
              </div>
            )}
            
            { View all services link }
            {showViewAllLink && viewAllUrl && (
              <div className="mt-12 text-center">
                <Link
                  href={viewAllUrl}
                  className="group inline-flex items-center rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-center text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  View all services
                  <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            )}
          </>
        ) : (
           No services found
          <div className="mt-10 py-12 text-center">
            <p className="text-lg text-gray-600 dark:text-gray-400">
              No services found.
            </p>
            {activeCategory && (
              <button
                onClick={() => setActiveCategory(null)}
                className="mt-4 text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
              >
                View all services
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

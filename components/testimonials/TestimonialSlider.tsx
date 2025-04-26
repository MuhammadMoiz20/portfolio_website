'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowLeft, FiArrowRight, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Testimonial } from '@/data/testimonials';

interface TestimonialSliderProps {
  /**
   * Array of testimonials to display
   */
  testimonials: Testimonial[];
  
  /**
   * Whether to auto-play the carousel
   * @default true
   */
  autoPlay?: boolean;
  
  /**
   * Interval between slides in milliseconds
   * @default 5000
   */
  interval?: number;
  
  /**
   * Visual style variant
   * @default 'default'
   */
  variant?: 'default' | 'minimal' | 'cards';
  
  /**
   * Custom CSS class
   */
  className?: string;
}

/**
 * TestimonialSlider component
 * Advanced carousel for testimonials with multiple visual styles
 */
export default function TestimonialSlider({
  testimonials,
  autoPlay = true,
  interval = 5000,
  variant = 'default',
  className = '',
}: TestimonialSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  
  // Function to go to next slide
  const nextSlide = useCallback(() => {
    setDirection('right');
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  }, [testimonials.length]);
  
  // Function to go to previous slide
  const prevSlide = useCallback(() => {
    setDirection('left');
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  }, [testimonials.length]);
  
  // Set up auto-play
  useEffect(() => {
    if (!autoPlay || isPaused) return;
    
    const slideInterval = setInterval(nextSlide, interval);
    
    return () => clearInterval(slideInterval);
  }, [autoPlay, isPaused, nextSlide, interval]);
  
  // Slide animation variants
  const slideVariants = {
    enter: (direction: string) => ({
      x: direction === 'right' ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: string) => ({
      x: direction === 'right' ? -300 : 300,
      opacity: 0,
    }),
  };
  
  // No testimonials, return nothing
  if (testimonials.length === 0) {
    return null;
  }
  
  // If only one testimonial, show without controls
  if (testimonials.length === 1) {
    return renderTestimonial(testimonials[0], variant, className);
  }
  
  return (
    <div 
      className={`relative ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides */}
      <div 
        className={`overflow-hidden ${
          variant === 'cards'
            ? 'relative h-[400px] max-w-4xl'
            : 'relative'
        }`}
      >
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="w-full"
          >
            {renderTestimonial(testimonials[currentIndex], variant, '')}
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Navigation arrows */}
      <div className="mt-4 flex items-center justify-center">
        <button
          onClick={prevSlide}
          className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-gray-700 transition-colors hover:bg-primary-500 hover:text-white dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-primary-600"
          aria-label="Previous testimonial"
        >
          {variant === 'cards' ? <FiArrowLeft /> : <FiChevronLeft />}
        </button>
        
        {/* Indicators */}
        <div className="flex space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 'right' : 'left');
                setCurrentIndex(index);
              }}
              className={`h-2 w-2 rounded-full transition-colors ${
                index === currentIndex
                  ? 'bg-primary-600 dark:bg-primary-500'
                  : 'bg-gray-300 dark:bg-gray-700'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
              aria-current={index === currentIndex ? 'true' : 'false'}
            />
          ))}
        </div>
        
        <button
          onClick={nextSlide}
          className="ml-3 flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-gray-700 transition-colors hover:bg-primary-500 hover:text-white dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-primary-600"
          aria-label="Next testimonial"
        >
          {variant === 'cards' ? <FiArrowRight /> : <FiChevronRight />}
        </button>
      </div>
    </div>
  );
}

/**
 * Helper function to render a testimonial based on variant
 */
function renderTestimonial(testimonial: Testimonial, variant: string, className: string) {
  switch (variant) {
    case 'minimal':
      return (
        <div className={`px-4 py-6 ${className}`}>
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-6 text-lg italic text-gray-600 dark:text-gray-400">
              "{testimonial.content}"
            </p>
            <div>
              <h4 className="text-base font-medium text-gray-900 dark:text-white">
                {testimonial.author}
              </h4>
              {testimonial.position && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {testimonial.position}
                </p>
              )}
            </div>
          </div>
        </div>
      );
      
    case 'cards':
      return (
        <div className={`rounded-xl bg-white p-8 shadow-lg dark:bg-gray-800 ${className}`}>
          <div className="flex flex-col md:flex-row md:items-center md:space-x-6">
            {testimonial.avatar && (
              <div className="mb-6 md:mb-0 md:w-1/3">
                <div className="relative h-64 w-full overflow-hidden rounded-xl md:h-80">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
              </div>
            )}
            
            <div className={testimonial.avatar ? 'md:w-2/3' : 'w-full'}>
              <div className="flex h-10 items-center">
                <svg className="h-8 w-8 text-primary-500" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
              </div>
              
              <p className="mb-6 text-xl text-gray-600 dark:text-gray-400">
                {testimonial.content}
              </p>
              
              <div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                  {testimonial.author}
                </h4>
                {testimonial.position && (
                  <p className="text-gray-500 dark:text-gray-400">
                    {testimonial.position}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      );
      
    case 'default':
    default:
      return (
        <div className={`rounded-xl bg-gray-50 px-6 py-8 dark:bg-gray-900 ${className}`}>
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            {testimonial.avatar && (
              <div className="mb-4">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  width={80}
                  height={80}
                  className="rounded-full object-cover"
                />
              </div>
            )}
            
            <blockquote>
              <p className="mb-6 text-xl font-medium text-gray-700 dark:text-gray-300">
                "{testimonial.content}"
              </p>
            </blockquote>
            
            <div className="flex flex-col items-center">
              <span className="h-1 w-10 rounded bg-primary-500" />
              <h4 className="mt-3 text-lg font-bold text-gray-900 dark:text-white">
                {testimonial.author}
              </h4>
              {testimonial.position && (
                <p className="text-gray-500 dark:text-gray-400">
                  {testimonial.position}
                </p>
              )}
            </div>
          </div>
        </div>
      );
  }
}

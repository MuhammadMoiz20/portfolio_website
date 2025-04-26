'use client';

import { useState, useEffect } from 'react';
import { Testimonial } from '@/data/testimonials';
import TestimonialCard from './TestimonialCard';
import CarouselControls from './CarouselControls';

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

export default function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    if (!autoplay) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [autoplay, testimonials.length]);

  const handleManualNavigation = (index: number) => {
    setActiveIndex(index);
    setAutoplay(false);
    

    setTimeout(() => setAutoplay(true), 10000);
  };

  const handlePrev = () => {
    const newIndex = activeIndex === 0 ? testimonials.length - 1 : activeIndex - 1;
    handleManualNavigation(newIndex);
  };

  const handleNext = () => {
    const newIndex = (activeIndex + 1) % testimonials.length;
    handleManualNavigation(newIndex);
  };

  return (
    <div className="relative mx-auto max-w-4xl">
      <div className="overflow-hidden rounded-2xl bg-white shadow-xl dark:bg-gray-800">
        <div className="relative h-full w-full">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              isActive={activeIndex === index}
            />
          ))}
        </div>
      </div>


      <CarouselControls 
        onPrev={handlePrev}
        onNext={handleNext}
        activeIndex={activeIndex}
        totalItems={testimonials.length}
        onDotClick={handleManualNavigation}
      />
    </div>
  );
}

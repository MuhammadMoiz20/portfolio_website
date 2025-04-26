'use client';

import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface CarouselControlsProps {
  onPrev: () => void;
  onNext: () => void;
  activeIndex: number;
  totalItems: number;
  onDotClick: (index: number) => void;
}

export default function CarouselControls({
  onPrev,
  onNext,
  activeIndex,
  totalItems,
  onDotClick,
}: CarouselControlsProps) {
  return (
    <>
      <button
        onClick={onPrev}
        className="absolute -left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-gray-700 shadow-md transition-all hover:bg-primary-50 hover:text-primary-600 focus:outline-none md:-left-5 md:h-12 md:w-12 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
        aria-label="Previous item"
      >
        <FiChevronLeft size={24} />
      </button>
      
      <button
        onClick={onNext}
        className="absolute -right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-gray-700 shadow-md transition-all hover:bg-primary-50 hover:text-primary-600 focus:outline-none md:-right-5 md:h-12 md:w-12 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
        aria-label="Next item"
      >
        <FiChevronRight size={24} />
      </button>

      <div className="mt-6 flex justify-center gap-2">
        {Array.from({ length: totalItems }).map((_, index) => (
          <button
            key={index}
            onClick={() => onDotClick(index)}
            className={`h-2.5 w-2.5 rounded-full transition-colors ${
              activeIndex === index
                ? 'bg-primary-600 dark:bg-primary-500'
                : 'bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500'
            }`}
            aria-label={`Go to item ${index + 1}`}
          />
        ))}
      </div>
    </>
  );
}

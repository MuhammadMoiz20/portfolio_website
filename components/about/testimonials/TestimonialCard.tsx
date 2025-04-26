'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Testimonial } from '@/data/testimonials';

interface TestimonialCardProps {
  testimonial: Testimonial;
  isActive: boolean;
}

export default function TestimonialCard({ testimonial, isActive }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ 
        opacity: isActive ? 1 : 0,
        x: isActive ? 0 : 100,
        display: isActive ? 'block' : 'none'
      }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="p-8 md:p-12"
    >
      <div className="mb-6 text-center">
        <div className="mx-auto h-20 w-20 overflow-hidden rounded-full border-4 border-primary-100 dark:border-primary-900">
          <Image
            src={testimonial.avatar}
            alt={testimonial.author}
            width={80}
            height={80}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
      
      <blockquote className="mb-6 text-center text-lg italic text-gray-700 dark:text-gray-300">
        "{testimonial.content}"
      </blockquote>
      
      <div className="text-center">
        <p className="font-bold text-gray-900 dark:text-white">{testimonial.author}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.position}</p>
      </div>
    </motion.div>
  );
}

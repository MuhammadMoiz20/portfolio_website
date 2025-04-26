'use client';

import { motion } from 'framer-motion';
import { testimonials } from '@/data/testimonials';
import TestimonialCarousel from './testimonials/TestimonialCarousel';


export default function Testimonials() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold mb-4">What People Say</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Testimonials from professors, colleagues, and project partners about my work and collaboration.
          </p>
        </motion.div>
        <TestimonialCarousel testimonials={testimonials} />
      </div>
    </section>
  );
}

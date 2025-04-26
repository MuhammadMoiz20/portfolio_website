'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiMail, FiArrowRight } from 'react-icons/fi';

export default function ContactCTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-950 dark:to-secondary-950">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="rounded-3xl bg-white p-8 shadow-xl dark:bg-gray-800 md:p-12 lg:p-16"
        >
          <div className="grid gap-8 md:grid-cols-2 md:gap-12 lg:items-center">
            <div>
              <h2 className="mb-4 text-3xl font-bold">
                Let's Collaborate on Your Next Project
              </h2>
              <p className="mb-6 text-gray-600 dark:text-gray-400">
                I'm currently available for freelance work and internship opportunities. If you have a project that needs attention or just want to chat, feel free to reach out.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="btn-primary inline-flex items-center"
                >
                  <FiMail className="mr-2" />
                  Get in Touch
                </Link>
                <Link
                  href="/projects"
                  className="btn-outline inline-flex items-center"
                >
                  See My Work
                  <FiArrowRight className="ml-2" />
                </Link>
              </div>
            </div>
            <div className="flex flex-col rounded-xl bg-gradient-to-br from-primary-100 to-secondary-100 p-6 dark:from-primary-900 dark:to-secondary-900 sm:p-8">
              <h3 className="mb-3 text-xl font-bold">I'm a Dartmouth Junior seeking:</h3>
              <ul className="space-y-4">
                {[
                  'Summer internship opportunities',
                  'Collaborative project partnerships',
                  'Research positions in tech',
                  'Freelance development work',
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start"
                  >
                    <span className="mr-2 mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary-500 text-xs text-white">
                      ✓
                    </span>
                    <span className="text-gray-700 dark:text-gray-300">
                      {item}
                    </span>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-6 rounded-lg bg-white p-4 dark:bg-gray-700">
                <p className="text-sm italic text-gray-600 dark:text-gray-300">
                  "I'm passionate about building innovative digital solutions and am eager to apply my skills to real-world challenges."
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

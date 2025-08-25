'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiBriefcase, FiAward, FiCode } from 'react-icons/fi';

export default function Timeline() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const timelineEvents = [
    {
      title: 'Software Engineering Intern — Absanoh',
      date: 'Jun 2025 – Present',
      description: 'Built React/Node checkout flows (+15% completion). Designed AWS Lambda + DynamoDB with retries/DLQs (-40% recurring alerts). Automated CI/CD with Docker + GitHub Actions (30 → <5 min deploys). Introduced Jest/PyTest (85% coverage, fewer defects).',
      icon: FiBriefcase,
      category: 'Work',
    },
    {
      title: 'System Developer — Dartmouth Rauner Special Collections',
      date: 'Sep 2024 – May 2025',
      description: 'Co-built archival platform indexing 500K+ manuscripts; -45% query latency. Re-architected PostgreSQL + full-text search for sub-second retrieval. Built digital asset management, saving 10 hrs/week. Features adopted by 20+ institutions.',
      icon: FiBriefcase,
      category: 'Work',
    },
    {
      title: 'Software Engineering Intern — Muff Garments LTD',
      date: 'Jun 2023 – Sep 2023; Jun 2024 – Sep 2024',
      description: 'Optimized APIs/cache to serve 20K monthly users with p95 <200ms. Built AWS Lambda/S3 image pipelines (-60% manual work, -25% bundle). Built Python/SQL + Tableau dashboards halving reporting time.',
      icon: FiBriefcase,
      category: 'Work',
    },
    {
      title: 'Project Assistant — Evergreen.AI',
      date: 'Jan 2024 – May 2024',
      description: 'Enhanced Python/React workflows for ML wellness tools used by 500+ students. Improved analytics integrations, +30% tracking accuracy.',
      icon: FiBriefcase,
      category: 'Work',
    },
    {
      title: 'ManToGo — Campus Delivery Platform',
      date: '2025',
      description: 'Full‑stack React/Mapbox with real-time tracking and payments; 120 users in 3 weeks with rewards and payments.',
      icon: FiCode,
      category: 'Project',
    },
    {
      title: 'Dartmouth College — B.S. CS & Mathematics (GPA 3.67)',
      date: '2022 – 2026',
      description: 'Relevant coursework: Algorithms, Software Design & Implementation, Full‑Stack Development, Security & Privacy.',
      icon: FiAward,
      category: 'Education',
    },
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Experience & Journey</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A timeline of my academic and professional milestones at Dartmouth and beyond.
          </p>
        </motion.div>

        <div ref={ref} className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-gray-200 dark:bg-gray-700" />

          <div className="space-y-12">
            {timelineEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Content */}
                <div className="mt-24 md:mt-0 md:w-1/2 md:px-8">
                  <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
                    <div className="mb-2 inline-block rounded-full bg-primary-100 px-3 py-1 text-xs font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300">
                      {event.category}
                    </div>
                    <h3 className="mb-2 text-xl font-bold">{event.title}</h3>
                    <p className="mb-3 text-sm text-gray-500 dark:text-gray-400">
                      {event.date}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      {event.description}
                    </p>
                  </div>
                </div>

                {/* Icon in middle */}
                <div className="absolute left-1/2 top-6 -translate-x-1/2 md:top-[50%] md:-translate-y-1/2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-600 text-white dark:bg-primary-500">
                    <event.icon size={24} />
                  </div>
                </div>

                {/* Placeholder div for layout */}
                <div className="md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

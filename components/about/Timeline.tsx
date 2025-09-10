"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FiBriefcase, FiAward, FiCode } from "react-icons/fi";

export default function Timeline() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const timelineEvents = [
    {
      title: "Software Engineering Intern — Muff Garments LTD",
      date: "Jun 2025 – Aug 2025",
      description:
        "Checkout conversion 32%→50% (React/Stripe w/ idempotency). 99.95% uptime with AWS Lambda + DynamoDB (DLQs/retries). CI/CD 30m→4m via Docker + GitHub Actions. 90% tests (Jest/PyTest), bugs -30%.",
      icon: FiBriefcase,
      category: "Work",
    },
    {
      title: "Software Developer — Rauner Special Collections (Dartmouth)",
      date: "Sep 2024 – May 2025",
      description:
        "Cut archival processing 90% (2h→<20m) across 60+ institutions. Eliminated 80% manual work w/ resilient Python/Selenium; 99.8% uptime for distributed scrapers. Storage -25%, processing +40%.",
      icon: FiBriefcase,
      category: "Work",
    },
    {
      title: "Software Engineering Intern — Muff Garments LTD",
      date: "Jun 2023 – Aug 2023",
      description:
        "Improved LCP +28% via AWS Lambda/S3 asset pipeline. p95 <200ms at 20K+ MAUs (LRU caching + SQL tuning). Built Python/SQL ETL → Tableau (reporting -50%, accuracy +35%).",
      icon: FiBriefcase,
      category: "Work",
    },
    {
      title: "Project Assistant — Evergreen.AI",
      date: "Jan 2024 – May 2024",
      description:
        "Prototyped React/Python AI wellness platform piloted by 100+ undergrads; informed campus initiatives.",
      icon: FiBriefcase,
      category: "Work",
    },
    {
      title: "ManToGo — Campus Delivery Platform",
      date: "2025",
      description:
        "React/Node + Mapbox with real-time tracking, routing, payments, and rewards; scaled to 450+ users in 6 weeks.",
      icon: FiCode,
      category: "Project",
    },
    {
      title: "Dartmouth College — B.S. CS & Engineering (GPA 3.7)",
      date: "2022 – 2026",
      description:
        "Selected coursework: Full Stack (Citation), Operating Systems, Compilers, Advanced Algorithms, Artificial Intelligence.",
      icon: FiAward,
      category: "Education",
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
            A timeline of my academic and professional milestones at Dartmouth
            and beyond.
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
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
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

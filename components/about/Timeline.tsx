"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FiBriefcase, FiAward, FiCode } from "react-icons/fi";

export default function Timeline() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const timelineEvents = [
    {
      title: "Software Developer — DALI Lab, Dartmouth College",
      date: "Sep 2025 – Present",
      description:
        "Built serverless autograder on AWS Lambda + FastAPI, scaling to 2K+ users and reducing grading latency by 50%. Integrated automated CI/CD pipelines via GitHub Actions and Docker, cutting environment setup time 40%. Led adoption of standardized Git workflows across 10+ dev teams, reducing merge conflicts 40%.",
      icon: FiBriefcase,
      category: "Work",
    },
    {
      title: "Software Engineering Intern — Muff, Manchester, UK",
      date: "Jun 2025 – Aug 2025",
      description:
        "Secured internal analytics access for 100k+ factory employees and vendors by designing and deploying OAuth 2.0 SSO authentication across production and HR systems. Enabled seamless synchronization of live production dashboards between factory floor tablets and web control panels using a custom WebRTC P2P communication layer. Reduced feature development time by 50% by migrating the production tracking app from Angular to React Native for unified cross-platform development.",
      icon: FiBriefcase,
      category: "Work",
    },
    {
      title: "Research Assistant — Evergreen.AI Research Group, Hanover, NH",
      date: "Mar 2025 – Jun 2025",
      description:
        "Optimized hybrid inference with TensorFlow Lite + cloud APIs, cutting model latency by 25%. Fine-tuned transformer models via PyTorch + Hugging Face for drift detection and adaptive retraining. Built automated experiment tracking pipelines ensuring version control and reproducibility.",
      icon: FiBriefcase,
      category: "Work",
    },
    {
      title:
        "Software Developer — Rauner Special Collections Library, Hanover, NH",
      date: "Aug 2024 – Mar 2025",
      description:
        "Automated ingestion for 10K+ archival records via AWS Lambda + PostgreSQL, halving manual effort. Implemented asynchronous Celery + Redis pipelines for fault-tolerant, scalable data ingestion. Added encryption, RBAC, and integrity checks to ensure compliance and data security.",
      icon: FiBriefcase,
      category: "Work",
    },
    {
      title: "Software Engineering Intern — Muff, Manchester, UK",
      date: "Jun 2024 – Aug 2024",
      description:
        "Built a real-time manufacturing analytics platform serving 20k+ active users using React and MongoDB. Automated 600K+ daily updates by integrating ERP with 8+ logistics and order systems, removing manual work. Improved consistency across 50+ global sites with localized interfaces, regional units, and multilingual support.",
      icon: FiBriefcase,
      category: "Work",
    },
    {
      title:
        "Teaching Assistant — Programming Fundamentals (Summer 2025) and Full Stack Engineering (Fall 2025)",
      date: "Summer 2025 – Fall 2025",
      description:
        "Supporting students in programming fundamentals and full-stack development courses. Providing guidance on best practices, debugging techniques, and modern development workflows.",
      icon: FiBriefcase,
      category: "Work",
    },
    {
      title: "Dartmouth College — B.S. CS & Engineering (GPA 3.7)",
      date: "2022 – 2027",
      description:
        "Selected coursework: Deep Learning, Machine Learning, AI, Software Design, Security & Privacy. Faculty Citation (Top 1% in CS 52: Full Stack Development). Teaching Assistant: Programming Fundamentals (Summer 2025) and Full Stack Engineering (Fall 2025).",
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

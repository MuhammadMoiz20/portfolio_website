"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FiBriefcase, FiAward, FiCode } from "react-icons/fi";

export default function Timeline() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const timelineEvents = [
    {
      title:
        "Undergraduate Researcher — NLP & Social Dynamics Lab, Dartmouth College",
      date: "Sep 2025 – Present",
      description:
        "Researching transformer models for sentiment analysis and similarity by designing optimized fine-tuning pipelines. Building preprocessing and evaluation workflows in Python (Hugging Face, spaCy), streamlining statistical analysis. Contributing insights on neural text generation and cognitive bias to lab reports and publications.",
      icon: FiBriefcase,
      category: "Work",
    },
    {
      title: "Software Developer — DALI Lab, Dartmouth College",
      date: "Sep 2025 – Present",
      description:
        "Engineering scalable autograder powering a Coursera full-stack course, automating thousands of assessments. Improving reliability and feedback precision by integrating CI pipelines into the evaluation system.",
      icon: FiBriefcase,
      category: "Work",
    },
    {
      title: "Software Engineering Intern — Muff LTD",
      date: "Jun – Aug 2023 & 2025",
      description:
        "Increased conversions 22% for 50K+ users by deploying an on-device ML recommendation engine. Cut checkout latency 40% by re-architecting the system into cloud microservices capable of peak-load scaling. Launched real-time BI dashboards for sales and inventory, enabling data-driven decision-making across teams. Automated catalog workflows, reducing manual effort by 15+ hours per week and improving stock accuracy 30%.",
      icon: FiBriefcase,
      category: "Work",
    },
    {
      title:
        "Teaching Assistant (CS59: Programming Fundamentals) — Dartmouth College",
      date: "Jun 2025 – Aug 2025",
      description:
        "Supported 100+ students in Python and data structures through labs and debugging guidance, raising pass rate 15%. Instilled coding standards and test-driven development practices to improve course code quality.",
      icon: FiBriefcase,
      category: "Work",
    },
    {
      title: "Research Assistant — Evergreen.AI Research Group",
      date: "Mar 2024 – Jun 2025",
      description:
        "Adapted LLMs for mental health with LoRA and instruction tuning, raising empathetic response accuracy 28%. Built evaluation metrics for therapeutic dialogue; co-authored NeurIPS Undergrad Workshop preprint.",
      icon: FiBriefcase,
      category: "Work",
    },
    {
      title: "Software Developer — Rauner Special Collections",
      date: "Sep 2024 – May 2025",
      description:
        "Deployed searchable cloud archive for 300K+ manuscripts, enabling global researcher access. Integrated Elasticsearch with embeddings, improving retrieval speed and relevance 3×. Implemented Dartmouth SSO (OAuth2.0) with role-based permissions to secure access.",
      icon: FiBriefcase,
      category: "Work",
    },
    {
      title: "Dispatch — Multi-tenant SaaS for Logistics",
      date: "2025",
      description:
        "Developed a multi-tenant SaaS for automating e-commerce returns/logistics with rule-based workflows + carrier APIs. Implemented event-driven architecture (AWS SQS, DLQs, retries) for 99.9% uptime and strong tenant data isolation.",
      icon: FiCode,
      category: "Project",
    },
    {
      title: "ManToGo — Campus Delivery Platform",
      date: "2025",
      description:
        "Built a campus-wide delivery platform integrated with Dining & Payroll, creating paid student jobs. Scaled to 450+ active users in 6 weeks; led design of payments, routing, and reward systems.",
      icon: FiCode,
      category: "Project",
    },
    {
      title: "Tiny Search Engine — Systems Design",
      date: "2025",
      description:
        "Implemented a crawler, indexer, and query engine for 15K+ pages with efficient memory & I/O management. Optimized tokenization and thread pooling, reducing average query latency from 30s → 0.8s.",
      icon: FiCode,
      category: "Project",
    },
    {
      title: "Dartmouth College — B.S. CS & Engineering (GPA 3.7)",
      date: "2022 – 2027",
      description:
        "Selected coursework: Software Design, Computer Architecture, Artificial Intelligence, Deep Learning. Honors: CS 52 Full Stack Development — Faculty citation for top 1% performance.",
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

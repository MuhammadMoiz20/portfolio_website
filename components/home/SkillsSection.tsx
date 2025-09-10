"use client";

import { motion } from "framer-motion";
import {
  FiCode,
  FiLayout,
  FiDatabase,
  FiServer,
  FiTool,
  FiActivity,
} from "react-icons/fi";

export default function SkillsSection() {
  const skills = [
    {
      category: "Languages",
      description: "Proficient across core CS languages",
      icon: FiCode,
      items: ["Python", "Java", "JavaScript/TypeScript", "C/C++"],
    },
    {
      category: "Frameworks",
      description: "Web and service frameworks I use",
      icon: FiTool,
      items: ["React", "Node.js", "Flask"],
    },
    {
      category: "Cloud & DevOps",
      description: "Cloud platforms and delivery pipelines",
      icon: FiServer,
      items: ["AWS", "Docker", "GitHub Actions", "Kubernetes"],
    },
    {
      category: "Databases & Storage",
      description: "Data stores and caching systems",
      icon: FiDatabase,
      items: ["PostgreSQL", "MongoDB", "Redis", "AWS S3", "DynamoDB"],
    },
    {
      category: "Engineering Practices",
      description: "Core engineering and systems concepts",
      icon: FiActivity,
      items: ["Microservices", "Event-driven", "System Design", "TDD"],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold">Technical Skills</h2>
          <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-400">
            Focused on full‑stack engineering, distributed systems, and cloud
            infrastructure — building secure, reliable, and scalable products.
          </p>
        </motion.div>

        <div className="grid gap-y-8 gap-x-6 md:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              className="card h-full"
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="mb-4 rounded-full bg-primary-100 p-3 inline-flex text-primary-600 dark:bg-primary-900 dark:text-primary-400">
                <skill.icon size={24} />
              </div>
              <h3 className="mb-2 text-xl font-bold">{skill.category}</h3>
              <p className="mb-4 text-gray-600 dark:text-gray-400">
                {skill.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {skill.items.map((item, itemIndex) => (
                  <span
                    key={itemIndex}
                    className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

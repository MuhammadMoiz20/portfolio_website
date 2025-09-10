"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FiExternalLink,
  FiGithub,
  FiPlay,
  FiInfo,
  FiCalendar,
  FiTag,
} from "react-icons/fi";
import Button from "@/components/ui/Button";
import OptimizedImage from "@/components/ui/OptimizedImage";
import ImageGallery from "@/components/projects/ImageGallery";

/**
 * Project interface for detailed project view
 */
export interface ProjectDetails {
  /**
   * Unique identifier
   */
  id: string | number;

  /**
   * Project title
   */
  title: string;

  /**
   * Short description (1-2 sentences)
   */
  summary: string;

  /**
   * Detailed description with multiple paragraphs
   */
  description: string | React.ReactNode;

  /**
   * Main project image
   */
  image: string;

  /**
   * Project URL
   */
  projectUrl?: string;

  /**
   * GitHub repository URL
   */
  githubUrl?: string;

  /**
   * Demo URL
   */
  demoUrl?: string;

  /**
   * Project completion date
   */
  date?: string;

  /**
   * Technologies and tools used
   */
  technologies: string[];

  /**
   * Project categories
   */
  categories: string[];

  /**
   * Project gallery images
   */
  gallery?: {
    id: string | number;
    src: string;
    alt: string;
    caption?: string;
  }[];

  /**
   * Additional project metadata
   */
  meta?: {
    client?: string;
    role?: string;
    duration?: string;
    team?: string[];
  };

  /**
   * Project key features
   */
  features?: string[];

  /**
   * Technical challenges and solutions
   */
  challenges?: Array<{
    challenge: string;
    solution: string;
  }>;
}

interface ProjectDetailsProps {
  /**
   * Project data
   */
  project: ProjectDetails;

  /**
   * Custom CSS class
   */
  className?: string;
}

/**
 * ProjectDetails component
 * Displays comprehensive information about a project
 */
export default function ProjectDetails({
  project,
  className = "",
}: ProjectDetailsProps) {
  const [activeTab, setActiveTab] = useState<
    "overview" | "features" | "technical"
  >("overview");

  const {
    title,
    summary,
    description,
    image,
    projectUrl,
    githubUrl,
    demoUrl,
    date,
    technologies,
    categories,
    gallery,
    meta,
    features,
    challenges,
  } = project;

  /**
   * Rendered tabs based on available content
   */
  const tabs = [
    { id: "overview", label: "Overview", icon: <FiInfo size={16} /> },
    ...(features && features.length > 0
      ? [{ id: "features", label: "Features", icon: <FiTag size={16} /> }]
      : []),
    ...(challenges && challenges.length > 0
      ? [
          {
            id: "technical",
            label: "Technical Details",
            icon: <FiGithub size={16} />,
          },
        ]
      : []),
  ];

  return (
    <article className={`bg-white dark:bg-gray-900 ${className}`}>
      {/* Hero section with main image */}
      <div className="relative h-[300px] w-full overflow-hidden sm:h-[400px] lg:h-[500px]">
        <Image
          src={image}
          alt={title}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 1200px"
          className="object-cover"
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

        {/* Project title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="container-custom">
            <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl">
              {title}
            </h1>
            <p className="mt-2 max-w-2xl text-lg text-gray-200">{summary}</p>
          </div>
        </div>
      </div>

      <div className="container-custom py-8 px-4 sm:px-0">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
              <ul className="flex flex-wrap -mb-px">
                {tabs.map((tab) => (
                  <li key={tab.id} className="mr-2">
                    <button
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`inline-flex items-center border-b-2 py-4 px-4 text-sm font-medium ${
                        activeTab === tab.id
                          ? "border-primary-600 text-primary-600 dark:border-primary-500 dark:text-primary-500"
                          : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-600 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:text-gray-300"
                      }`}
                      aria-current={activeTab === tab.id ? "page" : undefined}
                    >
                      <span className="mr-2">{tab.icon}</span>
                      {tab.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-8">
              {activeTab === "overview" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="prose max-w-none dark:prose-invert"
                >
                  {typeof description === "string"
                    ? description
                        .split("\n\n")
                        .map((paragraph, i) => <p key={i}>{paragraph}</p>)
                    : description}

                  {gallery && gallery.length > 0 && (
                    <div className="mt-8">
                      <h3>Project Gallery</h3>
                      <ImageGallery images={gallery} />
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === "features" && features && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                    Key Features
                  </h2>

                  <ul className="space-y-3">
                    {features.map((feature, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.05 }}
                        className="flex"
                      >
                        <div className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300">
                          <svg
                            className="h-3.5 w-3.5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <span className="text-gray-700 dark:text-gray-300">
                          {feature}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {activeTab === "technical" && challenges && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                    Technical Challenges & Solutions
                  </h2>

                  <div className="space-y-6">
                    {challenges.map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.1 }}
                        className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800"
                      >
                        <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                          Challenge:
                        </h3>
                        <p className="mb-4 text-gray-700 dark:text-gray-300">
                          {item.challenge}
                        </p>

                        <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                          Solution:
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300">
                          {item.solution}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            <div className="flex flex-wrap gap-4">
              {projectUrl && (
                <Button
                  href={projectUrl}
                  variant="primary"
                  leftIcon={<FiExternalLink />}
                >
                  Visit Project
                </Button>
              )}

              {githubUrl && (
                <Button
                  href={githubUrl}
                  variant="outline"
                  leftIcon={<FiGithub />}
                >
                  View Code
                </Button>
              )}

              {demoUrl && (
                <Button href={demoUrl} variant="outline" leftIcon={<FiPlay />}>
                  Live Demo
                </Button>
              )}
            </div>
          </div>

          <div className="mt-8 lg:mt-0">
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
              <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                Project Details
              </h2>

              <dl className="space-y-4">
                {/* Project date */}
                {date && (
                  <div className="flex">
                    <dt className="flex w-24 items-center text-gray-500 dark:text-gray-400">
                      <FiCalendar className="mr-2" size={16} />
                      Date:
                    </dt>
                    <dd className="font-medium text-gray-900 dark:text-white">
                      {date}
                    </dd>
                  </div>
                )}

                {/* Project metadata */}
                {meta?.client && (
                  <div className="flex">
                    <dt className="w-24 text-gray-500 dark:text-gray-400">
                      Client:
                    </dt>
                    <dd className="font-medium text-gray-900 dark:text-white">
                      {meta.client}
                    </dd>
                  </div>
                )}

                {meta?.role && (
                  <div className="flex">
                    <dt className="w-24 text-gray-500 dark:text-gray-400">
                      Role:
                    </dt>
                    <dd className="font-medium text-gray-900 dark:text-white">
                      {meta.role}
                    </dd>
                  </div>
                )}

                {meta?.duration && (
                  <div className="flex">
                    <dt className="w-24 text-gray-500 dark:text-gray-400">
                      Duration:
                    </dt>
                    <dd className="font-medium text-gray-900 dark:text-white">
                      {meta.duration}
                    </dd>
                  </div>
                )}

                {/* Team members */}
                {meta?.team && meta.team.length > 0 && (
                  <div>
                    <dt className="mb-2 text-gray-500 dark:text-gray-400">
                      Team:
                    </dt>
                    <dd>
                      <ul className="list-inside list-disc space-y-1 text-gray-900 dark:text-white">
                        {meta.team.map((member, i) => (
                          <li key={i} className="font-medium">
                            {member}
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                )}

                {/* Technologies */}
                <div>
                  <dt className="mb-2 text-gray-500 dark:text-gray-400">
                    Technologies:
                  </dt>
                  <dd>
                    <div className="flex flex-wrap gap-2">
                      {technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full bg-primary-100 px-2.5 py-0.5 text-sm font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </dd>
                </div>

                {/* Categories */}
                <div>
                  <dt className="mb-2 text-gray-500 dark:text-gray-400">
                    Categories:
                  </dt>
                  <dd>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((category) => (
                        <Link
                          key={category}
                          href={`/projects?category=${encodeURIComponent(category)}`}
                          className="rounded-full bg-gray-200 px-2.5 py-0.5 text-sm font-medium text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                        >
                          {category}
                        </Link>
                      ))}
                    </div>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

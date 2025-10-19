"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiDownload, FiCalendar, FiAward, FiBookOpen } from "react-icons/fi";
import AboutHero from "@/components/about/AboutHero";
import Timeline from "@/components/about/Timeline";
import Skills from "@/components/about/Skills";
import Testimonials from "@/components/about/Testimonials";

export default function AboutPage() {
  return (
    <>
      <div className="pt-16">
        <AboutHero />

        <section className="py-16">
          <div className="container-custom">
            <div className="grid gap-12 lg:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h2 className="mb-6 text-3xl font-bold">
                  Background & Education
                </h2>
                <div className="space-y-4 text-gray-700 dark:text-gray-300">
                  <p>
                    I'm a results‑oriented{" "}
                    <span className="font-medium text-primary-600 dark:text-primary-400">
                      Software Engineer
                    </span>{" "}
                    with 3+ years of experience across full‑stack development,
                    AI/ML integration, and cloud architecture. I specialize in
                    building scalable SaaS platforms, implementing ML‑powered
                    features, and delivering measurable business impact through
                    data‑driven engineering solutions.
                  </p>
                  <p>
                    At Dartmouth College, I'm pursuing a B.S. in Computer
                    Science & Engineering (GPA 3.7). My academic focus includes
                    Software Design, Computer Architecture, Artificial
                    Intelligence, and Deep Learning. I was honored with a
                    faculty citation for top 1% performance in Full‑Stack
                    Development, demonstrating strong technical mastery.
                  </p>
                  <p>
                    Professionally, I've led significant initiatives including:
                    boosting conversions 22% for 50K+ users through personalized
                    recommendation engines, re‑architecting enterprise checkout
                    systems with cloud microservices reducing latency by 40%,
                    and building event‑driven architectures ensuring 99.9%
                    uptime for critical business operations.
                  </p>
                  <p>
                    I'm passionate about distributed systems, event‑driven
                    architectures, and scalable backend development. My
                    expertise spans Python, JavaScript/TypeScript,
                    React/Next.js, NestJS, AWS cloud services, PostgreSQL with
                    advanced features, and modern CI/CD practices. I'm
                    authorized to work in the U.S. for 3 years under STEM OPT
                    (no sponsorship required).
                  </p>
                </div>
                <div className="mt-8">
                  <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary inline-flex items-center"
                  >
                    <FiDownload className="mr-2" />
                    Download Resume
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative rounded-xl bg-gray-100 p-6 dark:bg-gray-800"
              >
                <h3 className="mb-4 text-xl font-bold">Education</h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-400">
                      <FiBookOpen size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold">Dartmouth College</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        B.S. in Computer Science & Engineering, GPA: 3.7
                      </p>
                      <div className="mt-1 flex items-center text-sm text-gray-500 dark:text-gray-500">
                        <FiCalendar className="mr-1" size={14} />
                        Expected Graduation: Jun 2027
                      </div>
                      <div className="mt-3 space-y-3">
                        <h5 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
                          Relevant Coursework
                        </h5>

                        {/* Computer Science Courses */}
                        <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
                          <h6 className="mb-2 font-semibold text-blue-900 dark:text-blue-100">
                            Computer Science (COSC)
                          </h6>
                          <div className="grid grid-cols-1 gap-1 text-sm sm:grid-cols-2">
                            <span className="text-gray-700 dark:text-gray-300">
                              COSC 001 - Intro Programming & Computation
                            </span>
                            <span className="text-gray-700 dark:text-gray-300">
                              COSC 010 - Problem Solving: Object-Oriented
                            </span>
                            <span className="text-gray-700 dark:text-gray-300">
                              COSC 030 - Discrete Math for Computer Science
                            </span>
                            <span className="text-gray-700 dark:text-gray-300">
                              COSC 050 - Software Design & Implementation
                            </span>
                            <span className="text-gray-700 dark:text-gray-300">
                              COSC 051 - Computer Architecture
                            </span>
                            <span className="text-gray-700 dark:text-gray-300">
                              COSC 052 - Full-Stack Web Development
                            </span>
                            <span className="text-gray-700 dark:text-gray-300">
                              COSC 055 - Security and Privacy
                            </span>
                            <span className="text-gray-700 dark:text-gray-300">
                              COSC 059 - Principles of Programming Languages
                            </span>
                            <span className="text-gray-700 dark:text-gray-300">
                              COSC 070 - Foundations of Applied CS
                            </span>
                            <span className="text-gray-700 dark:text-gray-300">
                              COSC 074 - Machine Learning & Statistical Analysis
                            </span>
                            <span className="text-gray-700 dark:text-gray-300">
                              COSC 076 - Artificial Intelligence
                            </span>
                            <span className="text-gray-700 dark:text-gray-300">
                              COSC 078 - Deep Learning
                            </span>
                          </div>
                        </div>

                        {/* Mathematics Courses */}
                        <div className="rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
                          <h6 className="mb-2 font-semibold text-green-900 dark:text-green-100">
                            Mathematics (MATH)
                          </h6>
                          <div className="grid grid-cols-1 gap-1 text-sm sm:grid-cols-2">
                            <span className="text-gray-700 dark:text-gray-300">
                              MATH 003 - Calculus
                            </span>
                            <span className="text-gray-700 dark:text-gray-300">
                              MATH 008 - Calculus of Functions
                            </span>
                            <span className="text-gray-700 dark:text-gray-300">
                              MATH 013 - Calculus of Vector-Valued Functions
                            </span>
                          </div>
                        </div>

                        {/* Additional Courses */}
                        <div className="rounded-lg bg-purple-50 p-4 dark:bg-purple-900/20">
                          <h6 className="mb-2 font-semibold text-purple-900 dark:text-purple-100">
                            Additional Courses
                          </h6>
                          <div className="grid grid-cols-1 gap-1 text-sm sm:grid-cols-2">
                            <span className="text-gray-700 dark:text-gray-300">
                              WRIT 005 - Expository Writing
                            </span>
                            <span className="text-gray-700 dark:text-gray-300">
                              CHEM 005 - General Chemistry
                            </span>
                            <span className="text-gray-700 dark:text-gray-300">
                              PHYS 013 - Introductory Physics I
                            </span>
                            <span className="text-gray-700 dark:text-gray-300">
                              ARAB 01.20 - Intensive Arabic
                            </span>
                            <span className="text-gray-700 dark:text-gray-300">
                              MES 01.01 - Intro to Middle East Studies
                            </span>
                          </div>
                        </div>

                        {/* Honors and Additional Info */}
                        <div className="space-y-2">
                          <div className="flex items-start">
                            <span className="mr-2 mt-1 text-primary-600 dark:text-primary-400">
                              <FiAward size={16} />
                            </span>
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                              <strong>Honors:</strong> CS 52 Full Stack
                              Development — Faculty citation for top 1%
                              performance
                            </span>
                          </div>
                          <div className="flex items-start">
                            <span className="mr-2 mt-1 text-primary-600 dark:text-primary-400">
                              •
                            </span>
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                              Eligible for CPT; authorized to work in U.S. for 3
                              years under STEM OPT (no sponsorship required)
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <Timeline />

        <Skills />

        {/* Leadership section */}
        <section className="py-16">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="mb-6 text-3xl font-bold">Leadership</h2>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li>
                  <span className="font-medium">President</span>, Dartmouth
                  Alpha Lambda Mu
                </li>
                <li>
                  <span className="font-medium">President</span>, Roots IVY Alum
                  CS Society
                </li>
                <li>
                  <span className="font-medium">Founder</span>, Young in Tech
                  Pakistan
                </li>
              </ul>
            </motion.div>
          </div>
        </section>

        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container-custom text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="mb-6 text-3xl font-bold">
                Interested in Working Together?
              </h2>
              <p className="mx-auto mb-8 max-w-2xl text-gray-700 dark:text-gray-300">
                I'm always open to discussing new projects, creative ideas, or
                opportunities to be part of your vision.
              </p>
              <Link href="/contact" className="btn-primary">
                Get In Touch
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}

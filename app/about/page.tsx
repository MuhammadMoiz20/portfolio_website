'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiDownload, FiCalendar, FiAward, FiBookOpen } from 'react-icons/fi';
import AboutHero from '@/components/about/AboutHero';
import Timeline from '@/components/about/Timeline';
import Skills from '@/components/about/Skills';
import Testimonials from '@/components/about/Testimonials';

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
              <h2 className="mb-6 text-3xl font-bold">Background & Education</h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  I'm a results‑oriented <span className="font-medium text-primary-600 dark:text-primary-400">Software Engineer</span> with 3+ years of experience across full‑stack, AI/ML, and cloud development. I build scalable SaaS, deploy ML‑powered features, and ship measurable outcomes through data‑driven engineering.
                </p>
                <p>
                  At Dartmouth College, I'm pursuing a B.S. in Computer Science & Mathematics (GPA 3.67). My focus areas include Algorithms, Software Design & Implementation, Full‑Stack Development, and Security & Privacy.
                </p>
                <p>
                  Professionally, I've architected Flask microservices with Redis caching, built Apache Airflow ETL pipelines automating 50K+ daily transforms, and deployed A/B testing frameworks that drove double‑digit engagement lifts.
                </p>
                <p>
                  I enjoy mentoring, championing inclusive teams, and continuously learning. My toolset spans Python, React/TypeScript, AWS/GCP, Docker/Kubernetes, and modern CI/CD with GitHub Actions and Jenkins.
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
                    <p className="text-sm text-gray-600 dark:text-gray-400">B.S. in Computer Science & Mathematics, GPA: 3.67</p>
                    <div className="mt-1 flex items-center text-sm text-gray-500 dark:text-gray-500">
                      <FiCalendar className="mr-1" size={14} />
                      Expected Graduation: Jun 2026
                    </div>
                    <ul className="mt-2 space-y-1 text-sm">
                      <li className="flex items-center">
                        <span className="mr-2 text-primary-600 dark:text-primary-400">•</span>
                        Relevant coursework: Algorithms, Software Design & Implementation, Full-Stack Development, Security & Privacy
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2 text-primary-600 dark:text-primary-400">•</span>
                        President, Alpha Lambda Mu (Diversity & inclusion initiatives)
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-400">
                    <FiAward size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold">Relevant Coursework</h4>
                    <ul className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                      <li className="flex items-center">
                        <span className="mr-2 text-primary-600 dark:text-primary-400">•</span>
                        Algorithms
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2 text-primary-600 dark:text-primary-400">•</span>
                        Software Design & Implementation
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2 text-primary-600 dark:text-primary-400">•</span>
                        Full-Stack Development
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2 text-primary-600 dark:text-primary-400">•</span>
                        Security & Privacy
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Timeline />

      <Skills />

      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-6 text-3xl font-bold">Interested in Working Together?</h2>
            <p className="mx-auto mb-8 max-w-2xl text-gray-700 dark:text-gray-300">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
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

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiDownload, FiCalendar, FiAward, FiBookOpen } from 'react-icons/fi';
import AboutHero from '@/components/about/AboutHero';
import Timeline from '@/components/about/Timeline';
import Skills from '@/components/about/Skills';
import Testimonials from '@/components/about/Testimonials';

import SEO from '@/components/utils/SEO';

export default function AboutPage() {
  return (
    <>
      <SEO
        title="About Muhammad Moiz | Dartmouth Junior, System Developer"
        description="Learn more about Muhammad Moiz, a Dartmouth College junior, system developer, and passionate technologist. Discover his background, education, skills, and journey in computer science."
        canonicalUrl="https://www.moizofficial.com/about"
        ogImage="/logo.png"
        keywords={["Muhammad Moiz", "About", "Dartmouth", "System Developer", "Portfolio", "Computer Science"]}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Muhammad Moiz",
          "url": "https://www.moizofficial.com/about",
          "sameAs": [
            "https://x.com/zahid_moiz",
            "https://www.linkedin.com/in/moizofficial/",
            "https://github.com/MuhammadMoiz20"
          ],
          "jobTitle": "Junior at Dartmouth College",
          "description": "Learn more about Muhammad Moiz, a Dartmouth College junior, system developer, and passionate technologist.",
          "image": "/logo.png"
        }}
      />
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
                  As a Junior at <span className="font-medium text-primary-600 dark:text-primary-400">Dartmouth College</span>, I'm pursuing a degree in Computer Science with a minor in Digital Arts. My academic journey has been characterized by a deep passion for technology and its potential to solve complex problems.
                </p>
                <p>
                  I've consistently maintained a strong academic record while engaging in various extracurricular activities that have helped me develop leadership and collaboration skills.
                </p>
                <p>
                  Beyond the classroom, I've participated in several hackathons, coding competitions, and research projects that have allowed me to apply theoretical knowledge to practical challenges. These experiences have shaped my approach to problem-solving and reinforced my commitment to creating impactful digital solutions.
                </p>
                <p>
                  My technical foundation is built on a combination of formal education, self-directed learning, and hands-on project experience. I'm particularly interested in web development, user experience design, and emerging technologies like artificial intelligence and machine learning.
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
                      Bachelor of Science in Computer Science
                    </p>
                    <div className="mt-1 flex items-center text-sm text-gray-500 dark:text-gray-500">
                      <FiCalendar className="mr-1" size={14} />
                      Expected Graduation: 2026
                    </div>
                    <ul className="mt-2 space-y-1 text-sm">
                      <li className="flex items-center">
                        <span className="mr-2 text-primary-600 dark:text-primary-400">•</span>
                        Modified with Engineering
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2 text-primary-600 dark:text-primary-400">•</span>
                        President of Alpha Lambda MU
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
                        Data Structures
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2 text-primary-600 dark:text-primary-400">•</span>
                        Algorithms
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2 text-primary-600 dark:text-primary-400">•</span>
                        Web Development
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2 text-primary-600 dark:text-primary-400">•</span>
                        UI/UX Design
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2 text-primary-600 dark:text-primary-400">•</span>
                        Database Systems
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2 text-primary-600 dark:text-primary-400">•</span>
                        Machine Learning
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2 text-primary-600 dark:text-primary-400">•</span>
                        Computer Graphics
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2 text-primary-600 dark:text-primary-400">•</span>
                        Software Engineering
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

      <Testimonials />

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

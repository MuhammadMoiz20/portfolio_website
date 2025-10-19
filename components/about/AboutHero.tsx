"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FiUser, FiCode, FiBookOpen } from "react-icons/fi";

export default function AboutHero() {
  return (
    <section className="relative py-24 bg-gradient-to-b from-primary-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-y-10 gap-x-8 lg:grid-cols-2 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            <div className="relative h-96 w-full lg:h-[500px] overflow-hidden rounded-lg shadow-xl">
              <Image
                src="/images/about-hero.jpg"
                alt="About Me"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <span className="inline-block px-4 py-1 rounded-full bg-primary-500 text-sm font-medium text-white mb-2">
                  Dartmouth College
                </span>
                <h3 className="text-xl font-bold text-white">Class of 2027</h3>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              About <span className="text-accent">Me</span>
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
              I'm a passionate Senior at Dartmouth College, dedicated to
              creating digital experiences that inspire and make a difference.
            </p>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
                <div className="rounded-full bg-primary-100 p-3 inline-flex text-primary-600 dark:bg-primary-900 dark:text-primary-400 mb-3">
                  <FiUser size={24} />
                </div>
                <h3 className="font-bold mb-1">Student</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Passionate learner and academic achiever
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
                <div className="rounded-full bg-primary-100 p-3 inline-flex text-primary-600 dark:bg-primary-900 dark:text-primary-400 mb-3">
                  <FiCode size={24} />
                </div>
                <h3 className="font-bold mb-1">Developer</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Creator of meaningful digital solutions
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
                <div className="rounded-full bg-primary-100 p-3 inline-flex text-primary-600 dark:bg-primary-900 dark:text-primary-400 mb-3">
                  <FiBookOpen size={24} />
                </div>
                <h3 className="font-bold mb-1">Innovator</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Always exploring new technologies
                </p>
              </div>
            </div>

            <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border-l-4 border-primary-500">
              <p className="italic text-gray-700 dark:text-gray-300">
                "I believe in the power of technology to solve real-world
                problems and create meaningful connections. My goal is to build
                digital experiences that enhance people's lives and make a
                positive impact."
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

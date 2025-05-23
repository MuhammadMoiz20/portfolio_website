'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiArrowDown, FiGithub, FiLinkedin } from 'react-icons/fi';

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

  const [text, setText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const fullText = 'CS Student. UI/UX Developer. Innovator.';

  useEffect(() => {
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      setText(fullText.substring(0, currentIndex + 1));
      currentIndex++;

      if (currentIndex === fullText.length) {
        clearInterval(intervalId);
        setIsTypingComplete(true);
      }
    }, 100);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setShowScrollIndicator(false);
      } else {
        setShowScrollIndicator(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-gray-50 to-white pt-20 dark:from-gray-900 dark:to-gray-800">
      <div className="absolute inset-0 overflow-hidden" style={{ pointerEvents: 'none' }}>
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute h-2 w-2 rounded-full bg-primary-200 dark:bg-primary-800"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.3,
              transform: `scale(${Math.random() * 3 + 1})`,
              animation: `float ${Math.random() * 10 + 10}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      <div className="container-custom flex min-h-[calc(100vh-4rem)] items-center">
        <div className="grid items-center gap-8 lg:grid-cols-2 w-full">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="order-2 lg:order-1"
          >
            <motion.div variants={itemVariants} className="mb-2">
              <span className="inline-block rounded-full bg-primary-100 px-3 py-1 text-sm font-medium text-primary-700 dark:bg-primary-900 dark:text-primary-300">
                Dartmouth CS Student
              </span>
            </motion.div>
            <motion.h1 variants={itemVariants} className="mb-6 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
              Creating Digital<br />
              <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent dark:from-primary-400 dark:to-secondary-400">
                Experiences
              </span>
            </motion.h1>
            <motion.div variants={itemVariants} className="mb-6">
              <h2 className="h-8 text-xl font-medium text-gray-700 dark:text-gray-300">
                {text}
                {!isTypingComplete && <span className="animate-blink">|</span>}
              </h2>
            </motion.div>
            <motion.p variants={itemVariants} className="mb-8 max-w-lg text-gray-600 dark:text-gray-400">
              Computer Science student at Dartmouth College with demonstrated experience in front-end development and UI/UX design. Passionate about creating intuitive, accessible, and polished user interfaces through reusable components and design systems.
            </motion.p>
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-8 justify-left">
              <Link href="/projects" className="btn-primary">
                View My Work
              </Link>
              <Link href="/contact" className="btn-outline">
                Get In Touch
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="flex flex-col items-center w-full mb-8"
            />

            <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-left gap-4 sm:gap-6 mb-8 lg:mb-0">
              <a
                href="https://github.com/MuhammadMoiz20"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                aria-label="GitHub"
              >
                <FiGithub size={22} />
              </a>
              <a
                href="https://www.linkedin.com/in/moizofficial"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                aria-label="LinkedIn"
              >
                <FiLinkedin size={22} />
              </a>
              <span className="h-6 w-px bg-gray-300 dark:bg-gray-700 mx-2 sm:mx-3" />
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
              >
                Download Resume
              </a>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="order-1 flex justify-center lg:order-2"
          >
            <div className="relative h-80 w-80 overflow-hidden rounded-full border-8 border-white shadow-xl dark:border-gray-800 sm:h-96 sm:w-96">
              <Image
                src="/images/profile.jpg"
                alt="Profile"
                fill
                priority
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {showScrollIndicator && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="fixed left-1/2 -translate-x-1/2 bottom-8 z-20 flex flex-col items-center"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="flex flex-col items-center"
          >
            <span className="mb-2 text-sm text-gray-500 dark:text-gray-400">Scroll Down</span>
            <FiArrowDown className="text-primary-600 dark:text-primary-400" />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}

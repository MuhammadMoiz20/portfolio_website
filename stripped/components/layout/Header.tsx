'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import ThemeToggle from '@/components/theme/ThemeToggle';
import { FiMenu, FiX } from 'react-icons/fi';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Projects', path: '/projects' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  
  const navAnimation = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1,
      },
    },
  };

  const navItemAnimation = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 shadow-md backdrop-blur-md dark:bg-gray-900/90'
          : 'bg-transparent'
      }`}
    >
      <div className="container-custom flex h-16 items-center justify-between">
        {}
        <Link 
          href="/" 
          className="text-xl font-bold text-primary-600 transition-colors dark:text-primary-400"
        >
          <span className="font-serif">Muhammad Moiz</span>
        </Link>

        {}
        <motion.nav 
          className="hidden md:block" 
          initial="hidden"
          animate="visible"
          variants={navAnimation}
        >
          <motion.ul className="flex items-center space-x-6">
            {navLinks.map((link) => (
              <motion.li key={link.name} variants={navItemAnimation}>
                <Link
                  href={link.path}
                  className={`text-sm font-medium transition-colors hover:text-primary-600 dark:hover:text-primary-400 ${
                    pathname === link.path
                      ? 'text-primary-600 dark:text-primary-400'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {link.name}
                </Link>
              </motion.li>
            ))}
            <motion.li variants={navItemAnimation}>
              <ThemeToggle />
            </motion.li>
            <motion.li variants={navItemAnimation}>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Resume
              </a>
            </motion.li>
          </motion.ul>
        </motion.nav>

        {}
        <div className="flex items-center md:hidden">
          <ThemeToggle />
          <button
            className="ml-4 p-1 text-gray-700 dark:text-gray-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {}
      {mobileMenuOpen && (
        <motion.div
          className="md:hidden"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container-custom bg-white py-4 dark:bg-gray-900">
            <ul className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.path}
                    className={`block text-sm font-medium transition-colors hover:text-primary-600 dark:hover:text-primary-400 ${
                      pathname === link.path
                        ? 'text-primary-600 dark:text-primary-400'
                        : 'text-gray-700 dark:text-gray-300'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-block"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Resume
                </a>
              </li>
            </ul>
          </div>
        </motion.div>
      )}
    </header>
  );
}

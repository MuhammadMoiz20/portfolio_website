'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { FiSun, FiMoon } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-6 w-6" />; 
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.05 }}
      onClick={toggleTheme}
      className="flex h-10 w-10 items-center justify-center rounded-full bg-white/30 dark:bg-gray-900/40 text-primary-600 dark:text-primary-300 shadow-glass-md backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-primary-100/60 dark:hover:bg-primary-800/40 hover:text-primary-700 dark:hover:text-primary-200 border border-white/30 dark:border-gray-700/30"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
    >
      {theme === 'dark' ? <FiSun size={22} className="drop-shadow-neon" /> : <FiMoon size={22} className="drop-shadow-neon" />}
    </motion.button>
  );
}

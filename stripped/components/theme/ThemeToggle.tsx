'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSun, FiMoon, FiMonitor } from 'react-icons/fi';
import { useNextTheme } from '@/components/theme/ThemeProvider';

interface ThemeToggleProps {
  variant?: 'icon' | 'switch' | 'dropdown' | 'button';
  
    size?: 'sm' | 'md' | 'lg';
  
    showLabels?: boolean;
  
    className?: string;
  
    additionalThemes?: Array<{
    id: string;
    name: string;
    icon: React.ReactNode;
  }>;
  
    includeSystemTheme?: boolean;
}

export default function ThemeToggle({
  variant = 'icon',
  size = 'md',
  showLabels = false,
  className = '',
  additionalThemes = [],
  includeSystemTheme = true,
}: ThemeToggleProps) {
  const { theme, setTheme } = useNextTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  // After mounting, we can show the toggle since we have access to the theme
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Wait to show toggle until after mounting to prevent hydration mismatch
  if (!mounted) {
    return null;
  }
  
  /**
   * Get icon based on theme
   */
  const getThemeIcon = (currentTheme: string) => {
    switch (currentTheme) {
      case 'dark':
        return <FiMoon />;
      case 'light':
        return <FiSun />;
      case 'system':
        return <FiMonitor />;
      default:
        
        const customTheme = additionalThemes.find(t => t.id === currentTheme);
        return customTheme ? customTheme.icon : <FiSun />;
    }
  };
  
    const getThemeName = (currentTheme: string) => {
    switch (currentTheme) {
      case 'dark':
        return 'Dark';
      case 'light':
        return 'Light';
      case 'system':
        return 'System';
      default:
        
        const customTheme = additionalThemes.find(t => t.id === currentTheme);
        return customTheme ? customTheme.name : currentTheme;
    }
  };
  
    const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'text-xs h-8';
      case 'lg':
        return 'text-lg h-12';
      case 'md':
      default:
        return 'text-sm h-10';
    }
  };
  
    const toggleTheme = () => {
    const currentTheme = theme || 'system';
    if (currentTheme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };
  
    const changeTheme = (newTheme: string) => {
    setTheme(newTheme);
    setIsOpen(false);
  };
  
    const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  
  
  const allThemes = [
    ...(includeSystemTheme ? [{ id: 'system', name: 'System', icon: <FiMonitor /> }] : []),
    { id: 'light', name: 'Light', icon: <FiSun /> },
    { id: 'dark', name: 'Dark', icon: <FiMoon /> },
    ...additionalThemes,
  ];
  
  
  if (variant === 'icon') {
    return (
      <button
        aria-label={`Toggle ${(theme || 'system') === 'dark' ? 'light' : 'dark'} mode`}
        onClick={toggleTheme}
        className={`flex items-center justify-center rounded-full p-2 text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 ${getSizeClasses()} ${className}`}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={theme}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {(theme || 'system') === 'dark' ? <FiSun size={size === 'sm' ? 16 : size === 'lg' ? 24 : 20} /> : <FiMoon size={size === 'sm' ? 16 : size === 'lg' ? 24 : 20} />}
          </motion.div>
        </AnimatePresence>
      </button>
    );
  }
  
  
  if (variant === 'switch') {
    return (
      <div className={`inline-flex items-center ${className}`}>
        {showLabels && (
          <span className="mr-2 text-gray-700 dark:text-gray-300">
            {(theme || 'system') === 'dark' ? 'Dark' : 'Light'} Mode
          </span>
        )}
        
        <button
          onClick={toggleTheme}
          className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:bg-gray-700 ${getSizeClasses()}`}
          aria-pressed={(theme || 'system') === 'dark'}
          aria-label={`Toggle ${(theme || 'system') === 'dark' ? 'light' : 'dark'} mode`}
        >
          <span className="sr-only">Toggle theme</span>
          <span
            className={`pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
              (theme || 'system') === 'dark' ? 'translate-x-5' : 'translate-x-0'
            }`}
          >
            <span
              className={`absolute inset-0 flex h-full w-full items-center justify-center transition-opacity ${
                (theme || 'system') === 'dark' 
                  ? 'opacity-0 duration-100 ease-out' 
                  : 'opacity-100 duration-200 ease-in'
              }`}
              aria-hidden="true"
            >
              <FiSun size={12} className="text-yellow-500" />
            </span>
            <span
              className={`absolute inset-0 flex h-full w-full items-center justify-center transition-opacity ${
                (theme || 'system') === 'dark' 
                  ? 'opacity-100 duration-200 ease-in' 
                  : 'opacity-0 duration-100 ease-out'
              }`}
              aria-hidden="true"
            >
              <FiMoon size={12} className="text-gray-600" />
            </span>
          </span>
        </button>
      </div>
    );
  }
  
  
  if (variant === 'dropdown') {
    return (
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className={`flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 ${getSizeClasses()} ${className}`}
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          <span className="mr-2">{getThemeIcon(theme || 'system')}</span>
          {showLabels && <span>{getThemeName(theme || 'system')}</span>}
        </button>
        
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800"
            >
              <div className="py-1">
                {allThemes.map((themeOption) => (
                  <button
                    key={themeOption.id}
                    onClick={() => changeTheme(themeOption.id)}
                    className={`flex w-full items-center px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ${
                      (theme || 'system') === themeOption.id
                        ? 'bg-gray-50 text-primary-600 dark:bg-gray-700 dark:text-primary-400'
                        : 'text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <span className="mr-2">{themeOption.icon}</span>
                    {themeOption.name}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
  
  
  if (variant === 'button') {
    return (
      <div className={`inline-flex rounded-md shadow-sm ${className}`}>
        {allThemes.map((themeOption) => (
          <button
            key={themeOption.id}
            onClick={() => changeTheme(themeOption.id)}
            className={`flex items-center px-3 py-2 first:rounded-l-md last:rounded-r-md ${
              theme === themeOption.id
                ? 'bg-primary-600 text-white focus:z-10 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-primary-500'
                : 'bg-white text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            } ${getSizeClasses()}`}
            aria-current={(theme || 'system') === themeOption.id ? 'page' : undefined}
          >
            <span className="mr-1">{themeOption.icon}</span>
            {showLabels && <span className={size === 'sm' ? 'sr-only sm:not-sr-only' : ''}>{themeOption.name}</span>}
          </button>
        ))}
      </div>
    );
  }
  
  return null;
}

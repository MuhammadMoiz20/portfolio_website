'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGlobe, FiCheck, FiChevronDown } from 'react-icons/fi';

/**
 * Language interface
 */
interface Language {
  /**
   * Language code (e.g., 'en', 'fr', 'es')
   */
  code: string;
  
  /**
   * Display name (e.g., 'English', 'Français', 'Español')
   */
  name: string;
  
  /**
   * Flag image URL
   */
  flag?: string;
}

interface LanguageSwitcherProps {
  /**
   * Available languages
   */
  languages: Language[];
  
  /**
   * Current language code
   */
  currentLanguage: string;
  
  /**
   * Whether to show flags next to language names
   * @default true
   */
  showFlags?: boolean;
  
  /**
   * Dropdown position
   * @default 'bottom'
   */
  dropdownPosition?: 'bottom' | 'top' | 'bottom-right' | 'bottom-left';
  
  /**
   * Visual style variant
   * @default 'dropdown'
   */
  variant?: 'dropdown' | 'select' | 'buttons' | 'minimal';
  
  /**
   * Optional label text
   */
  label?: string;
  
  /**
   * Whether to persist language preference in local storage
   * @default true
   */
  persistLanguage?: boolean;
  
  /**
   * Storage key for language preference
   * @default 'preferred-language'
   */
  storageKey?: string;
  
  /**
   * Custom CSS class
   */
  className?: string;
  
  /**
   * Custom change handler (if you want to manage language state yourself)
   */
  onChange?: (languageCode: string) => void;
}

/**
 * LanguageSwitcher component
 * Provides UI for switching between different languages
 */
export default function LanguageSwitcher({
  languages,
  currentLanguage,
  showFlags = true,
  dropdownPosition = 'bottom',
  variant = 'dropdown',
  label,
  persistLanguage = true,
  storageKey = 'preferred-language',
  className = '',
  onChange,
}: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(currentLanguage);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Find the currently selected language object
  const selectedLanguage = languages.find(lang => lang.code === selected) || languages[0];
  
  // Effect to handle clicks outside the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Update selected language when currentLanguage prop changes
  useEffect(() => {
    setSelected(currentLanguage);
  }, [currentLanguage]);
  
  /**
   * Handle language change
   */
  const handleLanguageChange = (languageCode: string) => {
    setSelected(languageCode);
    setIsOpen(false);
    
    // Store preference if enabled
    if (persistLanguage) {
      localStorage.setItem(storageKey, languageCode);
    }
    
    // Callback if provided
    if (onChange) {
      onChange(languageCode);
    } 
    // Default behavior: redirect to the same page with different locale
    else {
      // This is a simplified approach. In a real app, you would need
      // to handle path translation more carefully based on your routing structure
      const newPath = pathname.replace(/^\/[a-z]{2}(-[a-z]{2})?/i, `/${languageCode}`);
      router.push(newPath);
    }
  };
  
  /**
   * Toggle dropdown
   */
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  
  /**
   * Get position classes for dropdown
   */
  const getPositionClasses = () => {
    switch (dropdownPosition) {
      case 'top':
        return 'bottom-full mb-2';
      case 'bottom-right':
        return 'top-full right-0 mt-2';
      case 'bottom-left':
        return 'top-full left-0 mt-2';
      case 'bottom':
      default:
        return 'top-full mt-2';
    }
  };
  
  /**
   * Render language item (flag and name)
   */
  const renderLanguageItem = (language: Language, showCheck = false) => (
    <div className="flex items-center">
      {showFlags && language.flag && (
        <div className="mr-2 flex-shrink-0">
          <Image 
            src={language.flag}
            alt={language.name}
            width={20}
            height={15}
            className="rounded-sm object-cover"
          />
        </div>
      )}
      <span>{language.name}</span>
      {showCheck && <FiCheck className="ml-2 h-4 w-4" />}
    </div>
  );
  
  // Render dropdown variant
  if (variant === 'dropdown') {
    return (
      <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
        <button
          type="button"
          className="inline-flex items-center rounded-xl border border-white/30 bg-white/30 dark:bg-gray-900/40 px-4 py-2 text-base font-semibold text-gray-800 dark:text-white shadow-glass-md backdrop-blur-md hover:bg-primary-100/60 dark:hover:bg-primary-900/40 transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
        >
          {!showFlags && <FiGlobe className="mr-2 h-4 w-4" />}
          {renderLanguageItem(selectedLanguage)}
          <FiChevronDown className="ml-2 h-4 w-4" />
        </button>
        
        {/* Dropdown menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className={`absolute z-10 min-w-max rounded-md border border-gray-200 bg-white py-1 shadow-lg dark:border-gray-700 dark:bg-gray-800 ${getPositionClasses()}`}
            >
              <div className="py-1" role="menu" aria-orientation="vertical">
                {languages.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => handleLanguageChange(language.code)}
                    className={`block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ${
                      language.code === selected
                        ? 'bg-gray-50 text-primary-600 dark:bg-gray-700 dark:text-primary-400'
                        : 'text-gray-700 dark:text-gray-200'
                    }`}
                    role="menuitem"
                  >
                    {renderLanguageItem(language, language.code === selected)}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
  
  // Render select variant
  if (variant === 'select') {
    return (
      <div className={`inline-block ${className}`}>
        {label && (
          <label htmlFor="language-select" className="mr-2 text-sm text-gray-500 dark:text-gray-400">
            {label}
          </label>
        )}
        
        <div className="relative">
          <select
            id="language-select"
            value={selected}
            onChange={(e) => handleLanguageChange(e.target.value)}
            className="block w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 pr-8 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          >
            {languages.map((language) => (
              <option key={language.code} value={language.code}>
                {language.name}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500 dark:text-gray-400">
            <FiChevronDown className="h-4 w-4" />
          </div>
        </div>
      </div>
    );
  }
  
  // Render buttons variant
  if (variant === 'buttons') {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        {label && (
          <span className="text-sm text-gray-500 dark:text-gray-400">{label}</span>
        )}
        
        <div className="flex space-x-1 rounded-md bg-gray-100 p-1 dark:bg-gray-800">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className={`flex items-center rounded px-2 py-1 text-sm font-medium ${
                language.code === selected
                  ? 'bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-white'
                  : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              {showFlags && language.flag ? (
                <Image 
                  src={language.flag}
                  alt={language.name}
                  width={16}
                  height={12}
                  className="mr-1.5 rounded-sm object-cover"
                />
              ) : (
                <span className="mr-1.5 text-xs uppercase">{language.code}</span>
              )}
              <span className="sr-only sm:not-sr-only">{language.name}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }
  
  // Render minimal variant (just text links)
  if (variant === 'minimal') {
    return (
      <div className={`flex items-center space-x-3 ${className}`}>
        {label && (
          <span className="text-sm text-gray-500 dark:text-gray-400">
            <FiGlobe className="mr-1 inline-block h-4 w-4" />
            {label}:
          </span>
        )}
        
        <div className="flex items-center space-x-2">
          {languages.map((language, index) => (
            <>
              {index > 0 && <span className="text-gray-300 dark:text-gray-700">|</span>}
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                className={`text-sm hover:underline ${
                  language.code === selected
                    ? 'font-medium text-primary-600 dark:text-primary-400'
                    : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
                }`}
              >
                {language.name}
              </button>
            </>
          ))}
        </div>
      </div>
    );
  }
  
  return null;
}

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiCheckCircle } from 'react-icons/fi';
import { useToast } from '@/context/ToastContext';
import { validateEmail } from '@/utils/formValidation';

interface NewsletterSignupProps {
  /**
   * Title text for the newsletter box
   * @default 'Subscribe to the newsletter'
   */
  title?: string;
  
  /**
   * Description text
   * @default 'Get the latest updates delivered to your inbox.'
   */
  description?: string;
  
  /**
   * Button text
   * @default 'Subscribe'
   */
  buttonText?: string;
  
  /**
   * Visual style variant
   * @default 'card'
   */
  variant?: 'card' | 'inline' | 'minimal';
  
  /**
   * Custom CSS class
   */
  className?: string;
}

/**
 * NewsletterSignup component
 * Reusable newsletter subscription form with multiple display variants
 */
export default function NewsletterSignup({
  title = 'Subscribe to the newsletter',
  description = 'Get the latest updates delivered to your inbox.',
  buttonText = 'Subscribe',
  variant = 'card',
  className = '',
}: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const { showSuccess } = useToast();
  
  /**
   * Handle form submission
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset states
    setError('');
    
    // Validate email
    const emailError = validateEmail(email);
    if (emailError) {
      setError(emailError);
      return;
    }
    
    // Show loading state
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success state
      setSuccess(true);
      setEmail('');
      showSuccess('Thanks for subscribing!', 'You will now receive our newsletter updates.');
      
      // Reset success state after a delay
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (err) {
      setError('Failed to subscribe. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  
  // Determine layout and styling based on variant
  const getContent = () => {
    switch (variant) {
      case 'inline':
        return (
          <div className={`${className}`}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
              <div className="mb-4 sm:mb-0">
                <h3 className="text-lg font-medium">{title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
              </div>
              
              <form onSubmit={handleSubmit} className="flex flex-1 flex-col sm:flex-row sm:space-x-2">
                <div className="relative flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className={`w-full rounded-lg border px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:bg-gray-800 ${
                      error ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                    }`}
                    disabled={loading || success}
                  />
                  {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
                </div>
                
                <button
                  type="submit"
                  disabled={loading || success}
                  className="mt-2 rounded-lg bg-primary-600 px-4 py-2 font-medium text-white transition-colors hover:bg-primary-700 disabled:bg-primary-400 sm:mt-0"
                >
                  {loading ? 'Subscribing...' : success ? <FiCheckCircle size={20} /> : buttonText}
                </button>
              </form>
            </div>
          </div>
        );
        
      case 'minimal':
        return (
          <div className={`${className}`}>
            <form onSubmit={handleSubmit} className="flex max-w-md">
              <div className="relative flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className={`w-full rounded-l-lg border-y border-l px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:bg-gray-800 ${
                    error ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                  }`}
                  disabled={loading || success}
                />
                {error && <p className="absolute -bottom-5 left-0 text-xs text-red-500">{error}</p>}
              </div>
              
              <button
                type="submit"
                disabled={loading || success}
                className="rounded-r-lg bg-primary-600 px-4 py-2 font-medium text-white transition-colors hover:bg-primary-700 disabled:bg-primary-400"
              >
                {loading ? '...' : success ? <FiCheckCircle size={20} /> : buttonText}
              </button>
            </form>
          </div>
        );
        
      case 'card':
      default:
        return (
          <div className={`rounded-xl bg-white p-6 shadow-md dark:bg-gray-800 ${className}`}>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-400">
                <FiMail size={24} />
              </div>
              
              <h3 className="mb-2 text-xl font-medium">{title}</h3>
              <p className="mb-6 text-gray-600 dark:text-gray-400">{description}</p>
              
              <form onSubmit={handleSubmit}>
                <div className="relative mb-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className={`w-full rounded-lg border px-4 py-3 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:bg-gray-700 ${
                      error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    disabled={loading || success}
                  />
                  {error && <p className="mt-1 text-start text-xs text-red-500">{error}</p>}
                </div>
                
                <motion.button
                  type="submit"
                  disabled={loading || success}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full rounded-lg bg-primary-600 px-4 py-3 font-medium text-white transition-colors hover:bg-primary-700 disabled:bg-primary-400"
                >
                  {loading ? 'Subscribing...' : success ? 'Subscribed! ✓' : buttonText}
                </motion.button>
                
                <p className="mt-4 text-center text-xs text-gray-500 dark:text-gray-400">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </form>
            </div>
          </div>
        );
    }
  };

  return getContent();
}

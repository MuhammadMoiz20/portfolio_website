'use client';

import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { FiSend, FiCheck, FiAlertTriangle } from 'react-icons/fi';

/**
 * Form submission status types
 */
type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

/**
 * Error field highlighting interface
 */
interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

/**
 * ContactForm component that handles user message submission
 * Includes form validation, submission state management, and feedback
 */
export default function ContactForm() {
  // Form data state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  // Form status and error states
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errors, setErrors] = useState<FormErrors>({});

  /**
   * Validates form inputs and returns any errors
   */
  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    return newErrors;
  };

  /**
   * Handles input changes and updates form data state
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field if it exists
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  /**
   * Handles form submission
   */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    setStatus('submitting');
    
    try {
      // In a real application, you would send the form data to your backend
      // For this example, we'll simulate a successful API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      
      setStatus('success');
      
      // Reset status after 5 seconds
      setTimeout(() => {
        setStatus('idle');
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800 sm:p-8"
    >
      {/* Form status feedback */}
      {status === 'success' && (
        <div className="mb-6 rounded-lg bg-green-50 p-4 text-green-800 dark:bg-green-900/30 dark:text-green-400">
          <div className="flex items-center">
            <FiCheck className="mr-2" size={20} />
            <p>Message sent successfully! I'll get back to you soon.</p>
          </div>
        </div>
      )}
      
      {status === 'error' && (
        <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-800 dark:bg-red-900/30 dark:text-red-400">
          <div className="flex items-center">
            <FiAlertTriangle className="mr-2" size={20} />
            <p>There was an error sending your message. Please try again later.</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`mt-1 w-full rounded-lg border p-3 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500/20 dark:bg-gray-700 dark:text-white 
              ${errors.name ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
            disabled={status === 'submitting'}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`mt-1 w-full rounded-lg border p-3 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500/20 dark:bg-gray-700 dark:text-white 
              ${errors.email ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
            disabled={status === 'submitting'}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className={`mt-1 w-full rounded-lg border p-3 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500/20 dark:bg-gray-700 dark:text-white 
              ${errors.subject ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
            disabled={status === 'submitting'}
          />
          {errors.subject && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.subject}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            className={`mt-1 w-full rounded-lg border p-3 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500/20 dark:bg-gray-700 dark:text-white 
              ${errors.message ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
            disabled={status === 'submitting'}
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.message}</p>
          )}
        </div>
        
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="flex w-full items-center justify-center rounded-lg bg-primary-600 py-3 font-medium text-white transition-colors hover:bg-primary-700 focus:outline-none focus:ring focus:ring-primary-500/50 disabled:bg-primary-400 dark:bg-primary-500 dark:hover:bg-primary-600"
        >
          {status === 'submitting' ? (
            <>
              <svg className="mr-2 h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending...
            </>
          ) : (
            <>
              <FiSend className="mr-2" />
              Send Message
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
}

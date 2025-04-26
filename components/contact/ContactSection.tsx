'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiClock, FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';
import SectionHeading from '@/components/ui/SectionHeading';
import ContactForm from '@/components/contact/ContactForm';
import ContactMap from '@/components/contact/ContactMap';

/**
 * Contact information interface
 */
interface ContactInfo {
  /**
   * Email address
   */
  email?: string;
  
  /**
   * Phone number
   */
  phone?: string;
  
  /**
   * Physical address
   */
  address?: string;
  
  /**
   * Business hours
   */
  hours?: string;
  
  /**
   * Social media profiles
   */
  socialMedia?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    [key: string]: string | undefined;
  };
  
  /**
   * Map coordinates
   */
  mapCoordinates?: {
    latitude: number;
    longitude: number;
  };
}

interface ContactSectionProps {
  /**
   * Section title
   * @default 'Get in Touch'
   */
  title?: string;
  
  /**
   * Section subtitle
   */
  subtitle?: string;
  
  /**
   * Contact information
   */
  contactInfo: ContactInfo;
  
  /**
   * Layout style
   * @default 'split'
   */
  layout?: 'split' | 'form-top' | 'info-top' | 'centered';
  
  /**
   * Whether to show the map
   * @default true
   */
  showMap?: boolean;
  
  /**
   * Custom message for successful form submission
   */
  successMessage?: string;
  
  /**
   * Custom CSS class
   */
  className?: string;
}

/**
 * ContactSection component
 * Displays a complete contact section with form, information, and map
 */
export default function ContactSection({
  title = 'Get in Touch',
  subtitle,
  contactInfo,
  layout = 'split',
  showMap = true,
  successMessage,
  className = '',
}: ContactSectionProps) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  /**
   * Handle successful form submission
   */
  const handleFormSuccess = () => {
    setFormSubmitted(true);
    // You could reset the form after a delay if desired
    // setTimeout(() => setFormSubmitted(false), 5000);
  };
  
  /**
   * Render contact information block
   */
  const renderContactInfo = () => (
    <div className="space-y-6 rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
        Contact Information
      </h3>
      
      <div className="space-y-4">
        {/* Email */}
        {contactInfo.email && (
          <div className="flex items-start">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-400">
              <FiMail size={20} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Email
              </p>
              <a
                href={`mailto:${contactInfo.email}`}
                className="mt-1 text-base text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
              >
                {contactInfo.email}
              </a>
            </div>
          </div>
        )}
        
        {/* Phone */}
        {contactInfo.phone && (
          <div className="flex items-start">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-400">
              <FiPhone size={20} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Phone
              </p>
              <a
                href={`tel:${contactInfo.phone.replace(/\s+/g, '')}`}
                className="mt-1 text-base text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
              >
                {contactInfo.phone}
              </a>
            </div>
          </div>
        )}
        
        {/* Address */}
        {contactInfo.address && (
          <div className="flex items-start">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-400">
              <FiMapPin size={20} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Address
              </p>
              <p className="mt-1 text-base text-gray-600 dark:text-gray-400">
                {contactInfo.address}
              </p>
            </div>
          </div>
        )}
        
        {/* Hours */}
        {contactInfo.hours && (
          <div className="flex items-start">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-400">
              <FiClock size={20} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Working Hours
              </p>
              <p className="mt-1 text-base text-gray-600 dark:text-gray-400">
                {contactInfo.hours}
              </p>
            </div>
          </div>
        )}
      </div>
      
      {/* Social Media Links */}
      {contactInfo.socialMedia && Object.keys(contactInfo.socialMedia).length > 0 && (
        <div className="mt-6">
          <p className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
            Connect with me
          </p>
          <div className="flex space-x-4">
            {contactInfo.socialMedia.github && (
              <a
                href={contactInfo.socialMedia.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                aria-label="GitHub"
              >
                <FiGithub size={20} />
              </a>
            )}
            
            {contactInfo.socialMedia.linkedin && (
              <a
                href={contactInfo.socialMedia.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                aria-label="LinkedIn"
              >
                <FiLinkedin size={20} />
              </a>
            )}
            
            {contactInfo.socialMedia.twitter && (
              <a
                href={contactInfo.socialMedia.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                aria-label="Twitter"
              >
                <FiTwitter size={20} />
              </a>
            )}
            
            {/* Render any additional social media links */}
            {Object.entries(contactInfo.socialMedia)
              .filter(([key]) => !['github', 'linkedin', 'twitter'].includes(key))
              .map(([key, url]) => (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                  aria-label={key}
                >
                  {key.charAt(0).toUpperCase()}
                </a>
              ))}
          </div>
        </div>
      )}
    </div>
  );
  
  /**
   * Render contact form block
   */
  const renderContactForm = () => (
    <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
      {formSubmitted ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex h-full flex-col items-center justify-center py-10 text-center"
        >
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600">
            <svg
              className="h-10 w-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
            Message Sent!
          </h3>
          <p className="mb-6 text-gray-600 dark:text-gray-400">
            {successMessage || "Thank you for your message. I'll get back to you as soon as possible."}
          </p>
          <button
            onClick={() => setFormSubmitted(false)}
            className="rounded-lg bg-primary-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Send Another Message
          </button>
        </motion.div>
      ) : (
        <ContactForm onSuccess={handleFormSuccess} />
      )}
    </div>
  );
  
  /**
   * Render map block
   */
  const renderMap = () => (
    contactInfo.mapCoordinates && (
      <div className="mt-8 w-full overflow-hidden rounded-lg shadow-sm">
        <ContactMap
          latitude={contactInfo.mapCoordinates.latitude}
          longitude={contactInfo.mapCoordinates.longitude}
          address={contactInfo.address}
          height={350}
          showZoomControls
          provider="google"
        />
      </div>
    )
  );
  
  /**
   * Render the appropriate layout
   */
  const renderLayout = () => {
    switch (layout) {
      case 'form-top':
        return (
          <div className="container mx-auto px-4">
            <div className="mb-8 w-full">
              {renderContactForm()}
            </div>
            <div className="w-full">
              {renderContactInfo()}
              {showMap && renderMap()}
            </div>
          </div>
        );
        
      case 'info-top':
        return (
          <div className="container mx-auto px-4">
            <div className="mb-8 w-full">
              {renderContactInfo()}
              {showMap && renderMap()}
            </div>
            <div className="w-full">
              {renderContactForm()}
            </div>
          </div>
        );
        
      case 'centered':
        return (
          <div className="container mx-auto max-w-3xl px-4">
            <div className="mb-8">
              {renderContactForm()}
            </div>
            <div>
              {renderContactInfo()}
              {showMap && renderMap()}
            </div>
          </div>
        );
        
      case 'split':
      default:
        return (
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div>
                {renderContactForm()}
              </div>
              <div>
                {renderContactInfo()}
                {showMap && renderMap()}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <section className={`py-12 ${className}`}>
      {/* Section header */}
      <SectionHeading
        title={title}
        subtitle={subtitle}
        centered
        className="mb-12"
      />
      
      {renderLayout()}
    </section>
  );
}

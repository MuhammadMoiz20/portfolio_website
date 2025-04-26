'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiAward, FiExternalLink, FiFilter, FiSearch } from 'react-icons/fi';
import SectionHeading from '@/components/ui/SectionHeading';

export interface Certification {
  id: string | number;
  name: string;
  issuer: string;
  date: string;
  expirationDate?: string;
  verificationUrl?: string;
  credentialId?: string;
  category?: string;
  logo?: string;
  description?: string;
  skills?: string[];
}

interface CertificationsSectionProps {
  title?: string;
  subtitle?: string;
  certifications: Certification[];
  enableFiltering?: boolean;
  enableSearch?: boolean;
  layout?: 'grid' | 'list';
  className?: string;
}

export default function CertificationsSection({
  title = 'Certifications & Awards',
  subtitle,
  certifications,
  enableFiltering = true,
  enableSearch = true,
  layout = 'grid',
  className = '',
}: CertificationsSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = enableFiltering
    ? Array.from(new Set(certifications.filter(cert => cert.category).map(cert => cert.category)))
    : [];

  const filteredCertifications = certifications.filter((cert) => {
    const matchesSearch = !searchQuery ||
      cert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.issuer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.skills?.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = !activeCategory || cert.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  const resetFilters = () => {
    setSearchQuery('');
    setActiveCategory(null);
  };

  return (
    <section className={`py-12 ${className}`}>
      <div className="container mx-auto px-4">
        <SectionHeading
          title={title}
          subtitle={subtitle}
          centered
          className="mb-10"
        />

        {(enableSearch || enableFiltering) && (
          <div className="mb-8">
            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-x-4 md:space-y-0">
              {enableSearch && (
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <FiSearch className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name or skill..."
                    className="block w-full rounded-lg border border-gray-300 bg-white p-2.5 pl-10 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                  />
                </div>
              )}

              {enableFiltering && categories.length > 0 && (
                <div className="flex items-center space-x-2">
                  <FiFilter className="h-5 w-5 text-gray-500" />
                  <span className="mr-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Filter:
                  </span>

                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setActiveCategory(null)}
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        activeCategory === null
                          ? 'bg-primary-600 text-white dark:bg-primary-500'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                      }`}
                    >
                      All
                    </button>

                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          activeCategory === category
                            ? 'bg-primary-600 text-white dark:bg-primary-500'
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {(searchQuery || activeCategory) && (
                <button
                  onClick={resetFilters}
                  className="flex items-center text-sm text-gray-600 underline hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  Reset filters
                </button>
              )}
            </div>

            <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              Showing {filteredCertifications.length} of {certifications.length} certifications
            </div>
          </div>
        )}

        {filteredCertifications.length > 0 ? (
          <div className={`${
            layout === 'grid'
              ? 'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'
              : 'space-y-6'
          }`}>
            {filteredCertifications.map((cert, index) => {
              if (layout === 'grid') {
                return (
                  <motion.div
                    key={cert.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
                  >
                    <div className="flex items-start justify-between">
                      {cert.logo ? (
                        <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-md">
                          <Image
                            src={cert.logo}
                            alt={cert.issuer}
                            fill
                            sizes="48px"
                            className="object-contain"
                          />
                        </div>
                      ) : (
                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-md bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-300">
                          <FiAward size={24} />
                        </div>
                      )}

                      {cert.category && (
                        <span className="inline-flex rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                          {cert.category}
                        </span>
                      )}
                    </div>

                    <h3 className="mt-4 text-lg font-bold text-gray-900 dark:text-white">
                      {cert.name}
                    </h3>

                    <p className="mt-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                      {cert.issuer}
                    </p>

                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      {cert.date}
                      {cert.expirationDate && ` - ${cert.expirationDate}`}
                    </p>

                    {cert.description && (
                      <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                        {cert.description}
                      </p>
                    )}

                    {cert.skills && cert.skills.length > 0 && (
                      <div className="mt-4">
                        <div className="flex flex-wrap gap-1">
                          {cert.skills.map((skill) => (
                            <span
                              key={skill}
                              className="inline-flex rounded-full bg-gray-50 px-2 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {cert.verificationUrl && (
                      <div className="mt-4">
                        <a
                          href={cert.verificationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                        >
                          <span>Verify</span>
                          <FiExternalLink className="ml-1" size={14} />
                        </a>
                      </div>
                    )}

                    {cert.credentialId && (
                      <div className="mt-2">
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Credential ID: {cert.credentialId}
                        </p>
                      </div>
                    )}
                  </motion.div>
                );
              }

              return (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="flex rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
                >
                  {cert.logo ? (
                    <div className="relative mr-6 h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                      <Image
                        src={cert.logo}
                        alt={cert.issuer}
                        fill
                        sizes="64px"
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <div className="mr-6 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-md bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-300">
                      <FiAward size={32} />
                    </div>
                  )}

                  <div className="flex-grow">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                          {cert.name}
                        </h3>

                        <p className="mt-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                          {cert.issuer}
                        </p>

                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                          {cert.date}
                          {cert.expirationDate && ` - ${cert.expirationDate}`}
                        </p>
                      </div>

                      {cert.category && (
                        <span className="inline-flex rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                          {cert.category}
                        </span>
                      )}
                    </div>

                    {cert.description && (
                      <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                        {cert.description}
                      </p>
                    )}

                    <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                      {cert.skills && cert.skills.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {cert.skills.map((skill) => (
                            <span
                              key={skill}
                              className="inline-flex rounded-full bg-gray-50 px-2 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}

                      {cert.verificationUrl && (
                        <a
                          href={cert.verificationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                        >
                          <span>Verify Certificate</span>
                          <FiExternalLink className="ml-1" size={14} />
                        </a>
                      )}
                    </div>

                    {cert.credentialId && (
                      <div className="mt-2">
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Credential ID: {cert.credentialId}
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="py-12 text-center">
            <p className="text-lg text-gray-600 dark:text-gray-400">
              No certifications found.
            </p>
            <button
              onClick={resetFilters}
              className="mt-4 text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

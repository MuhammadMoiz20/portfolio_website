'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiHome, FiSearch } from 'react-icons/fi';
import Button from '@/components/ui/Button';
import Layout from '@/components/layout/Layout';


export default function NotFound() {
  return (
    <Layout>
      <div className="container mx-auto flex min-h-[calc(100vh-200px)] items-center justify-center px-4 py-16">
        <div className="max-w-md text-center">

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8 flex justify-center"
          >
            <Image
              src="/images/404-illustration.svg"
              alt="Page not found"
              width={300}
              height={200}
              priority
            />
          </motion.div>
          

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h1 className="mb-4 text-6xl font-bold text-gray-900 dark:text-white">
              404
            </h1>
            <h2 className="mb-4 text-2xl font-semibold text-gray-700 dark:text-gray-300">
              Page Not Found
            </h2>
            <p className="mb-8 text-gray-600 dark:text-gray-400">
              The page you're looking for doesn't exist or has been moved.
            </p>
            

            <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Button
                href="/"
                variant="primary"
                leftIcon={<FiHome />}
              >
                Back to Home
              </Button>
              
              <Button
                href="/contact"
                variant="outline"
                leftIcon={<FiSearch />}
              >
                Search Site
              </Button>
              
              <Button
                onClick={() => window.history.back()}
                variant="ghost"
                leftIcon={<FiArrowLeft />}
              >
                Go Back
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}

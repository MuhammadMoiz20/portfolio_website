'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiInfo, FiCheck, FiAlertTriangle, FiAlertCircle } from 'react-icons/fi';

export type ToastType = 'info' | 'success' | 'warning' | 'error';

interface ToastProps {
    type?: ToastType;
  
    message: string;
  
    description?: string;
  
    isVisible: boolean;
  
    onClose: () => void;
  
    duration?: number;
  
    position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center';
}

export default function Toast({
  type = 'info',
  message,
  description,
  isVisible,
  onClose,
  duration = 5000,
  position = 'bottom-right',
}: ToastProps) {
  
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  
  const typeConfig = {
    info: {
      icon: <FiInfo size={20} />,
      bgColor: 'bg-blue-50 dark:bg-blue-900/30',
      borderColor: 'border-blue-500 dark:border-blue-600',
      textColor: 'text-blue-800 dark:text-blue-300',
      iconColor: 'text-blue-500 dark:text-blue-400',
    },
    success: {
      icon: <FiCheck size={20} />,
      bgColor: 'bg-green-50 dark:bg-green-900/30',
      borderColor: 'border-green-500 dark:border-green-600',
      textColor: 'text-green-800 dark:text-green-300',
      iconColor: 'text-green-500 dark:text-green-400',
    },
    warning: {
      icon: <FiAlertTriangle size={20} />,
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/30',
      borderColor: 'border-yellow-500 dark:border-yellow-600',
      textColor: 'text-yellow-800 dark:text-yellow-300',
      iconColor: 'text-yellow-500 dark:text-yellow-400',
    },
    error: {
      icon: <FiAlertCircle size={20} />,
      bgColor: 'bg-red-50 dark:bg-red-900/30',
      borderColor: 'border-red-500 dark:border-red-600',
      textColor: 'text-red-800 dark:text-red-300',
      iconColor: 'text-red-500 dark:text-red-400',
    },
  };

  
  const positionClasses = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'top-center': 'top-4 left-1/2 -translate-x-1/2',
    'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className={`fixed z-50 ${positionClasses[position]} max-w-md shadow-lg`}
        >
          <div
            className={`rounded-lg border-l-4 ${typeConfig[type].bgColor} ${typeConfig[type].borderColor} p-4 shadow-sm`}
          >
            <div className="flex items-start">
              <div className={`mr-3 flex-shrink-0 ${typeConfig[type].iconColor}`}>
                {typeConfig[type].icon}
              </div>
              <div className="flex-1">
                <h3 className={`text-sm font-medium ${typeConfig[type].textColor}`}>
                  {message}
                </h3>
                {description && (
                  <div className={`mt-1 text-sm ${typeConfig[type].textColor} opacity-80`}>
                    {description}
                  </div>
                )}
              </div>
              <button
                onClick={onClose}
                className={`ml-4 inline-flex flex-shrink-0 rounded-md p-1.5 ${typeConfig[type].textColor} hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-offset-2`}
                aria-label="Close"
              >
                <FiX size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

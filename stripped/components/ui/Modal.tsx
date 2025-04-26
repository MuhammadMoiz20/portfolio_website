'use client';

import { ReactNode, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';

interface ModalProps {
    isOpen: boolean;
  
    onClose: () => void;
  
    title?: string;
  
    children: ReactNode;
  
    footer?: ReactNode;
  
    maxWidth?: string;
  
    closeOnOutsideClick?: boolean;
  
    closeOnEsc?: boolean;
  
    className?: string;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  maxWidth = 'max-w-lg',
  closeOnOutsideClick = true,
  closeOnEsc = true,
  className = '',
}: ModalProps) {
  // Handle escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (closeOnEsc && e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    
    window.addEventListener('keydown', handleKeyDown);

    
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, closeOnEsc]);

  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    // Clean up
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={closeOnOutsideClick ? onClose : undefined}
            aria-hidden="true"
          />

          {/* Modal content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, type: 'spring', bounce: 0.25 }}
            className={`relative z-10 m-4 w-full overflow-hidden rounded-lg bg-white shadow-xl dark:bg-gray-800 ${maxWidth} ${className}`}
            onClick={(e) => e.stopPropagation()} 
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? 'modal-title' : undefined}
          >
            {}
            {title && (
              <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-700">
                <h3
                  id="modal-title"
                  className="text-lg font-medium text-gray-900 dark:text-white"
                >
                  {title}
                </h3>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-md p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-gray-100"
                  aria-label="Close"
                >
                  <FiX size={20} />
                </button>
              </div>
            )}

            {}
            <div className={`px-6 py-4 ${!title ? 'pt-5' : ''}`}>{children}</div>

            {}
            {footer && (
              <div className="border-t border-gray-200 px-6 py-4 dark:border-gray-700">
                {footer}
              </div>
            )}

            {}
            {!title && (
              <button
                type="button"
                onClick={onClose}
                className="absolute right-4 top-4 rounded-md p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-gray-100"
                aria-label="Close"
              >
                <FiX size={20} />
              </button>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

'use client';

import { ReactNode, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';

interface ModalProps {
  /**
   * Flag to control if the modal is visible
   */
  isOpen: boolean;
  
  /**
   * Handler for closing the modal
   */
  onClose: () => void;
  
  /**
   * Modal title
   */
  title?: string;
  
  /**
   * Content to display in the modal body
   */
  children: ReactNode;
  
  /**
   * Additional content for the modal footer
   */
  footer?: ReactNode;
  
  /**
   * Max width of the modal
   * @default 'max-w-lg'
   */
  maxWidth?: string;
  
  /**
   * Whether to close the modal when clicking outside
   * @default true
   */
  closeOnOutsideClick?: boolean;
  
  /**
   * Whether to close the modal when pressing escape key
   * @default true
   */
  closeOnEsc?: boolean;
  
  /**
   * Custom CSS class for the modal
   */
  className?: string;
}

/**
 * Modal component
 * A reusable dialog/modal with animation and keyboard interaction
 */
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

    // Add event listener
    window.addEventListener('keydown', handleKeyDown);

    // Clean up
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, closeOnEsc]);

  // Prevent body scrolling when modal is open
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
            onClick={(e) => e.stopPropagation()} // Prevent clicks inside from closing
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? 'modal-title' : undefined}
          >
            {/* Header */}
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

            {/* Body */}
            <div className={`px-6 py-4 ${!title ? 'pt-5' : ''}`}>{children}</div>

            {/* Footer */}
            {footer && (
              <div className="border-t border-gray-200 px-6 py-4 dark:border-gray-700">
                {footer}
              </div>
            )}

            {/* Close button when no title */}
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

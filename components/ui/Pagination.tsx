'use client';

import { useMemo } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface PaginationProps {
  /**
   * Total number of items
   */
  totalItems: number;
  
  /**
   * Number of items per page
   * @default 10
   */
  itemsPerPage?: number;
  
  /**
   * Current active page (1-based)
   */
  currentPage: number;
  
  /**
   * Callback when page changes
   */
  onPageChange: (page: number) => void;
  
  /**
   * Maximum number of page buttons to show
   * @default 5
   */
  maxPageButtons?: number;
  
  /**
   * Whether to show the first/last page buttons
   * @default true
   */
  showFirstLastButtons?: boolean;
  
  /**
   * CSS class for pagination container
   */
  className?: string;
}

/**
 * Pagination component
 * Provides navigation controls for paginated content
 */
export default function Pagination({
  totalItems,
  itemsPerPage = 10,
  currentPage,
  onPageChange,
  maxPageButtons = 5,
  showFirstLastButtons = true,
  className = '',
}: PaginationProps) {
  // Calculate total pages
  const totalPages = useMemo(() => Math.ceil(totalItems / itemsPerPage), [totalItems, itemsPerPage]);
  
  // Generate array of page numbers to display
  const pageNumbers = useMemo(() => {
    // If total pages is less than max buttons, show all pages
    if (totalPages <= maxPageButtons) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    
    // Calculate start and end based on current page
    let start = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
    let end = start + maxPageButtons - 1;
    
    // Adjust if end exceeds total pages
    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - maxPageButtons + 1);
    }
    
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, [currentPage, totalPages, maxPageButtons]);
  
  // Handle page change
  const handlePageChange = (page: number) => {
    // Ensure page is within valid range
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };
  
  // If there's only one page or no items, don't render pagination
  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav className={`flex justify-center ${className}`} aria-label="Pagination">
      <ul className="inline-flex items-center -space-x-px">
        {/* First page button */}
        {showFirstLastButtons && (
          <li>
            <button
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
              className={`m-1 flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium 
                ${
                  currentPage === 1
                    ? 'cursor-not-allowed opacity-50'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                }
                text-gray-500 dark:text-gray-400`}
              aria-label="Go to first page"
            >
              <span className="sr-only">First page</span>
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              </svg>
            </button>
          </li>
        )}
        
        {/* Previous page button */}
        <li>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`m-1 flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium 
              ${
                currentPage === 1
                  ? 'cursor-not-allowed opacity-50'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800'
              }
              text-gray-500 dark:text-gray-400`}
            aria-label="Go to previous page"
          >
            <span className="sr-only">Previous</span>
            <FiChevronLeft className="h-5 w-5" />
          </button>
        </li>
        
        {/* Page number buttons */}
        {pageNumbers.map((page) => (
          <li key={page}>
            <button
              onClick={() => handlePageChange(page)}
              className={`m-1 flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium 
                ${
                  currentPage === page
                    ? 'bg-primary-600 text-white hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600'
                    : 'text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
                }`}
              aria-label={`Go to page ${page}`}
              aria-current={currentPage === page ? 'page' : undefined}
            >
              {page}
            </button>
          </li>
        ))}
        
        {/* Next page button */}
        <li>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`m-1 flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium 
              ${
                currentPage === totalPages
                  ? 'cursor-not-allowed opacity-50'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800'
              }
              text-gray-500 dark:text-gray-400`}
            aria-label="Go to next page"
          >
            <span className="sr-only">Next</span>
            <FiChevronRight className="h-5 w-5" />
          </button>
        </li>
        
        {/* Last page button */}
        {showFirstLastButtons && (
          <li>
            <button
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
              className={`m-1 flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium 
                ${
                  currentPage === totalPages
                    ? 'cursor-not-allowed opacity-50'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                }
                text-gray-500 dark:text-gray-400`}
              aria-label="Go to last page"
            >
              <span className="sr-only">Last page</span>
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

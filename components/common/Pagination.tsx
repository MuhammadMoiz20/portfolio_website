'use client';

import { useCallback } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';

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
   * Current page number (1-based)
   * @default 1
   */
  currentPage?: number;
  
  /**
   * Maximum number of page buttons to show
   * @default 5
   */
  maxPageButtons?: number;
  
  /**
   * Whether to use client-side routing
   * @default true
   */
  clientSideRouting?: boolean;
  
  /**
   * Base URL for pagination links (used if not client-side routing)
   * @default ''
   */
  baseUrl?: string;
  
  /**
   * URL query parameter name for the page
   * @default 'page'
   */
  pageParam?: string;
  
  /**
   * Whether to show first/last page buttons
   * @default true
   */
  showFirstLastButtons?: boolean;
  
  /**
   * Whether to show item count text
   * @default true
   */
  showItemCount?: boolean;
  
  /**
   * Callback function when page changes (for controlled components)
   */
  onPageChange?: (page: number) => void;
  
  /**
   * Visual size variant 
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
  
  /**
   * Custom CSS class
   */
  className?: string;
}

/**
 * Pagination component
 * Provides a UI for navigating between pages of content
 */
export default function Pagination({
  totalItems,
  itemsPerPage = 10,
  currentPage = 1,
  maxPageButtons = 5,
  clientSideRouting = true,
  baseUrl = '',
  pageParam = 'page',
  showFirstLastButtons = true,
  showItemCount = true,
  onPageChange,
  size = 'md',
  className = '',
}: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // Calculate total pages
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  
  // Ensure current page is within valid range
  const validCurrentPage = Math.max(1, Math.min(currentPage, totalPages));
  
  // Calculate start and end items on current page
  const startItem = Math.min(totalItems, (validCurrentPage - 1) * itemsPerPage + 1);
  const endItem = Math.min(totalItems, validCurrentPage * itemsPerPage);
  
  /**
   * Create URL for a specific page
   */
  const createPageUrl = useCallback((page: number) => {
    if (clientSideRouting) {
      // Client-side routing with Next.js App Router
      const params = new URLSearchParams(searchParams as any);
      
      if (page === 1) {
        params.delete(pageParam);
      } else {
        params.set(pageParam, page.toString());
      }
      
      return `${pathname}?${params.toString()}`;
    } else {
      // Server-side routing with custom URL
      return page === 1 
        ? baseUrl 
        : `${baseUrl}${baseUrl.includes('?') ? '&' : '?'}${pageParam}=${page}`;
    }
  }, [clientSideRouting, searchParams, pathname, pageParam, baseUrl]);
  
  /**
   * Handle page change (for controlled component usage)
   */
  const handlePageChange = (page: number) => {
    if (onPageChange && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };
  
  /**
   * Calculate range of page buttons to display
   */
  const getPageRange = () => {
    // If we have fewer pages than max buttons, show all pages
    if (totalPages <= maxPageButtons) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    
    // Calculate how many buttons to show on each side of current page
    const halfButtons = Math.floor(maxPageButtons / 2);
    
    // Handle case when current page is near the start
    if (validCurrentPage <= halfButtons) {
      return Array.from({ length: maxPageButtons }, (_, i) => i + 1);
    }
    
    // Handle case when current page is near the end
    if (validCurrentPage > totalPages - halfButtons) {
      return Array.from(
        { length: maxPageButtons }, 
        (_, i) => totalPages - maxPageButtons + i + 1
      );
    }
    
    // Current page is in the middle
    return Array.from(
      { length: maxPageButtons },
      (_, i) => validCurrentPage - halfButtons + i
    );
  };
  
  // Determine button size classes
  const getButtonSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'h-8 w-8 text-sm';
      case 'lg':
        return 'h-12 w-12 text-lg';
      case 'md':
      default:
        return 'h-10 w-10';
    }
  };
  
  const buttonSizeClasses = getButtonSizeClasses();
  const pageRange = getPageRange();

  return (
    <div className={`flex flex-col items-center space-y-3 ${className}`}>
      {/* Item count text */}
      {showItemCount && totalItems > 0 && (
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Showing {startItem}-{endItem} of {totalItems} items
        </div>
      )}
      
      {/* Pagination buttons */}
      <div className="flex flex-wrap items-center justify-center">
        {/* First page button */}
        {showFirstLastButtons && (
          <PaginationButton
            onClick={() => handlePageChange(1)}
            href={createPageUrl(1)}
            disabled={validCurrentPage === 1}
            aria-label="Go to first page"
            sizeClasses={buttonSizeClasses}
          >
            <FiChevronsLeft className="h-5 w-5" />
          </PaginationButton>
        )}
        
        {/* Previous page button */}
        <PaginationButton
          onClick={() => handlePageChange(validCurrentPage - 1)}
          href={createPageUrl(validCurrentPage - 1)}
          disabled={validCurrentPage === 1}
          aria-label="Go to previous page"
          sizeClasses={buttonSizeClasses}
        >
          <FiChevronLeft className="h-5 w-5" />
        </PaginationButton>
        
        {/* Page number buttons */}
        {pageRange.map((page) => (
          <PaginationButton
            key={page}
            onClick={() => handlePageChange(page)}
            href={createPageUrl(page)}
            active={page === validCurrentPage}
            aria-label={`Page ${page}`}
            aria-current={page === validCurrentPage ? 'page' : undefined}
            sizeClasses={buttonSizeClasses}
          >
            {page}
          </PaginationButton>
        ))}
        
        {/* Next page button */}
        <PaginationButton
          onClick={() => handlePageChange(validCurrentPage + 1)}
          href={createPageUrl(validCurrentPage + 1)}
          disabled={validCurrentPage === totalPages}
          aria-label="Go to next page"
          sizeClasses={buttonSizeClasses}
        >
          <FiChevronRight className="h-5 w-5" />
        </PaginationButton>
        
        {/* Last page button */}
        {showFirstLastButtons && (
          <PaginationButton
            onClick={() => handlePageChange(totalPages)}
            href={createPageUrl(totalPages)}
            disabled={validCurrentPage === totalPages}
            aria-label="Go to last page"
            sizeClasses={buttonSizeClasses}
          >
            <FiChevronsRight className="h-5 w-5" />
          </PaginationButton>
        )}
      </div>
    </div>
  );
}

/**
 * Individual pagination button component
 */
interface PaginationButtonProps {
  href: string;
  onClick?: () => void;
  disabled?: boolean;
  active?: boolean;
  sizeClasses: string;
  children: React.ReactNode;
  'aria-label'?: string;
  'aria-current'?: 'page' | undefined;
}

function PaginationButton({
  href,
  onClick,
  disabled = false,
  active = false,
  sizeClasses,
  children,
  'aria-label': ariaLabel,
  'aria-current': ariaCurrent,
}: PaginationButtonProps) {
  if (disabled) {
    return (
      <span
        className={`flex ${sizeClasses} items-center justify-center cursor-not-allowed rounded-md bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-600`}
        aria-disabled="true"
        aria-label={ariaLabel}
      >
        {children}
      </span>
    );
  }
  
  if (active) {
    return (
      <span
        className={`flex ${sizeClasses} items-center justify-center rounded-md bg-primary-600 text-white dark:bg-primary-500`}
        aria-current={ariaCurrent}
        aria-label={ariaLabel}
      >
        {children}
      </span>
    );
  }
  
  return (
    <Link
      href={href}
      onClick={(e) => {
        if (onClick) {
          e.preventDefault();
          onClick();
        }
      }}
      className={`flex ${sizeClasses} items-center justify-center rounded-md bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700`}
      aria-label={ariaLabel}
    >
      {children}
    </Link>
  );
}

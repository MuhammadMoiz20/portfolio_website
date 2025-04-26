'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiChevronRight, FiHome } from 'react-icons/fi';

interface BreadcrumbItem {
  /**
   * Label to display for this breadcrumb
   */
  label: string;
  
  /**
   * URL path for this breadcrumb
   */
  href: string;
  
  /**
   * Whether this is the active/current page
   */
  active?: boolean;
}

interface BreadcrumbProps {
  /**
   * Array of breadcrumb items to display
   * If not provided, will generate breadcrumbs from the current path
   */
  items?: BreadcrumbItem[];
  
  /**
   * Whether to show home icon at the start
   * @default true
   */
  showHomeIcon?: boolean;
  
  /**
   * Custom separators between items
   * @default <FiChevronRight />
   */
  separator?: React.ReactNode;
  
  /**
   * Whether to auto-generate breadcrumbs from the URL path
   * @default false
   */
  autoGenerate?: boolean;
  
  /**
   * For auto-generated breadcrumbs, a mapping of path segments to display names
   * e.g. { 'blog': 'Blog Posts', 'contact': 'Contact Us' }
   */
  pathDisplayNames?: Record<string, string>;
  
  /**
   * Custom CSS class for the breadcrumb container
   */
  className?: string;
}

/**
 * Breadcrumb component
 * Provides hierarchical navigation with multiple display options
 */
export default function Breadcrumb({
  items,
  showHomeIcon = true,
  separator = <FiChevronRight size={16} />,
  autoGenerate = false,
  pathDisplayNames = {},
  className = '',
}: BreadcrumbProps) {
  const currentPath = usePathname();
  
  // Auto-generate breadcrumbs from current path if requested
  const breadcrumbItems = autoGenerate 
    ? generateBreadcrumbs(currentPath, pathDisplayNames)
    : items || [];

  return (
    <nav aria-label="Breadcrumb" className={`${className}`}>
      <ol className="flex flex-wrap items-center text-sm">
        {/* Home item */}
        <li className="flex items-center">
          <Link
            href="/"
            className="flex items-center text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            aria-label="Home"
          >
            {showHomeIcon ? (
              <FiHome size={16} />
            ) : (
              "Home"
            )}
          </Link>
        </li>
        
        {/* Separator after home */}
        {breadcrumbItems.length > 0 && (
          <li className="mx-2 text-gray-400 dark:text-gray-600">{separator}</li>
        )}
        
        {/* Breadcrumb items */}
        {breadcrumbItems.map((item, index) => (
          <li
            key={item.href}
            className="flex items-center"
          >
            {index > 0 && (
              <span className="mx-2 text-gray-400 dark:text-gray-600">{separator}</span>
            )}
            
            {item.active ? (
              <span className="font-medium text-gray-800 dark:text-gray-200" aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/**
 * Generate breadcrumb items from a URL path
 */
function generateBreadcrumbs(
  path: string,
  displayNames: Record<string, string> = {}
): BreadcrumbItem[] {
  // Remove trailing slash and split into segments
  const cleanPath = path.endsWith('/') && path !== '/' 
    ? path.slice(0, -1) 
    : path;
  
  const segments = cleanPath.split('/').filter(Boolean);
  
  if (segments.length === 0) return [];
  
  // Generate breadcrumb items
  return segments.map((segment, index) => {
    // Build the URL for this breadcrumb
    const href = `/${segments.slice(0, index + 1).join('/')}`;
    
    // Get display name from mapping or capitalize the segment
    const label = displayNames[segment] || 
      segment
        .replace(/-/g, ' ')
        .replace(/\b\w/g, char => char.toUpperCase());
    
    // Last segment is the current page
    const active = index === segments.length - 1;
    
    return { href, label, active };
  });
}

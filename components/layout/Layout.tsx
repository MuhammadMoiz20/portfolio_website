'use client';

import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import ScrollToTop from '@/components/ui/ScrollToTop';
import { ToastProvider } from '@/context/ToastContext';

interface LayoutProps {
  /**
   * Page content to be wrapped by the layout
   */
  children: ReactNode;
  
  /**
   * Whether to show the header
   * @default true
   */
  showHeader?: boolean;
  
  /**
   * Whether to show the footer
   * @default true
   */
  showFooter?: boolean;
  
  /**
   * Whether to show the scroll to top button
   * @default true
   */
  showScrollToTop?: boolean;
  
  /**
   * Additional CSS class for the main content area
   */
  className?: string;
}

/**
 * Layout component
 * Provides consistent page structure with header, footer, and global UI elements
 */
export default function Layout({
  children,
  showHeader = true,
  showFooter = true,
  showScrollToTop = true,
  className = '',
}: LayoutProps) {
  return (
    <ToastProvider>
      <div className="flex min-h-screen flex-col">
        {/* Header */}
        {showHeader && <Header />}
        
        {/* Main content */}
        <main className={`flex-1 ${className}`}>
          {children}
        </main>
        
        {/* Footer */}
        {showFooter && <Footer />}
        
        {/* Scroll to top button */}
        {showScrollToTop && <ScrollToTop />}
      </div>
    </ToastProvider>
  );
}

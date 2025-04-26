'use client';

import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import ScrollToTop from '@/components/ui/ScrollToTop';
import { ToastProvider } from '@/context/ToastContext';

interface LayoutProps {
    children: ReactNode;
  
    showHeader?: boolean;
  
    showFooter?: boolean;
  
    showScrollToTop?: boolean;
  
    className?: string;
}

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
        {}
        {showHeader && <Header />}
        
        {}
        <main className={`flex-1 ${className}`}>
          {children}
        </main>
        
        {}
        {showFooter && <Footer />}
        
        {}
        {showScrollToTop && <ScrollToTop />}
      </div>
    </ToastProvider>
  );
}

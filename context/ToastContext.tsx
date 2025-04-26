'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import Toast, { ToastType } from '@/components/ui/Toast';

/**
 * Toast notification data structure
 */
interface ToastData {
  id: string;
  type: ToastType;
  message: string;
  description?: string;
  duration?: number;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center';
}

/**
 * Toast context interface
 */
interface ToastContextValue {
  /**
   * Show a toast notification
   */
  showToast: (data: Omit<ToastData, 'id'>) => void;
  
  /**
   * Show an info toast (shorthand)
   */
  showInfo: (message: string, description?: string) => void;
  
  /**
   * Show a success toast (shorthand)
   */
  showSuccess: (message: string, description?: string) => void;
  
  /**
   * Show a warning toast (shorthand)
   */
  showWarning: (message: string, description?: string) => void;
  
  /**
   * Show an error toast (shorthand)
   */
  showError: (message: string, description?: string) => void;
  
  /**
   * Dismiss a specific toast by ID
   */
  dismissToast: (id: string) => void;
  
  /**
   * Dismiss all currently shown toasts
   */
  dismissAll: () => void;
}

// Create the context
const ToastContext = createContext<ToastContextValue | undefined>(undefined);

/**
 * Custom hook to use the toast context
 */
export function useToast() {
  const context = useContext(ToastContext);
  
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  
  return context;
}

/**
 * Props for the ToastProvider component
 */
interface ToastProviderProps {
  children: ReactNode;
}

/**
 * ToastProvider component
 * Provides toast functionality throughout the application
 */
export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastData[]>([]);
  
  // Generate a unique ID for each toast
  const generateId = () => `toast-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  
  // Show a toast notification
  const showToast = useCallback((data: Omit<ToastData, 'id'>) => {
    const id = generateId();
    setToasts((prevToasts) => [...prevToasts, { ...data, id }]);
    return id;
  }, []);
  
  // Convenience methods for different toast types
  const showInfo = useCallback(
    (message: string, description?: string) => 
      showToast({ type: 'info', message, description }),
    [showToast]
  );
  
  const showSuccess = useCallback(
    (message: string, description?: string) => 
      showToast({ type: 'success', message, description }),
    [showToast]
  );
  
  const showWarning = useCallback(
    (message: string, description?: string) => 
      showToast({ type: 'warning', message, description }),
    [showToast]
  );
  
  const showError = useCallback(
    (message: string, description?: string) => 
      showToast({ type: 'error', message, description }),
    [showToast]
  );
  
  // Dismiss a specific toast
  const dismissToast = useCallback((id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);
  
  // Dismiss all toasts
  const dismissAll = useCallback(() => {
    setToasts([]);
  }, []);
  
  // Context value
  const value: ToastContextValue = {
    showToast,
    showInfo,
    showSuccess,
    showWarning,
    showError,
    dismissToast,
    dismissAll,
  };
  
  return (
    <ToastContext.Provider value={value}>
      {children}
      
      {/* Render all active toasts */}
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          type={toast.type}
          message={toast.message}
          description={toast.description}
          isVisible={true}
          onClose={() => dismissToast(toast.id)}
          duration={toast.duration || 5000}
          position={toast.position || 'bottom-right'}
        />
      ))}
    </ToastContext.Provider>
  );
}

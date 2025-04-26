'use client';

import { useState, useEffect, InputHTMLAttributes, forwardRef } from 'react';
import { FiEye, FiEyeOff, FiAlertCircle } from 'react-icons/fi';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * Label text for the input
   */
  label: string;
  
  /**
   * Error message to display (if any)
   */
  error?: string;
  
  /**
   * Helper text to display below the input
   */
  helperText?: string;
  
  /**
   * Whether to display as full width
   * @default true
   */
  fullWidth?: boolean;
  
  /**
   * Icon to display at the start of the input
   */
  startIcon?: React.ReactNode;
  
  /**
   * Icon to display at the end of the input
   */
  endIcon?: React.ReactNode;
  
  /**
   * Whether to show a toggle for password fields
   * @default true for password fields
   */
  showPasswordToggle?: boolean;
}

/**
 * FormInput component
 * A reusable form input component with consistent styling,
 * built-in error handling, and extended functionality
 */
const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      label,
      error,
      helperText,
      fullWidth = true,
      startIcon,
      endIcon,
      showPasswordToggle,
      type = 'text',
      className = '',
      id,
      name,
      ...props
    },
    ref
  ) => {
    // Generate a unique ID if not provided
    const inputId = id || `input-${name || Math.random().toString(36).substring(2, 9)}`;
    
    // State for password visibility (only for password fields)
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const isPassword = type === 'password';
    const shouldShowPasswordToggle = isPassword && showPasswordToggle !== false;
    
    // Determine the actual input type based on password visibility
    const actualType = isPassword && isPasswordVisible ? 'text' : type;
    
    // Toggle password visibility
    const togglePasswordVisibility = () => {
      setIsPasswordVisible(!isPasswordVisible);
    };
    
    // Base classes for consistency
    const baseClasses = `
      block rounded-md border-gray-300 shadow-sm 
      focus:border-primary-500 focus:ring focus:ring-primary-500/20 
      dark:border-gray-700 dark:bg-gray-800 dark:text-white
      disabled:opacity-60 disabled:cursor-not-allowed
      ${error ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-700'}
      ${fullWidth ? 'w-full' : ''}
      ${startIcon ? 'pl-10' : ''}
      ${endIcon || shouldShowPasswordToggle ? 'pr-10' : ''}
      ${className}
    `;

    return (
      <div className={`${fullWidth ? 'w-full' : ''} mb-4`}>
        {/* Label */}
        <label 
          htmlFor={inputId} 
          className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {label}
        </label>
        
        {/* Input wrapper for icons */}
        <div className="relative">
          {/* Start icon if provided */}
          {startIcon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 dark:text-gray-400">
              {startIcon}
            </div>
          )}
          
          {/* Input element */}
          <input
            ref={ref}
            id={inputId}
            name={name}
            type={actualType}
            className={baseClasses}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
            {...props}
          />
          
          {/* End icon or password toggle */}
          {(endIcon || shouldShowPasswordToggle) && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              {shouldShowPasswordToggle ? (
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  aria-label={isPasswordVisible ? "Hide password" : "Show password"}
                  tabIndex={-1}
                >
                  {isPasswordVisible ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              ) : (
                endIcon
              )}
            </div>
          )}
          
          {/* Error icon */}
          {error && !(endIcon || shouldShowPasswordToggle) && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-red-500">
              <FiAlertCircle size={18} />
            </div>
          )}
        </div>
        
        {/* Error message */}
        {error && (
          <p id={`${inputId}-error`} className="mt-1 text-sm text-red-600 dark:text-red-400">
            {error}
          </p>
        )}
        
        {/* Helper text */}
        {!error && helperText && (
          <p id={`${inputId}-helper`} className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

// Display name for React DevTools
FormInput.displayName = 'FormInput';

export default FormInput;

'use client';

import { TextareaHTMLAttributes, forwardRef } from 'react';
import { FiAlertCircle } from 'react-icons/fi';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
  
    error?: string;
  
    helperText?: string;
  
    fullWidth?: boolean;
  
    rows?: number;
  
    maxLength?: number;
  
    showCharCount?: boolean;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      label,
      error,
      helperText,
      fullWidth = true,
      rows = 4,
      maxLength,
      showCharCount = false,
      className = '',
      id,
      name,
      value = '',
      ...props
    },
    ref
  ) => {
    // Generate a unique ID if not provided
    const textareaId = id || `textarea-${name || Math.random().toString(36).substring(2, 9)}`;
    
    // Current character count
    const charCount = value?.toString().length || 0;
    
    // Base classes for consistency
    const baseClasses = `
      block rounded-md border-gray-300 shadow-sm 
      focus:border-primary-500 focus:ring focus:ring-primary-500/20 
      dark:border-gray-700 dark:bg-gray-800 dark:text-white
      disabled:opacity-60 disabled:cursor-not-allowed
      ${error ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-700'}
      ${fullWidth ? 'w-full' : ''}
      ${className}
    `;

    return (
      <div className={`${fullWidth ? 'w-full' : ''} mb-4`}>
        {/* Label */}
        <div className="flex items-center justify-between">
          <label 
            htmlFor={textareaId} 
            className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {label}
          </label>
          
          {/* Show character count if enabled and maxLength is set */}
          {showCharCount && maxLength && (
            <span 
              className={`text-xs ${
                charCount > maxLength * 0.9
                  ? charCount >= maxLength
                    ? 'text-red-500 dark:text-red-400'
                    : 'text-amber-500 dark:text-amber-400'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              {charCount}/{maxLength}
            </span>
          )}
        </div>
        
        {/* Textarea wrapper */}
        <div className="relative">
          <textarea
            ref={ref}
            id={textareaId}
            name={name}
            rows={rows}
            maxLength={maxLength}
            className={baseClasses}
            aria-invalid={!!error}
            aria-describedby={
              error 
                ? `${textareaId}-error` 
                : helperText 
                  ? `${textareaId}-helper` 
                  : undefined
            }
            value={value}
            {...props}
          />
          
          {}
          {error && (
            <div className="absolute right-2 top-2 text-red-500">
              <FiAlertCircle size={18} />
            </div>
          )}
        </div>
        
        {}
        {error && (
          <p id={`${textareaId}-error`} className="mt-1 text-sm text-red-600 dark:text-red-400">
            {error}
          </p>
        )}
        
        {}
        {!error && helperText && (
          <p id={`${textareaId}-helper`} className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);


TextArea.displayName = 'TextArea';

export default TextArea;

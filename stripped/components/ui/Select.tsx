'use client';

import { forwardRef, SelectHTMLAttributes } from 'react';
import { FiChevronDown, FiAlertCircle } from 'react-icons/fi';

export interface SelectOption {
    value: string;
  
    label: string;
  
    disabled?: boolean;
}

export interface OptionGroup {
    label: string;
  
    options: SelectOption[];
}

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
    label: string;
  
    options: SelectOption[] | OptionGroup[];
  
    error?: string;
  
    helperText?: string;
  
    fullWidth?: boolean;
  
    size?: 'sm' | 'md' | 'lg';
  
    startIcon?: React.ReactNode;
  
    hasGroups?: boolean;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      options,
      error,
      helperText,
      fullWidth = true,
      size = 'md',
      startIcon,
      hasGroups = false,
      className = '',
      id,
      name,
      ...props
    },
    ref
  ) => {
    // Generate a unique ID if not provided
    const selectId = id || `select-${name || Math.random().toString(36).substring(2, 9)}`;
    
    // Size variants
    const sizeClasses = {
      sm: 'py-1.5 text-sm',
      md: 'py-2 text-base',
      lg: 'py-3 text-lg',
    };
    
    
    const baseClasses = `
      block appearance-none rounded-md border-gray-300 px-3 shadow-sm 
      focus:border-primary-500 focus:ring focus:ring-primary-500/20 
      dark:border-gray-700 dark:bg-gray-800 dark:text-white
      disabled:opacity-60 disabled:cursor-not-allowed
      ${error ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-700'}
      ${fullWidth ? 'w-full' : ''}
      ${startIcon ? 'pl-10' : ''}
      ${sizeClasses[size]}
      ${className}
    `;

        const isOptionGroup = (option: any): option is OptionGroup => {
      return option && 'options' in option && Array.isArray(option.options);
    };

    return (
      <div className={`${fullWidth ? 'w-full' : ''} mb-4`}>
        {}
        <label 
          htmlFor={selectId} 
          className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {label}
        </label>
        
        {}
        <div className="relative">
          {}
          {startIcon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 dark:text-gray-400">
              {startIcon}
            </div>
          )}
          
          {}
          <select
            ref={ref}
            id={selectId}
            name={name}
            className={baseClasses}
            aria-invalid={!!error}
            aria-describedby={
              error 
                ? `${selectId}-error` 
                : helperText 
                  ? `${selectId}-helper` 
                  : undefined
            }
            {...props}
          >
            {hasGroups || (options.length > 0 && isOptionGroup(options[0])) ? (
              
              (options as OptionGroup[]).map((group, groupIndex) => (
                <optgroup key={`group-${groupIndex}`} label={group.label}>
                  {group.options.map((option, optionIndex) => (
                    <option 
                      key={`option-${groupIndex}-${optionIndex}`}
                      value={option.value}
                      disabled={option.disabled}
                    >
                      {option.label}
                    </option>
                  ))}
                </optgroup>
              ))
            ) : (
              
              (options as SelectOption[]).map((option, index) => (
                <option 
                  key={`option-${index}`}
                  value={option.value}
                  disabled={option.disabled}
                >
                  {option.label}
                </option>
              ))
            )}
          </select>
          
          {}
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-gray-500 dark:text-gray-400">
            <FiChevronDown size={18} />
          </div>
          
          {}
          {error && (
            <div className="absolute inset-y-0 right-8 flex items-center text-red-500">
              <FiAlertCircle size={18} />
            </div>
          )}
        </div>
        
        {}
        {error && (
          <p id={`${selectId}-error`} className="mt-1 text-sm text-red-600 dark:text-red-400">
            {error}
          </p>
        )}
        
        {}
        {!error && helperText && (
          <p id={`${selectId}-helper`} className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);


Select.displayName = 'Select';

export default Select;

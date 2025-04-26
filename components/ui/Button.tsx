'use client';

import { ReactNode, ButtonHTMLAttributes, forwardRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

/**
 * Button variant options
 */
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';

/**
 * Button size options
 */
type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * Props for the Button component
 */
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Button content
   */
  children: ReactNode;
  
  /**
   * Visual style variant
   * @default 'primary'
   */
  variant?: ButtonVariant;
  
  /**
   * Button size
   * @default 'md'
   */
  size?: ButtonSize;
  
  /**
   * Whether to render as full width
   * @default false
   */
  fullWidth?: boolean;
  
  /**
   * Icon to display before the text
   */
  leftIcon?: ReactNode;
  
  /**
   * Icon to display after the text
   */
  rightIcon?: ReactNode;
  
  /**
   * URL for Link buttons - if provided, renders as Next.js Link
   */
  href?: string;
  
  /**
   * Whether the link opens in a new tab
   * Only applies when href is provided
   * @default false
   */
  external?: boolean;
  
  /**
   * Whether to animate button on hover
   * @default true
   */
  animate?: boolean;
  
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Button component
 * Reusable button with consistent styling and multiple variants
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      leftIcon,
      rightIcon,
      href,
      external = false,
      animate = true,
      className = '',
      ...props
    },
    ref
  ) => {
    // Variant-specific classes
    const variantClasses = {
      primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500',
      secondary: 'bg-secondary-600 text-white hover:bg-secondary-700 focus:ring-secondary-500',
      outline: 'bg-transparent border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 focus:ring-gray-500',
      ghost: 'bg-transparent text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 focus:ring-gray-500',
      danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    };
    
    // Size-specific classes
    const sizeClasses = {
      sm: 'py-1.5 px-3 text-sm',
      md: 'py-2 px-4 text-base',
      lg: 'py-3 px-6 text-lg',
    };
    
    // Common button classes
    const buttonClasses = `
      inline-flex items-center justify-center font-medium rounded-lg
      focus:outline-none focus:ring-2 focus:ring-opacity-50
      transition-colors duration-200 ease-in-out
      disabled:opacity-60 disabled:cursor-not-allowed
      ${variantClasses[variant]}
      ${sizeClasses[size]}
      ${fullWidth ? 'w-full' : ''}
      ${className}
    `;
    
    // If href is provided, render as Link
    if (href) {
      const linkProps = external
        ? { target: '_blank', rel: 'noopener noreferrer' }
        : {};
      
      return (
        <Link href={href} {...linkProps} className={buttonClasses}>
          {leftIcon && <span className="mr-2">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="ml-2">{rightIcon}</span>}
        </Link>
      );
    }
    
    // If animate is true, use motion.button
    if (animate) {
      // Separate animation props from DOM props
      // Only pass allowed DOM props to motion.button
      // Remove animation event handlers that conflict with Framer Motion
      const {
        onClick,
        disabled,
        type = 'button',
        tabIndex,
        name,
        value,
        id,
        autoFocus,
        form,
        formAction,
        formEncType,
        formMethod,
        formNoValidate,
        formTarget,
        onAnimationStart,
        onAnimationEnd,
        onDrag,
        onDragEnd,
        onDragStart,
        onDragOver,
        onDragEnter,
        onDragLeave,
        onDrop,
        ...restProps
      } = props;
      return (
        <motion.button
          ref={ref}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={buttonClasses}
          onClick={onClick}
          disabled={disabled}
          type={type}
          tabIndex={tabIndex}
          name={name}
          value={value}
          id={id}
          autoFocus={autoFocus}
          form={form}
          formAction={formAction}
          formEncType={formEncType}
          formMethod={formMethod}
          formNoValidate={formNoValidate}
          formTarget={formTarget}
          {...restProps}
        >
          {leftIcon && <span className="mr-2">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="ml-2">{rightIcon}</span>}
        </motion.button>
      );
    }
    
    // Regular button
    return (
      <button ref={ref} className={buttonClasses} {...props}>
        {leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="ml-2">{rightIcon}</span>}
      </button>
    );
  }
);

// Display name for React DevTools
Button.displayName = 'Button';

export default Button;

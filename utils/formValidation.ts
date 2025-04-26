/**
 * Form validation utilities
 * Centralized validation functions for consistent form validation across the website
 */

/**
 * Error object with field name as key and error message as value
 */
export type ValidationErrors = Record<string, string>;

/**
 * Validates that a value is not empty
 * @param value - Value to validate
 * @param fieldName - Display name of the field for error message
 * @returns Error message if invalid, empty string if valid
 */
export const validateRequired = (value: string, fieldName: string): string => {
  return value.trim() === '' ? `${fieldName} is required` : '';
};

/**
 * Validates email format
 * @param email - Email to validate
 * @returns Error message if invalid, empty string if valid
 */
export const validateEmail = (email: string): string => {
  if (email.trim() === '') return '';
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) ? '' : 'Please enter a valid email address';
};

/**
 * Validates minimum length of a string
 * @param value - Value to validate
 * @param minLength - Minimum length required
 * @param fieldName - Display name of the field for error message
 * @returns Error message if invalid, empty string if valid
 */
export const validateMinLength = (value: string, minLength: number, fieldName: string): string => {
  if (value.trim() === '') return '';
  
  return value.length < minLength
    ? `${fieldName} must be at least ${minLength} characters`
    : '';
};

/**
 * Validates maximum length of a string
 * @param value - Value to validate
 * @param maxLength - Maximum length allowed
 * @param fieldName - Display name of the field for error message
 * @returns Error message if invalid, empty string if valid
 */
export const validateMaxLength = (value: string, maxLength: number, fieldName: string): string => {
  if (value.trim() === '') return '';
  
  return value.length > maxLength
    ? `${fieldName} must be no more than ${maxLength} characters`
    : '';
};

/**
 * Validates that a value is a valid URL
 * @param value - URL to validate
 * @returns Error message if invalid, empty string if valid
 */
export const validateURL = (value: string): string => {
  if (value.trim() === '') return '';
  
  try {
    new URL(value);
    return '';
  } catch (e) {
    return 'Please enter a valid URL';
  }
};

/**
 * Validates a phone number (basic format check)
 * @param value - Phone number to validate
 * @returns Error message if invalid, empty string if valid
 */
export const validatePhone = (value: string): string => {
  if (value.trim() === '') return '';
  
  // This is a simplified validation - adjust for specific format needs
  const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
  return phoneRegex.test(value) ? '' : 'Please enter a valid phone number';
};

/**
 * Validates a number is within a specified range
 * @param value - Number to validate
 * @param min - Minimum allowed value
 * @param max - Maximum allowed value
 * @param fieldName - Display name of the field for error message
 * @returns Error message if invalid, empty string if valid
 */
export const validateNumberRange = (
  value: number,
  min: number,
  max: number,
  fieldName: string
): string => {
  if (value < min) return `${fieldName} must be at least ${min}`;
  if (value > max) return `${fieldName} must be no more than ${max}`;
  return '';
};

/**
 * Validates that two values match (e.g., password confirmation)
 * @param value1 - First value
 * @param value2 - Second value to compare
 * @param errorMessage - Custom error message
 * @returns Error message if values don't match, empty string if they do
 */
export const validateMatch = (
  value1: string,
  value2: string,
  errorMessage: string = 'Values do not match'
): string => {
  return value1 !== value2 ? errorMessage : '';
};

/**
 * Runs a set of validation functions and collects all errors
 * @param validations - Array of validation functions
 * @returns Object containing any validation errors
 */
export const runValidations = (
  validations: Array<{
    field: string;
    validationFn: () => string;
  }>
): ValidationErrors => {
  const errors: ValidationErrors = {};
  
  validations.forEach(({ field, validationFn }) => {
    const error = validationFn();
    if (error) {
      errors[field] = error;
    }
  });
  
  return errors;
};

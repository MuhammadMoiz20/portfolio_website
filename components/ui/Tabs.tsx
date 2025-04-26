'use client';

import { useState, ReactNode, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * Interface for a tab item
 */
export interface TabItem {
  /**
   * Unique identifier for the tab
   */
  id: string;
  
  /**
   * Label to display for the tab
   */
  label: ReactNode;
  
  /**
   * Content to display when tab is active
   */
  content: ReactNode;
  
  /**
   * Optional icon to display with the label
   */
  icon?: ReactNode;
  
  /**
   * Whether this tab is disabled
   */
  disabled?: boolean;
}

interface TabsProps {
  /**
   * Array of tab items to display
   */
  tabs: TabItem[];
  
  /**
   * Initial active tab id
   * If not provided, first tab will be active
   */
  defaultTabId?: string;
  
  /**
   * Callback when tab changes
   */
  onChange?: (tabId: string) => void;
  
  /**
   * Visual style of the tabs
   * @default 'underline'
   */
  variant?: 'underline' | 'pills' | 'bordered';
  
  /**
   * Orientation of the tabs
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical';
  
  /**
   * Custom CSS classes
   */
  className?: string;
}

/**
 * Tabs component
 * Provides tabbed interface with multiple display variants
 */
export default function Tabs({
  tabs,
  defaultTabId,
  onChange,
  variant = 'underline',
  orientation = 'horizontal',
  className = '',
}: TabsProps) {
  // Set initial active tab (use defaultTabId or first non-disabled tab)
  const [activeTabId, setActiveTabId] = useState<string>(() => {
    if (defaultTabId && tabs.some(tab => tab.id === defaultTabId && !tab.disabled)) {
      return defaultTabId;
    }
    
    // Find first non-disabled tab
    const firstEnabledTab = tabs.find(tab => !tab.disabled);
    return firstEnabledTab ? firstEnabledTab.id : tabs[0]?.id || '';
  });

  // Handle tab change
  const handleTabChange = useCallback((tabId: string) => {
    setActiveTabId(tabId);
    if (onChange) onChange(tabId);
  }, [onChange]);

  // Update active tab if defaultTabId changes
  useEffect(() => {
    if (defaultTabId && tabs.some(tab => tab.id === defaultTabId && !tab.disabled)) {
      setActiveTabId(defaultTabId);
    }
  }, [defaultTabId, tabs]);

  // Find the active tab
  const activeTab = tabs.find(tab => tab.id === activeTabId);

  // Variant-specific classes
  const variantClasses = {
    underline: {
      tabList: 'border-b border-gray-200 dark:border-gray-700',
      tab: (isActive: boolean, isDisabled: boolean) => `
        inline-block px-4 py-2 text-sm font-medium 
        ${isActive 
          ? 'text-primary-600 border-b-2 border-primary-600 dark:text-primary-400 dark:border-primary-400' 
          : 'text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'}
        ${isDisabled 
          ? 'opacity-50 cursor-not-allowed' 
          : 'cursor-pointer'}
      `,
      indicator: '',
    },
    pills: {
      tabList: 'flex space-x-2',
      tab: (isActive: boolean, isDisabled: boolean) => `
        px-4 py-2 text-sm font-medium rounded-lg
        ${isActive 
          ? 'bg-primary-600 text-white dark:bg-primary-500' 
          : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300'}
        ${isDisabled 
          ? 'opacity-50 cursor-not-allowed' 
          : 'cursor-pointer'}
      `,
      indicator: '',
    },
    bordered: {
      tabList: 'flex border border-gray-200 rounded-lg overflow-hidden dark:border-gray-700',
      tab: (isActive: boolean, isDisabled: boolean) => `
        px-4 py-2 text-sm font-medium
        ${isActive 
          ? 'bg-primary-600 text-white dark:bg-primary-500' 
          : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300'}
        ${isDisabled 
          ? 'opacity-50 cursor-not-allowed' 
          : 'cursor-pointer'}
      `,
      indicator: '',
    },
  };

  // Orientation-specific classes
  const orientationClasses = {
    horizontal: 'flex-row',
    vertical: 'flex-col',
  };

  return (
    <div className={`w-full ${className}`}>
      <div className={`flex ${orientation === 'vertical' ? 'flex-row' : 'flex-col'}`}>
        {/* Tab List */}
        <div 
          className={`${orientation === 'vertical' ? 'mr-4 w-1/4' : 'mb-4'}`}
          role="tablist"
          aria-orientation={orientation}
        >
          <div className={`${variantClasses[variant].tabList} ${orientationClasses[orientation]}`}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTabId === tab.id}
                aria-controls={`tabpanel-${tab.id}`}
                id={`tab-${tab.id}`}
                disabled={tab.disabled}
                className={variantClasses[variant].tab(activeTabId === tab.id, !!tab.disabled)}
                onClick={() => !tab.disabled && handleTabChange(tab.id)}
              >
                <div className="flex items-center">
                  {tab.icon && <span className="mr-2">{tab.icon}</span>}
                  {tab.label}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div 
          className={`${orientation === 'vertical' ? 'w-3/4' : 'w-full'} flex-1 rounded-lg`}
        >
          {activeTab && (
            <motion.div
              key={activeTabId}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              role="tabpanel"
              id={`tabpanel-${activeTabId}`}
              aria-labelledby={`tab-${activeTabId}`}
              tabIndex={0}
            >
              {activeTab.content}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { useTheme as useNextTheme } from 'next-themes';

interface UseThemeReturn {

  theme: string | undefined;
  
  isDarkMode: boolean;
  

  toggleTheme: () => void;
 
  setTheme: (theme: string) => void;
  
  mounted: boolean;
}

export function useTheme(): UseThemeReturn {
  const { theme, setTheme, systemTheme } = useNextTheme();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  

  const isDarkMode = mounted && (theme === 'dark' || (theme === 'system' && systemTheme === 'dark'));
  

  const toggleTheme = () => {
    if (theme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };
  
  return {
    theme,
    isDarkMode,
    toggleTheme,
    setTheme,
    mounted,
  };
}

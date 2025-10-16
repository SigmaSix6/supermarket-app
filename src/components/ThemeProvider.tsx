'use client';

import { useEffect } from 'react';
import { useThemeStore } from '../store/themeStore';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useThemeStore();

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    root.setAttribute('data-theme', theme);
    console.log('Theme changed to:', theme); // Debug log
    console.log('HTML classes:', root.className); // Debug log
  }, [theme]);

  // Initialize theme on mount
  useEffect(() => {
    const root = window.document.documentElement;
    if (!root.classList.contains('light') && !root.classList.contains('dark')) {
      root.classList.add(theme);
      root.setAttribute('data-theme', theme);
      console.log('Initial theme set to:', theme);
    }
  }, []);

  return <>{children}</>;
}

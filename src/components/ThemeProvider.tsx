'use client';

import { useEffect } from 'react';
import { useThemeStore } from '../store/themeStore';

export default function ThemeProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const { theme } = useThemeStore();

  useEffect(() => {
    const root = globalThis.document.documentElement;
    // Remove all theme classes
    root.classList.remove('light', 'dark');
    // Add the current theme class
    root.classList.add(theme);
    console.log('Theme applied:', theme, 'HTML classes:', root.className);
  }, [theme]);

  return <>{children}</>;
}

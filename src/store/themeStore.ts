import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Theme = 'light' | 'dark';

interface ThemeState {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'light',
      toggleTheme: () => {
        const currentTheme = get().theme;
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        set({ theme: newTheme });
      },
      setTheme: (theme: Theme) => {
        set({ theme });
      },
    }),
    {
      name: 'supermarket-theme',
      storage: {
        getItem: (name) => {
          if (globalThis.window === undefined) return null;
          const str = localStorage.getItem(name);
          if (!str) return null;
          try {
            return JSON.parse(str);
          } catch {
            return null;
          }
        },
        setItem: (name, value) => {
          if (globalThis.window === undefined) return;
          localStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => {
          if (globalThis.window === undefined) return;
          localStorage.removeItem(name);
        },
      },
    }
  )
);

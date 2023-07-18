'use client';
import { ReactNode, createContext, useEffect, useState } from 'react';

type ThemeContextType = {
  theme: ThemeType | null;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: null,
  toggleTheme: () => {},
});

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeType | null>(null);

  const getInitialTheme = () => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      return 'dark';
    } else {
      return 'light';
    }
  };

  useEffect(() => {
    setTheme(getInitialTheme());
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', `${theme}`);
    theme === 'dark'
      ? document.documentElement.classList.add('dark')
      : document.documentElement.classList.remove('dark');
  }, [theme]);

  const toggleTheme = () => {
    if (theme === 'light') {
      localStorage.setItem('theme', 'dark');
      document.documentElement.classList.add('dark');
      setTheme('dark');
    } else {
      localStorage.setItem('theme', 'light');
      document.documentElement.classList.remove('dark');
      setTheme('light');
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

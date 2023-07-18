'use client';
import { ReactNode, createContext, useEffect, useState } from 'react';

export const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
});

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeType>(() => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      return 'dark';
    } else {
      return 'light';
    }
  });

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

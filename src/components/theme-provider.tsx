"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

// Create a hook to use the theme
export function useTheme() {
  const { theme, setTheme } = React.useContext(
    React.createContext<{ theme: string | undefined; setTheme: (theme: string) => void }>({
      theme: undefined,
      setTheme: () => null,
    })
  );
  
  return {
    theme,
    setTheme,
    toggleTheme: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
    isDarkMode: theme === 'dark',
  };
}
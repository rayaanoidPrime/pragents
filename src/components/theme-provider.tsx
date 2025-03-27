"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

// Create a simple context with a default value that won't cause type errors
const ThemeContext = createContext({
  theme: "",
  setTheme: (_theme: string) => {},
  toggleTheme: () => {},
  isDarkMode: false
});

export const ThemeContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  useEffect(() => {
    // Check for dark mode on load
    const isDark = document.documentElement.classList.contains("dark");
    setIsDarkMode(isDark);
    setTheme(isDark ? "dark" : "light");
    
    // Set up a mutation observer to watch for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.attributeName === "class" &&
          mutation.target === document.documentElement
        ) {
          const isDarkNow = document.documentElement.classList.contains("dark");
          setIsDarkMode(isDarkNow);
          setTheme(isDarkNow ? "dark" : "light");
        }
      });
    });
    
    observer.observe(document.documentElement, { attributes: true });
    
    return () => observer.disconnect();
  }, []);
  
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    setIsDarkMode(newTheme === "dark");
    if (typeof document !== "undefined") {
      const html = document.documentElement;
      if (newTheme === "dark") {
        html.classList.add("dark");
      } else {
        html.classList.remove("dark");
      }
    }
  };
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, isDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Simple hook without any potential type errors
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeContextProvider");
  }
  return context;
}
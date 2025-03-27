"use client";

import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  
  // Update UI when theme changes
  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode);
    
    // Optional: Listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      const systemIsDark = mediaQuery.matches;
      document.documentElement.classList.toggle("dark", systemIsDark);
      setIsDark(systemIsDark);
    };
    
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);
  
  // Toggle theme function
  const toggleTheme = () => {
    const html = document.documentElement;
    const newIsDark = !isDark;
    
    html.classList.toggle("dark", newIsDark);
    setIsDark(newIsDark);
    
    // Optional: Store preference in localStorage
    localStorage.setItem("theme", newIsDark ? "dark" : "light");
  };
  
  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={toggleTheme} 
      className="h-8 w-8 text-foreground"
    >
      {isDark ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
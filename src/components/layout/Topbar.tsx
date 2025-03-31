"use client";

import { useState } from 'react';
import { Bell, Menu, Moon, Search, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ConnectionSelector } from '@/components/ConnectionSelector';  // Import the new component
import { Toggle } from '@/components/ui/toggle';
import { useToast } from '@/hooks/use-toast';
import { useMobile } from '@/hooks/use-mobile';

type BackendType = 'demo' | 'openai' | 'ollama' | 'claude' | 'azure';

export function Topbar() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const { toast } = useToast();
  const { isMobile, toggleMobileSidebar } = useMobile();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
    // Implement actual theme toggle logic here
  };

  const handleBackendChange = (backend: BackendType) => {
    toast({
      title: "Backend Changed",
      description: `Switched to ${backend} backend`,
    });
    // Implement actual backend change logic here
  };

  const handleResetConversation = () => {
    toast({
      title: "Conversation Reset",
      description: "All messages have been cleared",
    });
    // Implement actual reset logic here
  };

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
      {isMobile && (
        <Button variant="ghost" size="icon" onClick={toggleMobileSidebar}>
          <Menu className="h-5 w-5" />
        </Button>
      )}
      
      <div className="flex-1">
        <h1 className="text-lg font-semibold">Data Engineering Agents</h1>
      </div>
      
      <div className="flex items-center gap-3">
        {/* Search box can go here */}
        <Button variant="ghost" size="icon">
          <Search className="h-5 w-5" />
        </Button>
        
        {/* New Connection Selector */}
        <ConnectionSelector/>
        
        {/* Theme toggle */}
        <Toggle 
          variant="outline" 
          aria-label="Toggle theme" 
          className="h-8 w-8 p-0" 
          pressed={theme === 'dark'}
          onPressedChange={toggleTheme}
        >
          {theme === 'light' ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </Toggle>
        
        {/* Notifications */}
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}
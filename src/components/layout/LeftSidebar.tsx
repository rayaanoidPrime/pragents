"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/components/theme-provider";
import {
  MessageSquare,
  Play,
  History,
  Settings,
  Brain,
  Moon,
  Sun,
  User,
} from "lucide-react";
import { useStore } from "@/store";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function LeftSidebar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const isLeftSidebarOpen = useStore((state) => state.isLeftSidebarOpen);

  // Navigation items for the main app
  const navItems = [
    {
      label: "Conversation",
      href: "/conversation",
      icon: MessageSquare,
    },
    {
      label: "Direct Execution",
      href: "/execution",
      icon: Play,
    },
    {
      label: "History",
      href: "/history",
      icon: History,
    },
    {
      label: "Settings",
      href: "/settings",
      icon: Settings,
    },
  ];

  return (
    <div className={cn(
      "flex h-full flex-col border-r bg-background",
      isLeftSidebarOpen ? "w-72" : "w-16"
    )}>
      {/* Header / Logo / Theme Toggle */}
      <div className="border-b p-4 flex items-center justify-between">
        {isLeftSidebarOpen ? (
          <Link href="/" className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              DataAgents
            </span>
          </Link>
        ) : (
          <Link href="/" className="w-full flex justify-center">
            <TooltipProvider>
              <Tooltip delayDuration={300}>
                <TooltipTrigger asChild>
                  <Brain className="h-6 w-6 text-primary" />
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>DataAgents</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Link>
        )}
        
        {isLeftSidebarOpen && (
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        )}
      </div>

      {/* Navigation Items */}
      <div className="py-2 flex-1">
        {navItems.map((item) => {
          const active = pathname === item.href;
          
          // Icon-only version with tooltip
          if (!isLeftSidebarOpen) {
            return (
              <TooltipProvider key={item.href}>
                <Tooltip delayDuration={300}>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex justify-center items-center h-10 w-full my-1",
                        active
                          ? "text-primary bg-primary/10"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>{item.label}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            );
          }
          
          // Full sidebar version with text labels
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-2 text-sm font-medium mx-2 rounded-md",
                "hover:bg-accent hover:text-accent-foreground",
                active
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Footer / User info */}
      <div className="border-t p-4 flex items-center justify-between">
        {isLeftSidebarOpen ? (
          <>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-muted rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-muted-foreground" />
              </div>
              <span className="text-sm text-muted-foreground">User</span>
            </div>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Settings className="h-4 w-4" />
            </Button>
          </>
        ) : (
          <div className="w-full flex justify-center">
            <TooltipProvider>
              <Tooltip delayDuration={300}>
                <TooltipTrigger asChild>
                  <div className="h-8 w-8 bg-muted rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-muted-foreground" />
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>User Settings</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}
        
        {/* Theme toggle in collapsed mode */}
        {!isLeftSidebarOpen && (
          <div className="absolute bottom-16 w-full flex justify-center">
            <TooltipProvider>
              <Tooltip delayDuration={300}>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={toggleTheme} className="h-8 w-8">
                    {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Toggle Theme</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}
      </div>
    </div>
  );
}
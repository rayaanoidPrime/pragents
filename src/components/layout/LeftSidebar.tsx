"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MessageSquare,
  Play,
  History,
  Settings,
  Brain,
  User,
  Lock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function LeftSidebar() {
  const pathname = usePathname();

  // Navigation items for the main app with coming soon flags
  const navItems = [
    {
      label: "Conversation",
      href: "/conversation",
      icon: MessageSquare,
      comingSoon: false,
      comingSoonNext: false,
    },
    {
      label: "Direct Execution",
      href: "/execution",
      icon: Play,
      comingSoon: true,
      comingSoonNext: false,
    },
    {
      label: "History",
      href: "/history",
      icon: History,
      comingSoon: false,
      comingSoonNext: true,
    },
    {
      label: "Settings",
      href: "/settings",
      icon: Settings,
      comingSoon: true,
      comingSoonNext: false,
    },
  ];

  return (
    <div className="flex h-full flex-col border-r bg-background w-16">
      {/* Header / Logo */}
      <div className="border-b p-4 flex items-center justify-center">
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
      </div>

      {/* Navigation Items */}
      <div className="py-2 flex-1">
        {navItems.map((item) => {
          const active = pathname === item.href;
          
          // For coming soon items, we want to disable the link
          if (item.comingSoon) {
            return (
              <TooltipProvider key={item.href}>
                <Tooltip delayDuration={300}>
                  <TooltipTrigger asChild>
                    <div
                      className={cn(
                        "flex justify-center items-center h-10 w-full my-1 relative cursor-not-allowed",
                        "text-muted-foreground opacity-60"
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="flex flex-col gap-1">
                    <p>{item.label}</p>
                    <div className="flex items-center text-xs gap-1">
                      <Lock className="h-3 w-3 text-amber-500" />
                      <span className="text-amber-500 font-medium">Coming Soon</span>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            );
          }

          // For coming soon items, we want to disable the link
          if (item.comingSoonNext) {
            return (
              <TooltipProvider key={item.href}>
                <Tooltip delayDuration={300}>
                  <TooltipTrigger asChild>
                    <div
                      className={cn(
                        "flex justify-center items-center h-10 w-full my-1 relative cursor-not-allowed",
                        "text-muted-foreground opacity-60"
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="flex flex-col gap-1">
                    <p>{item.label}</p>
                    <div className="flex items-center text-xs gap-1">
                      <Lock className="h-3 w-3 text-amber-500" />
                      <span className="text-amber-500 font-medium">Coming Soon(v0.0.2)</span>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            );
          }
          
          
          // Regular navigation items
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
        })}
      </div>

      {/* Footer / User info */}
      <div className="border-t p-4 flex flex-col items-center gap-4">
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
        
        <TooltipProvider>
          <Tooltip delayDuration={300}>
            <TooltipTrigger asChild>
              <ThemeToggle />
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Toggle Theme</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
"use client";

import { cn } from "@/lib/utils";
import { useStore } from "@/store";
import { LeftSidebar } from "./LeftSidebar";
import { RightSidebar } from "./RightSidebar";
import { ChatControlBar } from "./ChatControlBar";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  // Zustand store controls for sidebar visibility
  const isLeftSidebarOpen = useStore((state) => state.isLeftSidebarOpen);
  const toggleLeftSidebar = useStore((state) => state.toggleLeftSidebar);
  
  const isRightSidebarOpen = useStore((state) => state.isRightSidebarOpen);
  const toggleRightSidebar = useStore((state) => state.toggleRightSidebar);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left Sidebar - Fixed position */}
      <div 
        className={cn(
          "fixed left-0 top-0 h-full z-30 transition-all duration-300 ease-in-out",
          isLeftSidebarOpen ? "w-64" : "w-16"
        )}
      >
        <LeftSidebar />
      </div>

      {/* Main Content Area - Adjusts based on sidebar states with proper margins */}
      <div
        className={cn(
          "flex-1 overflow-hidden flex flex-col transition-all duration-300 ease-in-out",
          isLeftSidebarOpen ? "ml-64" : "ml-16",
          isRightSidebarOpen ? "mr-64" : "mr-0"
        )}
        style={{ width: "calc(100% - " + (isLeftSidebarOpen ? "64px" : "16px") + (isRightSidebarOpen ? " - 64px" : " - 0px") + ")" }}
      >
        {/* Toggle button for left sidebar */}
        <div className="fixed left-0 top-1/2 -translate-y-1/2 z-40 transition-all duration-300 ease-in-out"
          style={{ left: isLeftSidebarOpen ? '260px' : '60px' }}
        >
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full bg-background shadow"
            onClick={toggleLeftSidebar}
          >
            {isLeftSidebarOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </Button>
        </div>
        
        {/* Chat control bar (similar to LobeChat) */}
        <ChatControlBar />
        
        {/* Main Content */}
        <div className="flex-1 overflow-auto px-10">
          {children}
        </div>
        
        {/* Toggle button for right sidebar */}
        <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 transition-all duration-300 ease-in-out"
          style={{ right: isRightSidebarOpen ? '260px' : '10px' }}
        >
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full bg-background shadow"
            onClick={toggleRightSidebar}
          >
            {isRightSidebarOpen ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Right Sidebar - Fixed position */}
      <div
        className={cn(
          "fixed right-0 top-0 h-full z-30 transition-all duration-300 ease-in-out border-l",
          isRightSidebarOpen ? "w-64" : "w-16"
        )}
      >
        <RightSidebar />
      </div>
    </div>
  );
}
"use client";

import { cn } from "@/lib/utils";
import { useStore } from "@/store";
import { LeftSidebar } from "./LeftSidebar";
import { RightSidebar } from "./RightSidebar";
import { ChatControlBar } from "./ChatControlBar";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { StoreState } from "@/types";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  // Zustand store controls for sidebar visibility
  // You can keep right sidebar controls as-is
  const isRightSidebarOpen = useStore((state: StoreState) => state.isRightSidebarOpen);
  const toggleRightSidebar = useStore((state: StoreState) => state.toggleRightSidebar);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left Sidebar - Always closed */}
      <div 
        className="fixed left-0 top-0 h-full z-30 transition-all duration-300 ease-in-out w-6"
      >
        <LeftSidebar />
      </div>

      {/* Main Content Area - Left margin fixed as left sidebar is closed */}
      <div
        className={cn(
          "flex-1 overflow-hidden flex flex-col transition-all duration-300 ease-in-out",
          "ml-6", // always closed left sidebar margin
          isRightSidebarOpen ? "mr-64" : "mr-0"
        )}
        style={{ 
          width: "calc(100% - 16px" + (isRightSidebarOpen ? " - 64px" : " - 0px") + ")" 
        }}
      >

        {/* Chat control bar */}
        <ChatControlBar />

        {/* Main Content */}
        <div className="flex-1 overflow-auto px-10">
          {children}
        </div>

        {/* Toggle button for right sidebar */}
        <div 
          className="fixed right-0 top-1/2 -translate-y-1/2 z-40 transition-all duration-300 ease-in-out"
          style={{ right: isRightSidebarOpen ? '260px' : '10px' }}
        >
          {/* <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full bg-background shadow"
            onClick={toggleRightSidebar}
          >
            {isRightSidebarOpen ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button> */}
        </div>
      </div>

      {/* Right Sidebar - Fixed position */}
      {/* <div
        className={cn(
          "fixed right-0 top-0 h-full z-30 transition-all duration-300 ease-in-out border-l",
          isRightSidebarOpen ? "w-64" : "w-16"
        )}
      >
        <RightSidebar />
      </div> */}
    </div>
  );
}

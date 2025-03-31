"use client";

import { usePathname } from "next/navigation";
import { useStore } from "@/store";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { 
  History, 
  MessageCircle, 
  Wand2, 
  BookOpen, 
  Files, 
  ListFilter, 
  SlidersHorizontal, 
  FileCode,
  Sparkles,
  Clock,
  BookOpenText
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ConversationHistory } from "../conversation/ConversationHistory";
import { StoreState } from "@/types";

export function RightSidebar() {
  const pathname = usePathname();
  const isRightSidebarOpen = useStore((state: StoreState) => state.isRightSidebarOpen);
  const [activeTab, setActiveTab] = useState<string>("history");

  const isConversationPage = pathname === "/conversation";
  const isExecutionPage = pathname === "/execution";
  const isHistoryPage = pathname === "/history";
  const isSettingsPage = pathname === "/settings";

  // Define available tabs based on current page
  const navItems = [
    {
      id: "history",
      label: "Chat History",
      icon: History,
      show: isConversationPage
    },
    {
      id: "metadata",
      label: "Chat Metadata",
      icon: MessageCircle,
      show: isConversationPage
    },
    {
      id: "prompt",
      label: "System Prompt",
      icon: Wand2,
      show: isConversationPage
    },
    {
      id: "documents",
      label: "Documents",
      icon: BookOpenText,
      show: isConversationPage
    },
    {
      id: "files",
      label: "Project Files",
      icon: Files,
      show: isExecutionPage
    },
    {
      id: "execution-history",
      label: "Execution History",
      icon: Clock,
      show: isExecutionPage
    },
    {
      id: "filters",
      label: "History Filters",
      icon: ListFilter,
      show: isHistoryPage
    },
    {
      id: "advanced",
      label: "Advanced Settings",
      icon: SlidersHorizontal,
      show: isSettingsPage
    },
    {
      id: "samples",
      label: "Code Samples",
      icon: FileCode,
      show: isExecutionPage
    },
  ];

  // Filter nav items based on current page
  const filteredNavItems = navItems.filter(item => item.show);

  // Set the first applicable tab as active if none is selected
  if (filteredNavItems.length > 0 && !filteredNavItems.some(item => item.id === activeTab)) {
    setTimeout(() => setActiveTab(filteredNavItems[0].id), 0);
  }

  return (
    <div className={cn(
      "flex h-full flex-col bg-background",
      isRightSidebarOpen ? "w-64" : "w-16"
    )}>
      {/* Header / Title */}
      <div className="h-16 border-b flex items-center justify-center">
        {isRightSidebarOpen ? (
          <h2 className="text-lg font-semibold">Context</h2>
        ) : (
          <Sparkles className="h-5 w-5 text-primary" />
        )}
      </div>

      {/* Navigation Items */}
      <div className="py-2">
        {filteredNavItems.map((item) => {
          const active = activeTab === item.id;
          
          // Icon-only version with tooltip
          if (!isRightSidebarOpen) {
            return (
              <TooltipProvider key={item.id}>
                <Tooltip delayDuration={300}>
                  <TooltipTrigger asChild>
                    <Button
                      variant={active ? "secondary" : "ghost"}
                      className="w-full h-10 flex justify-center items-center my-1"
                      onClick={() => setActiveTab(item.id)}
                    >
                      <item.icon className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="left">
                    <p>{item.label}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            );
          }
          
          // Full sidebar version with text labels
          return (
            <Button
              key={item.id}
              variant={active ? "secondary" : "ghost"}
              className="w-full h-10 justify-start px-3 gap-3 my-1"
              onClick={() => setActiveTab(item.id)}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Button>
          );
        })}
      </div>

      {/* Content Area based on active tab */}
      {isRightSidebarOpen && (
        <div className="flex-1 border-t overflow-hidden">
          <ScrollArea className="h-full">
            {/* Dynamic content based on active tab */}
            <div className="p-3">
              {/* Chat History Content */}
              {activeTab === "history" && isConversationPage && (
                <>
                  <ConversationHistory limit={5} />
                </>
              )}
              
              {/* Chat Metadata Content */}
              {activeTab === "metadata" && isConversationPage && (
                <>
                  <h3 className="text-sm font-medium mb-2">Chat Metadata</h3>
                  <div className="space-y-2 text-sm">
                    <div className="bg-muted p-2 rounded-md">
                      <div className="text-xs text-muted-foreground">Created</div>
                      <div>March 19, 2025 at 10:30 AM</div>
                    </div>
                    <div className="bg-muted p-2 rounded-md">
                      <div className="text-xs text-muted-foreground">Messages</div>
                      <div>12 messages</div>
                    </div>
                    <div className="bg-muted p-2 rounded-md">
                      <div className="text-xs text-muted-foreground">Agents</div>
                      <div>3 agents (Data Architect, Pipeline Engineer, Analyst)</div>
                    </div>
                  </div>
                </>
              )}
              
              {/* System Prompt Content */}
              {activeTab === "prompt" && isConversationPage && (
                <>
                  <h3 className="text-sm font-medium mb-2">System Prompt</h3>
                  <div className="bg-muted p-2 rounded-md text-sm">
                    <p>You are DataAgents, a collaborative multi-agent system specialized in data engineering tasks. Your capabilities include:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>Data pipeline design and implementation</li>
                      <li>ETL/ELT process optimization</li>
                      <li>Data quality and governance implementation</li>
                      <li>Analytical and ML workflows</li>
                    </ul>
                  </div>
                  <Button variant="outline" size="sm" className="mt-3 w-full">
                    Edit System Prompt
                  </Button>
                </>
              )}
              
              {/* Documents Content */}
              {activeTab === "documents" && isConversationPage && (
                <>
                  <h3 className="text-sm font-medium mb-2">Documents</h3>
                  <div className="bg-muted p-2 rounded-md text-sm flex items-center justify-center h-32">
                    <div className="text-center">
                      <BookOpen className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground">No documents attached</p>
                      <Button variant="outline" size="sm" className="mt-2">
                        Attach Document
                      </Button>
                    </div>
                  </div>
                </>
              )}
              
              {/* Project Files Content */}
              {activeTab === "files" && isExecutionPage && (
                <>
                  <h3 className="text-sm font-medium mb-2">Project Files</h3>
                  <div className="space-y-2">
                    <div className="relative">
                      <Input 
                        placeholder="Search files..." 
                        className="pl-8"
                      />
                      <History className="h-4 w-4 absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                    </div>
                    
                    {["data_pipeline.py", "transform.py", "etl_functions.py", "requirements.txt"].map((file, index) => (
                      <div key={file} className="p-2 border rounded-md hover:bg-muted cursor-pointer">
                        <div className="flex items-center">
                          <FileCode className="h-4 w-4 text-muted-foreground mr-2" />
                          <span className="text-sm">{file}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Modified {index + 1} day{index !== 0 ? 's' : ''} ago
                        </p>
                      </div>
                    ))}
                  </div>
                </>
              )}
              
              {/* Execution History Content */}
              {activeTab === "execution-history" && isExecutionPage && (
                <>
                  <h3 className="text-sm font-medium mb-2">Execution History</h3>
                  <div className="space-y-2">
                    {[...Array(5)].map((_, index) => (
                      <div key={index} className="p-2 border rounded-md hover:bg-muted cursor-pointer">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 text-muted-foreground mr-2" />
                          <span className="text-sm">Execution #{5-index}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {index === 0 ? "Today" : (index === 1 ? "Yesterday" : `${index} days ago`)}
                        </p>
                        <div className="mt-1 flex items-center">
                          <span className="text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded-full">
                            Success
                          </span>
                          <span className="text-xs text-muted-foreground ml-2">Duration: 45s</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
              
              {/* Add other tab contents here */}
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  );
}
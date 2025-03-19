"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Layers, 
  Sparkles, 
  PlusCircle, 
  Settings, 
  Brain, 
  Trash2, 
  Download, 
  Share 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useStore } from "@/store";
import { useSelectedAgents, useSelectedStrategy } from "@/store";

export function ChatControlBar() {
  const [showAgents, setShowAgents] = useState(true);
  const [showStrategy, setShowStrategy] = useState(false);
  
  const selectedAgentIds = useStore((state) => state.selectedAgentIds);
  const agents = useStore((state) => state.agents);
  const selectedStrategy = useStore((state) => state.selectedStrategy);
  const strategies = useStore((state) => state.strategies);
  
  // Get names of selected agents
  const selectedAgents = agents.filter(agent => selectedAgentIds.includes(agent.id));
  
  // Get current strategy
  const currentStrategy = strategies.find(s => s.id === selectedStrategy);
  
  return (
    <div className="border-b py-2 px-4 flex items-center justify-between">
      <div className="flex items-center">
        <Button variant="ghost" size="sm" className="mr-2 gap-1.5 px-1.5 h-8">
          <Brain className="h-4 w-4 text-primary" />
          <span className="font-semibold text-foreground">DataAgents</span>
        </Button>
      </div>
      
      <div className="flex items-center gap-1">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <PlusCircle className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>New Conversation</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Trash2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Clear Chat</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Download className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Export Chat</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Share className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Share Chat</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Settings className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Chat Settings</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
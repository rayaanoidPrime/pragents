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
import { StoreState } from "@/types";

export function ChatControlBar() {
  const [showAgents, setShowAgents] = useState(true);
  const [showStrategy, setShowStrategy] = useState(false);
  
  const selectedAgentIds = useStore((state: StoreState) => state.selectedAgentIds);
  const agents = useStore((state: StoreState) => state.agents);
  const selectedStrategy = useStore((state: StoreState) => state.selectedStrategy);
  const strategies = useStore((state: StoreState) => state.strategies);
  
  
  return (
    <div className="border-b py-2 px-4 flex items-center justify-between">
      <div className="flex items-center">
        <Button variant="ghost" size="sm" className="mr-2 gap-1.5 px-1.5 h-8">
          <Brain className="h-4 w-4 text-primary" />
          <span className="font-semibold text-foreground">DataAgents</span>
        </Button>
      </div>
    </div>
  );
}
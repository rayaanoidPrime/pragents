"use client";

import { useState } from "react";
import { useStore } from "@/store";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AgentSelectorProps {
  mode: "all" | "selected";
}

export function AgentSelector({ mode = "all" }: AgentSelectorProps) {
  const agents = useStore((state) => state.agents);
  const selectedAgentIds = useStore((state) => state.selectedAgentIds);
  const selectAgent = useStore((state) => state.selectAgent);
  const deselectAgent = useStore((state) => state.deselectAgent);
  
  // Maximum number of agents that can be selected at once
  const MAX_AGENTS = 4;
  
  // Toggle agent selection
  const handleToggleAgent = (agentId: string) => {
    if (selectedAgentIds.includes(agentId)) {
      deselectAgent(agentId);
    } else if (selectedAgentIds.length < MAX_AGENTS) {
      selectAgent(agentId);
    }
  };
  
  // If in "selected" mode, only show selected agents
  const displayAgents = mode === "selected" 
    ? agents.filter(agent => selectedAgentIds.includes(agent.id))
    : agents;

  // For "selected" mode, we just want to show a simple list of selected agents
  if (mode === "selected") {
    if (displayAgents.length === 0) {
      return <p className="text-xs text-muted-foreground">No agents selected</p>;
    }
    
    return (
      <div className="flex flex-wrap gap-2">
        <AnimatePresence>
          {displayAgents.map(agent => (
            <motion.div
              key={agent.id}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="flex items-center bg-background rounded-full px-3 py-1 shadow-sm border"
            >
              <span className="mr-1 text-lg">{agent.avatar || agent.name[0]}</span>
              <span className="text-sm font-medium truncate max-w-[100px]">
                {agent.name}
              </span>
              <button
                onClick={() => deselectAgent(agent.id)}
                className="ml-1 text-destructive hover:text-destructive/80 rounded-full h-5 w-5 flex items-center justify-center"
              >
                <span className="sr-only">Remove {agent.name}</span>
                ×
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    );
  }
  
  // For "all" mode, show the full agent selection UI
  return (
    <div className="space-y-2">
      {displayAgents.map(agent => {
        const isSelected = selectedAgentIds.includes(agent.id);
        const isSelectable = !isSelected && selectedAgentIds.length < MAX_AGENTS;

        return (
          <div
            key={agent.id}
            className={cn(
              "p-3 rounded-lg cursor-pointer transition-all border",
              isSelected
                ? "border-primary bg-primary/5 dark:bg-primary/10"
                : isSelectable
                  ? "border-border hover:border-primary/30 hover:bg-primary/5"
                  : "border-border opacity-60 cursor-not-allowed"
            )}
            onClick={() => (isSelected || isSelectable) && handleToggleAgent(agent.id)}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-xl shadow-sm"
                style={{
                  backgroundColor: `${agent.color}20`, 
                  color: agent.color,
                  borderColor: agent.color,
                  borderWidth: "1px",
                }}
              >
                {agent.avatar || agent.name[0]}
              </div>
              <div className="flex-1">
                <h4 className="font-medium">
                  {agent.name}
                </h4>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                  {agent.description || `Specialized in ${agent.id.replace(/-/g, ' ')}`}
                </p>
                {isSelected && (
                  <Badge variant="outline" className="mt-1 px-2 py-0 h-5 text-xs bg-primary/5 text-primary border-primary/20">
                    Selected
                  </Badge>
                )}
              </div>
            </div>
          </div>
        );
      })}
      
      <Button 
        variant="ghost" 
        className="w-full mt-4 text-primary border border-dashed border-primary/30 hover:bg-primary/5"
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        Add custom agent
      </Button>
    </div>
  );
}
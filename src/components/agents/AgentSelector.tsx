"use client";

import { useStore } from "@/store";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ModernTooltip } from "@/components/modern-tooltip";
import { motion } from "framer-motion";

interface AgentSelectorProps {
  mode: "all" | "selected";
  searchQuery?: string;
  categoryFilter?: string;
}

export function AgentSelector({ mode, searchQuery = "", categoryFilter = "all" }: AgentSelectorProps) {
  const agents = useStore((state) => state.agents);
  const selectedAgentIds = useStore((state) => state.selectedAgentIds);
  const selectAgent = useStore((state) => state.selectAgent);
  
  // Try using the dispatch function from your store for deselection
  // This is a common pattern in zustand stores
  const dispatch = useStore((state) => state.dispatch);
  
  // Get current strategy for max agents
  const strategies = useStore((state) => state.strategies);
  const selectedStrategy = useStore((state) => state.selectedStrategy);
  const currentStrategy = strategies.find(s => s.id === selectedStrategy);
  const MAX_AGENTS = currentStrategy?.maxAgents || 4;
  
  // Filtered list based on mode and filters
  const filteredAgents = mode === "selected" 
    ? agents.filter(agent => selectedAgentIds.includes(agent.id))
    : agents.filter(agent => {
        // Apply category filter
        if (categoryFilter !== "all" && 
            agent.category !== categoryFilter && 
            agent.description?.toLowerCase().indexOf(categoryFilter) < 0 && 
            agent.id.indexOf(categoryFilter) < 0) {
          return false;
        }
        
        // Apply search filter
        if (searchQuery.trim() && 
            !agent.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
            !agent.description?.toLowerCase().includes(searchQuery.toLowerCase())) {
          return false;
        }
        
        return true;
      });
  
  // Toggle agent selection
  const toggleAgentSelection = (agentId: string) => {
    if (selectedAgentIds.includes(agentId)) {
      // Directly update the store's state to remove the agent.
      useStore.setState((state) => ({
        selectedAgentIds: state.selectedAgentIds.filter(id => id !== agentId)
      }));
    } else {
      if (selectedAgentIds.length >= MAX_AGENTS) return;
      selectAgent(agentId);
    }
  };
  
  if (mode === "selected" && selectedAgentIds.length === 0) {
    return null;
  }
  
  return (
    <div className={cn(
      mode === "selected" ? "flex flex-wrap gap-2" : "space-y-3"
    )}>
      {mode === "selected" ? (
        // Selected mode shows pill-style tags
        selectedAgentIds.map(agentId => {
          const agent = agents.find(a => a.id === agentId);
          if (!agent) return null;
          return (
            <motion.div
              key={agentId}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="flex items-center bg-background text-primary rounded-full px-3 py-1 shadow-sm border border-primary/20"
            >
              <span 
                className="mr-1 text-lg flex items-center justify-center w-6 h-6 rounded-full"
                style={{ color: agent.color }}
              >
                {agent?.avatar || agent.name[0]}
              </span>
              <span className="text-sm font-medium truncate max-w-[100px]">
                {agent.name}
              </span>
              <button
                onClick={() => toggleAgentSelection(agentId)}
                className="ml-1 text-destructive hover:text-destructive/80 rounded-full h-5 w-5 flex items-center justify-center"
                aria-label={`Remove ${agent.name}`}
              >
                <span className="sr-only">Remove {agent.name}</span>
                ×
              </button>
            </motion.div>
          );
        })
      ) : (
        // All mode shows cards
        filteredAgents.map(agent => {
          const isSelected = selectedAgentIds.includes(agent.id);
          const isSelectable = !isSelected && selectedAgentIds.length < MAX_AGENTS;

          return (
            <ModernTooltip
              key={agent.id}
              content={
                <div className="max-w-[280px]">
                  <p className="font-medium mb-1">{agent.name}</p>
                  <p className="text-sm mb-2">{agent.description}</p>
                </div>
              }
            >
              <div
                className={cn(
                  "p-4 rounded-lg cursor-pointer transition-colors border",
                  isSelected
                    ? "border-primary bg-primary/5 dark:bg-primary/10 dark:border-primary/60"
                    : isSelectable
                      ? "border-border hover:border-primary/30 hover:bg-primary/5"
                      : "border-border opacity-60 cursor-not-allowed"
                )}
                onClick={() => (isSelected || isSelectable) && toggleAgentSelection(agent.id)}
              >
                <div className="flex gap-3 items-start">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center shadow-sm"
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
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">
                        {agent.name}
                      </h4>
                      {isSelected && (
                        <Badge variant="outline" className="px-2 py-0 h-5 text-xs">
                          Selected
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {agent.description || "Data engineering agent"}
                    </p>
                  </div>
                </div>
              </div>
            </ModernTooltip>
          );
        })
      )}
    </div>
  );
}
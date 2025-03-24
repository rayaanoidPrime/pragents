"use client";

import { ChatInterface } from "@/components/chat/ChatInterface";
import { AgentStrategyPanel } from "@/components/conversation/AgentStrategyPanel";
import { N8nProvider } from "@/components/N8nProvider";
import { useStore } from "@/store";

export default function ConversationPage() {
  const selectedAgentIds = useStore((state) => state.selectedAgentIds);
  const agents = useStore((state) => state.agents);
  const selectedStrategy = useStore((state) => state.selectedStrategy);
  const strategies = useStore((state) => state.strategies);
  
  // Find selected agents data
  const selectedAgents = agents.filter(agent => 
    selectedAgentIds.includes(agent.id)
  );
  
  // Find selected strategy data
  const currentStrategy = strategies.find(s => s.id === selectedStrategy) || strategies[0];

  return (
    <N8nProvider>
      <div className="flex h-full">
        {/* Left panel for agent/strategy selection (20% width) */}
        <div className="w-1/5 border-r overflow-auto">
          <AgentStrategyPanel />
        </div>
        
        {/* Right area for chat interface (80% width) */}
        <div className="w-4/5 p-4">
          <ChatInterface 
            selectedAgents={selectedAgents} 
            currentStrategy={currentStrategy}
          />
        </div>
      </div>
    </N8nProvider>
  );
}
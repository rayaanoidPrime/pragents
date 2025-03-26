"use client";

import { ChatInterface } from "@/components/chat/ChatInterface";
import { AgentStrategyPanel } from "@/components/conversation/AgentStrategyPanel";
import { useStore } from "@/store";

export default function ConversationPage() {
  return (
    <div>
      <div className="flex h-full">
        {/* Left panel for agent/strategy selection (20% width) */}
        <div className="w-1/5 border-r overflow-auto">
          <AgentStrategyPanel />
        </div>
        
        {/* Right area for chat interface (80% width) */}
        <div className="w-4/5 p-4">
          <ChatInterface />
        </div>
      </div>
    </div>
  );
}
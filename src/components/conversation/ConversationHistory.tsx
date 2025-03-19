"use client";

import { useState, useEffect } from "react";
import { useStore } from "@/store";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Clock, Users, ArrowRight } from "lucide-react";

interface ConversationHistoryProps {
  limit?: number;
}

export function ConversationHistory({ limit = 10 }: ConversationHistoryProps) {
  // For demonstration purposes, we'll create mock conversation history
  const mockHistory = Array.from({ length: limit }).map((_, i) => ({
    id: `conv-${i}`,
    title: `Conversation ${i+1}`,
    preview: `This is a preview of conversation ${i+1}...`,
    date: new Date(Date.now() - i * 86400000), // each one day apart
    agentCount: Math.floor(Math.random() * 3) + 1,
    strategy: ["Data Pipeline", "Analytics", "ML Pipeline"][i % 3],
  }));
  
  // Use useState and useEffect to handle client-side rendering
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  if (mockHistory.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <MessageSquare className="h-12 w-12 text-muted-foreground mb-2 opacity-50" />
        <h3 className="text-lg font-medium mb-1">No conversation history</h3>
        <p className="text-sm text-muted-foreground">
          Your conversation history will appear here
        </p>
      </div>
    );
  }
  
  return (
    <div className="space-y-3">
      {isClient && mockHistory.map((conversation) => (
        <div 
          key={conversation.id} 
          className="p-3 border rounded-lg cursor-pointer hover:bg-accent transition-colors"
        >
          <div className="flex justify-between items-start">
            <h3 className="font-medium truncate">{conversation.title}</h3>
            <Badge variant="outline" className="ml-2 whitespace-nowrap text-xs">
              {conversation.date.toLocaleDateString()}
            </Badge>
          </div>
          
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {conversation.preview}
          </p>
          
          <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-3">
              <span className="flex items-center">
                <Users className="h-3 w-3 mr-1" />
                {isClient ? conversation.agentCount : '?'} agent{conversation.agentCount !== 1 ? 's' : ''}
              </span>
              <span className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {isClient ? Math.floor(Math.random() * 10) + 1 : '?'} min
              </span>
            </div>
            <Badge variant="secondary" className="text-xs font-normal">
              {conversation.strategy}
            </Badge>
          </div>
        </div>
      ))}
    </div>
  );
}
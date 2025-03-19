"use client";

import { CheckCircle, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Agent {
  id: string;
  name: string;
  description: string;
  avatar: string;
  role: string;
}

interface AgentCardProps {
  agent: Agent;
  isSelected: boolean;
  onSelect: () => void;
}

export function AgentCard({ agent, isSelected, onSelect }: AgentCardProps) {
  return (
    <div 
      onClick={onSelect}
      className={cn(
        "flex flex-col border rounded-lg p-4 cursor-pointer transition-all",
        isSelected 
          ? "border-primary bg-accent/50 ring-2 ring-primary/20" 
          : "border-border hover:border-primary/50 hover:bg-accent/30"
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={agent.avatar} alt={agent.name} />
            <AvatarFallback>
              <User className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">{agent.name}</h3>
            <p className="text-sm text-muted-foreground">{agent.description}</p>
          </div>
        </div>
        {isSelected && (
          <CheckCircle className="h-5 w-5 text-green-500" />
        )}
      </div>
    </div>
  );
}
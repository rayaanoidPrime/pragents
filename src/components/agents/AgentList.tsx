"use client";

import { useState } from "react";
import { AgentCard } from "./AgentCard";

// Mock agent data
const agents = [
  {
    id: "data-architect",
    name: "Data Architect",
    description: "Designs data infrastructure and systems",
    avatar: "/images/avatars/data-architect.png",
    role: "architect"
  },
  {
    id: "pipeline-engineer",
    name: "Pipeline Engineer",
    description: "Expert in building efficient data pipelines",
    avatar: "/images/avatars/pipeline-engineer.png",
    role: "engineer"
  },
  {
    id: "data-analyst",
    name: "Data Analyst",
    description: "Analyzes and interprets complex data",
    avatar: "/images/avatars/data-analyst.png",
    role: "analyst"
  },
  {
    id: "data-scientist",
    name: "Data Scientist",
    description: "Applies statistical models and machine learning",
    avatar: "/images/avatars/data-scientist.png",
    role: "scientist"
  },
  {
    id: "data-governance",
    name: "Governance Specialist",
    description: "Ensures data quality and compliance",
    avatar: "/images/avatars/data-governance.png",
    role: "governance"
  },
  {
    id: "data-engineer",
    name: "Data Engineer",
    description: "Builds and maintains data infrastructure",
    avatar: "/images/avatars/data-engineer.png",
    role: "engineer"
  }
];

export function AgentList() {
  const [selectedAgents, setSelectedAgents] = useState<string[]>([]);

  const toggleAgent = (agentId: string) => {
    setSelectedAgents(prev => 
      prev.includes(agentId)
        ? prev.filter(id => id !== agentId)
        : [...prev, agentId]
    );
  };

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {agents.map((agent) => (
          <AgentCard
            key={agent.id}
            agent={agent}
            isSelected={selectedAgents.includes(agent.id)}
            onSelect={() => toggleAgent(agent.id)}
          />
        ))}
      </div>
      {selectedAgents.length > 0 && (
        <div className="mt-4 p-3 bg-accent rounded-md">
          <p className="text-sm text-muted-foreground">
            {selectedAgents.length} agent{selectedAgents.length > 1 ? "s" : ""} selected
          </p>
        </div>
      )}
    </div>
  );
}
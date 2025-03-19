"use client";

import { 
  Server, 
  GitBranch, 
  BarChart, 
  Shield, 
  Landmark,
  CheckCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Strategy {
  id: string;
  name: string;
  description: string;
  icon: string;
}

interface StrategyCardProps {
  strategy: Strategy;
  isSelected: boolean;
  onSelect: () => void;
}

export function StrategyCard({ strategy, isSelected, onSelect }: StrategyCardProps) {
  // Icon mapping
  const iconMap: Record<string, React.ReactNode> = {
    "server": <Server className="h-5 w-5" />,
    "git-branch": <GitBranch className="h-5 w-5" />,
    "bar-chart": <BarChart className="h-5 w-5" />,
    "shield": <Shield className="h-5 w-5" />,
    "landmark": <Landmark className="h-5 w-5" />
  };

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
          <div className="p-2 rounded-md bg-accent">
            {iconMap[strategy.icon]}
          </div>
          <div>
            <h3 className="font-medium">{strategy.name}</h3>
            <p className="text-sm text-muted-foreground">{strategy.description}</p>
          </div>
        </div>
        {isSelected && (
          <CheckCircle className="h-5 w-5 text-green-500" />
        )}
      </div>
    </div>
  );
}
"use client";

import { useStore } from "@/store";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Clock, Database, Sparkles } from "lucide-react";

export function StrategySelector() {
  const strategies = useStore((state) => state.strategies);
  const selectedStrategy = useStore((state) => state.selectedStrategy);
  const setSelectedStrategy = useStore((state) => state.setSelectedStrategy);
  
  // Handle strategy selection
  const handleSelectStrategy = (strategyId: string) => {
    setSelectedStrategy(strategyId);
  };
  
  return (
    <div className="space-y-3">
      {strategies.map(strategy => {
        const isSelected = strategy.id === selectedStrategy;
        
        return (
          <div
            key={strategy.id}
            className={cn(
              "p-4 rounded-lg cursor-pointer transition-colors border",
              isSelected
                ? "border-primary bg-primary/5 dark:bg-primary/10"
                : "border-border hover:border-primary/30 hover:bg-primary/5"
            )}
            onClick={() => handleSelectStrategy(strategy.id)}
          >
            <div className="flex gap-3 items-start">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center shadow-sm"
                style={{
                  backgroundColor: `${strategy.color}20`,
                  color: strategy.color,
                  borderColor: strategy.color,
                  borderWidth: "1px"
                }}
              >
                {/* Example icon or fallback */}
                <Database className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">
                    {strategy.name}
                  </h3>
                  {isSelected && (
                    <Badge variant="outline" className="px-2 py-0 h-5 text-xs bg-primary/5 text-primary border-primary/20">
                      Active
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {strategy.description}
                </p>
                
                {/* Strategy metrics */}
                <div className="flex mt-2 gap-4">
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>Max turns: {strategy.maxTurns}</span>
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Sparkles className="h-3 w-3 mr-1" />
                    <span>Final answer: {strategy.turnsBeforeFinalAnswer}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
"use client";

import { useState } from "react";
import { useStore } from "@/store";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";
import { Search, Users, Layers, Plus, BarChart2, Code, Palette, Stethoscope } from "lucide-react";
import { AgentSelector } from "../agents/AgentSelector";
import { StrategySelector } from "../strategies/StrategySelector";

export function AgentStrategyPanel() {
  const [activeTab, setActiveTab] = useState<string>("agents");
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  
  const selectedAgentIds = useStore((state) => state.selectedAgentIds);
  const selectedStrategy = useStore((state) => state.selectedStrategy);
  const strategies = useStore((state) => state.strategies);
  const MAX_AGENTS = 4;
  
  // Get current strategy name
  const currentStrategy = strategies.find(s => s.id === selectedStrategy);
  
  return (
    <div className="flex flex-col h-full">
      <div className="p-3 border-b">
        <Tabs defaultValue="agents" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="agents" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>Agents</span>
              <Badge className="ml-1 h-5 min-w-5 flex items-center justify-center bg-primary/20 text-primary">
                {selectedAgentIds.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="strategy" className="flex items-center gap-2">
              <Layers className="h-4 w-4" />
              <span>Strategy</span>
              {currentStrategy && (
                <Badge variant="outline" className="ml-1 h-5 px-1.5 bg-primary/5 text-primary border-primary/20">
                  1
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="p-3 flex items-center gap-2 border-b">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder={activeTab === "agents" ? "Search agents..." : "Search strategies..."} 
          className="border-none h-8 p-0 focus-visible:ring-0"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className="flex-1 overflow-auto">
        {/* Agent tab content */}
        {activeTab === "agents" && (
          <ScrollArea className="h-full">
            <div className="p-3">
              {/* Agent category filters */}
              <div className="mb-4">
                <ToggleGroup
                  type="single"
                  value={categoryFilter}
                  onValueChange={value => value && setCategoryFilter(value)}
                  className="justify-start flex-wrap gap-1"
                >
                  <ToggleGroupItem
                    value="all"
                    className={cn(
                      "rounded-md text-xs px-2 py-1 h-auto",
                      categoryFilter === "all" && "bg-primary/10 text-primary border-primary/20"
                    )}
                  >
                    All
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="healthcare"
                    className={cn(
                      "rounded-md h-auto",
                      categoryFilter === "healthcare" && "bg-cyan-100 text-cyan-800 border-cyan-500"
                    )}
                    title="Healthcare"
                  >
                    <Stethoscope className="h-3.5 w-3.5" />
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="analyst"
                    className={cn(
                      "rounded-md h-auto",
                      categoryFilter === "analyst" && "bg-orange-100 text-orange-800 border-orange-500"
                    )}
                    title="Data Analyst"
                  >
                    <BarChart2 className="h-3.5 w-3.5" />
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="creative"
                    className={cn(
                      "rounded-md h-auto",
                      categoryFilter === "creative" && "bg-pink-100 text-pink-800 border-pink-500"
                    )}
                    title="Creative"
                  >
                    <Palette className="h-3.5 w-3.5" />
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="technical"
                    className={cn(
                      "rounded-md h-auto",
                      categoryFilter === "technical" && "bg-blue-100 text-blue-800 border-blue-500"
                    )}
                    title="Technical"
                  >
                    <Code className="h-3.5 w-3.5" />
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
              
              {/* Selected Agents */}
              <div className="mb-4 p-3 border-2 border-dashed border-primary/30 rounded-lg bg-primary/5">
                <h3 className="text-sm font-medium text-primary mb-2">
                  Selected Agents ({selectedAgentIds.length}/{MAX_AGENTS})
                </h3>
                {selectedAgentIds.length === 0 ? (
                  <p className="text-xs text-muted-foreground">
                    Select up to {MAX_AGENTS} agents to start a conversation
                  </p>
                ) : (
                  <AgentSelector mode="selected" />
                )}
              </div>
              
              {/* Use the AgentSelector component that already works */}
              <AgentSelector mode="all" searchQuery={searchQuery} categoryFilter={categoryFilter} />
              
              <Button 
                variant="ghost" 
                className="w-full mt-4 text-primary border border-dashed border-primary/30 hover:bg-primary/5"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add custom agent
              </Button>
            </div>
          </ScrollArea>
        )}
        
        {/* Strategy tab content */}
        {activeTab === "strategy" && (
          <ScrollArea className="h-full">
            <div className="p-3">
              {currentStrategy && (
                <div className="mb-4 p-3 border-2 border-dashed border-primary/30 rounded-lg bg-primary/5">
                  <h3 className="text-sm font-medium text-primary mb-2">
                    Selected Strategy
                  </h3>
                  <div className="flex items-center gap-2 p-2 bg-background rounded-md border">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{
                        backgroundColor: `${currentStrategy.color}20`,
                        color: currentStrategy.color,
                      }}
                    >
                      <Layers className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">{currentStrategy.name}</div>
                      <div className="text-xs text-muted-foreground line-clamp-1">
                        {currentStrategy.description}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Use the StrategySelector component */}
              <StrategySelector searchQuery={searchQuery} />
            </div>
          </ScrollArea>
        )}
      </div>
    </div>
  );
}
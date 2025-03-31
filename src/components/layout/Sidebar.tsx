"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/components/theme-provider";
import { 
  MessageSquare, 
  Play, 
  History, 
  Settings,
  Search,
  Users,
  Layers,
  PlusCircle,
  BarChart2,
  Code,
  Brain,
  Database,
  Palette,
  Stethoscope,
  FileText,
  Moon,
  Sun,
  Clock
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { ModernTooltip } from "@/components/modern-tooltip";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { motion } from "framer-motion";
import { useStore, useSelectedStrategy } from "@/store";
import { StoreState, Agent, Strategy } from "@/types";

export function Sidebar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const agents = useStore((state:StoreState) => state.agents);
  const selectedAgentIds = useStore((state:StoreState) => state.selectedAgentIds);
  const selectAgent = useStore((state:StoreState) => state.selectAgent);
  const deselectAgent = useStore((state:StoreState) => state.unselectAgent);
  const setSelectedAgents = useStore((state:StoreState) => state.selectedAgentIds);

  // We also have strategies in the store:
  const strategies = useStore((state:StoreState) => state.strategies);
  const selectedStrategy = useStore((state:StoreState) => state.selectedStrategy);
  const setSelectedStrategy = useStore((state:StoreState) => state.setSelectedStrategy);

  // UI local states
  const [tab, setTab] = useState<"agents" | "strategy">("agents");
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  // Navigation items for the left bar (vertical list)
  const navItems = [
    {
      icon: MessageSquare,
      label: "Conversation",
      href: "/conversation",
      active: pathname === "/conversation",
    },
    {
      icon: Play,
      label: "Direct Execution",
      href: "/execution",
      active: pathname === "/execution",
    },
    {
      icon: History,
      label: "History",
      href: "/history",
      active: pathname === "/history",
    },
    {
      icon: Settings,
      label: "Settings",
      href: "/settings",
      active: pathname === "/settings",
    },
  ];

  // Filtered agents
  const filteredAgents = agents.filter((a:Agent) => {
    if (categoryFilter !== "all" && a.description?.toLowerCase().indexOf(categoryFilter) < 0 && a.id.indexOf(categoryFilter) < 0) {
      // Simple filter example; adjust to your needs
      return false;
    }
    if (searchQuery.trim() && !a.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  // Get strategy details for min/max agent counts if needed
  const strategyObj = strategies.find((s:Strategy) => s.id === selectedStrategy);
  const maxAgents = strategyObj ? (strategyObj as any).maxTurns || 4 : 4; // or some fallback

  // Toggle agent selection
  const toggleAgentSelection = (agentId: string) => {
    if (selectedAgentIds.includes(agentId)) {
      deselectAgent(agentId);
    } else {
      // Example: if we want to limit to 4 agents
      if (selectedAgentIds.length >= 4) return;
      selectAgent(agentId);
    }
  };

  // Switch strategies
  const handleSelectStrategy = (id: string) => {
    setSelectedStrategy(id);
    // Optionally clear or limit selected agents based on new strategy
  };

  return (
    <div className="flex h-screen flex-col border-r border-blue-100 dark:border-gray-800 bg-white dark:bg-gray-950">
      {/* Logo + Theme toggle */}
      <div className="border-b border-blue-100 dark:border-gray-800">
        <div className="flex h-16 items-center px-4 justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 text-transparent bg-clip-text">
              DataAgents!!!
            </span>
          </Link>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={toggleTheme}
            className="rounded-full"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* 4 windows as a vertical list */}
      <div className="flex flex-col px-2 py-2 border-b border-blue-100 dark:border-gray-800 space-y-1">
        {navItems.map((item, index) => (
          <Link 
            key={index} 
            href={item.href}
            className={cn(
              "flex items-center gap-2 px-3 py-2 text-sm rounded-md",
              item.active 
                ? "bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400"
                : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 hover:bg-blue-50 dark:hover:bg-blue-900/30"
            )}
          >
            <item.icon className="h-4 w-4" />
            <span>{item.label}</span>
          </Link>
        ))}
      </div>

      {/* Tabs for Agents/Strategies */}
      <Tabs 
        defaultValue="agents"
        value={tab}
        onValueChange={(value) => setTab(value as "agents" | "strategy")} 
        className="flex-1 flex flex-col"
      >
        <div className="px-4 py-2 border-b border-blue-100 dark:border-gray-800">
          <TabsList className="grid w-full grid-cols-2 bg-blue-100/50 dark:bg-slate-800/50">
            <TabsTrigger value="agents" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>Agents</span>
              <Badge variant="outline" className="ml-1 h-5 min-w-5 flex items-center justify-center bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 border-blue-300 dark:border-blue-700">
                {selectedAgentIds.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="strategy" className="flex items-center gap-2">
              <Layers className="h-4 w-4" />
              <span>Strategy</span>
            </TabsTrigger>
          </TabsList>
        </div>
        
        {/* Search bar */}
        <div className="px-4 py-2 border-b border-blue-100 dark:border-gray-800">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              placeholder={`Search ${tab === "agents" ? "agents" : "strategies"}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 border-blue-200 dark:border-blue-800 focus:ring-blue-500"
            />
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-2">
            {tab === "agents" ? (
              <>
                {/* Agent category filters, etc. (optional) */}
                <div className="mb-4">
                  <ToggleGroup
                    type="single"
                    value={categoryFilter}
                    onValueChange={value => value && setCategoryFilter(value)}
                    className="justify-start flex-wrap gap-1"
                  >
                    {/* Example filter toggles */}
                    <ToggleGroupItem
                      value="all"
                      className={cn(
                        "rounded-md text-xs px-2 py-1 h-auto",
                        categoryFilter === "all" && "bg-blue-100 text-blue-800 border-blue-500"
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
                    >
                      <Stethoscope className="h-3.5 w-3.5" />
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      value="analyst"
                      className={cn(
                        "rounded-md h-auto",
                        categoryFilter === "analyst" && "bg-orange-100 text-orange-800 border-orange-500"
                      )}
                    >
                      <BarChart2 className="h-3.5 w-3.5" />
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      value="creative"
                      className={cn(
                        "rounded-md h-auto",
                        categoryFilter === "creative" && "bg-pink-100 text-pink-800 border-pink-500"
                      )}
                    >
                      <Palette className="h-3.5 w-3.5" />
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      value="technical"
                      className={cn(
                        "rounded-md h-auto",
                        categoryFilter === "technical" && "bg-blue-100 text-blue-800 border-blue-500"
                      )}
                    >
                      <Code className="h-3.5 w-3.5" />
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>

                {/* Selected Agents */}
                <div className="mb-4 border-2 border-dashed border-blue-400 dark:border-blue-700 p-3 rounded-lg bg-blue-50/50 dark:bg-blue-950/30">
                  <h3 className="text-sm font-medium text-blue-800 dark:text-blue-400 mb-2">
                    Selected Agents ({selectedAgentIds.length}/{maxAgents})
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedAgentIds.length === 0 ? (
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Select up to {maxAgents} agents
                      </p>
                    ) : (
                      selectedAgentIds.map((agentId: string) => {
                        const agent = agents.find((a:Agent) => a.id === agentId);
                        if (!agent) return null;
                        return (
                          <motion.div
                            key={agentId}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="flex items-center bg-white dark:bg-gray-800 text-blue-800 dark:text-blue-300 rounded-full px-3 py-1 shadow-sm border border-blue-200 dark:border-blue-800"
                          >
                            <span className="mr-1 text-lg">{agent?.avatar || agent.name[0]}</span>
                            <span className="text-sm font-medium truncate max-w-[100px]">
                              {agent.name}
                            </span>
                            <button
                              onClick={() => deselectAgent(agentId)}
                              className="ml-1 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 rounded-full h-5 w-5 flex items-center justify-center"
                            >
                              <span className="sr-only">Remove {agent.name}</span>
                              ×
                            </button>
                          </motion.div>
                        );
                      })
                    )}
                  </div>
                </div>

                {/* Agent list */}
                <div className="space-y-2">
                  {filteredAgents.map((agent:Agent) => {
                    const isSelected = selectedAgentIds.includes(agent.id);
                    const isSelectable = !isSelected && selectedAgentIds.length < maxAgents;

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
                            "p-3 rounded-lg cursor-pointer transition-all border",
                            isSelected
                              ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30 dark:border-blue-600"
                              : isSelectable
                                ? "border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-800 hover:bg-blue-50/50 dark:hover:bg-blue-900/20"
                                : "border-gray-200 dark:border-gray-700 opacity-60 cursor-not-allowed"
                          )}
                          onClick={() => (isSelected || isSelectable) && toggleAgentSelection(agent.id)}
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
                              <h4 className="font-medium text-gray-900 dark:text-white">
                                {agent.name}
                              </h4>
                              {isSelected && (
                                <Badge variant="outline" className="mt-1 px-2 py-0 h-5 text-xs bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 border-blue-300 dark:border-blue-700">
                                  Selected
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </ModernTooltip>
                    );
                  })}
                </div>

                <Button 
                  variant="ghost" 
                  className="w-full mt-4 text-blue-600 dark:text-blue-400 border border-dashed border-blue-300 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/30"
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add custom agent
                </Button>
              </>
            ) : (
              <>
                {/* Strategy list */}
                <div className="space-y-3">
                  {strategies.map((strategy:Strategy) => {
                    const isSelected = strategy.id === selectedStrategy;
                    return (
                      <ModernTooltip
                        key={strategy.id}
                        content={
                          <div className="max-w-[280px]">
                            <p className="font-medium mb-1">{strategy.name}</p>
                            <p className="text-sm mb-2">{strategy.description}</p>
                          </div>
                        }
                      >
                        <div
                          className={cn(
                            "p-4 rounded-lg cursor-pointer transition-colors border",
                            isSelected
                              ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30 dark:border-blue-700"
                              : "border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-800 hover:bg-blue-50/50 dark:hover:bg-blue-900/20"
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
                                <h3 className="font-medium text-gray-900 dark:text-white">
                                  {strategy.name}
                                </h3>
                                {/* e.g. min-max agent count badge */}
                                <Badge variant="outline" className="px-2 py-0 h-5 text-xs">
                                  Strategy
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                {strategy.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </ModernTooltip>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </ScrollArea>
      </Tabs>

      {/* Footer: user info or settings */}
      <div className="border-t border-blue-100 dark:border-gray-800 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-9 w-9 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">
              U
            </div>
            <div className="text-sm font-medium">User</div>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

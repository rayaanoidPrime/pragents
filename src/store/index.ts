import { create } from 'zustand';

export interface Agent {
  id: string;
  name: string;
  description?: string;
  avatar?: string;
  color: string;
}

export interface Strategy {
  id: string;
  name: string;
  description: string;
  maxTurns: number;
  turnsBeforeFinalAnswer: number;
  color: string;
}

interface StoreState {
  // UI State
  isLeftSidebarOpen: boolean;
  isRightSidebarOpen: boolean;
  toggleLeftSidebar: () => void;
  toggleRightSidebar: () => void;
  
  // Agents
  agents: Agent[];
  selectedAgentIds: string[];
  selectAgent: (id: string) => void;
  deselectAgent: (id: string) => void;
  setSelectedAgents: (ids: string[]) => void;
  
  // Strategies
  strategies: Strategy[];
  selectedStrategy: string;
  setSelectedStrategy: (id: string) => void;
}

// Sample agents for the store
const defaultAgents: Agent[] = [
  {
    id: "data-architect",
    name: "Data Architect",
    description: "Designs data systems and infrastructure for the organization",
    avatar: "👨‍💻",
    color: "#4CAF50"
  },
  {
    id: "pipeline-engineer",
    name: "Pipeline Engineer",
    description: "Builds and maintains data pipelines for efficient data movement",
    avatar: "🔧",
    color: "#2196F3"
  },
  {
    id: "data-analyst",
    name: "Data Analyst",
    description: "Analyzes data to extract insights and create visualizations",
    avatar: "📊",
    color: "#FF9800"
  },
  {
    id: "data-scientist",
    name: "Data Scientist",
    description: "Applies advanced algorithms and ML to solve complex problems",
    avatar: "🧪",
    color: "#9C27B0"
  },
  {
    id: "data-governance",
    name: "Data Governance",
    description: "Ensures data quality, security, and regulatory compliance",
    avatar: "📋",
    color: "#F44336"
  },
  {
    id: "creative-writer",
    name: "Creative Writer",
    description: "Crafts engaging narratives and explanations from data",
    avatar: "✍️",
    color: "#E91E63"
  },
  {
    id: "code-expert",
    name: "Code Expert",
    description: "Specializes in writing efficient, clean code for data processing",
    avatar: "💻",
    color: "#607D8B"
  },
  {
    id: "healthcare-specialist",
    name: "Healthcare Specialist",
    description: "Expert in healthcare data and HIPAA compliance",
    avatar: "🏥",
    color: "#00BCD4"
  }
];

// Sample strategies for the store
const defaultStrategies: Strategy[] = [
  {
    id: "data-pipeline",
    name: "Data Pipeline",
    description: "Create and optimize ETL/ELT data pipelines with proper testing and monitoring",
    maxTurns: 10,
    turnsBeforeFinalAnswer: 8,
    color: "#2196F3"
  },
  {
    id: "data-warehouse",
    name: "Data Warehouse",
    description: "Design and implement data warehouse solutions with dimensional modeling",
    maxTurns: 12,
    turnsBeforeFinalAnswer: 10,
    color: "#4CAF50"
  },
  {
    id: "ml-workflow",
    name: "ML Workflow",
    description: "Build end-to-end machine learning workflows from data to deployment",
    maxTurns: 8,
    turnsBeforeFinalAnswer: 6,
    color: "#9C27B0"
  },
  {
    id: "data-quality",
    name: "Data Quality",
    description: "Analyze and improve data quality with validation and governance",
    maxTurns: 6,
    turnsBeforeFinalAnswer: 5,
    color: "#F44336"
  }
];

export const useStore = create<StoreState>((set) => ({
  // UI State
  isLeftSidebarOpen: true,
  isRightSidebarOpen: true,
  toggleLeftSidebar: () => set((state) => ({ isLeftSidebarOpen: !state.isLeftSidebarOpen })),
  toggleRightSidebar: () => set((state) => ({ isRightSidebarOpen: !state.isRightSidebarOpen })),
  
  // Agents
  agents: defaultAgents,
  selectedAgentIds: [], // Start with no agents selected
  selectAgent: (id) => set((state) => ({ 
    selectedAgentIds: [...state.selectedAgentIds, id] 
  })),
  deselectAgent: (id) => set((state) => ({ 
    selectedAgentIds: state.selectedAgentIds.filter(agentId => agentId !== id) 
  })),
  setSelectedAgents: (ids) => set({ selectedAgentIds: ids }),
  
  // Strategies
  strategies: defaultStrategies,
  selectedStrategy: "data-pipeline", // Default selected strategy
  setSelectedStrategy: (id) => set({ selectedStrategy: id }),
}));

// Selector hooks for easier access to specific parts of the store
export const useSelectedAgents = () => {
  const agents = useStore((state) => state.agents);
  const selectedAgentIds = useStore((state) => state.selectedAgentIds);
  
  return agents.filter(agent => selectedAgentIds.includes(agent.id));
};

export const useSelectedStrategy = () => {
  const strategies = useStore((state) => state.strategies);
  const selectedStrategyId = useStore((state) => state.selectedStrategy);
  
  return strategies.find(strategy => strategy.id === selectedStrategyId);
};
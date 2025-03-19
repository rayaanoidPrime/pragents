/**
 * Global type definitions for the application
 */

// Agent types
export interface Agent {
    id: string;
    name: string;
    description: string;
    avatar: string;
    role: AgentRole;
    systemPrompt?: string;
  }
  
  export type AgentRole = 
    | 'architect' 
    | 'engineer' 
    | 'analyst' 
    | 'scientist' 
    | 'governance';
  
  // Strategy types
  export interface Strategy {
    id: StrategyType;
    name: string;
    description: string;
    icon: string;
    capabilities?: string[];
    recommendedAgents?: string[];
  }
  
  export type StrategyType = 
    | 'infrastructure' 
    | 'pipeline' 
    | 'analysis' 
    | 'quality' 
    | 'governance';
  
  // Chat types
  export interface Message {
    id: string;
    content: string;
    role: 'user' | 'assistant' | 'system';
    agentId?: string;
    agentName?: string; 
    agentAvatar?: string;
    createdAt: Date;
  }
  
  export interface Chat {
    id: string;
    title: string;
    strategyId: string;
    agents: Agent[];
    messages: Message[];
    createdAt: Date;
    updatedAt: Date;
  }
  
  // UI types
  export interface SidebarItem {
    name: string;
    href: string;
    icon: React.ElementType;
    active?: boolean;
  }
  
  export interface Toast {
    id: string;
    title: string;
    description?: string;
    type: 'success' | 'error' | 'warning' | 'info';
  }
  
  // API Response types
  export interface ApiResponse<T> {
    data?: T;
    error?: string;
    status: number;
  }
  
  export interface StreamToken {
    type: 'token';
    content: string;
    agent?: {
      id: string;
      name: string;
    };
  }
  
  // Form input types
  export interface ChatInput {
    content: string;
  }
  
  export interface AgentSelectionInput {
    agentIds: string[];
    strategyId: string;
  }
  
  // Settings types
  export interface UserSettings {
    theme: 'light' | 'dark' | 'system';
    chatBubbleStyle: 'modern' | 'classic';
    streamResponses: boolean;
    maxHistoryItems: number;
  }
  
  export interface ApiSettings {
    apiUrl: string;
    apiKey: string;
    backendType: 'n8n' | 'custom';
  }
  
  export interface DatabaseSettings {
    connectionStatus: 'connected' | 'disconnected' | 'error';
    lastBackup?: Date;
  }
  
  // Store state types
  export interface AppState {
    strategies: Strategy[];
    agents: Agent[];
    selectedStrategyId: string | null;
    selectedAgentIds: string[];
    currentChat: Chat | null;
    chats: Chat[];
    settings: UserSettings;
    apiSettings: ApiSettings;
  }
  
  // Environment variables
  export interface EnvVariables {
    NEXT_PUBLIC_AGENT_API_URL: string;
    NEXT_PUBLIC_AGENT_API_KEY: string;
  }
  
  // Data engineering specific types
  
  export interface DataPipeline {
    id: string;
    name: string;
    description: string;
    steps: PipelineStep[];
    schedule?: string;
    status: 'active' | 'inactive' | 'error';
    lastRun?: Date;
    nextRun?: Date;
  }
  
  export interface PipelineStep {
    id: string;
    name: string;
    type: 'extract' | 'transform' | 'load' | 'validate';
    config: Record<string, any>;
    dependencies: string[];
  }
  
  export interface DataSource {
    id: string;
    name: string;
    type: 'database' | 'api' | 'file' | 'stream';
    config: Record<string, any>;
    schema?: Record<string, any>;
  }
  
  export interface DataTarget {
    id: string;
    name: string;
    type: 'database' | 'api' | 'file' | 'dashboard';
    config: Record<string, any>;
  }
  
  export interface DataQualityRule {
    id: string;
    name: string;
    description: string;
    ruleType: 'completeness' | 'accuracy' | 'consistency' | 'validity' | 'timeliness';
    severity: 'low' | 'medium' | 'high' | 'critical';
    query: string;
    threshold: number;
  }
  
  export interface InfrastructureComponent {
    id: string;
    name: string;
    type: 'compute' | 'storage' | 'network' | 'security';
    provider: 'aws' | 'gcp' | 'azure' | 'local';
    config: Record<string, any>;
    status: 'running' | 'stopped' | 'error';
  }
  
  // Navigation helpers
  export type ActiveView = 'conversation' | 'execution' | 'history' | 'settings';
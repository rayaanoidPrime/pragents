// src/store/index.ts
import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { Agent, Message, Strategy, Conversation, ApiSettings } from '@/types';
import { n8nService } from '@/services/n8nService';
import { connectionValidator } from '@/services/connectionValidator';

// Initial API settings with n8n connection status
const initialApiSettings: ApiSettings = {
  apiUrl: process.env.NEXT_PUBLIC_AGENT_API_URL || 'http://localhost:5678',
  apiKey: process.env.NEXT_PUBLIC_AGENT_API_KEY || '',
  backendType: 'n8n',
  n8nConnectionStatus: 'disconnected',
  n8nWorkflowType: 'default', // Specify which n8n workflow to use
  useDemoMode: false,
  // Connection validation fields
  connectionStatus: 'disconnected',
  connectionError: null
};

// Mock agents data
const defaultAgents: Agent[] = [
  {
    id: "data-architect",
    name: "Data Architect",
    description: "Designs data infrastructure and systems",
    avatar: "👨‍💻",
    color: "#4CAF50"
  },
  {
    id: "pipeline-engineer",
    name: "Pipeline Engineer",
    description: "Expert in building efficient data pipelines",
    avatar: "🔧",
    color: "#2196F3"
  },
  {
    id: "data-analyst",
    name: "Data Analyst",
    description: "Analyzes and interprets complex data",
    avatar: "📊",
    color: "#FF9800"
  },
  {
    id: "data-scientist",
    name: "Data Scientist",
    description: "Applies statistical models and machine learning",
    avatar: "🧪",
    color: "#9C27B0"
  },
  {
    id: "data-governance",
    name: "Governance Specialist",
    description: "Ensures data quality and compliance",
    avatar: "📋",
    color: "#F44336"
  },
  {
    id: "data-engineer",
    name: "Data Engineer",
    description: "Builds and maintains data infrastructure",
    avatar: "💻",
    color: "#607D8B"
  }
];

// Mock strategies data
const defaultStrategies: Strategy[] = [
  {
    id: "sequential",
    name: "Sequential",
    description: "Agents respond in sequence, building on previous responses",
    color: "#2196F3",
    icon: "arrow-right"
  },
  {
    id: "collaborative",
    name: "Collaborative",
    description: "Agents work together to generate a comprehensive solution",
    color: "#4CAF50",
    icon: "users"
  },
  {
    id: "debate",
    name: "Debate",
    description: "Agents discuss different approaches to solve the problem",
    color: "#FF9800",
    icon: "message-square"
  }
];

export const useStore = create<StoreState>((set, get) => ({
  // API Settings
  apiSettings: initialApiSettings,
  updateApiSettings: (settings: Partial<ApiSettings>) => {
    set((state) => ({
      apiSettings: {
        ...state.apiSettings,
        ...settings
      }
    }));
  },
  
  // Connection validation actions
  validateConnection: async () => {
    const { apiSettings } = get();
    const { backendType, useDemoMode, n8nWorkflowType } = apiSettings;
    
    set({ isProcessing: true });
    
    try {
      const result = await connectionValidator.validateConnection(
        backendType, 
        useDemoMode,
        n8nWorkflowType
      );
      
      set((state) => ({
        apiSettings: {
          ...state.apiSettings,
          connectionStatus: result.success ? 'connected' : 'disconnected',
          connectionError: result.success ? null : result.message,
          // Also update n8n status if it's n8n backend
          ...(backendType === 'n8n' ? { n8nConnectionStatus: result.success ? 'connected' : 'disconnected' } : {})
        },
        isProcessing: false
      }));
      
      return result.success;
    } catch (error) {
      set((state) => ({
        apiSettings: {
          ...state.apiSettings,
          connectionStatus: 'disconnected',
          connectionError: error instanceof Error ? error.message : 'Unknown connection error',
          // Also update n8n status if it's n8n backend
          ...(backendType === 'n8n' ? { n8nConnectionStatus: 'disconnected' } : {})
        },
        isProcessing: false
      }));
      
      return false;
    }
  },
  
  setBackendType: async (backendType: string, workflowType: string = 'default', useDemoMode: boolean = false) => {
    set((state) => ({
      apiSettings: {
        ...state.apiSettings,
        backendType,
        n8nWorkflowType: workflowType,
        useDemoMode,
        connectionStatus: 'disconnected', // Reset connection status
        connectionError: null
      }
    }));
    
    // Validate the connection
    return get().validateConnection();
  },
  
  // Agents state
  agents: defaultAgents,
  selectedAgentIds: [],
  selectAgent: (agentId) => {
    set((state) => {
      // Maximum 4 agents can be selected at once
      if (state.selectedAgentIds.length >= 4 && !state.selectedAgentIds.includes(agentId)) {
        return state;
      }
      
      return {
        selectedAgentIds: state.selectedAgentIds.includes(agentId)
          ? state.selectedAgentIds
          : [...state.selectedAgentIds, agentId]
      };
    });
  },
  unselectAgent: (agentId) => {
    set((state) => ({
      selectedAgentIds: state.selectedAgentIds.filter(id => id !== agentId)
    }));
  },
  
  // Strategies state
  strategies: defaultStrategies,
  selectedStrategy: "sequential",
  setSelectedStrategy: (strategyId) => {
    set({ selectedStrategy: strategyId });
  },
  
  // Conversations state
  conversations: [],
  currentConversation: null,
  messages: [],
  addMessage: (message) => {
    set((state) => ({
      messages: [...state.messages, message]
    }));
  },
  addMessages: (messages) => {
    set((state) => ({
      messages: [...state.messages, ...messages]
    }));
  },
  setCurrentConversation: (conversationId) => {
    set({ currentConversation: conversationId });
  },
  
  // UI state
  isLeftSidebarOpen: false,
  isRightSidebarOpen: false,
  toggleLeftSidebar: () => {
    set((state) => ({ isLeftSidebarOpen: !state.isLeftSidebarOpen }));
  },
  toggleRightSidebar: () => {
    set((state) => ({ isRightSidebarOpen: !state.isRightSidebarOpen }));
  },
  
  // Processing state
  isProcessing: false,
  conversationStatus: 'idle',
  currentTurn: 0,
  
  setConversationStatus: (status) => {
    set({ conversationStatus: status });
  },
  
  resetConversation: () => {
    set({
      messages: [],
      conversationStatus: 'idle',
      currentTurn: 0,
      isProcessing: false
    });
  },
  
  // Agent-related actions
  submitQuery: async (query: string) => {
    const { 
      selectedAgentIds, 
      selectedStrategy, 
      addMessage, 
      addMessages,
      currentTurn,
      apiSettings,
      validateConnection
    } = get();
    
    // Validate we have agents selected
    if (selectedAgentIds.length === 0) {
      addMessage({
        id: uuidv4(),
        content: "Please select at least one agent before submitting a query.",
        role: "system",
        type: "error",
        createdAt: new Date()
      });
      return;
    }
    
    // Validate connection before submitting
    if (!apiSettings.useDemoMode && apiSettings.connectionStatus !== 'connected') {
      // Try to validate connection first
      const isConnected = await validateConnection();
      
      if (!isConnected) {
        addMessage({
          id: uuidv4(),
          content: `Cannot submit query: ${apiSettings.connectionError || 'Not connected to backend'}`,
          role: "system",
          type: "error",
          createdAt: new Date()
        });
        return;
      }
    }
    
    // Add user message
    const userMessage = {
      id: uuidv4(),
      content: query,
      role: "user",
      createdAt: new Date()
    };
    addMessage(userMessage);
    
    // Set processing state
    set({ 
      isProcessing: true,
      conversationStatus: 'active',
      currentTurn: currentTurn + 1
    });
    
    // Add thinking message
    const thinkingMessage = {
      id: `thinking-${Date.now()}`,
      content: "Thinking...",
      role: "assistant",
      agentId: "coordinator",
      agentName: "Coordinator",
      agentAvatar: "🧠",
      agentColor: "#9333EA",
      type: "thinking",
      createdAt: new Date()
    };
    addMessage(thinkingMessage);
    
    try {
      // Submit to n8n with workflow type
      const response = await n8nService.submitQuery(
        selectedAgentIds,
        selectedStrategy,
        query,
        apiSettings.useDemoMode,
        apiSettings.n8nWorkflowType // Pass workflow type to n8n service
      );
      
      // Remove thinking message
      set((state) => ({
        messages: state.messages.filter(msg => msg.id !== thinkingMessage.id)
      }));
      
      if (response.success) {
        // Extract the summary and filter out summary objects
        let summaryContent = null;
        const filteredMessages = [];
        
        response.messages.forEach(msg => {
          if (msg.summary) {
            // Store the summary content
            summaryContent = msg.summary;
          } else if (msg.agentId) {
            // This is a regular agent message
            filteredMessages.push({
              ...msg,
              id: uuidv4(),
              role: "assistant",
              turnNumber: currentTurn + 1,
              createdAt: new Date()
            });
          }
        });
        
        // Add all agent messages
        addMessages(filteredMessages);
        
        // Add coordinator summary if we have one
        if (summaryContent) {
          setTimeout(() => {
            addMessage({
              id: uuidv4(),
              content: summaryContent,  // Use the exact summary from n8n
              role: "assistant",
              agentId: "coordinator",
              agentName: "Coordinator",
              agentAvatar: "🧠",
              agentColor: "#9333EA",
              isCoordinator: true,
              type: "summary",
              turnNumber: currentTurn + 1,
              createdAt: new Date()
            });
          }, 1000);
        }
      } else {
        // Add error message
        addMessage({
          id: uuidv4(),
          content: response.error || "An unknown error occurred",
          role: "system",
          type: "error",
          createdAt: new Date()
        });
        set({ conversationStatus: 'error' });
      }
    } catch (error) {
      // Handle errors
      set((state) => ({
        messages: state.messages.filter(msg => msg.id !== thinkingMessage.id)
      }));
      
      addMessage({
        id: uuidv4(),
        content: `Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`,
        role: "system",
        type: "error",
        createdAt: new Date()
      });
      set({ conversationStatus: 'error' });
    } finally {
      set({ isProcessing: false });
    }
  },
}));

// Selector for getting selected agents
export const useSelectedAgents = () => {
  const agents = useStore((state) => state.agents);
  const selectedAgentIds = useStore((state) => state.selectedAgentIds);
  
  // Return only the agents that are selected
  return agents.filter(agent => selectedAgentIds.includes(agent.id));
};

// Selector for getting the selected strategy
export const useSelectedStrategy = () => {
  const strategies = useStore((state) => state.strategies);
  const selectedStrategyId = useStore((state) => state.selectedStrategy);
  
  // Return the selected strategy object
  return strategies.find(strategy => strategy.id === selectedStrategyId);
};
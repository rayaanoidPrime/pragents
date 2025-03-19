import { parseStream } from '@/lib/utils';

// Types
export interface Agent {
  id: string;
  name: string;
  description: string;
  avatar: string;
  role: string;
  systemPrompt?: string;
}

export interface Strategy {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant' | 'system';
  agentId?: string;
  chatId: string;
  createdAt: Date;
}

export interface ChatSession {
  id: string;
  title: string;
  strategyId: string;
  agents: Agent[];
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}

// Agent API Service
class AgentService {
  private apiUrl: string;
  private apiKey: string;

  constructor() {
    this.apiUrl = process.env.NEXT_PUBLIC_AGENT_API_URL || 'http://localhost:5678/api/v1';
    this.apiKey = process.env.NEXT_PUBLIC_AGENT_API_KEY || '';
  }

  // Get available agents
  async getAgents(): Promise<Agent[]> {
    try {
      const response = await fetch(`${this.apiUrl}/agents`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch agents: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching agents:', error);
      
      // Return mock data in case of error
      return [
        {
          id: 'data-architect',
          name: 'Data Architect',
          description: 'Designs data infrastructure and systems',
          avatar: '/images/avatars/data-architect.png',
          role: 'architect',
          systemPrompt: 'You are a Data Architect who specializes in designing scalable data systems.'
        },
        {
          id: 'pipeline-engineer',
          name: 'Pipeline Engineer',
          description: 'Expert in building efficient data pipelines',
          avatar: '/images/avatars/pipeline-engineer.png',
          role: 'engineer',
          systemPrompt: 'You are a Pipeline Engineer who specializes in ETL/ELT processes.'
        },
        {
          id: 'data-analyst',
          name: 'Data Analyst',
          description: 'Analyzes and interprets complex data',
          avatar: '/images/avatars/data-analyst.png',
          role: 'analyst',
          systemPrompt: 'You are a Data Analyst who specializes in deriving insights from data.'
        },
        {
          id: 'data-scientist',
          name: 'Data Scientist',
          description: 'Applies statistical models and machine learning',
          avatar: '/images/avatars/data-scientist.png',
          role: 'scientist',
          systemPrompt: 'You are a Data Scientist who specializes in advanced analytics and machine learning.'
        },
        {
          id: 'data-governance',
          name: 'Governance Specialist',
          description: 'Ensures data quality and compliance',
          avatar: '/images/avatars/data-governance.png',
          role: 'governance',
          systemPrompt: 'You are a Data Governance Specialist who ensures data quality and regulatory compliance.'
        }
      ];
    }
  }

  // Get available strategies
  async getStrategies(): Promise<Strategy[]> {
    try {
      const response = await fetch(`${this.apiUrl}/strategies`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch strategies: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching strategies:', error);
      
      // Return mock data in case of error
      return [
        {
          id: 'infrastructure',
          name: 'Build Infrastructure',
          description: 'Set up and configure data engineering infrastructure',
          icon: 'server'
        },
        {
          id: 'pipeline',
          name: 'Data Pipeline',
          description: 'Create and optimize ETL/ELT data pipelines',
          icon: 'git-branch'
        },
        {
          id: 'analysis',
          name: 'Data Analysis',
          description: 'Analyze and derive insights from your data',
          icon: 'bar-chart'
        },
        {
          id: 'quality',
          name: 'Data Quality',
          description: 'Implement data quality checks and monitoring',
          icon: 'shield'
        },
        {
          id: 'governance',
          name: 'Data Governance',
          description: 'Establish data governance policies and practices',
          icon: 'landmark'
        }
      ];
    }
  }

  // Create a new chat session
  async createChat(strategyId: string, agentIds: string[]): Promise<ChatSession> {
    try {
      const response = await fetch(`${this.apiUrl}/chats`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          strategyId,
          agentIds
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to create chat: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating chat:', error);
      throw error;
    }
  }

  // Send a message to the chat and get a streaming response
  async sendMessage(chatId: string, content: string): Promise<ReadableStream<any>> {
    try {
      const response = await fetch(`${this.apiUrl}/chats/${chatId}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          content,
          role: 'user'
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to send message: ${response.statusText}`);
      }

      // Parse the streaming response
      return parseStream(response.body!.getReader());
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }

  // Get chat history
  async getChatHistory(): Promise<ChatSession[]> {
    try {
      const response = await fetch(`${this.apiUrl}/chats`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch chat history: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching chat history:', error);
      
      // Return mock data in case of error
      return [
        {
          id: '1',
          title: 'Data Pipeline for Customer Analytics',
          strategyId: 'pipeline',
          agents: [],
          messages: [],
          createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
          updatedAt: new Date(Date.now() - 3 * 60 * 60 * 1000)
        },
        {
          id: '2',
          title: 'Infrastructure Setup for Data Lake',
          strategyId: 'infrastructure',
          agents: [],
          messages: [],
          createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
          updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000)
        },
        {
          id: '3',
          title: 'ETL Process Optimization',
          strategyId: 'pipeline',
          agents: [],
          messages: [],
          createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
        }
      ];
    }
  }

  // Get chat by ID
  async getChat(chatId: string): Promise<ChatSession> {
    try {
      const response = await fetch(`${this.apiUrl}/chats/${chatId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch chat: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching chat:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const agentService = new AgentService();
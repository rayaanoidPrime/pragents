import { nanoid } from 'nanoid';
import { parseStream } from '@/lib/utils';
import { CreateChatInput, CreateMessageInput } from '@/lib/db/schema';

// Types for the chat service
export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant' | 'system';
  agentId?: string;
  agentName?: string;
  agentAvatar?: string;
  chatId: string;
  createdAt: Date;
}

export interface Chat {
  id: string;
  title: string;
  strategyId: string;
  agentIds: string[];
  createdAt: Date;
  updatedAt: Date;
  messages: Message[];
}

// Chat service for handling chat-related operations
class ChatService {
  private apiUrl: string;
  private apiKey: string;

  constructor() {
    this.apiUrl = process.env.NEXT_PUBLIC_AGENT_API_URL || 'http://localhost:5678/api/v1';
    this.apiKey = process.env.NEXT_PUBLIC_AGENT_API_KEY || '';
  }

  // Get headers for API requests
  private getHeaders(): HeadersInit {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`
    };
  }

  // Create a new chat
  async createChat(input: CreateChatInput): Promise<Chat> {
    try {
      const response = await fetch(`${this.apiUrl}/chats`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(input)
      });

      if (!response.ok) {
        throw new Error(`Failed to create chat: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating chat:', error);
      
      // Create a mock chat if API fails
      const mockChat: Chat = {
        id: nanoid(),
        title: input.title,
        strategyId: input.strategyId,
        agentIds: input.agentIds,
        createdAt: new Date(),
        updatedAt: new Date(),
        messages: [{
          id: nanoid(),
          content: "I'm ready to help with your data engineering tasks. What would you like to work on today?",
          role: 'system',
          chatId: nanoid(),
          createdAt: new Date()
        }]
      };
      
      return mockChat;
    }
  }

  // Get a chat by ID
  async getChat(chatId: string): Promise<Chat> {
    try {
      const response = await fetch(`${this.apiUrl}/chats/${chatId}`, {
        headers: this.getHeaders()
      });

      if (!response.ok) {
        throw new Error(`Failed to get chat: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error getting chat:', error);
      throw error;
    }
  }

  // Get all chats
  async getChats(): Promise<Chat[]> {
    try {
      const response = await fetch(`${this.apiUrl}/chats`, {
        headers: this.getHeaders()
      });

      if (!response.ok) {
        throw new Error(`Failed to get chats: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error getting chats:', error);
      
      // Return mock chats if API fails
      return [
        {
          id: nanoid(),
          title: 'Data Pipeline for Customer Analytics',
          strategyId: 'pipeline',
          agentIds: ['data-engineer', 'data-analyst'],
          createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
          updatedAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
          messages: []
        },
        {
          id: nanoid(),
          title: 'Infrastructure Setup for Data Lake',
          strategyId: 'infrastructure',
          agentIds: ['data-architect', 'data-governance'],
          createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
          updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
          messages: []
        }
      ];
    }
  }

  // Send a message to a chat
  async sendMessage(input: CreateMessageInput): Promise<Message> {
    try {
      const response = await fetch(`${this.apiUrl}/chats/${input.chatId}/messages`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(input)
      });

      if (!response.ok) {
        throw new Error(`Failed to send message: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Create a mock message if API fails
      const mockMessage: Message = {
        id: nanoid(),
        content: input.content,
        role: input.role,
        agentId: input.agentId,
        chatId: input.chatId,
        createdAt: new Date()
      };
      
      return mockMessage;
    }
  }

  // Stream a response from the AI
  async streamResponse(chatId: string, userMessage: string): Promise<ReadableStream<any>> {
    try {
      const response = await fetch(`${this.apiUrl}/chats/${chatId}/stream`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({
          content: userMessage,
          role: 'user'
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to stream response: ${response.statusText}`);
      }
      
      // Parse the streaming response
      return parseStream(response.body!.getReader());
    } catch (error) {
      console.error('Error streaming response:', error);
      
      // Create a mock stream if API fails
      const encoder = new TextEncoder();
      let counter = 0;
      const mockResponses = [
        "I'll analyze your data engineering request.",
        " Let me think about the best approach for this task.",
        " Based on current best practices, I recommend setting up a pipeline with the following components:",
        "\n\n1. Data extraction from source systems",
        "\n2. Data transformation using Apache Spark",
        "\n3. Data loading into your data warehouse",
        "\n4. Monitoring and quality checks"
      ];
      
      return new ReadableStream({
        start(controller) {
          const interval = setInterval(() => {
            if (counter < mockResponses.length) {
              controller.enqueue({ 
                type: 'token', 
                content: mockResponses[counter],
                agent: {
                  id: 'data-engineer',
                  name: 'Data Engineer'
                }
              });
              counter++;
            } else {
              clearInterval(interval);
              controller.close();
            }
          }, 300);
        }
      });
    }
  }

  // Update a chat title
  async updateChatTitle(chatId: string, title: string): Promise<Chat> {
    try {
      const response = await fetch(`${this.apiUrl}/chats/${chatId}`, {
        method: 'PATCH',
        headers: this.getHeaders(),
        body: JSON.stringify({ title })
      });

      if (!response.ok) {
        throw new Error(`Failed to update chat title: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating chat title:', error);
      throw error;
    }
  }

  // Delete a chat
  async deleteChat(chatId: string): Promise<void> {
    try {
      const response = await fetch(`${this.apiUrl}/chats/${chatId}`, {
        method: 'DELETE',
        headers: this.getHeaders()
      });

      if (!response.ok) {
        throw new Error(`Failed to delete chat: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error deleting chat:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const chatService = new ChatService();
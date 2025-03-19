/**
 * This file contains TypeScript types that mirror the Prisma schema
 * for use throughout the application
 */

export interface User {
    id: string;
    name?: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface Session {
    id: string;
    userId: string;
    expires: Date;
    sessionToken: string;
  }
  
  export interface Chat {
    id: string;
    title: string;
    userId: string;
    strategyId: string;
    createdAt: Date;
    updatedAt: Date;
    messages?: Message[];
    agentChats?: AgentChat[];
    strategy?: Strategy;
    user?: User;
  }
  
  export interface Strategy {
    id: string;
    name: string;
    description: string;
    icon: string;
    createdAt: Date;
    updatedAt: Date;
    chats?: Chat[];
  }
  
  export interface Agent {
    id: string;
    name: string;
    description: string;
    avatar: string;
    role: string;
    systemPrompt: string;
    createdAt: Date;
    updatedAt: Date;
    agentChats?: AgentChat[];
  }
  
  export interface AgentChat {
    id: string;
    chatId: string;
    agentId: string;
    createdAt: Date;
    chat?: Chat;
    agent?: Agent;
  }
  
  export interface Message {
    id: string;
    content: string;
    role: 'user' | 'assistant' | 'system';
    chatId: string;
    agentId?: string;
    createdAt: Date;
    chat?: Chat;
  }
  
  // Agent role types
  export type AgentRole = 
    | 'architect' 
    | 'engineer' 
    | 'analyst' 
    | 'scientist' 
    | 'governance';
  
  // Strategy types
  export type StrategyType = 
    | 'infrastructure' 
    | 'pipeline' 
    | 'analysis' 
    | 'quality' 
    | 'governance';
  
  /**
   * Input types for mutations
   */
  
  export interface CreateChatInput {
    title: string;
    strategyId: string;
    agentIds: string[];
  }
  
  export interface CreateMessageInput {
    content: string;
    role: 'user' | 'assistant' | 'system';
    chatId: string;
    agentId?: string;
  }
  
  /**
   * Utility functions for database operations
   */
  
  /**
   * Formats a Date object to a readable string
   */
  export function formatChatDate(date: Date): string {
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  }
  
  /**
   * Gets the relative time (e.g., "2 days ago") from a date
   */
  export function getRelativeTime(date: Date): string {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) {
      return `${diffInSeconds} second${diffInSeconds !== 1 ? 's' : ''} ago`;
    }
    
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
    }
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
    }
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) {
      return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
    }
    
    const diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInWeeks < 4) {
      return `${diffInWeeks} week${diffInWeeks !== 1 ? 's' : ''} ago`;
    }
    
    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) {
      return `${diffInMonths} month${diffInMonths !== 1 ? 's' : ''} ago`;
    }
    
    const diffInYears = Math.floor(diffInDays / 365);
    return `${diffInYears} year${diffInYears !== 1 ? 's' : ''} ago`;
  }
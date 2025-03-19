"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
import { CheckCircle2, AlertCircle, Info } from "lucide-react";

// Agent icon colors - vibrant colors for different agent types
const agentColors = {
  "data-architect": { color: "#4CAF50", bg: "#E8F5E9", avatar: "👨‍💻" }, // Green
  "pipeline-engineer": { color: "#2196F3", bg: "#E3F2FD", avatar: "🔧" }, // Blue
  "data-analyst": { color: "#FF9800", bg: "#FFF3E0", avatar: "📊" }, // Orange
  "data-scientist": { color: "#9C27B0", bg: "#F3E5F5", avatar: "🧪" }, // Purple
  "data-governance": { color: "#F44336", bg: "#FFEBEE", avatar: "📋" }, // Red
  "creative-writer": { color: "#E91E63", bg: "#FCE4EC", avatar: "✍️" }, // Pink
  "code-expert": { color: "#607D8B", bg: "#ECEFF1", avatar: "💻" }, // Blue Grey
  "healthcare-specialist": { color: "#00BCD4", bg: "#E0F7FA", avatar: "🏥" }, // Cyan
  "system": { color: "#795548", bg: "#EFEBE9", avatar: "💡" }, // Brown
  "coordinator": { color: "#673AB7", bg: "#EDE7F6", avatar: "🧠" }, // Deep Purple
};

// Default colors for unknown agents
const defaultAgentStyle = { color: "#6E6E6E", bg: "#F5F5F5", avatar: "🤖" };

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant" | "system";
  agentId?: string;
  agentName?: string;
  agentAvatar?: string;
  type?: string;
  timestamp?: Date;
}

interface ChatMessageProps {
  message: Message;
  isLastMessage?: boolean;
}

/**
 * Helper to fix Markdown content
 */
function fixMarkdown(content: string) {
  return content
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/\*\*\*\s*([^*]+?)\s*\*\*\*/g, '***$1***')
    .replace(/\*\*\s*([^*]+?)\s*\*\*/g, '**$1**')
    .replace(/^#+\s*([^#\n]+)/gm, (match) => {
      return match.startsWith('# ') ? match : match.replace(/^#+/, h => `${h} `);
    })
    .replace(/^(\s*[-*+])\S/gm, '$1 ');
}

export function ChatMessage({ message, isLastMessage = false }: ChatMessageProps) {
  const isUser = message.role === "user";
  const isSystem = message.role === "system" || !message.agentId || message.agentId === "system";
  const isCoordinator = message.agentId === "coordinator";
  const isFinal = message.type === "final";
  const isThinking = message.type === "thinking";
  const isError = message.type === "error";
  
  // Get agent style (colors, avatar)
  const getAgentStyle = () => {
    if (isSystem) return agentColors.system || defaultAgentStyle;
    if (isCoordinator) return agentColors.coordinator || defaultAgentStyle;
    if (message.agentId && agentColors[message.agentId as keyof typeof agentColors]) {
      return agentColors[message.agentId as keyof typeof agentColors];
    }
    return defaultAgentStyle;
  };
  
  const agentStyle = getAgentStyle();
  const timestamp = message.timestamp || new Date();
  
  // For system messages
  if (isSystem) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex justify-center my-3"
      >
        <div className={cn(
          "px-5 py-3 rounded-xl max-w-[85%] text-sm font-medium",
          isError 
            ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border border-red-200 dark:border-red-800" 
            : "bg-gray-100 text-gray-700 dark:bg-gray-800/70 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
        )}>
          <div className="flex items-center gap-2">
            {isError && <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />}
            {!isError && <Info className="h-4 w-4 text-gray-500 dark:text-gray-400" />}
            {message.content}
          </div>
        </div>
      </motion.div>
    );
  }

  // For thinking messages (loading state)
  if (isThinking) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-start space-x-3 my-4"
      >
        <div 
          className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full text-lg shadow-sm"
          style={{ 
            backgroundColor: agentStyle.bg,
            color: agentStyle.color,
            borderColor: agentStyle.color,
            borderWidth: "1px",
          }}
        >
          {message.agentAvatar || agentStyle.avatar}
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 max-w-[85%] border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex items-center space-x-2">
            <div className="font-medium text-gray-900 dark:text-white text-base">
              {message.agentName || (message.agentId ? message.agentId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : 'Agent')}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
          <div className="mt-3 space-y-2">
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse w-3/4"></div>
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse w-1/2"></div>
          </div>
        </div>
      </motion.div>
    );
  }

  // For user messages
  if (isUser) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-start justify-end space-x-3 my-4"
      >
        <div className="bg-blue-600 dark:bg-blue-700 text-white rounded-xl p-4 max-w-[85%] shadow-sm">
          <div className="prose prose-sm dark:prose-invert max-w-none break-words text-base">
            <ReactMarkdown>{fixMarkdown(message.content)}</ReactMarkdown>
          </div>
        </div>
        
        <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 font-bold text-base shadow-sm">
          U
        </div>
      </motion.div>
    );
  }

  // For agent messages
  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-start space-x-3 my-4"
    >
      <div 
        className={`w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full text-lg shadow-sm ${
          isFinal ? 'ring-2 ring-offset-2 ring-green-500 dark:ring-green-400 dark:ring-offset-gray-900' : ''
        }`}
        style={{ 
          backgroundColor: agentStyle.bg,
          color: agentStyle.color,
          borderColor: agentStyle.color,
          borderWidth: "1px",
        }}
      >
        {message.agentAvatar || agentStyle.avatar}
      </div>
      
      <div 
        className={cn(
          "rounded-xl p-4 mb-2 max-w-[85%] shadow-sm border",
          isFinal
            ? "bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800"
            : isCoordinator
              ? "bg-purple-50 dark:bg-purple-900/30 border-purple-200 dark:border-purple-800"
              : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
        )}
      >
        <div className="flex items-center space-x-2">
          <div className="font-medium text-gray-900 dark:text-white text-base">
            {message.agentName || (message.agentId ? message.agentId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : 'Agent')}
          </div>
          
          {isFinal && (
            <Badge 
              variant="outline" 
              className="bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 border-green-200 dark:border-green-700 flex items-center h-6 px-2"
            >
              <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
              Final
            </Badge>
          )}
          
          {isCoordinator && (
            <Badge 
              variant="outline" 
              className="bg-purple-100 dark:bg-purple-800 text-purple-800 dark:text-purple-200 border-purple-200 dark:border-purple-700 h-6 px-2"
            >
              Coordinator
            </Badge>
          )}
          
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
        
        <div className="mt-3 text-gray-700 dark:text-gray-300 prose prose-base dark:prose-invert max-w-none break-words text-base">
          <ReactMarkdown>{fixMarkdown(message.content)}</ReactMarkdown>
        </div>
      </div>
    </motion.div>
  );
}
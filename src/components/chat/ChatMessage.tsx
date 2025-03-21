"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, ThumbsUp, ThumbsDown, Copy, Check, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useState } from 'react';

export interface Message {
  id: string;
  content: string;
  role: string;
  agentId?: string;
  agentName?: string;
  agentColor?: string;
  agentAvatar?: string;
  timestamp: Date;
  isPending?: boolean;
  hasCode?: boolean;
  isCoordinator?: boolean;
  turnNumber?: number;
  type?: string;
}

interface ChatMessageProps {
  message: Message;
  showFeedback?: boolean;
}

export function ChatMessage({ message, showFeedback = true }: ChatMessageProps) {
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLike = () => {
    setLiked(!liked);
    if (disliked) setDisliked(false);
  };

  const handleDislike = () => {
    setDisliked(!disliked);
    if (liked) setLiked(false);
  };

  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  // Custom renderer for code blocks in markdown
  const components = {
    code({ node, inline, className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <div className="relative rounded-lg overflow-hidden my-3">
          <div className="flex items-center justify-between bg-zinc-800 px-4 py-1.5 text-xs text-zinc-200">
            <span>{match[1]}</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6 p-0 text-zinc-400 hover:text-zinc-200"
                    onClick={() => {
                      navigator.clipboard.writeText(String(children));
                    }}
                  >
                    <Copy size={14} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Copy code</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <SyntaxHighlighter
            language={match[1]}
            style={vscDarkPlus}
            customStyle={{ margin: 0, borderRadius: 0 }}
            showLineNumbers
          >
            {String(children).replace(/\n$/, '')}
          </SyntaxHighlighter>
        </div>
      ) : (
        <code className="bg-muted px-1.5 py-0.5 rounded text-sm" {...props}>
          {children}
        </code>
      );
    },
    p({ children }: any) {
      return <p className="mb-4 last:mb-0">{children}</p>;
    },
    ul({ children }: any) {
      return <ul className="list-disc ml-6 mb-4 space-y-1">{children}</ul>;
    },
    ol({ children }: any) {
      return <ol className="list-decimal ml-6 mb-4 space-y-1">{children}</ol>;
    },
    li({ children }: any) {
      return <li className="mb-1">{children}</li>;
    },
    h3({ children }: any) {
      return <h3 className="text-lg font-semibold mt-6 mb-3">{children}</h3>;
    },
    h4({ children }: any) {
      return <h4 className="text-base font-semibold mt-4 mb-2">{children}</h4>;
    },
  };

  // System message (errors, notifications)
  if (message.role === 'system' || message.type === 'error') {
    return (
      <motion.div
        variants={messageVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-2xl"
      >
        <div className="flex items-center justify-center">
          <div className="bg-destructive/10 text-destructive px-4 py-3 rounded-lg flex items-center">
            <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
            <p className="text-sm">{message.content}</p>
          </div>
        </div>
      </motion.div>
    );
  }

  // User message
  if (message.role === 'user') {
    return (
      <motion.div
        variants={messageVariants}
        initial="hidden"
        animate="visible"
        className="flex items-start justify-end gap-3 max-w-4xl ml-auto"
      >
        <div className="flex-1 max-w-xl">
          <div className="bg-primary/10 dark:bg-primary/20 text-foreground p-4 rounded-xl rounded-tr-sm shadow-sm">
            <p className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</p>
          </div>
          <div className="flex justify-end mt-1">
            <span className="text-xs text-muted-foreground">
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
          <MessageSquare className="h-4 w-4 text-primary" />
        </div>
      </motion.div>
    );
  }

  // Coordinator message (special styling for coordinator)
  if (message.isCoordinator || message.agentId === 'coordinator') {
    return (
      <motion.div
        variants={messageVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-3xl my-6"
      >
        <div className={cn(
          "rounded-xl bg-primary/5 border border-primary/20 p-4 shadow-sm",
          message.isPending && "opacity-75 border-dashed"
        )}>
          <div className="flex items-start">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3 shrink-0 mt-1">
              {message.agentAvatar || "👨‍💼"}
            </div>
            <div className="flex-1">
              <div className="flex items-center">
                <h4 className="font-medium text-primary">{message.agentName || "Coordinator"}</h4>
                <Badge 
                  variant="outline" 
                  className="ml-2 bg-primary/5 text-primary text-xs border-primary/20 px-1.5 py-0"
                >
                  System
                </Badge>
              </div>
              {message.isPending ? (
                <div className="mt-2 flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-2 h-2 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-2 h-2 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              ) : (
                <div className="mt-2 prose prose-sm dark:prose-invert max-w-none leading-relaxed">
                  <ReactMarkdown components={components}>
                    {message.content}
                  </ReactMarkdown>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Agent message (including thinking message)
  return (
    <motion.div
      variants={messageVariants}
      initial="hidden"
      animate="visible"
      className={cn(
        "flex items-start gap-3 max-w-4xl",
        message.isPending && "opacity-70"
      )}
    >
      <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0 mt-1">
        {message.agentAvatar || message.agentName?.[0] || "A"}
      </div>
      <div className="flex-1">
        <div className="flex items-center">
          <h4 className="font-medium" style={{ color: message.agentColor || "#6366F1" }}>
            {message.agentName || "Agent"}
          </h4>
          {message.isPending && (
            <Badge variant="outline" className="ml-2 bg-yellow-500/10 text-yellow-500 text-xs border-yellow-500/20">
              <span className="animate-pulse">●</span>
              <span className="ml-1">Typing...</span>
            </Badge>
          )}
        </div>
        <div
          className={cn(
            "mt-1.5 bg-card border rounded-xl p-4 text-sm shadow-sm",
            message.isPending && "border-dashed"
          )}
        >
          {message.isPending ? (
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: "0ms" }} />
              <div className="w-2 h-2 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: "150ms" }} />
              <div className="w-2 h-2 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          ) : (
            <div className="prose prose-sm dark:prose-invert max-w-none leading-relaxed">
              <ReactMarkdown components={components}>
                {message.content}
              </ReactMarkdown>
            </div>
          )}
        </div>
        
        {!message.isPending && showFeedback && (
          <div className="flex items-center mt-1.5 text-xs text-muted-foreground justify-between">
            <span>
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
            
            <div className="flex items-center gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="icon"
                      variant="ghost"
                      className={cn(
                        "h-7 w-7 rounded-full",
                        liked ? "text-green-500 bg-green-500/10" : "text-muted-foreground hover:text-foreground"
                      )}
                      onClick={handleLike}
                    >
                      <ThumbsUp className="h-3.5 w-3.5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>{liked ? "Remove feedback" : "Helpful response"}</p>
                  </TooltipContent>
                </Tooltip>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="icon"
                      variant="ghost"
                      className={cn(
                        "h-7 w-7 rounded-full",
                        disliked ? "text-red-500 bg-red-500/10" : "text-muted-foreground hover:text-foreground"
                      )}
                      onClick={handleDislike}
                    >
                      <ThumbsDown className="h-3.5 w-3.5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>{disliked ? "Remove feedback" : "Unhelpful response"}</p>
                  </TooltipContent>
                </Tooltip>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="icon"
                      variant="ghost"
                      className={cn(
                        "h-7 w-7 rounded-full",
                        copied ? "text-blue-500 bg-blue-500/10" : "text-muted-foreground hover:text-foreground"
                      )}
                      onClick={copyToClipboard}
                    >
                      {copied ? (
                        <Check className="h-3.5 w-3.5" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>{copied ? "Copied!" : "Copy message"}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
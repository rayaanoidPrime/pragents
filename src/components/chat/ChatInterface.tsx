"use client";

import { ConnectionSelector } from '@/components/ConnectionSelector';
import { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { 
  Loader2, SendHorizontal, Paperclip, Mic, Code, 
  Brain, Clock, MessageSquare, CornerDownRight, Sparkles,
  RefreshCw, XCircle
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { motion, AnimatePresence } from "framer-motion";
import { ChatMessage } from "./ChatMessage";
import { useStore, useSelectedAgents, useSelectedStrategy } from "@/store";
import { Agent, Message } from '@/types';

interface NextQuestion {
  id: string;
  question: string;
}

interface ChatInterfaceProps {
  isLoading?: boolean;
}

export function ChatInterface({ isLoading = false }: ChatInterfaceProps) {
  // Get data from store
  const selectedAgents = useSelectedAgents();
  const currentStrategy = useSelectedStrategy();
  const messages = useStore((state) => state.messages);
  const isProcessing = useStore((state) => state.isProcessing);
  const conversationStatus = useStore((state) => state.conversationStatus);
  const currentTurn = useStore((state) => state.currentTurn);
  const submitQuery = useStore((state) => state.submitQuery);
  const resetConversation = useStore((state) => state.resetConversation);
  const addMessage = useStore((state) => state.addMessage);
  const apiSettings = useStore((state) => state.apiSettings);

  const [inputValue, setInputValue] = useState("");
  const [nextQuestions, setNextQuestions] = useState<NextQuestion[]>([]);
  const [hasShownWelcome, setHasShownWelcome] = useState(false);
  const [lastSummaryTurn, setLastSummaryTurn] = useState(0);
  const [coordinatorProcessing, setCoordinatorProcessing] = useState(false);
  
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  // Auto-focus on the textarea
  useEffect(() => {
    if (textareaRef.current && !isLoading && conversationStatus === "idle") {
      textareaRef.current.focus();
    }
  }, [isLoading, conversationStatus]);

  // Handle removing the thinking message when responses come in
  useEffect(() => {
    if (isProcessing) {
      setCoordinatorProcessing(true);
    } else if (!isProcessing && coordinatorProcessing) {
      // Check if we need to add a summary
      if (conversationStatus === "active" && currentTurn > 0 && currentTurn > lastSummaryTurn) {
        setTimeout(() => {
          // addCoordinatorSummary();
        }, 1000);
      }
      setCoordinatorProcessing(false);
    }
  }, [isProcessing, currentTurn, conversationStatus, lastSummaryTurn]);

  // Add coordinator welcome message when conversation starts
  useEffect(() => {
    if (conversationStatus === "active" && !hasShownWelcome && selectedAgents.length > 0) {
      // Check if we already have a coordinator message that's not a thinking message
      const hasCoordinatorWelcome = messages.some(msg => 
        msg.agentId === "coordinator" && 
        msg.role === "assistant" && 
        msg.type !== "thinking"
      );
      
      if (!hasCoordinatorWelcome) {
        const welcomeMessage: Message = {
          id: uuidv4(),
          content: generateWelcomeMessage(selectedAgents),
          role: "assistant",
          agentId: "coordinator",
          agentName: "Coordinator",
          agentAvatar: "🧠",
          agentColor: "#9333EA", // Purple color for coordinator
          createdAt: new Date(),
          type: "welcome"
        };
        
        if (typeof addMessage === 'function') {
          addMessage(welcomeMessage);
          setHasShownWelcome(true);
        }
      } else {
        setHasShownWelcome(true);
      }
    }
    
    // Reset when conversation is reset
    if (conversationStatus === "idle" && hasShownWelcome) {
      setHasShownWelcome(false);
      setLastSummaryTurn(0);
    }
  }, [conversationStatus, selectedAgents, messages, hasShownWelcome, addMessage]);


  // Filter messages to remove raw summary messages
  const filterMessages = (messages: Message[]): Message[] => {
    // Only filter out actual 'summary' role messages, not summary type messages
    return messages.filter(msg => msg.role !== 'summary');
  };
  
  // Handle FAQ and follow-up question selection without auto-submitting
  const handleQuestionSelect = (question: string): void => {
    setInputValue(question);
    
    // Focus the textarea after setting the value
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const handleSendMessage = async (): Promise<void> => {
    if (!inputValue.trim() || isProcessing) return;
    
    // Submit query to n8n via our store action
    await submitQuery(inputValue);
    setInputValue("");
    
    // Generate some follow-up questions based on the context
    if (currentTurn >= 1 && selectedAgents.length > 0) {
      setTimeout(() => {
        const newQuestions: NextQuestion[] = [
          { id: "q1", question: "What are the main challenges in this approach?" },
          { id: "q2", question: "How should we implement this in our existing infrastructure?" },
          { id: "q3", question: "What's the estimated timeline and resource requirements?" }
        ];
        setNextQuestions(newQuestions);
      }, 1000);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="flex flex-col items-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="mt-2 text-muted-foreground">Loading conversation...</p>
        </div>
      </div>
    );
  }

  // Next Questions Panel
  const NextQuestionsPanel = (): JSX.Element | null => {
    if (nextQuestions.length === 0) return null;
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mt-8 mb-6"
      >
        <div className="flex flex-wrap gap-3 justify-center">
          {nextQuestions.map((q) => (
            <motion.button
              key={q.id}
              initial={{ scale: 0.95 }}
              whileHover={{ scale: 1.02 }}
              className="bg-background text-left px-5 py-3.5 rounded-xl border shadow-sm hover:bg-muted/50 transition-colors max-w-md"
              onClick={() => {
                handleQuestionSelect(q.question);
                setNextQuestions([]); // Clear the questions after selection
              }}
            >
              <div className="flex items-start">
                <CornerDownRight className="h-4 w-4 mr-2 mt-1 text-primary" />
                <span>{q.question}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>
    );
  };

  // Welcome Message for empty state
  const WelcomeMessage = (): JSX.Element => (
    <div className="h-full flex flex-col items-center justify-center text-center p-8">
      <div className="text-6xl mb-6">💬</div>
      <h3 className="text-2xl font-medium mb-3 font-display">
        Start a multi-agent conversation
      </h3>
      <p className="text-muted-foreground max-w-md mb-8 text-lg">
        Select agents from the panel and explore data engineering topics together.
      </p>
      
      <div className="w-full max-w-2xl">
        <h4 className="font-medium text-primary flex items-center text-lg mb-5 font-display">
          <MessageSquare className="h-5 w-5 mr-2" />
          Frequently Asked Questions
        </h4>
        
        <div className="grid grid-cols-1 gap-3 mt-4">
          <button 
            className="bg-background text-left px-5 py-3.5 rounded-xl border shadow-sm hover:bg-muted/50 transition-colors w-full"
            onClick={() => handleQuestionSelect("How would you design a scalable data pipeline architecture?")}
          >
            How would you design a scalable data pipeline architecture?
          </button>
          
          <button 
            className="bg-background text-left px-5 py-3.5 rounded-xl border shadow-sm hover:bg-muted/50 transition-colors w-full"
            onClick={() => handleQuestionSelect("What are the best practices for data quality monitoring?")}
          >
            What are the best practices for data quality monitoring?
          </button>
          
          <button 
            className="bg-background text-left px-5 py-3.5 rounded-xl border shadow-sm hover:bg-muted/50 transition-colors w-full"
            onClick={() => handleQuestionSelect("How should we approach migrating from batch to streaming data?")}
          >
            How should we approach migrating from batch to streaming data?
          </button>
        </div>
        
        <div className="mt-6 text-xs text-muted-foreground text-center">
          Current Strategy: <span className="font-medium text-primary">{currentStrategy?.name || 'None'}</span> • {currentStrategy?.description || 'Please select a strategy'}
        </div>
      </div>
    </div>
  );

  // Process messages to preserve emojis/avatars and ensure coordinator appears
  const processedMessages = messages.map(msg => {
    // Ensure agent avatars are preserved
    if (msg.role === "assistant" && msg.agentId !== "coordinator" && !msg.agentAvatar) {
      const agent = selectedAgents.find(a => a.id === msg.agentId);
      if (agent) {
        return {
          ...msg,
          agentAvatar: agent.avatar,
          agentColor: agent.color
        };
      }
    }
    
    // Make sure the coordinator has correct type and avatar
    if (msg.agentId === "coordinator") {
      return {
        ...msg,
        agentAvatar: "🧠",
        agentColor: "#9333EA", // Purple color
        type: msg.type || "coordinator"
      };
    }
    
    return msg;
  });

  return (
    <div className="flex flex-col h-full w-full">
      <Card className="flex flex-col h-full w-full border-none shadow-none rounded-none">
        {/* Chat Header */}
        <div className="p-3 border-b bg-background/90 backdrop-blur-sm w-full sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold flex items-center font-display">
              <Brain className="mr-2 h-5 w-5 text-primary" />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                Agent Discussion
              </span>
            </h2>
            
            {/* Connection selector */}
            <div className="flex items-center gap-2">
              <ConnectionSelector />
            </div>
          </div>
        </div>
        
        {/* Structure the layout with fixed heights */}
        <div className="flex flex-col h-full">
          {/* Messages area - Takes exactly 80% of the height */}
          <div style={{ height: "80%" }} className="overflow-hidden">
            <ScrollArea className="h-full w-full px-4 py-6" ref={scrollAreaRef}>
              {processedMessages.length === 0 ? (
                <WelcomeMessage />
              ) : (
                <div className="space-y-6 pb-4 w-full max-w-4xl mx-auto">
                  <AnimatePresence>
                    {filterMessages(processedMessages).map(msg => (
                      <ChatMessage 
                        key={msg.id} 
                        message={{
                          ...msg,
                          timestamp: new Date(msg.createdAt),
                          isPending: msg.type === "thinking",
                          hasCode: msg.content ? msg.content.includes('```') : false,
                          isCoordinator: msg.agentId === "coordinator"
                        }} 
                        showFeedback={msg.agentId !== "coordinator" && msg.role === "assistant" && msg.type !== "thinking"}
                      />
                    ))}
                  </AnimatePresence>
                  
                  {/* Next questions */}
                  {nextQuestions.length > 0 && conversationStatus === "active" && (
                    <NextQuestionsPanel />
                  )}
                </div>
              )}
            </ScrollArea>
          </div>
          
          {/* Input area - Fixed at 20% of the container height */}
          <div style={{ height: "20%" }} className="border-t bg-background/90 backdrop-blur-sm w-full">
            {conversationStatus === "idle" || conversationStatus === "active" ? (
              <div className="h-full flex flex-col relative">
                <Textarea
                  ref={textareaRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={
                    conversationStatus === "idle"
                      ? "Enter a topic for agents to discuss..."
                      : "Ask a follow-up question..."
                  }
                  className="h-full min-h-full pr-16 resize-none text-base w-full
                    border-0 focus-visible:ring-0 focus-visible:outline-none rounded-none px-4 py-4 font-sans"
                  disabled={isProcessing}
                />
                <div className="absolute right-3 bottom-3 flex space-x-1.5">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          type="button"
                          size="icon"
                          variant="ghost"
                          className="h-9 w-9 rounded-full text-muted-foreground hover:text-foreground"
                          disabled={isProcessing}
                        >
                          <Paperclip className="h-5 w-5" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Attach file</p>
                      </TooltipContent>
                    </Tooltip>
                    
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          type="button"
                          size="icon"
                          variant="ghost"
                          className="h-9 w-9 rounded-full text-muted-foreground hover:text-foreground"
                          disabled={isProcessing}
                        >
                          <Mic className="h-5 w-5" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Voice input</p>
                      </TooltipContent>
                    </Tooltip>
                    
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          type="button"
                          size="icon"
                          variant="ghost"
                          className="h-9 w-9 rounded-full text-muted-foreground hover:text-foreground"
                          disabled={isProcessing}
                        >
                          <Code className="h-5 w-5" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Code snippet</p>
                      </TooltipContent>
                    </Tooltip>
                    
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          type="submit"
                          size="icon"
                          className="h-9 w-9 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground"
                          disabled={
                            inputValue.trim() === "" ||
                            isProcessing ||
                            selectedAgents.length === 0
                          }
                          onClick={handleSendMessage}
                        >
                          {isProcessing ? (
                            <Loader2 className="h-5 w-5 animate-spin" />
                          ) : (
                            <SendHorizontal className="h-5 w-5" />
                          )}
                          <span className="sr-only">Send</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Send message</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            ) : conversationStatus === "complete" ? (
              <div className="flex space-x-4 w-full p-4 h-full items-center justify-center">
                <Button 
                  variant="outline" 
                  className="flex-1 border-primary/20 text-base py-5 rounded-lg"
                  onClick={() => resetConversation()}
                >
                  <RefreshCw className="h-5 w-5 mr-2 text-primary" />
                  New Conversation
                </Button>
                <Button className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground text-base py-5 rounded-lg">
                  <Sparkles className="h-5 w-5 mr-2" />
                  Save Discussion
                </Button>
              </div>
            ) : (
              <div className="text-center py-4 w-full p-4 h-full flex flex-col items-center justify-center">
                <p className="text-base text-destructive">
                  An error occurred. Please try starting a new conversation.
                </p>
                <Button 
                  variant="outline" 
                  className="mt-4 text-base border-primary/20 py-5 rounded-lg"
                  onClick={() => resetConversation()}
                >
                  Reset Conversation
                </Button>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}

// Helper function to generate welcome message
function generateWelcomeMessage(agents: Agent[]): string {
  return `
### Welcome to this multi-agent discussion

I'll be your coordinator for this conversation, helping to organize the insights from our specialists:

${agents.map(agent => `- **${agent.name}**: ${agent.description || `Specialized in ${agent.id.replace(/-/g, ' ')}`}`).join('\n')}

Each agent will contribute based on their expertise. I'll provide summaries and help keep the discussion focused.

Let's begin our exploration of this topic.
  `;
}

// Helper function to generate summary message based on messages
function generateSummaryMessage(messages: Message[], currentTurn: number): string {
  if (messages.length === 0) {
    return `
### Summary

The agents are still formulating their responses. I'll provide a summary once they've shared their insights.
    `;
  }
  
  // Group messages by agent
  const agentMessages: Record<string, Message[]> = {};
  
  messages.forEach(msg => {
    const agentId = msg.agentId || '';
    if (!agentMessages[agentId]) {
      agentMessages[agentId] = [];
    }
    agentMessages[agentId].push(msg);
  });
  
  // Create summary points for each agent
  const summaryPoints = Object.entries(agentMessages).map(([agentId, msgs]) => {
    const agentName = msgs[0].agentName || 'Agent';
    return `- **${agentName}** highlighted the importance of ${getKeyPointFromMessage(msgs[0].content || '')}`;
  }).join('\n');
  
  return `
### Summary

${summaryPoints}

These insights provide a comprehensive approach to addressing this data engineering challenge.
  `;
}

// Helper function to extract key point from a message
function getKeyPointFromMessage(content: string): string {
  // This is a simplified extraction - in a real implementation you might
  // use more sophisticated NLP to extract the main point
  
  // Remove markdown formatting
  const plainText = content.replace(/\*\*|__|\*|_|##+|\[.*?\]\(.*?\)/g, '');
  
  // Get the first sentence that's substantial
  const sentences = plainText.split(/\.\s+/);
  const firstGoodSentence = sentences.find(s => s.length > 20) || sentences[0] || '';
  
  if (firstGoodSentence.length > 100) {
    return firstGoodSentence.substring(0, 97) + '...';
  }
  
  return firstGoodSentence;
}
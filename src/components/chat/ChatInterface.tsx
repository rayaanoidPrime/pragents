"use client";

import { useState, useRef, useEffect } from "react";
import { nanoid } from "nanoid";
import { 
  Loader2, SendHorizontal, Paperclip, Mic, Code, 
  Brain, Clock, MessageSquare, CornerDownRight, Sparkles 
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { motion, AnimatePresence } from "framer-motion";
import { ChatMessage } from "./ChatMessage";

interface Agent {
  id: string;
  name: string;
  avatar?: string;
  color?: string;
  description?: string;
}

interface Strategy {
  id: string;
  name: string;
  description?: string;
  maxTurns: number;
  turnsBeforeFinalAnswer: number;
  color?: string;
}

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant" | "system";
  agentId?: string;
  agentName?: string;
  agentAvatar?: string;
  type?: string;
  timestamp: Date;
}

interface NextQuestion {
  id: string;
  question: string;
}

interface ChatInterfaceProps {
  isLoading?: boolean;
  selectedAgents?: Agent[];
  currentStrategy?: Strategy;
}

export function ChatInterface({ 
  isLoading = false,
  selectedAgents = [],
  currentStrategy = {
    id: "default",
    name: "Data Pipeline",
    description: "Create and optimize ETL/ELT data pipelines",
    maxTurns: 10,
    turnsBeforeFinalAnswer: 8
  }
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: nanoid(),
      content: "Start a multi-agent conversation by entering a topic below.",
      role: "system",
      timestamp: new Date()
    }
  ]);

  const [inputValue, setInputValue] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [conversationStatus, setConversationStatus] = useState<"idle" | "active" | "complete" | "error">("idle");
  const [currentTurn, setCurrentTurn] = useState(0);
  const [nextQuestions, setNextQuestions] = useState<NextQuestion[]>([]);
  
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

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "inherit";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [inputValue]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isSending) return;
    
    // Add user message
    const userMessage: Message = {
      id: nanoid(),
      content: inputValue,
      role: "user",
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsSending(true);
    
    // If we are idle, we are starting a conversation
    if (conversationStatus === "idle") {
      setConversationStatus("active");
      const systemMessage: Message = {
        id: nanoid(),
        content: `Starting a new conversation with ${selectedAgents.length} agents on topic: "${userMessage.content}"`,
        role: "system",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, systemMessage]);
      setCurrentTurn(1);
    }
    
    // Simulate a random delay for each agent
    const getRandomDelay = () => 800 + Math.random() * 1200;
    
    // "Coordinator" message
    setTimeout(() => {
      const coordinatorMessage: Message = {
        id: nanoid(),
        content: `I'll facilitate this discussion about "${userMessage.content}". Let's start by analyzing the key aspects of this topic.`,
        role: "assistant",
        agentId: "coordinator",
        agentName: "Coordinator",
        agentAvatar: "🧠",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, coordinatorMessage]);
      
      // Now each selected agent "thinks" then replies
      const sendAgentResponses = async () => {
        // Randomize the order to simulate concurrency
        const randomizedAgents = [...selectedAgents].sort(() => Math.random() - 0.5);

        // Show a "Thinking..." bubble for each
        randomizedAgents.forEach(agent => {
          const thinkingMessage: Message = {
            id: nanoid(),
            content: "Thinking...",
            role: "assistant",
            agentId: agent.id,
            agentName: agent.name,
            agentAvatar: agent.avatar,
            type: "thinking",
            timestamp: new Date()
          };
          setMessages(prev => [...prev, thinkingMessage]);
        });

        // Then replace each "Thinking..." with an actual response
        for (const agent of randomizedAgents) {
          await new Promise(resolve => setTimeout(resolve, getRandomDelay()));
          
          // Create a custom response based on agent.id if you like:
          const agentResponse = getAgentResponse(agent.id, userMessage.content);
          
          // Replace the "thinking" message with the final response
          setMessages(prev =>
            prev.map(msg => 
              msg.type === "thinking" && msg.agentId === agent.id
                ? {
                    ...msg,
                    id: nanoid(),
                    content: agentResponse,
                    type: undefined
                  }
                : msg
            )
          );
        }

        // Show next possible questions
        setTimeout(() => {
          const newQuestions: NextQuestion[] = [
            { id: "q1", question: "What are the main challenges here?" },
            { id: "q2", question: "How does this approach scale?" },
            { id: "q3", question: "What's the estimated timeline?" }
          ];
          setNextQuestions(newQuestions);
          setIsSending(false);
        }, 1000);
      };

      sendAgentResponses();
    }, 800);
  };

  // Example function to produce a custom response per agent ID
  function getAgentResponse(agentId: string, topic: string) {
    switch (agentId) {
      case "data-architect":
        return `As a Data Architect, I'd focus on the high-level design for "${topic}" — including data lake vs. warehouse decisions, ingestion frameworks, and ensuring future scalability.`;
      case "pipeline-engineer":
        return `For "${topic}", I'd build a robust pipeline using Spark for processing and Airflow for orchestration. This ensures reliability and scalability in data movement.`;
      case "data-analyst":
        return `I'd start analyzing metrics around "${topic}", focusing on volume trends, data quality, and how to visualize insights for stakeholders.`;
      case "data-scientist":
        return `I see opportunities to apply ML models on "${topic}" to discover anomalies, forecast trends, and glean deeper insights.`;
      case "data-governance":
        return `We must ensure governance for "${topic}" by defining data ownership, implementing quality checks, and ensuring compliance with relevant regulations.`;
      case "creative-writer":
        return `Narratively, "${topic}" could be framed as a story: the starting challenges, the transformation, and the ultimate data-driven success.`;
      case "code-expert":
        return `Let me outline some code snippets for "${topic}" using Python and Spark to demonstrate how I'd implement the pipeline.`;
      case "healthcare-specialist":
        return `For healthcare data in "${topic}", I'd ensure HIPAA compliance, anonymization, and a strong emphasis on clinical outcomes.`;
      default:
        return `I'm analyzing "${topic}" from a general perspective, considering both technical and organizational factors.`;
    }
  }

  // Handle question selection
  const handleSelectQuestion = (questionId: string) => {
    const selectedQ = nextQuestions.find(q => q.id === questionId);
    if (!selectedQ) return;
    
    // Add as user message
    const userMessage: Message = {
      id: nanoid(),
      content: selectedQ.question,
      role: "user",
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setNextQuestions([]);
    setIsSending(true);

    // Increment turn
    const newTurn = currentTurn + 1;
    setCurrentTurn(newTurn);

    if (newTurn >= currentStrategy.turnsBeforeFinalAnswer) {
      // Approaching final answer
      const systemMsg: Message = {
        id: nanoid(),
        content: "Preparing final analysis and recommendations...",
        role: "system",
        timestamp: new Date()
      };
      setTimeout(() => {
        setMessages(prev => [...prev, systemMsg]);
        // Some final coordinator message
        setTimeout(() => {
          const finalMsg: Message = {
            id: nanoid(),
            content: `Summarizing our discussion on "${selectedQ.question}". Here's our final recommendation...`,
            role: "assistant",
            agentId: "coordinator",
            agentName: "Coordinator",
            agentAvatar: "🧠",
            timestamp: new Date()
          };
          setMessages(prev => [...prev, finalMsg]);

          // End
          setTimeout(() => {
            const randomAgent = selectedAgents[Math.floor(Math.random() * selectedAgents.length)];
            const finalAnalysis: Message = {
              id: nanoid(),
              content: `## Final Analysis on "${selectedQ.question}"\n\nWe've considered multiple angles. The next steps involve X, Y, Z...`,
              role: "assistant",
              agentId: randomAgent?.id,
              agentName: randomAgent?.name,
              agentAvatar: randomAgent?.avatar,
              type: "final",
              timestamp: new Date()
            };
            setMessages(prev => [...prev, finalAnalysis]);
            setConversationStatus("complete");
            setIsSending(false);
          }, 1500);
        }, 1000);
      }, 800);
    } else {
      // Continue conversation
      setTimeout(() => {
        const randomAgent = selectedAgents[Math.floor(Math.random() * selectedAgents.length)];
        const response: Message = {
          id: nanoid(),
          content: `Regarding "${selectedQ.question}", I'd focus on the main priorities: resources, technical complexity, and business value.`,
          role: "assistant",
          agentId: randomAgent?.id,
          agentName: randomAgent?.name,
          agentAvatar: randomAgent?.avatar,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, response]);

        setTimeout(() => {
          const moreQuestions: NextQuestion[] = [
            { id: "q4", question: "How should we prioritize these steps?" },
            { id: "q5", question: "What are the biggest risks?" },
            { id: "q6", question: "How do we measure success?" }
          ];
          setNextQuestions(moreQuestions);
          setIsSending(false);
        }, 1000);
      }, 1500);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
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
  const NextQuestionsPanel = () => {
    if (nextQuestions.length === 0) return null;
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mt-8 mb-6"
      >
        <div className="flex flex-wrap gap-3 justify-center">
          {nextQuestions.map(q => (
            <motion.button
              key={q.id}
              initial={{ scale: 0.95 }}
              whileHover={{ scale: 1.02 }}
              className="bg-background text-left px-5 py-3.5 rounded-2xl border shadow-sm hover:bg-muted/50 transition-colors max-w-md"
              onClick={() => handleSelectQuestion(q.id)}
            >
              {q.question}
            </motion.button>
          ))}
        </div>
      </motion.div>
    );
  };

  // Welcome Message for empty state
  const WelcomeMessage = () => (
    <div className="h-full flex flex-col items-center justify-center text-center p-8">
      <div className="text-6xl mb-6">💬</div>
      <h3 className="text-2xl font-medium mb-3">
        Start a multi-agent conversation
      </h3>
      <p className="text-muted-foreground max-w-md mb-8 text-lg">
        Select agents from the panel and explore data engineering topics together.
      </p>
      
      <div className="w-full max-w-2xl">
        <h4 className="font-medium text-primary flex items-center text-lg mb-5">
          <MessageSquare className="h-5 w-5 mr-2" />
          Frequently Asked Questions
        </h4>
        
        <div className="grid grid-cols-1 gap-3 mt-4">
          <button 
            className="bg-background text-left px-5 py-3.5 rounded-2xl border shadow-sm hover:bg-muted/50 transition-colors w-full"
            onClick={() => {
              setInputValue("How would you design a scalable data pipeline architecture?");
              setTimeout(() => handleSendMessage(), 100);
            }}
          >
            How would you design a scalable data pipeline architecture?
          </button>
          
          <button 
            className="bg-background text-left px-5 py-3.5 rounded-2xl border shadow-sm hover:bg-muted/50 transition-colors w-full"
            onClick={() => {
              setInputValue("What are the best practices for data quality monitoring?");
              setTimeout(() => handleSendMessage(), 100);
            }}
          >
            What are the best practices for data quality monitoring?
          </button>
          
          <button 
            className="bg-background text-left px-5 py-3.5 rounded-2xl border shadow-sm hover:bg-muted/50 transition-colors w-full"
            onClick={() => {
              setInputValue("How should we approach migrating from batch to streaming data?");
              setTimeout(() => handleSendMessage(), 100);
            }}
          >
            How should we approach migrating from batch to streaming data?
          </button>
        </div>
        
        <div className="mt-6 text-xs text-muted-foreground text-center">
          Current Strategy: <span className="font-medium text-primary">{currentStrategy.name}</span> • {currentStrategy.description}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full w-full">
      <Card className="flex flex-col h-full w-full border-none shadow-none rounded-none">
        {/* Chat Header */}
        <div className="p-4 border-b bg-background/80 backdrop-blur-sm w-full">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold flex items-center">
              <Brain className="mr-2 h-5 w-5 text-primary" />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                Agent Discussion
              </span>
            </h2>
            {conversationStatus === "active" && (
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-sm bg-primary/5 text-primary border-primary/20">
                  <Clock className="h-3.5 w-3.5 mr-1" />
                  <span>Turn {currentTurn} of {currentStrategy.maxTurns}</span>
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-destructive border-destructive/20 hover:bg-destructive/10"
                  onClick={() => setConversationStatus("idle")}
                >
                  End Conversation
                </Button>
              </div>
            )}
          </div>
        </div>
        
        {/* Messages area - Full width */}
        <ScrollArea className="flex-1 px-4 py-6 w-full" ref={scrollAreaRef}>
          {messages.length <= 1 ? (
            <WelcomeMessage />
          ) : (
            <div className="space-y-6 pb-4 w-full">
              <AnimatePresence>
                {messages.slice(1).map((msg) => (
                  <ChatMessage key={msg.id} message={msg} />
                ))}
              </AnimatePresence>
              
              {/* Next questions */}
              {nextQuestions.length > 0 && conversationStatus === "active" && (
                <NextQuestionsPanel />
              )}
            </div>
          )}
        </ScrollArea>
        
        {/* Input area - Full width */}
        <div className="border-t bg-background/80 backdrop-blur-sm w-full relative">
          {conversationStatus === "idle" || conversationStatus === "active" ? (
            <>
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
                className="min-h-[60px] max-h-[200px] pr-16 resize-none text-base w-full
                  border-0 focus-visible:ring-0 focus-visible:outline-none rounded-none px-4 py-4"
                disabled={isSending || (conversationStatus === "active" && nextQuestions.length > 0)}
              />
              <div className="absolute right-3 bottom-3 flex space-x-1.5">
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  className="h-9 w-9 rounded-full text-muted-foreground hover:text-foreground"
                  disabled={isSending}
                >
                  <Paperclip className="h-5 w-5" />
                  <span className="sr-only">Attach file</span>
                </Button>
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  className="h-9 w-9 rounded-full text-muted-foreground hover:text-foreground"
                  disabled={isSending}
                >
                  <Mic className="h-5 w-5" />
                  <span className="sr-only">Voice input</span>
                </Button>
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  className="h-9 w-9 rounded-full text-muted-foreground hover:text-foreground"
                  disabled={isSending}
                >
                  <Code className="h-5 w-5" />
                  <span className="sr-only">Code snippet</span>
                </Button>
                <Button
                  type="submit"
                  size="icon"
                  className="h-9 w-9 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  disabled={
                    inputValue.trim() === "" ||
                    isSending ||
                    (conversationStatus === "active" && nextQuestions.length > 0)
                  }
                  onClick={handleSendMessage}
                >
                  <SendHorizontal className="h-5 w-5" />
                  <span className="sr-only">Send</span>
                </Button>
              </div>
            </>
          ) : conversationStatus === "complete" ? (
            <div className="flex space-x-4 w-full p-4">
              <Button variant="outline" className="flex-1 border-primary/20 text-base py-6">
                <Brain className="h-5 w-5 mr-2 text-primary" />
                New Conversation
              </Button>
              <Button className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground text-base py-6">
                <Sparkles className="h-5 w-5 mr-2" />
                Save Conversation
              </Button>
            </div>
          ) : (
            <div className="text-center py-4 w-full p-4">
              <p className="text-base text-destructive">
                An error occurred. Please try starting a new conversation.
              </p>
              <Button variant="outline" className="mt-4 text-base border-primary/20 py-6">
                Reset Conversation
              </Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
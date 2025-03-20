"use client";

import { ConnectionStatus } from "@/components/ConnectionStatus";
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
import { useStore, useSelectedAgents, useSelectedStrategy } from "@/store";

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
  const setConversationStatus = useStore((state) => state.setConversationStatus);

  const [inputValue, setInputValue] = useState("");
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

  // Handle question selection
  const handleSelectQuestion = (questionId: string) => {
    const selectedQ = nextQuestions.find(q => q.id === questionId);
    if (!selectedQ) return;
    
    // Clear next questions
    setNextQuestions([]);
    
    // Submit the selected question
    setInputValue(selectedQ.question);
    setTimeout(() => handleSendMessage(), 100);
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
          Current Strategy: <span className="font-medium text-primary">{currentStrategy?.name || 'None'}</span> • {currentStrategy?.description || 'Please select a strategy'}
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
          
          {/* Add the ConnectionStatus component here */}
          <div className="flex items-center gap-2">
            <ConnectionStatus />
            
            {conversationStatus === "active" && (
              <>
                {currentStrategy && (
                  <Badge variant="outline" className="text-sm bg-primary/5 text-primary border-primary/20">
                    <Clock className="h-3.5 w-3.5 mr-1" />
                    <span>Turn {currentTurn} of {currentStrategy.maxTurns}</span>
                  </Badge>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  className="text-destructive border-destructive/20 hover:bg-destructive/10"
                  onClick={() => resetConversation()}
                >
                  End Conversation
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
        
        {/* Messages area - Full width */}
        <ScrollArea className="flex-1 px-4 py-6 w-full" ref={scrollAreaRef}>
          {messages.length === 0 ? (
            <WelcomeMessage />
          ) : (
            <div className="space-y-6 pb-4 w-full">
              <AnimatePresence>
                {messages.map((msg) => (
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
                disabled={isProcessing || (conversationStatus === "active" && nextQuestions.length > 0)}
              />
              <div className="absolute right-3 bottom-3 flex space-x-1.5">
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  className="h-9 w-9 rounded-full text-muted-foreground hover:text-foreground"
                  disabled={isProcessing}
                >
                  <Paperclip className="h-5 w-5" />
                  <span className="sr-only">Attach file</span>
                </Button>
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  className="h-9 w-9 rounded-full text-muted-foreground hover:text-foreground"
                  disabled={isProcessing}
                >
                  <Mic className="h-5 w-5" />
                  <span className="sr-only">Voice input</span>
                </Button>
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  className="h-9 w-9 rounded-full text-muted-foreground hover:text-foreground"
                  disabled={isProcessing}
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
                    isProcessing ||
                    (conversationStatus === "active" && nextQuestions.length > 0) ||
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
              </div>
            </>
          ) : conversationStatus === "complete" ? (
            <div className="flex space-x-4 w-full p-4">
              <Button 
                variant="outline" 
                className="flex-1 border-primary/20 text-base py-6"
                onClick={() => resetConversation()}
              >
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
              <Button 
                variant="outline" 
                className="mt-4 text-base border-primary/20 py-6"
                onClick={() => resetConversation()}
              >
                Reset Conversation
              </Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
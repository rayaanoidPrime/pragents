"use client";

import { useState, useRef, useEffect } from "react";
import { SendHorizontal, Paperclip, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import TextareaAutosize from 'react-textarea-autosize';

interface ChatInputProps {
  onSendMessage: (content: string) => void;
  isLoading?: boolean;
  placeholder?: string;
}

export function ChatInput({ 
  onSendMessage, 
  isLoading = false, 
  placeholder = "Send a message..." 
}: ChatInputProps) {
  const [inputValue, setInputValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto focus on input when component mounts
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  const handleSendMessage = () => {
    if (!inputValue.trim() || isLoading) return;
    
    onSendMessage(inputValue);
    setInputValue("");
    
    // Refocus on input after sending
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="border-t p-4">
      <div className="flex items-end space-x-2">
        <div className="flex-1 relative">
          <TextareaAutosize
            ref={textareaRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="w-full resize-none bg-accent/50 rounded-md border border-input p-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            minRows={1}
            maxRows={5}
            disabled={isLoading}
          />
          <Button 
            size="icon" 
            variant="ghost" 
            className="absolute right-2 bottom-2 h-6 w-6 opacity-70 hover:opacity-100"
            disabled={isLoading}
          >
            <Paperclip className="h-4 w-4" />
          </Button>
        </div>
        <Button 
          size="icon" 
          onClick={handleSendMessage}
          disabled={!inputValue.trim() || isLoading}
          className="flex-shrink-0"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <SendHorizontal className="h-4 w-4" />
          )}
        </Button>
      </div>
      <div className="mt-2 text-xs text-muted-foreground text-center">
        <span>Agents will analyze your data engineering tasks and provide solutions</span>
      </div>
    </div>
  );
}
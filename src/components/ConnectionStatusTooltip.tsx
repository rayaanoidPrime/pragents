// src/components/ConnectionStatusTooltip.tsx
"use client";

import React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Badge } from '@/components/ui/badge';
import { 
  Wifi, 
  WifiOff,
  AlertTriangle,
  Loader2,
  ExternalLink
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from "@/components/ui/button";

interface ConnectionStatusTooltipProps {
  status: 'connected' | 'disconnected' | 'warning' | 'validating';
  message?: string;
  className?: string;
}

export function ConnectionStatusTooltip({ 
  status, 
  message,
  className 
}: ConnectionStatusTooltipProps) {
  // Determine badge style and icon based on status
  const getBadgeContent = () => {
    switch (status) {
      case 'connected':
        return {
          style: "bg-green-500/10 text-green-500 border-green-500/20",
          icon: <Wifi className="h-3.5 w-3.5" />,
          text: "Connected"
        };
      case 'disconnected':
        return {
          style: "bg-destructive/10 text-destructive border-destructive/20",
          icon: <WifiOff className="h-3.5 w-3.5" />,
          text: "Disconnected"
        };
      case 'warning':
        return {
          style: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
          icon: <AlertTriangle className="h-3.5 w-3.5" />,
          text: "Warning"
        };
      case 'validating':
        return {
          style: "bg-blue-500/10 text-blue-500 border-blue-500/20",
          icon: <Loader2 className="h-3.5 w-3.5 animate-spin" />,
          text: "Validating..."
        };
      default:
        return {
          style: "bg-muted/10 text-muted-foreground border-muted/20",
          icon: <AlertTriangle className="h-3.5 w-3.5" />,
          text: "Unknown"
        };
    }
  };

  const badgeContent = getBadgeContent();

  // Extract API key from message for monospace formatting
  const formatMessage = (msg: string) => {
    if (!msg) return msg;
    
    // If message contains API key reference, wrap it in monospace
    if (msg.includes('API key')) {
      return msg.replace(/(your_[a-z0-9*]+)/, '<span class="font-mono">$1</span>');
    }
    return msg;
  };

  // For simple status (connected/validating), use regular tooltip
  if (status === 'connected' || status === 'validating' || !message) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center">
              <Badge variant="outline" className={cn("gap-1 h-7 px-2.5", badgeContent.style, className)}>
                {badgeContent.icon}
                <span className="font-sans">{badgeContent.text}</span>
              </Badge>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p className="font-sans">{message || `Status: ${status}`}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  // For warning or disconnected with detailed message, use hover card for richer content
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="flex items-center cursor-help">
          <Badge variant="outline" className={cn("gap-1 h-7 px-2.5", badgeContent.style, className)}>
            {badgeContent.icon}
            <span className="font-sans">{badgeContent.text}</span>
          </Badge>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 p-0 border-0 bg-black text-white shadow-lg">
        <div className="flex items-center gap-2 p-3 border-b border-yellow-800/50">
          {status === 'warning' ? (
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
          ) : (
            <WifiOff className="h-5 w-5 text-destructive" />
          )}
          <div>
            <h4 className="text-sm font-semibold text-white font-sans">
              {status === 'warning' ? 'Connection Warning' : 'Connection Failed'}
            </h4>
          </div>
        </div>
        <div className="p-4">
          <p 
            className="text-sm leading-relaxed text-white font-sans" 
            dangerouslySetInnerHTML={{ __html: formatMessage(message) }}
          />
          
          {status === 'warning' && (
            <div className="text-xs rounded p-2 mt-3 text-gray-300 font-sans">
              <p>The system will continue to work, but some features may be limited.</p>
            </div>
          )}
          
          <div className="flex justify-end mt-4">
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs h-7 border-white/20 text-white hover:bg-white/10 hover:text-white font-sans"
            >
              <span>Troubleshoot</span>
              <ExternalLink className="ml-1 h-3 w-3" />
            </Button>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
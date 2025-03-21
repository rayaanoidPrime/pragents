"use client";

import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Toggle } from '@/components/ui/toggle';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Activity, Wifi, WifiOff } from 'lucide-react';

export function ConnectionStatus() {
  const [isConnected, setIsConnected] = useState(true);
  const [isLive, setIsLive] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  // Only update isLive state after the initial component mount to avoid auto-refresh issue
  useEffect(() => {
    if (initialLoad) {
      setInitialLoad(false);
    }
  }, [initialLoad]);

  const handleLiveToggle = (checked: boolean) => {
    // Only update when user explicitly interacts with the toggle
    if (!initialLoad) {
      setIsLive(checked);
    }
  };

  return (
    <TooltipProvider>
      <div className="flex items-center gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center">
              {isConnected ? (
                <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20 gap-1 h-7 px-2.5">
                  <Wifi className="h-3.5 w-3.5" />
                  <span>Connected</span>
                </Badge>
              ) : (
                <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20 gap-1 h-7 px-2.5">
                  <WifiOff className="h-3.5 w-3.5" />
                  <span>Disconnected</span>
                </Badge>
              )}
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Connection status to n8n workflow engine</p>
          </TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-1.5">
              <Switch
                id="live-mode"
                checked={isLive}
                onCheckedChange={handleLiveToggle}
                className="data-[state=checked]:bg-blue-600"
              />
              <Label 
                htmlFor="live-mode" 
                className={`text-xs cursor-pointer ${isLive ? 'text-blue-600 font-medium' : 'text-muted-foreground'}`}
              >
                Live
              </Label>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Toggle real-time updates</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
"use client";

import { 
  AlertCircle, 
  CheckCircle2, 
  RefreshCw,
  CloudOff,
  CloudCog
} from 'lucide-react';
import { useStore } from '@/store';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { n8nService } from '@/services/n8nService';

export function ConnectionStatus() {
  const apiSettings = useStore((state) => state.apiSettings);
  const updateApiSettings = useStore((state) => state.updateApiSettings);
  
  const isN8nConnected = apiSettings.n8nConnectionStatus === 'connected';
  const useDemoMode = apiSettings.useDemoMode;
  
  const checkN8nConnection = async () => {
    // Update status to checking
    updateApiSettings({
      n8nConnectionStatus: 'checking'
    });
    
    const isConnected = await n8nService.checkAvailability();
    
    updateApiSettings({
      n8nConnectionStatus: isConnected ? 'connected' : 'disconnected'
    });
  };
  
  const toggleDemoMode = (enabled: boolean) => {
    updateApiSettings({
      useDemoMode: enabled
    });
  };
  
  return (
    <div className="flex items-center space-x-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-1.5">
              {apiSettings.n8nConnectionStatus === 'checking' ? (
                <RefreshCw className="h-4 w-4 animate-spin text-blue-500" />
              ) : isN8nConnected ? (
                <CheckCircle2 className="h-4 w-4 text-green-500" />
              ) : (
                <AlertCircle className="h-4 w-4 text-amber-500" />
              )}
              <Badge variant={isN8nConnected ? "outline" : "outline"} className={`px-2 py-0 h-5 ${isN8nConnected ? "border-green-200 text-green-600" : "border-amber-200 text-amber-600"}`}>
                n8n {apiSettings.n8nConnectionStatus === 'checking' ? 'Checking...' : isN8nConnected ? "Connected" : "Disconnected"}
              </Badge>
            </div>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Status of connection to n8n workflow engine</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      <Button
        variant="ghost"
        size="icon"
        className="h-6 w-6"
        onClick={() => checkN8nConnection()}
      >
        <RefreshCw className="h-3.5 w-3.5" />
      </Button>
      
      <div className="flex items-center space-x-2 ml-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center space-x-2">
                <Switch 
                  checked={useDemoMode}
                  onCheckedChange={toggleDemoMode}
                  id="demo-mode"
                />
                <label 
                  htmlFor="demo-mode" 
                  className="text-sm font-medium cursor-pointer flex items-center gap-1.5"
                >
                  {useDemoMode ? (
                    <CloudOff className="h-3.5 w-3.5 text-slate-500" />
                  ) : (
                    <CloudCog className="h-3.5 w-3.5 text-blue-500" />
                  )}
                  {useDemoMode ? "Demo Mode" : "Live Mode"}
                </label>
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Toggle between using live n8n services or demo data</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
"use client";

import { useEffect, ReactNode } from 'react';
import { useStore } from '@/store';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { CloudOff, RefreshCw } from 'lucide-react';
import { n8nService } from '@/services/n8nService';
import { StoreState } from "@/types";

interface N8nProviderProps {
  children: ReactNode;
  showWarning?: boolean;
}

export function N8nProvider({ 
  children, 
  showWarning = true 
}: N8nProviderProps) {
  const apiSettings = useStore((state:StoreState) => state.apiSettings);
  const updateApiSettings = useStore((state:StoreState) => state.updateApiSettings);
  
  const checkN8nConnection = async () => {
    try {
      // Update status to checking
      updateApiSettings({
        n8nConnectionStatus: 'checking'
      });
      
      const isConnected = await n8nService.checkAvailability();
      
      updateApiSettings({
        n8nConnectionStatus: isConnected ? 'connected' : 'disconnected',
        // If disconnected and not already in demo mode, switch to demo
        useDemoMode: isConnected ? apiSettings.useDemoMode : true
      });
    } catch (error) {
      console.error('Failed to check n8n connection:', error);
      updateApiSettings({
        n8nConnectionStatus: 'disconnected',
        useDemoMode: true
      });
    }
  };

  // Check connection when component mounts
  useEffect(() => {
    checkN8nConnection();
    
    // Set up periodic connection check (every 30 seconds)
    const interval = setInterval(() => {
      checkN8nConnection();
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex flex-col">
      {showWarning && apiSettings.n8nConnectionStatus === 'disconnected' && (
        <Alert className="mb-4 border-amber-200 bg-amber-50 dark:bg-amber-950/10">
          <CloudOff className="h-4 w-4 text-amber-600" />
          <AlertTitle className="text-amber-800 dark:text-amber-400">n8n Not Connected</AlertTitle>
          <AlertDescription className="text-amber-700 dark:text-amber-300">
            <p className="mb-2">
              Unable to connect to the n8n workflow engine. Data engineering agent functions are running in demo mode.
            </p>
            <div className="flex gap-3 mt-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="text-amber-800 border-amber-300 hover:bg-amber-100 dark:text-amber-400 dark:border-amber-800 dark:hover:bg-amber-950"
                onClick={() => checkN8nConnection()}
              >
                <RefreshCw className="mr-2 h-3.5 w-3.5" />
                Retry Connection
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}
      {children}
    </div>
  );
}
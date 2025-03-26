"use client";

import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { 
  Activity, 
  RotateCcw, 
  Bot,
  BrainCircuit, 
  MessageSquare,
  SquareCode,
  Loader2
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from '@/lib/utils';
import { useStore, useSelectedStrategy } from '@/store';
import { connectionValidator } from '@/services/connectionValidator';
import { useToast } from '@/hooks/use-toast';
import { ConnectionStatusTooltip } from './ConnectionStatusTooltip';
import { StoreState, ApiSettings } from '@/types';

type BackendType = 'demo' | 'n8n-openai' | 'n8n-ollama' | 'n8n-claude' | 'n8n-default';

interface ConnectionOption {
  id: BackendType;
  name: string;
  icon: React.ReactNode;
  description: string;
  workflowType: string;
  envCheck?: () => boolean; // Function to check if required env vars are present
}

interface ConnectionSelectorProps {
  onBackendChange?: (backend: BackendType, workflowType: string) => void;
  onReset?: () => void;
  className?: string;
}

export function ConnectionSelector({ 
  onBackendChange, 
  onReset,
  className 
}: ConnectionSelectorProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [connectionWarning, setConnectionWarning] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Get store values and actions
  const apiSettings = useStore((state: StoreState) => state.apiSettings);
  const updateApiSettings = useStore((state: StoreState) => state.updateApiSettings);
  const currentTurn = useStore((state: StoreState) => state.currentTurn);
  const resetConversation = useStore((state: StoreState) => state.resetConversation);
  const currentStrategy = useSelectedStrategy();
  
  // Environment variable existence checks
  const hasOpenAIKey = (): boolean => !!process.env.NEXT_PUBLIC_OPENAI_API_KEY;
  const hasOllamaUrl = (): boolean => !!process.env.NEXT_PUBLIC_OLLAMA_API_URL;
  const hasClaudeKey = (): boolean => !!process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY;
  
  // Define connection options
  const backendOptions: ConnectionOption[] = [
    { 
      id: 'demo', 
      name: 'Demo Mode', 
      icon: <Bot className="h-4 w-4" />,
      description: 'Use pre-scripted agent responses',
      workflowType: 'demo'
    },
    { 
      id: 'n8n-default', 
      name: 'n8n Default', 
      icon: <Activity className="h-4 w-4" />,
      description: 'Connect to n8n workflow engine',
      workflowType: 'default'
    },
    { 
      id: 'n8n-openai', 
      name: 'n8n OpenAI', 
      icon: <MessageSquare className="h-4 w-4" />,
      description: 'Connect to OpenAI via n8n workflow',
      workflowType: 'openai',
      envCheck: hasOpenAIKey
    },
    { 
      id: 'n8n-ollama', 
      name: 'n8n Ollama', 
      icon: <BrainCircuit className="h-4 w-4" />,
      description: 'Connect to Ollama via n8n workflow',
      workflowType: 'ollama',
      envCheck: hasOllamaUrl
    },
    { 
      id: 'n8n-claude', 
      name: 'n8n Claude', 
      icon: <SquareCode className="h-4 w-4" />,
      description: 'Connect to Claude via n8n workflow',
      workflowType: 'claude',
      envCheck: hasClaudeKey
    }
  ];
  
  // Filter out options that are missing required env vars
  const availableBackendOptions = backendOptions.filter(option => {
    // Always show demo and default options
    if (option.id === 'demo' || option.id === 'n8n-default') return true;
    
    // Check if required env vars exist
    return !option.envCheck || option.envCheck();
  });
  
  // Map store values to component state
  const selectedBackendId = getSelectedBackendId();
  const connectionStatus = apiSettings.connectionStatus === 'connected' || 
                          apiSettings.n8nConnectionStatus === 'connected';
  const connectionError = apiSettings.connectionError;
  
  function getSelectedBackendId(): BackendType {
    if (apiSettings.useDemoMode) return 'demo';
    
    if (apiSettings.backendType === 'n8n') {
      const workflowType = apiSettings.n8nWorkflowType || 'default';
      
      // Map workflow type to backend ID
      switch (workflowType) {
        case 'openai': return 'n8n-openai';
        case 'ollama': return 'n8n-ollama';
        case 'claude': return 'n8n-claude';
        default: return 'n8n-default';
      }
    }
    
    // Fallback
    return 'n8n-default';
  }

  // Validate connection when component mounts or when API settings change
  useEffect(() => {
    validateCurrentConnection();
  }, [apiSettings.backendType, apiSettings.n8nWorkflowType, apiSettings.useDemoMode]);

  const validateCurrentConnection = async (): Promise<void> => {
    const backendOption = availableBackendOptions.find(option => option.id === selectedBackendId);
    if (backendOption) {
      await validateConnection(backendOption);
    }
  };

  // Determine the connection status for the tooltip
  const getConnectionStatus = (): 'connected' | 'disconnected' | 'warning' | 'validating' => {
    if (isValidating) return 'validating';
    if (connectionWarning) return 'warning';
    if (connectionStatus) return 'connected';
    return 'disconnected';
  };

  // Get the appropriate message for the tooltip
  const getStatusMessage = (): string => {
    if (isValidating) return 'Validating connection...';
    if (connectionWarning) return connectionWarning;
    if (connectionError) return connectionError;
    if (connectionStatus) return 'Successfully connected';
    return 'Not connected to backend';
  };

  const validateConnection = async (option: ConnectionOption): Promise<void> => {
    setIsValidating(true);
    setConnectionWarning(null);
    
    try {
      // For demo mode, no validation needed
      if (option.id === 'demo') {
        updateApiSettings({ 
          connectionStatus: 'connected',
          connectionError: null 
        });
        setIsValidating(false);
        return;
      }
      
      // Validate the connection with workflow type
      const result = await connectionValidator.validateConnection(
        'n8n', 
        false,
        option.workflowType
      );
      
      // Update store with result
      updateApiSettings({
        connectionStatus: result.success ? 'connected' : 'disconnected',
        connectionError: result.success ? null : result.message,
        n8nConnectionStatus: result.success ? 'connected' : 'disconnected'
      });
      
      // Check if there's a warning in the message (n8n connected but model has issues)
      if (result.success && result.message.includes('warning')) {
        setConnectionWarning(result.message);
      } else {
        setConnectionWarning(null);
      }
      
      if (!result.success) {
        toast({
          title: "Connection Failed",
          description: result.message,
          variant: "destructive"
        });
      }
    } catch (error) {
      updateApiSettings({
        connectionStatus: 'disconnected',
        connectionError: error instanceof Error ? error.message : 'Unknown connection error'
      });
      
      toast({
        title: "Connection Error",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive"
      });
    } finally {
      setIsValidating(false);
    }
  };

  const handleBackendChange = async (option: ConnectionOption): Promise<void> => {
    setIsValidating(true);
    
    try {
      const useDemoMode = option.id === 'demo';
      
      // Update API settings first
      updateApiSettings({ 
        useDemoMode,
        backendType: useDemoMode ? 'demo' : 'n8n', // Set backend type based on demo mode
        n8nWorkflowType: option.workflowType as any, // Set the workflow type
        connectionStatus: 'disconnected', // Reset connection status
        connectionError: null
      });
      
      // Then validate connection
      await validateConnection(option);
      
      toast({
        title: "Backend Changed",
        description: `Switched to ${option.name}`,
      });
      
      if (onBackendChange) {
        onBackendChange(option.id, option.workflowType);
      }
    } catch (error) {
      console.error('Error changing backend:', error);
      
      toast({
        title: "Error Changing Backend",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive"
      });
    } finally {
      setIsValidating(false);
      setIsDropdownOpen(false);
    }
  };

  const handleReset = (): void => {
    resetConversation();
    if (onReset) {
      onReset();
    }
    
    toast({
      title: "Conversation Reset",
      description: "All messages have been cleared",
    });
  };

  const getSelectedOption = (): ConnectionOption => {
    return availableBackendOptions.find(option => option.id === selectedBackendId) || availableBackendOptions[0];
  };

  return (
    <div className={cn("flex items-center gap-3", className)}>
      {/* Use the enhanced connection status tooltip */}
      <ConnectionStatusTooltip 
        status={getConnectionStatus()} 
        message={getStatusMessage()} 
      />
      
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            className="h-7 gap-1.5 text-xs px-2.5 bg-background"
            disabled={isValidating}
          >
            {isValidating ? (
              <Loader2 className="h-4 w-4 animate-spin mr-1" /> 
            ) : (
              getSelectedOption().icon
            )}
            <span>{getSelectedOption().name}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[220px]">
          {availableBackendOptions.map((option) => (
            <DropdownMenuItem 
              key={option.id}
              className={cn(
                "flex items-center gap-2 cursor-pointer",
                selectedBackendId === option.id && "bg-primary/10"
              )}
              onClick={() => handleBackendChange(option)}
              disabled={isValidating}
            >
              <div className="flex items-center gap-2 flex-1">
                <div className="bg-muted p-1 rounded-md">
                  {option.icon}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{option.name}</span>
                  <span className="text-xs text-muted-foreground">{option.description}</span>
                </div>
              </div>
              {selectedBackendId === option.id && (
                <Badge variant="secondary" className="ml-auto h-5 px-1.5">Active</Badge>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge variant="secondary" className="h-7 px-2.5 gap-1.5">
              <Activity className="h-3.5 w-3.5" />
              <span>Turn {currentTurn}/{currentStrategy?.maxTurns || '?'}</span>
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <p>Current conversation turn</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-7 w-7"
              onClick={handleReset}
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Reset conversation</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
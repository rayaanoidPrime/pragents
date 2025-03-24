// src/services/connectionValidator.ts

import { ApiSettings } from '@/types';

type ConnectionResult = {
  success: boolean;
  message: string;
};

/**
 * Service to validate connections to different AI backends
 */
export const connectionValidator = {
  /**
   * Validate basic n8n connection using our API proxy
   */
  async validateN8nBase(): Promise<ConnectionResult> {
    try {
      // Use our own Next.js API route as a proxy to avoid CORS issues
      const response = await fetch('/api/n8n/health', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
        cache: 'no-store'
      });
      
      if (!response.ok) {
        const error = await response.json();
        return { 
          success: false, 
          message: error.message || `n8n connection failed: ${response.status} ${response.statusText}` 
        };
      }
      
      const result = await response.json();
      return { 
        success: true, 
        message: result.message || 'Connected to n8n workflow engine' 
      };
    } catch (error) {
      console.error('n8n validation error:', error);
      return { 
        success: false, 
        message: `n8n connection error: ${error instanceof Error ? error.message : 'Unknown error'}` 
      };
    }
  },
  
  /**
   * Validate OpenAI connection
   */
  async validateOpenAI(): Promise<ConnectionResult> {
    const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
    
    if (!apiKey || apiKey.trim() === '') {
      return { 
        success: false, 
        message: 'OpenAI API key not found in environment variables' 
      };
    }
    
    try {
      // We should also handle this through a proxy API route to avoid exposing API keys
      const response = await fetch('/api/openai/validate', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        }
      });
      
      if (!response.ok) {
        const error = await response.json();
        return { 
          success: false, 
          message: `OpenAI API key is invalid: ${error.message || response.statusText}` 
        };
      }
      
      return { success: true, message: 'OpenAI API key is valid' };
    } catch (error) {
      console.error('OpenAI validation error:', error);
      return { 
        success: false, 
        message: `OpenAI validation error: ${error instanceof Error ? error.message : 'Unknown error'}` 
      };
    }
  },
  
  /**
   * Validate Ollama connection
   */
  async validateOllama(): Promise<ConnectionResult> {
    try {
      // Use a proxy API route for Ollama validation too
      const response = await fetch('/api/ollama/validate', {
        method: 'GET'
      });
      
      if (!response.ok) {
        const error = await response.json();
        return { 
          success: false, 
          message: `Ollama connection failed: ${error.message || response.statusText}` 
        };
      }
      
      return { success: true, message: 'Ollama is running locally' };
    } catch (error) {
      console.error('Ollama validation error:', error);
      return { 
        success: false, 
        message: `Ollama validation error: ${error instanceof Error ? error.message : 'Unknown error'}` 
      };
    }
  },
  
  /**
   * Validate Claude/Anthropic connection
   */
  async validateClaude(): Promise<ConnectionResult> {
    const apiKey = process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY;
    
    if (!apiKey || apiKey.trim() === '') {
      return { 
        success: false, 
        message: 'Claude/Anthropic API key not found in environment variables' 
      };
    }
    
    try {
      // Use a proxy API route for Claude validation
      const response = await fetch('/api/claude/validate', {
        method: 'GET'
      });
      
      if (!response.ok) {
        const error = await response.json();
        return { 
          success: false, 
          message: `Claude/Anthropic API key is invalid: ${error.message || response.statusText}` 
        };
      }
      
      return { success: true, message: 'Claude/Anthropic API key is valid' };
    } catch (error) {
      console.error('Claude validation error:', error);
      return { 
        success: false, 
        message: `Claude/Anthropic validation error: ${error instanceof Error ? error.message : 'Unknown error'}` 
      };
    }
  },
  
  /**
   * Validate n8n workflow with specific model type
   */
  async validateN8nWorkflow(workflowType: string): Promise<ConnectionResult> {
    // First check if n8n itself is running
    const n8nResult = await this.validateN8nBase();
    
    if (!n8nResult.success) {
      return n8nResult;
    }
    
    // For demo mode, no validation needed
    if (workflowType === 'demo') {
      return { success: true, message: 'Demo mode active' };
    }
    
    // If default n8n, no specific validation needed
    if (workflowType === 'default') {
      return { success: true, message: 'Connected to n8n workflow engine' };
    }
    
    // Check if there's a specific validation API for this workflow type
    try {
      const response = await fetch(`/api/n8n/workflows/${workflowType}/validate`, {
        method: 'GET'
      });
      
      if (response.ok) {
        const result = await response.json();
        return { 
          success: true, 
          message: result.message || `Connected to n8n ${workflowType} workflow` 
        };
      }
    } catch (error) {
      // If specific API fails, fall back to individual service validation
      console.log(`No specific validation API for workflow ${workflowType}, using individual service validation`);
    }
    
    // Then validate the model-specific API if needed
    let modelResult: ConnectionResult;
    
    switch (workflowType) {
      case 'openai':
        modelResult = await this.validateOpenAI();
        break;
      case 'ollama':
        modelResult = await this.validateOllama();
        break;
      case 'claude':
        modelResult = await this.validateClaude();
        break;
      default:
        // Unknown workflow type, just return n8n status
        return { 
          success: true, 
          message: `Connected to n8n with unknown workflow type: ${workflowType}` 
        };
    }
    
    // If n8n is running but the model API has issues, show a warning but still allow connection
    if (!modelResult.success) {
      return {
        success: true, // Still consider n8n connected for workflow operation
        message: `n8n connected, but ${workflowType} warning: ${modelResult.message}`
      };
    }
    
    // All good
    return { 
      success: true, 
      message: `Connected to n8n ${workflowType} workflow` 
    };
  },
  
  /**
   * Validate the currently selected backend
   */
  async validateConnection(backendType: string, useDemoMode: boolean, workflowType?: string): Promise<ConnectionResult> {
    // If demo mode is enabled, we don't actually connect to any API
    if (useDemoMode) {
      return { success: true, message: 'Connected to Demo Mode' };
    }
    
    // For n8n with a specific workflow type
    if (backendType === 'n8n' && workflowType) {
      return this.validateN8nWorkflow(workflowType);
    }
    
    // For basic n8n
    if (backendType === 'n8n') {
      return this.validateN8nBase();
    }
    
    // For direct connections to other backends
    switch (backendType) {
      case 'openai':
        return this.validateOpenAI();
      case 'ollama':
        return this.validateOllama();
      case 'claude':
        return this.validateClaude();
      default:
        return { success: false, message: `Unknown backend type: ${backendType}` };
    }
  }
};
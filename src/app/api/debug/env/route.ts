import { NextResponse } from 'next/server';

export async function GET() {
  // This route is only for debugging - DO NOT USE IN PRODUCTION
  // It exposes information about your environment variables
  
  return NextResponse.json({
    // Show which environment variables are available, not their values
    environment: {
      n8n: {
        NEXT_PUBLIC_AGENT_API_URL: !!process.env.NEXT_PUBLIC_AGENT_API_URL,
        NEXT_PUBLIC_AGENT_API_KEY: !!process.env.NEXT_PUBLIC_AGENT_API_KEY,
        NEXT_PUBLIC_N8N_DEFAULT_WORKFLOW: !!process.env.NEXT_PUBLIC_N8N_DEFAULT_WORKFLOW,
        NEXT_PUBLIC_N8N_OPENAI_WORKFLOW: !!process.env.NEXT_PUBLIC_N8N_OPENAI_WORKFLOW,
        NEXT_PUBLIC_N8N_OLLAMA_WORKFLOW: !!process.env.NEXT_PUBLIC_N8N_OLLAMA_WORKFLOW,
        NEXT_PUBLIC_N8N_CLAUDE_WORKFLOW: !!process.env.NEXT_PUBLIC_N8N_CLAUDE_WORKFLOW,
      },
      models: {
        NEXT_PUBLIC_OPENAI_API_KEY: !!process.env.NEXT_PUBLIC_OPENAI_API_KEY,
        NEXT_PUBLIC_OLLAMA_API_URL: !!process.env.NEXT_PUBLIC_OLLAMA_API_URL,
        NEXT_PUBLIC_ANTHROPIC_API_KEY: !!process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY,
        NEXT_PUBLIC_AZURE_OPENAI_API_KEY: !!process.env.NEXT_PUBLIC_AZURE_OPENAI_API_KEY,
        NEXT_PUBLIC_AZURE_OPENAI_ENDPOINT: !!process.env.NEXT_PUBLIC_AZURE_OPENAI_ENDPOINT,
      },
      database: {
        DATABASE_URL: !!process.env.DATABASE_URL,
      },
      auth: {
        NEXTAUTH_URL: !!process.env.NEXTAUTH_URL,
        NEXTAUTH_SECRET: !!process.env.NEXTAUTH_SECRET,
      },
      node: {
        NODE_ENV: process.env.NODE_ENV,
      },
    },
    
    // Safe URLs (no secrets)
    urls: {
      n8n: process.env.NEXT_PUBLIC_AGENT_API_URL,
      ollama: process.env.NEXT_PUBLIC_OLLAMA_API_URL,
    }
  });
}
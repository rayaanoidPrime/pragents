import { NextResponse } from 'next/server';

export async function GET() {
  const results: any = {
    timestamp: new Date().toISOString(),
    connections: {}
  };

  // Try to connect to n8n
  try {
    const n8nUrl = process.env.NEXT_PUBLIC_AGENT_API_URL || 'http://n8n:5678';
    console.log(`Testing connection to n8n at ${n8nUrl}/healthz`);
    
    const n8nResponse = await fetch(`${n8nUrl}/healthz`, {
      method: 'GET',
      cache: 'no-store',
      headers: {
        'Accept': 'application/json',
      },
    });
    
    results.connections.n8n = {
      url: n8nUrl,
      status: n8nResponse.status,
      ok: n8nResponse.ok,
      statusText: n8nResponse.statusText,
    };
    
    if (n8nResponse.ok) {
      try {
        const data = await n8nResponse.json();
        results.connections.n8n.data = data;
      } catch (e) {
        results.connections.n8n.parseError = "Could not parse JSON response";
      }
    }
  } catch (error) {
    results.connections.n8n = {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    };
  }

  // Try to connect to Ollama
  try {
    const ollamaUrl = process.env.NEXT_PUBLIC_OLLAMA_API_URL || 'http://ollama:11434';
    console.log(`Testing connection to Ollama at ${ollamaUrl}/api/tags`);
    
    const ollamaResponse = await fetch(`${ollamaUrl}/api/tags`, {
      method: 'GET',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    results.connections.ollama = {
      url: ollamaUrl,
      status: ollamaResponse.status,
      ok: ollamaResponse.ok,
      statusText: ollamaResponse.statusText,
    };
    
    if (ollamaResponse.ok) {
      try {
        const data = await ollamaResponse.json();
        results.connections.ollama.models = data.models?.length || 0;
      } catch (e) {
        results.connections.ollama.parseError = "Could not parse JSON response";
      }
    }
  } catch (error) {
    results.connections.ollama = {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    };
  }

  // Check environment variables
  results.environment = {
    n8n: {
      NEXT_PUBLIC_AGENT_API_URL: process.env.NEXT_PUBLIC_AGENT_API_URL,
      NEXT_PUBLIC_AGENT_API_KEY: process.env.NEXT_PUBLIC_AGENT_API_KEY ? '[REDACTED]' : undefined,
    },
    ollama: {
      NEXT_PUBLIC_OLLAMA_API_URL: process.env.NEXT_PUBLIC_OLLAMA_API_URL,
    },
    claude: {
      NEXT_PUBLIC_ANTHROPIC_API_KEY: process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY ? '[REDACTED]' : undefined,
    },
    openai: {
      NEXT_PUBLIC_OPENAI_API_KEY: process.env.NEXT_PUBLIC_OPENAI_API_KEY ? '[REDACTED]' : undefined,
    }
  };

  return NextResponse.json(results);
}
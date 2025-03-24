// src/app/api/ollama/validate/route.ts
import { NextResponse } from 'next/server';

/**
 * API route to validate Ollama connection
 * This acts as a proxy to avoid CORS issues
 */
export async function GET() {
  try {
    const ollamaUrl = process.env.NEXT_PUBLIC_OLLAMA_API_URL || 'http://localhost:11434';
    
    const response = await fetch(`${ollamaUrl}/api/tags`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      cache: 'no-store'
    });
    
    if (!response.ok) {
      return NextResponse.json(
        { 
          success: false, 
          message: `Ollama connection failed: ${response.status} ${response.statusText}` 
        }, 
        { status: response.status }
      );
    }
    
    const data = await response.json();
    
    return NextResponse.json({
      success: true,
      message: 'Ollama is running locally',
      // Return available models
      models: data.models || []
    });
  } catch (error) {
    console.error('Error checking Ollama connection:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: `Ollama connection error: ${error instanceof Error ? error.message : 'Unknown error'}` 
      }, 
      { status: 500 }
    );
  }
}
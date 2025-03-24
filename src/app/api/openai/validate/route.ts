// src/app/api/openai/validate/route.ts
import { NextResponse } from 'next/server';

/**
 * API route to validate OpenAI API key
 * This acts as a proxy to avoid exposing API keys to the client
 */
export async function GET() {
  try {
    const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
    
    if (!apiKey || apiKey.trim() === '') {
      return NextResponse.json(
        { success: false, message: 'OpenAI API key not found in environment variables' }, 
        { status: 400 }
      );
    }
    
    const response = await fetch('https://api.openai.com/v1/models', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: { message: 'Unknown error' } }));
      return NextResponse.json(
        { success: false, message: error.error?.message || response.statusText }, 
        { status: response.status }
      );
    }
    
    const models = await response.json();
    
    return NextResponse.json({
      success: true,
      message: 'OpenAI API key is valid',
      // Optionally return a limited subset of models to avoid large payloads
      modelCount: models.data?.length || 0
    });
  } catch (error) {
    console.error('Error validating OpenAI API key:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: `Error validating OpenAI API key: ${error instanceof Error ? error.message : 'Unknown error'}` 
      }, 
      { status: 500 }
    );
  }
}
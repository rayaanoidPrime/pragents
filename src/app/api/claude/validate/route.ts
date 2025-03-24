// src/app/api/claude/validate/route.ts
import { NextResponse } from 'next/server';

/**
 * API route to validate Claude/Anthropic API key
 * This acts as a proxy to avoid exposing API keys to the client
 */
export async function GET() {
  try {
    const apiKey = process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY;
    
    if (!apiKey || apiKey.trim() === '') {
      return NextResponse.json(
        { success: false, message: 'Claude/Anthropic API key not found in environment variables' }, 
        { status: 400 }
      );
    }
    
    // Basic validation - check if it looks like a valid Anthropic key
    if (!apiKey.startsWith('sk-')) {
      return NextResponse.json(
        { success: false, message: 'Claude/Anthropic API key appears to be invalid (should start with sk-)' }, 
        { status: 400 }
      );
    }
    
    // For more robust validation, we could make a lightweight API call to Anthropic
    // Using the models endpoint or a similar lightweight endpoint
    // However, for now we'll just do the basic check above
    
    return NextResponse.json({
      success: true,
      message: 'Claude/Anthropic API key appears valid'
    });
  } catch (error) {
    console.error('Error validating Claude/Anthropic API key:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: `Error validating Claude/Anthropic API key: ${error instanceof Error ? error.message : 'Unknown error'}` 
      }, 
      { status: 500 }
    );
  }
}
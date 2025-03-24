// src/app/api/n8n/health/route.ts
import { NextResponse } from 'next/server';

/**
 * API route to check n8n health status
 * This acts as a proxy to avoid CORS issues
 */
export async function GET() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_AGENT_API_URL || 'http://localhost:5678';
    
    const response = await fetch(`${apiUrl}/healthz`, {
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
          message: `n8n connection failed: ${response.status} ${response.statusText}` 
        }, 
        { status: response.status }
      );
    }
    
    const data = await response.json();
    
    return NextResponse.json({
      success: true,
      message: 'Connected to n8n workflow engine',
      data
    });
  } catch (error) {
    console.error('Error checking n8n health:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: `n8n connection error: ${error instanceof Error ? error.message : 'Unknown error'}` 
      }, 
      { status: 500 }
    );
  }
}
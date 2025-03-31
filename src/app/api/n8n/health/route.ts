import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Get the API URL from environment variable
    const apiUrl = process.env.NEXT_PUBLIC_AGENT_API_URL || 'http://localhost:5678';
    console.log(`Checking n8n health at ${apiUrl}/healthz`);
    
    // Call the n8n health endpoint
    const response = await fetch(`${apiUrl}/healthz`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      cache: 'no-store'
    });
    
    if (!response.ok) {
      console.error(`N8n health check failed: ${response.status} ${response.statusText}`);
      return NextResponse.json(
        { n8nAvailable: false, message: `n8n health check failed: ${response.status} ${response.statusText}` },
        { status: response.status }
      );
    }
    
    // Successfully connected to n8n
    console.log('N8n health check succeeded');
    return NextResponse.json({ n8nAvailable: true });
  } catch (error) {
    console.error('Error checking n8n health:', error);
    return NextResponse.json(
      { n8nAvailable: false, message: `Error checking n8n health: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    );
  }
}
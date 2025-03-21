// src/app/api/n8n/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('http://localhost:5678/healthz', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    const status = response.ok ? 200 : 500;
    return NextResponse.json({ status: response.ok ? 'connected' : 'disconnected' }, { status });
  } catch (error) {
    return NextResponse.json({ status: 'disconnected' }, { status: 500 });
  }
}
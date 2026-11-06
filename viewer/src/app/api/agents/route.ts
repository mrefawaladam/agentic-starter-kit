import { NextResponse } from 'next/server';
import { getAllAgents } from '@/lib/storage';

export async function GET() {
  try {
    const agents = getAllAgents();
    return NextResponse.json({ agents });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

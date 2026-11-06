import { NextResponse } from 'next/server';
import { getBacklogData, saveBacklogData, BacklogData } from '@/lib/storage';

export async function GET() {
  try {
    const data = getBacklogData();
    return NextResponse.json(data);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as BacklogData;
    saveBacklogData(body);
    return NextResponse.json({ success: true, message: 'Backlog updated successfully' });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

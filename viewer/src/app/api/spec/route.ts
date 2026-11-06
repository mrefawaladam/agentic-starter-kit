import { NextResponse } from 'next/server';
import { readSpecFile } from '@/lib/storage';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const filePath = searchParams.get('path');

    if (!filePath) {
      return NextResponse.json({ error: 'Parameter path is required' }, { status: 400 });
    }

    const content = readSpecFile(filePath);
    return NextResponse.json({ content, path: filePath });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

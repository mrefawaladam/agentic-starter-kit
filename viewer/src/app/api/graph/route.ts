import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import { getProjectRoot } from '@/lib/storage';

export async function GET() {
  try {
    const root = getProjectRoot();
    const graphPath = path.join(root, 'data', 'knowledge-graph.json');

    if (!fs.existsSync(graphPath)) {
      return NextResponse.json({ error: 'Knowledge graph not found' }, { status: 404 });
    }

    const content = fs.readFileSync(graphPath, 'utf-8');
    const data = JSON.parse(content);

    return NextResponse.json(data);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

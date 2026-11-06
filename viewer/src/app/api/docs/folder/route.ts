import { NextResponse } from 'next/server';
import { createDocFolder } from '@/lib/storage';

export async function POST(req: Request) {
  try {
    const { path: folderPath } = await req.json();
    if (!folderPath) {
      return NextResponse.json({ error: 'Parameter path folder wajib diisi' }, { status: 400 });
    }

    createDocFolder(folderPath);
    return NextResponse.json({ success: true, message: 'Folder berhasil dibuat', path: folderPath });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

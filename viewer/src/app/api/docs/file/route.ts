import { NextResponse } from 'next/server';
import { writeSpecFile, readSpecFile } from '@/lib/storage';

export async function POST(req: Request) {
  try {
    const { path: filePath, content } = await req.json();
    if (!filePath) {
      return NextResponse.json({ error: 'Parameter path wajib diisi' }, { status: 400 });
    }

    const defaultContent = content || `# ${filePath.split('/').pop()?.replace('.md', '')}\n\nDokumen baru dibuat pada ${new Date().toLocaleDateString('id-ID')}.\n\n## 1. Pendahuluan\nIsi rincian spesifikasi di sini.`;
    writeSpecFile(filePath, defaultContent);

    return NextResponse.json({ success: true, message: 'File berhasil dibuat', path: filePath });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { path: filePath, content } = await req.json();
    if (!filePath || content === undefined) {
      return NextResponse.json({ error: 'Path dan content wajib diisi' }, { status: 400 });
    }

    writeSpecFile(filePath, content);
    return NextResponse.json({ success: true, message: 'Dokumen berhasil disimpan', path: filePath });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

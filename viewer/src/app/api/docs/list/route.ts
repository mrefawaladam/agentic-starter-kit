import { NextResponse } from 'next/server';
import { getDocsTree, DocNode, getProjectRoot } from '@/lib/storage';
import path from 'path';
import fs from 'fs';

export interface FlattenedDocItem {
  title: string;
  path: string;
  category: string;
  type: 'prd' | 'epic' | 'feature' | 'architecture' | 'api' | 'security' | 'qa' | 'governance' | 'other';
}

function flattenTree(nodes: DocNode[]): FlattenedDocItem[] {
  const result: FlattenedDocItem[] = [];
  const root = getProjectRoot();

  function traverse(items: DocNode[]) {
    for (const item of items) {
      if (item.type === 'directory' && item.children) {
        traverse(item.children);
      } else if (item.type === 'file' && item.path.endsWith('.md')) {
        let docType: FlattenedDocItem['type'] = 'other';
        const p = item.path;

        if (p.includes('/prd/')) docType = 'prd';
        else if (p.includes('/epics/')) docType = 'epic';
        else if (p.includes('/features/')) docType = 'feature';
        else if (p.includes('/05-architecture/')) docType = 'architecture';
        else if (p.includes('/06-api/')) docType = 'api';
        else if (p.includes('/07-security-compliance/')) docType = 'security';
        else if (p.includes('/08-quality-assurance/')) docType = 'qa';
        else if (p.includes('/00-governance/')) docType = 'governance';

        let displayTitle = item.name.replace(/\.md$/, '');
        try {
          const fullPath = path.join(root, item.path);
          if (fs.existsSync(fullPath)) {
            const raw = fs.readFileSync(fullPath, 'utf-8');
            const h1Match = raw.match(/^#\s+(.+)$/m);
            const frontTitle = raw.match(/title:\s*["']?([^"'\n]+)["']?/m);
            if (h1Match && h1Match[1]) {
              displayTitle = h1Match[1].replace(/^[^\w\s]+/, '').trim();
            } else if (frontTitle && frontTitle[1]) {
              displayTitle = frontTitle[1].trim();
            }
          }
        } catch {
          // ignore
        }

        result.push({
          title: displayTitle,
          path: item.path,
          category: item.path.split('/')[1] || 'docs',
          type: docType,
        });
      }
    }
  }

  traverse(nodes);
  return result;
}

export async function GET() {
  try {
    const tree = getDocsTree();
    const docs = flattenTree(tree);
    return NextResponse.json({ docs });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

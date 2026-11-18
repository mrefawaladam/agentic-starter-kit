'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { MermaidRenderer } from './MermaidRenderer';

interface MarkdownViewerProps {
  content: string;
}

export function MarkdownViewer({ content }: MarkdownViewerProps) {
  return (
    <div className="prose max-w-none text-slate-800">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          img({ src, alt, ...props }: any) {
            // Jika src adalah path file lokal (misal: docs/08-quality-assurance/evidence/... atau /docs/...)
            // arahkan ke /api/evidence?path=...
            let resolvedSrc = src;
            if (src && !src.startsWith('http://') && !src.startsWith('https://') && !src.startsWith('data:')) {
              const cleanPath = src.startsWith('/') ? src.slice(1) : src;
              resolvedSrc = `/api/evidence?path=${encodeURIComponent(cleanPath)}`;
            }

            return (
              <span className="block my-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={resolvedSrc}
                  alt={alt || 'QA Evidence / Screenshot'}
                  className="rounded-lg border border-[#DFE1E6] shadow-xs max-h-[500px] object-contain bg-slate-50"
                  loading="lazy"
                  {...props}
                />
                {alt && <span className="block text-center text-xs text-[#6B778C] mt-1 font-sans">{alt}</span>}
              </span>
            );
          },
          code({ inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || '');
            const lang = match ? match[1] : '';
            const codeString = String(children).replace(/\n$/, '');

            if (!inline && lang === 'mermaid') {
              return <MermaidRenderer code={codeString} />;
            }

            return (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

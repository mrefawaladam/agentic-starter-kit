'use client';

import React, { useEffect, useState, useRef } from 'react';
import mermaid from 'mermaid';

interface MermaidProps {
  code: string;
}

export function MermaidRenderer({ code }: MermaidProps) {
  const [svgHtml, setSvgHtml] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;

    mermaid.initialize({
      startOnLoad: false,
      theme: 'neutral',
      securityLevel: 'loose',
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
    });

    const uniqueId = `mermaid-${Math.random().toString(36).substring(2, 9)}`;

    mermaid
      .render(uniqueId, code)
      .then(({ svg }) => {
        if (isMounted) {
          setSvgHtml(svg);
          setError(null);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err?.message || 'Gagal merender diagram Mermaid');
        }
      });

    return () => {
      isMounted = false;
    };
  }, [code]);

  if (error) {
    return (
      <div className="my-4 p-4 rounded-xl border border-amber-200 bg-amber-50 text-amber-900 text-xs">
        <div className="font-semibold mb-1">Diagram Mermaid (Format Preview):</div>
        <pre className="font-mono text-[11px] overflow-x-auto bg-white/80 p-2.5 rounded-lg border border-amber-200/60 text-slate-800">
          {code}
        </pre>
      </div>
    );
  }

  if (!svgHtml) {
    return (
      <div className="my-4 p-6 flex items-center justify-center bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-400 font-mono animate-pulse">
        Merender diagram Mermaid...
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="my-4 p-5 rounded-xl border border-slate-200 bg-white shadow-xs overflow-x-auto flex justify-center transition-all hover:border-blue-300"
      dangerouslySetInnerHTML={{ __html: svgHtml }}
    />
  );
}

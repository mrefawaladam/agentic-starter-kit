'use client';

import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import mermaid from 'mermaid';
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize2,
  Minimize2,
  Scan,
  Download,
  Copy,
  Check,
  Workflow,
  X,
} from 'lucide-react';

interface MermaidProps {
  code: string;
}

export function MermaidRenderer({ code }: MermaidProps) {
  const [svgHtml, setSvgHtml] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [scale, setScale] = useState<number>(1);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const hintTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Render Mermaid code to SVG
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

  // Extract natural SVG width & height from viewBox or width/height attributes
  const svgDimensions = useMemo<{ width: number; height: number } | null>(() => {
    if (!svgHtml) return null;

    // Try viewBox first: viewBox="minX minY width height"
    const vbMatch = svgHtml.match(
      /viewBox=["']\s*([0-9.-]+)\s+([0-9.-]+)\s+([0-9.-]+)\s+([0-9.-]+)\s*["']/
    );
    if (vbMatch) {
      const w = parseFloat(vbMatch[3]);
      const h = parseFloat(vbMatch[4]);
      if (w > 0 && h > 0) {
        return { width: Math.round(w), height: Math.round(h) };
      }
    }

    // Try explicit width & height attributes
    const wMatch = svgHtml.match(/\bwidth=["']([0-9.]+)px?["']/);
    const hMatch = svgHtml.match(/\bheight=["']([0-9.]+)px?["']/);
    if (wMatch && hMatch) {
      const w = parseFloat(wMatch[1]);
      const h = parseFloat(hMatch[1]);
      if (w > 0 && h > 0) {
        return { width: Math.round(w), height: Math.round(h) };
      }
    }

    return null;
  }, [svgHtml]);

  // Calculate Fit to Viewport
  const fitToView = useCallback(() => {
    if (!viewportRef.current) return;

    const containerW = viewportRef.current.clientWidth - 48;
    const containerH = viewportRef.current.clientHeight - 48;

    if (svgDimensions && containerW > 0 && containerH > 0) {
      const scaleW = containerW / svgDimensions.width;
      const scaleH = containerH / svgDimensions.height;
      // Fit both width & height inside container, but do not upscale small diagrams past 1.0 (100%)
      const autoFit = Math.min(scaleW, scaleH, 1.0);
      setScale(Number(Math.max(0.1, autoFit).toFixed(2)));
      setPosition({ x: 0, y: 0 });
      return;
    }

    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, [svgDimensions]);

  // Toggle between Fit to View and 100% (Natural Size)
  const toggleFitOr100 = useCallback(() => {
    if (Math.abs(scale - 1) < 0.05) {
      fitToView();
    } else {
      setScale(1);
      setPosition({ x: 0, y: 0 });
    }
  }, [scale, fitToView]);

  // Initial Auto-Fit when SVG loads or fullscreen toggles
  useEffect(() => {
    if (svgHtml && svgDimensions) {
      // Delay slightly for DOM layout measurement
      const timer = setTimeout(() => {
        fitToView();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [svgHtml, svgDimensions, isFullscreen, fitToView]);

  // Handle Fullscreen Scroll Lock & Escape key
  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsFullscreen(false);
        } else if (e.key === '+' || e.key === '=') {
          setScale((prev) => Math.min(5, Number((prev * 1.2).toFixed(2))));
        } else if (e.key === '-') {
          setScale((prev) => Math.max(0.15, Number((prev / 1.2).toFixed(2))));
        } else if (e.key === '0') {
          fitToView();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isFullscreen, fitToView]);

  // Smooth Global Drag Handlers
  useEffect(() => {
    if (!isDragging) return;

    const handleGlobalMouseMove = (e: MouseEvent) => {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    };

    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    window.addEventListener('mouseup', handleGlobalMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging, dragStart]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only primary left mouse click and not clicking interactive controls
    if (e.button !== 0) return;
    if ((e.target as HTMLElement).closest('button')) return;
    e.preventDefault();
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    // In fullscreen or when Ctrl / Cmd is held, zoom in/out
    if (isFullscreen || e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const zoomFactor = e.deltaY < 0 ? 1.15 : 0.87;
      setScale((prev) => {
        const next = prev * zoomFactor;
        return Number(Math.min(5, Math.max(0.15, next)).toFixed(2));
      });
    } else {
      // Show subtle hint if user tries to scroll without Ctrl in embedded view
      setShowHint(true);
      if (hintTimeoutRef.current) clearTimeout(hintTimeoutRef.current);
      hintTimeoutRef.current = setTimeout(() => setShowHint(false), 2000);
    }
  };

  const zoomIn = () => {
    setScale((prev) => Math.min(5, Number((prev * 1.25).toFixed(2))));
  };

  const zoomOut = () => {
    setScale((prev) => Math.max(0.15, Number((prev / 1.25).toFixed(2))));
  };

  const resetView = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const downloadSvg = () => {
    if (!svgHtml) return;
    const blob = new Blob([svgHtml], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mermaid-diagram-${Date.now()}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error('Failed to copy Mermaid code', e);
    }
  };

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
      <div className="my-4 p-8 flex items-center justify-center bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-400 font-mono animate-pulse">
        Merender diagram Mermaid...
      </div>
    );
  }

  const zoomPercent = Math.round(scale * 100);

  return (
    <div
      ref={containerRef}
      className={
        isFullscreen
          ? 'fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md p-3 md:p-6 flex flex-col animate-in fade-in duration-150'
          : 'my-6 rounded-2xl border border-slate-200/90 bg-white shadow-sm overflow-hidden flex flex-col transition-all hover:border-slate-300'
      }
    >
      {/* Interactive Top Toolbar */}
      <div className="flex items-center justify-between px-3.5 py-2 bg-slate-50/90 border-b border-slate-200 text-slate-700 text-xs select-none">
        {/* Left: Indicator & Hint */}
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 font-medium text-slate-700 bg-white px-2.5 py-1 rounded-md border border-slate-200 shadow-2xs">
            <Workflow className="w-3.5 h-3.5 text-blue-600" />
            <span>Mermaid Diagram</span>
          </span>
          <span className="hidden sm:inline-block text-[11px] text-slate-500">
            {isFullscreen ? 'Tahan geser untuk pan • Scroll untuk zoom' : 'Klik & drag untuk geser'}
          </span>
        </div>

        {/* Right: Controls */}
        <div className="flex items-center gap-1 bg-white p-0.5 rounded-lg border border-slate-200 shadow-2xs">
          {/* Zoom Out */}
          <button
            type="button"
            onClick={zoomOut}
            title="Perkecil (-)"
            className="p-1.5 rounded-md hover:bg-slate-100 active:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>

          {/* Zoom Level Indicator (Clickable to Toggle Fit / 100%) */}
          <button
            type="button"
            onClick={toggleFitOr100}
            title={Math.abs(scale - 1) < 0.05 ? 'Paskan ke Layar (Fit)' : 'Reset ke 100%'}
            className="px-2 py-0.5 font-mono text-[11px] font-semibold text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
          >
            {zoomPercent}%
          </button>

          {/* Zoom In */}
          <button
            type="button"
            onClick={zoomIn}
            title="Perbesar (+)"
            className="p-1.5 rounded-md hover:bg-slate-100 active:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>

          <div className="w-[1px] h-3.5 bg-slate-200 my-auto mx-0.5" />

          {/* Fit to Viewport */}
          <button
            type="button"
            onClick={fitToView}
            title="Paskan ke Layar (Fit)"
            className="p-1.5 rounded-md hover:bg-slate-100 active:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors"
          >
            <Scan className="w-3.5 h-3.5" />
          </button>

          {/* Reset View */}
          <button
            type="button"
            onClick={resetView}
            title="Reset Posisi & Zoom"
            className="p-1.5 rounded-md hover:bg-slate-100 active:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <div className="w-[1px] h-3.5 bg-slate-200 my-auto mx-0.5" />

          {/* Download SVG */}
          <button
            type="button"
            onClick={downloadSvg}
            title="Download SVG"
            className="p-1.5 rounded-md hover:bg-slate-100 active:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
          </button>

          {/* Copy Code */}
          <button
            type="button"
            onClick={copyCode}
            title="Salin Kode Mermaid"
            className="p-1.5 rounded-md hover:bg-slate-100 active:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>

          <div className="w-[1px] h-3.5 bg-slate-200 my-auto mx-0.5" />

          {/* Fullscreen Toggle */}
          <button
            type="button"
            onClick={() => setIsFullscreen(!isFullscreen)}
            title={isFullscreen ? 'Keluar Layar Penuh (Esc)' : 'Tampilkan Layar Penuh'}
            className="p-1.5 rounded-md hover:bg-blue-50 active:bg-blue-100 text-blue-600 transition-colors"
          >
            {isFullscreen ? (
              <Minimize2 className="w-3.5 h-3.5" />
            ) : (
              <Maximize2 className="w-3.5 h-3.5" />
            )}
          </button>

          {isFullscreen && (
            <button
              type="button"
              onClick={() => setIsFullscreen(false)}
              title="Tutup (Esc)"
              className="p-1.5 rounded-md hover:bg-red-50 text-red-600 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Canvas Viewport */}
      <div
        ref={viewportRef}
        onMouseDown={handleMouseDown}
        onWheel={handleWheel}
        onDoubleClick={toggleFitOr100}
        style={{
          backgroundImage:
            'radial-gradient(circle, #cbd5e1 1.2px, transparent 1.2px)',
          backgroundSize: '24px 24px',
          backgroundPosition: `${position.x % 24}px ${position.y % 24}px`,
        }}
        className={`relative overflow-hidden bg-slate-50/60 select-none ${
          isFullscreen ? 'flex-1 w-full min-h-0' : 'h-[500px] w-full'
        } ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      >
        {/* Subtle Ctrl + Scroll Hint Toast */}
        {showHint && !isFullscreen && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none bg-slate-900/80 text-white text-[11px] font-medium px-3 py-1.5 rounded-full shadow-lg backdrop-blur-xs animate-in fade-in duration-200">
            Tahan <kbd className="bg-slate-700 px-1 py-0.5 rounded text-[10px]">Ctrl</kbd> + Scroll untuk Zoom • Double click untuk Toggle Fit / 100%
          </div>
        )}

        {/* Diagram Transform Wrapper */}
        <div
          className="w-full h-full flex items-center justify-center pointer-events-none"
          style={{
            transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${scale})`,
            transformOrigin: 'center center',
            transition: isDragging ? 'none' : 'transform 0.15s cubic-bezier(0.2, 0, 0, 1)',
          }}
        >
          <div
            className="mermaid-svg-container pointer-events-auto flex items-center justify-center shadow-xs bg-white/50 rounded-xl transition-shadow [&_svg]:!max-w-none [&_svg]:!w-full [&_svg]:!h-full [&_svg]:block"
            style={{
              width: svgDimensions ? `${svgDimensions.width}px` : 'auto',
              height: svgDimensions ? `${svgDimensions.height}px` : 'auto',
              flexShrink: 0,
            }}
            dangerouslySetInnerHTML={{ __html: svgHtml }}
          />
        </div>
      </div>
    </div>
  );
}

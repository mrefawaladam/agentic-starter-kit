'use client';

import React, { useState, useEffect } from 'react';
import {
  Share2,
  Search,
  Filter,
  FileText,
  Compass,
  Database,
  Zap,
  ShieldAlert,
  Layout,
  CheckCircle2,
  Copy,
  Check,
  ArrowRight,
  Sparkles,
  ExternalLink,
  BookOpen,
} from 'lucide-react';

interface GraphNode {
  id: string;
  type: string;
  title: string;
  status?: string;
  owner?: string;
  path?: string;
  method?: string;
}

interface GraphEdge {
  from: string;
  to: string;
  relation: string;
}

interface GraphData {
  version: string;
  project: string;
  description: string;
  nodes: GraphNode[];
  edges: GraphEdge[];
}

interface KnowledgeGraphHubProps {
  onOpenDoc: (docPath: string) => void;
}

export function KnowledgeGraphHub({ onOpenDoc }: KnowledgeGraphHubProps) {
  const [graph, setGraph] = useState<GraphData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [selectedFeatureId, setSelectedFeatureId] = useState<string>('FEAT-002-school-payment');
  const [copiedScope, setCopiedScope] = useState(false);

  useEffect(() => {
    fetch('/api/graph')
      .then((res) => res.json())
      .then((data: GraphData) => {
        setGraph(data);
        if (data.nodes.length > 0) {
          setSelectedNodeId('FEAT-002-school-payment');
        }
      })
      .catch((err) => console.error('Error fetching knowledge graph:', err))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading || !graph) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-12 text-[#5E6C84]">
        <div className="w-8 h-8 border-2 border-[#0052CC] border-t-transparent rounded-full animate-spin mb-3" />
        <p className="text-xs font-mono font-medium">Memuat Codebase Knowledge Graph...</p>
      </div>
    );
  }

  const nodeTypeIcons: Record<string, React.ReactNode> = {
    feature: <Sparkles className="w-4 h-4 text-amber-500" />,
    document: <FileText className="w-4 h-4 text-blue-500" />,
    architecture: <Compass className="w-4 h-4 text-purple-500" />,
    data_model: <Database className="w-4 h-4 text-emerald-500" />,
    api_endpoint: <Zap className="w-4 h-4 text-amber-600" />,
    security_spec: <ShieldAlert className="w-4 h-4 text-rose-500" />,
    ui_component: <Layout className="w-4 h-4 text-indigo-500" />,
    test_suite: <CheckCircle2 className="w-4 h-4 text-teal-500" />,
  };

  const nodeTypeColors: Record<string, string> = {
    feature: 'bg-amber-50 text-amber-700 border-amber-200',
    document: 'bg-blue-50 text-blue-700 border-blue-200',
    architecture: 'bg-purple-50 text-purple-700 border-purple-200',
    data_model: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    api_endpoint: 'bg-amber-50 text-amber-800 border-amber-200',
    security_spec: 'bg-rose-50 text-rose-700 border-rose-200',
    ui_component: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    test_suite: 'bg-teal-50 text-teal-700 border-teal-200',
  };

  const featureNodes = graph.nodes.filter((n) => n.type === 'feature');

  // Compute scoped nodes for selected feature
  const getScopedNodesForFeature = (featId: string) => {
    const directOutgoing = graph.edges.filter((e) => e.from === featId).map((e) => e.to);
    const relatedIds = new Set<string>(directOutgoing);

    // 2nd degree dependencies
    graph.edges.forEach((e) => {
      if (relatedIds.has(e.from)) {
        relatedIds.add(e.to);
      }
    });

    return graph.nodes.filter((n) => relatedIds.has(n.id) || n.id === featId);
  };

  const scopedFeatureNodes = getScopedNodesForFeature(selectedFeatureId);

  const handleCopyScopePrompt = () => {
    const files = scopedFeatureNodes
      .filter((n) => n.path)
      .map((n) => `- [${n.type.toUpperCase()}] ${n.title}: ${n.path}`)
      .join('\n');

    const prompt = `Context Scope for ${selectedFeatureId}:\n${files}\n\nStrict Rule: Only refer to these scoped files above. Do not load irrelevant codebase modules.`;
    navigator.clipboard.writeText(prompt);
    setCopiedScope(true);
    setTimeout(() => setCopiedScope(false), 2000);
  };

  const filteredNodes = graph.nodes.filter((node) => {
    const matchesSearch =
      !searchTerm ||
      node.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      node.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (node.path && node.path.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesType = selectedType === 'ALL' || node.type === selectedType;

    return matchesSearch && matchesType;
  });

  const selectedNode = graph.nodes.find((n) => n.id === selectedNodeId);
  const incomingEdges = selectedNode ? graph.edges.filter((e) => e.to === selectedNode.id) : [];
  const outgoingEdges = selectedNode ? graph.edges.filter((e) => e.from === selectedNode.id) : [];

  return (
    <div className="flex-1 flex flex-col gap-6 overflow-hidden">
      {/* Top Banner / Metrics */}
      <div className="bg-white border border-[#DFE1E6] rounded-xl p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#EAE6FF] text-[#403294]">
              <Share2 className="w-5 h-5" />
            </span>
            <h1 className="text-lg font-bold text-[#172B4D] tracking-tight">
              Knowledge Graph & Token Scope Navigator
            </h1>
          </div>
          <p className="text-xs text-[#5E6C84] mt-1 max-w-2xl">
            Peta relasi dependensi lintas modul, kontrak API, dokumen PRD, dan skema database. Agen AI cukup memuat dokumen dalam jangkauan graf terkait untuk menghemat konsumsi token hingga 85%.
          </p>
        </div>

        {/* Stats Badges */}
        <div className="flex items-center gap-3">
          <div className="px-3.5 py-2 rounded-lg bg-[#F4F5F7] border border-[#DFE1E6] text-center">
            <p className="text-[10px] uppercase font-bold text-[#5E6C84]">Total Nodes</p>
            <p className="text-base font-bold text-[#0052CC] font-mono tabular-nums">
              {graph.nodes.length}
            </p>
          </div>
          <div className="px-3.5 py-2 rounded-lg bg-[#F4F5F7] border border-[#DFE1E6] text-center">
            <p className="text-[10px] uppercase font-bold text-[#5E6C84]">Total Relasi</p>
            <p className="text-base font-bold text-[#5243AA] font-mono tabular-nums">
              {graph.edges.length}
            </p>
          </div>
          <div className="px-3.5 py-2 rounded-lg bg-[#E3FCEF] border border-[#ABF5D1] text-center">
            <p className="text-[10px] uppercase font-bold text-[#006644]">Token Efficiency</p>
            <p className="text-base font-bold text-[#006644] font-mono tabular-nums">~85%</p>
          </div>
        </div>
      </div>

      {/* Progressive Scope Feature Card */}
      <div className="bg-gradient-to-r from-blue-50/70 via-indigo-50/40 to-white border border-[#B3D4FF] rounded-xl p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#DEEBFF]">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#0052CC] uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Progressive Disclosure Feature Scope
              </span>
            </div>
            <h2 className="text-base font-bold text-[#172B4D] mt-0.5">
              Lingkup Konteks Minimal Fitur (Zero Slop Context)
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={selectedFeatureId}
              onChange={(e) => setSelectedFeatureId(e.target.value)}
              className="bg-white border border-[#B3D4FF] rounded-md px-3 py-1.5 text-xs font-semibold text-[#172B4D] focus:outline-hidden focus:border-[#0052CC] shadow-2xs"
            >
              {featureNodes.map((fn) => (
                <option key={fn.id} value={fn.id}>
                  {fn.title} ({fn.id})
                </option>
              ))}
            </select>

            <button
              onClick={handleCopyScopePrompt}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#0052CC] hover:bg-[#0747A6] text-white text-xs font-semibold transition-colors shadow-xs active:scale-95"
            >
              {copiedScope ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedScope ? 'Tersalin!' : 'Copy Context Scope'}
            </button>
          </div>
        </div>

        {/* Feature Subgraph Pills */}
        <div className="mt-4 flex flex-wrap gap-2">
          {scopedFeatureNodes.map((node) => (
            <button
              key={node.id}
              onClick={() => setSelectedNodeId(node.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                selectedNodeId === node.id
                  ? 'bg-[#0052CC] text-white border-[#0052CC] shadow-xs'
                  : 'bg-white hover:bg-[#F4F5F7] text-[#172B4D] border-[#DFE1E6]'
              }`}
            >
              <span className="opacity-90">{nodeTypeIcons[node.type] || <FileText className="w-3.5 h-3.5" />}</span>
              <span className="font-semibold">{node.title}</span>
              <span className="text-[10px] opacity-75 font-mono">[{node.type}]</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Dual-Pane Explorer */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0 overflow-hidden">
        {/* Left: Node Directory & Filters */}
        <div className="lg:col-span-7 bg-white border border-[#DFE1E6] rounded-xl flex flex-col shadow-xs overflow-hidden">
          {/* Filter Bar */}
          <div className="p-3.5 border-b border-[#DFE1E6] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#FAFBFC]">
            <div className="relative flex-1">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#5E6C84]" />
              <input
                type="text"
                placeholder="Cari node id, judul, atau file path..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8.5 pr-3 py-1.5 bg-white border border-[#DFE1E6] rounded-md text-xs text-[#172B4D] placeholder-[#5E6C84] focus:outline-hidden focus:border-[#0052CC]"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-[#5E6C84]" />
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="bg-white border border-[#DFE1E6] rounded-md px-2.5 py-1.5 text-xs font-semibold text-[#172B4D] focus:outline-hidden focus:border-[#0052CC]"
              >
                <option value="ALL">Semua Tipe Node</option>
                <option value="feature">Feature</option>
                <option value="document">Document (PRD/Spec)</option>
                <option value="architecture">Architecture</option>
                <option value="data_model">Data Model / Schema</option>
                <option value="api_endpoint">API Endpoint</option>
                <option value="security_spec">Security Spec</option>
                <option value="ui_component">UI Component</option>
                <option value="test_suite">Test Suite</option>
              </select>
            </div>
          </div>

          {/* Node List */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2 divide-y divide-[#F4F5F7]">
            {filteredNodes.length === 0 ? (
              <div className="p-8 text-center text-xs text-[#5E6C84]">
                Tidak ada node yang cocok dengan pencarian.
              </div>
            ) : (
              filteredNodes.map((node) => {
                const isSelected = selectedNodeId === node.id;
                return (
                  <div
                    key={node.id}
                    onClick={() => setSelectedNodeId(node.id)}
                    className={`p-3 rounded-lg cursor-pointer transition-all border ${
                      isSelected
                        ? 'bg-[#DEEBFF]/50 border-[#0052CC] ring-1 ring-[#0052CC]/20'
                        : 'bg-white hover:bg-[#FAFBFC] border-transparent hover:border-[#DFE1E6]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <span className="p-1 rounded bg-[#F4F5F7] border border-[#DFE1E6]">
                          {nodeTypeIcons[node.type] || <FileText className="w-3.5 h-3.5" />}
                        </span>
                        <div>
                          <p className="text-xs font-bold text-[#172B4D] hover:text-[#0052CC]">
                            {node.title}
                          </p>
                          <p className="text-[11px] font-mono text-[#5E6C84] mt-0.5">{node.id}</p>
                        </div>
                      </div>

                      <span
                        className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-sm border ${
                          nodeTypeColors[node.type] || 'bg-slate-50 text-slate-700 border-slate-200'
                        }`}
                      >
                        {node.type}
                      </span>
                    </div>

                    {node.path && (
                      <p className="text-[10px] font-mono text-[#6B778C] truncate mt-2 pl-7.5">
                        {node.path}
                      </p>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right: Selected Node Detail & Connections */}
        <div className="lg:col-span-5 bg-white border border-[#DFE1E6] rounded-xl flex flex-col shadow-xs overflow-hidden">
          {selectedNode ? (
            <div className="flex-1 flex flex-col p-5 overflow-y-auto">
              {/* Header */}
              <div className="pb-4 border-b border-[#DFE1E6]">
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-sm border ${
                      nodeTypeColors[selectedNode.type] || 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    {selectedNode.type}
                  </span>
                  {selectedNode.status && (
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-sm bg-[#E3FCEF] text-[#006644] border border-[#ABF5D1]">
                      {selectedNode.status}
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-[#172B4D] mt-2">{selectedNode.title}</h3>
                <p className="text-xs font-mono text-[#5E6C84] mt-1">{selectedNode.id}</p>

                {selectedNode.owner && (
                  <p className="text-xs text-[#172B4D] mt-2">
                    <span className="text-[#5E6C84]">Owner: </span>
                    <span className="font-semibold">{selectedNode.owner}</span>
                  </p>
                )}

                {selectedNode.path && (
                  <div className="mt-3 flex items-center justify-between gap-2 p-2.5 rounded-lg bg-[#F4F5F7] border border-[#DFE1E6]">
                    <span className="text-[11px] font-mono text-[#172B4D] truncate">
                      {selectedNode.path}
                    </span>
                    <button
                      onClick={() => onOpenDoc(selectedNode.path!)}
                      className="shrink-0 inline-flex items-center gap-1 text-[11px] font-semibold text-[#0052CC] hover:underline"
                    >
                      <BookOpen className="w-3 h-3" />
                      Buka
                    </button>
                  </div>
                )}
              </div>

              {/* Incoming Dependencies (Upstream) */}
              <div className="mt-5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#5E6C84] flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 rotate-180 text-blue-600" />
                  Dibutuhkan Oleh (Upstream Dependencies)
                </h4>
                <div className="mt-2.5 space-y-2">
                  {incomingEdges.length === 0 ? (
                    <p className="text-xs text-[#8993A4] italic">Tidak ada upstream dependency langsung.</p>
                  ) : (
                    incomingEdges.map((edge, idx) => {
                      const fromNode = graph.nodes.find((n) => n.id === edge.from);
                      return (
                        <div
                          key={idx}
                          onClick={() => setSelectedNodeId(edge.from)}
                          className="p-2.5 rounded-lg border border-[#DFE1E6] hover:bg-[#FAFBFC] cursor-pointer transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-[#172B4D]">
                              {fromNode?.title || edge.from}
                            </span>
                            <span className="text-[10px] font-mono text-[#5243AA] bg-[#EAE6FF] px-1.5 py-0.5 rounded">
                              {edge.relation}
                            </span>
                          </div>
                          <p className="text-[10px] font-mono text-[#5E6C84] mt-0.5">{edge.from}</p>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Outgoing Impacts (Downstream) */}
              <div className="mt-5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#5E6C84] flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-600" />
                  Berdampak Ke (Downstream Dependents)
                </h4>
                <div className="mt-2.5 space-y-2">
                  {outgoingEdges.length === 0 ? (
                    <p className="text-xs text-[#8993A4] italic">Tidak ada downstream impact langsung.</p>
                  ) : (
                    outgoingEdges.map((edge, idx) => {
                      const toNode = graph.nodes.find((n) => n.id === edge.to);
                      return (
                        <div
                          key={idx}
                          onClick={() => setSelectedNodeId(edge.to)}
                          className="p-2.5 rounded-lg border border-[#DFE1E6] hover:bg-[#FAFBFC] cursor-pointer transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-[#172B4D]">
                              {toNode?.title || edge.to}
                            </span>
                            <span className="text-[10px] font-mono text-[#006644] bg-[#E3FCEF] px-1.5 py-0.5 rounded">
                              {edge.relation}
                            </span>
                          </div>
                          <p className="text-[10px] font-mono text-[#5E6C84] mt-0.5">{edge.to}</p>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-[#5E6C84]">
              <Compass className="w-10 h-10 text-[#C1C7D0] mb-2" />
              <p className="text-xs font-medium">Pilih salah satu node pada daftar untuk melihat detail dependensi.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

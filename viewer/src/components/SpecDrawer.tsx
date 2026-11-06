'use client';

import React, { useState, useEffect } from 'react';
import { TaskItem, KanbanColumn, DocumentReference } from '@/lib/storage';
import { MarkdownViewer } from './MarkdownViewer';
import {
  X,
  Check,
  CheckCircle2,
  Circle,
  Sparkles,
  FileCode,
  CheckSquare,
  ExternalLink,
  FileText,
  User,
  Plus,
  Trash2,
  BookOpen,
  Search,
  Tag,
  AtSign,
  ArrowRight,
  Eye,
  ChevronDown,
  Copy,
} from 'lucide-react';

interface SpecDrawerProps {
  task: TaskItem | null;
  columns: KanbanColumn[];
  onClose: () => void;
  onUpdateTask: (updatedTask: TaskItem) => void;
  onOpenDocInHub?: (path: string) => void;
}

interface FlattenedDoc {
  title: string;
  path: string;
  category: string;
  type: 'prd' | 'epic' | 'feature' | 'architecture' | 'api' | 'security' | 'qa' | 'governance' | 'other';
}

const CANONICAL_ASSIGNEES = [
  { group: '👤 Tim Pengembang (Human)', options: ['Lead Developer', 'Muhammad Refa (Human Lead)', 'Human Lead'] },
  {
    group: '🤖 AI Specialist Agents',
    options: [
      'Product Manager',
      'Business Analyst',
      'UI/UX Designer',
      'Solution Architect',
      'Frontend Developer',
      'Backend Developer',
      'Quality Engineer',
      'Security Engineer',
    ],
  },
];

export function SpecDrawer({
  task,
  columns,
  onClose,
  onUpdateTask,
  onOpenDocInHub,
}: SpecDrawerProps) {
  const [activeTab, setActiveTab] = useState<'spec' | 'ac' | 'references'>('spec');
  const [activeDocPath, setActiveDocPath] = useState<string>('');
  const [specContent, setSpecContent] = useState<string>('');
  const [isLoadingSpec, setIsLoadingSpec] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [copiedTaskId, setCopiedTaskId] = useState(false);

  // Document mention picker states
  const [isDocPickerOpen, setIsDocPickerOpen] = useState(false);
  const [availableDocs, setAvailableDocs] = useState<FlattenedDoc[]>([]);
  const [docSearchQuery, setDocSearchQuery] = useState('');
  const [docCategoryFilter, setDocCategoryFilter] = useState<string>('ALL');

  // Custom assignee modal
  const [isCustomAssigneeInput, setIsCustomAssigneeInput] = useState(false);
  const [customAssigneeVal, setCustomAssigneeVal] = useState('');

  // Fetch available documents on mount
  useEffect(() => {
    fetch('/api/docs/list')
      .then((res) => res.json())
      .then((data) => {
        if (data.docs) setAvailableDocs(data.docs);
      })
      .catch((err) => console.error('Failed to load docs list:', err));
  }, []);

  // Update activeDocPath when task changes
  useEffect(() => {
    if (task) {
      setActiveDocPath(task.spec_file || '');
    }
  }, [task?.id, task?.spec_file]);

  // Load content whenever activeDocPath changes
  useEffect(() => {
    if (!activeDocPath) {
      setSpecContent(
        '# Dokumen Belum Dipilih\n\nTask ini belum memiliki spesifikasi atau dokumen yang dipilih. Pilih salah satu dokumen referensi di atas atau buat spesifikasi di Docs Hub.'
      );
      return;
    }

    setIsLoadingSpec(true);
    fetch(`/api/spec?path=${encodeURIComponent(activeDocPath)}`)
      .then((res) => res.json())
      .then((data) => {
        setSpecContent(data.content || '# Dokumen Kosong');
      })
      .catch((err) => {
        setSpecContent(`# Gagal Memuat Dokumen\n\nError: ${err.message}`);
      })
      .finally(() => {
        setIsLoadingSpec(false);
      });
  }, [activeDocPath]);

  if (!task) return null;

  // Handle Assignee Change
  const handleAssigneeChange = (newAssignee: string) => {
    if (newAssignee === '__custom__') {
      setIsCustomAssigneeInput(true);
      setCustomAssigneeVal(task.assignee || '');
      return;
    }
    onUpdateTask({ ...task, assignee: newAssignee, updated_at: new Date().toISOString() });
  };

  const handleCustomAssigneeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customAssigneeVal.trim()) {
      onUpdateTask({ ...task, assignee: customAssigneeVal.trim(), updated_at: new Date().toISOString() });
    }
    setIsCustomAssigneeInput(false);
  };

  // Handle Document Mention / Reference
  const handleAddDocReference = (doc: FlattenedDoc) => {
    const existing = task.document_references || [];
    if (existing.some((r) => r.path === doc.path)) {
      return; // Already added
    }

    const newRef: DocumentReference = {
      title: doc.title,
      path: doc.path,
      type: doc.type,
    };

    const updated = [...existing, newRef];
    onUpdateTask({ ...task, document_references: updated, updated_at: new Date().toISOString() });
    setIsDocPickerOpen(false);
    setDocSearchQuery('');
  };

  const handleRemoveDocReference = (docPath: string) => {
    const existing = task.document_references || [];
    const updated = existing.filter((r) => r.path !== docPath);
    onUpdateTask({ ...task, document_references: updated, updated_at: new Date().toISOString() });

    // If currently viewing the removed doc, switch back to main spec
    if (activeDocPath === docPath) {
      setActiveDocPath(task.spec_file || '');
    }
  };

  const handleToggleAC = (acId: string) => {
    if (!task.acceptance_criteria) return;
    const updatedAC = task.acceptance_criteria.map((item) =>
      item.id === acId ? { ...item, checked: !item.checked } : item
    );
    onUpdateTask({ ...task, acceptance_criteria: updatedAC, updated_at: new Date().toISOString() });
  };

  const handleStatusChange = (newStatus: TaskItem['status']) => {
    onUpdateTask({ ...task, status: newStatus, updated_at: new Date().toISOString() });
  };

  // Mapping role assignee ke Antigravity shortcut (/dev, /pm, /architect, dll)
  const getAgentShortcut = (assignee?: string) => {
    const norm = (assignee || '').toLowerCase();
    if (norm.includes('product') || norm.includes('pm')) return { slash: '/pm', tag: '@pm', role: 'Product Manager' };
    if (norm.includes('business') || norm.includes('ba') || norm.includes('analyst')) return { slash: '/ba', tag: '@ba', role: 'Business Analyst' };
    if (norm.includes('architect') || norm.includes('solution')) return { slash: '/architect', tag: '@architect', role: 'Solution Architect' };
    if (norm.includes('quality') || norm.includes('qa') || norm.includes('test')) return { slash: '/qa', tag: '@qa', role: 'Quality Engineer' };
    if (norm.includes('security')) return { slash: '/security', tag: '@security', role: 'Security Engineer' };
    if (norm.includes('ui') || norm.includes('ux') || norm.includes('design')) return { slash: '/ui-ux', tag: '@ui-ux', role: 'UI/UX Designer' };
    return { slash: '/dev', tag: '@dev', role: 'Developer' };
  };

  const handleCopyTaskId = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (task?.id) {
      navigator.clipboard.writeText(task.id);
      setCopiedTaskId(true);
      setTimeout(() => setCopiedTaskId(false), 2000);
    }
  };

  // Generate Enhanced Agent Prompt for Antigravity & AI Spec-Driven workflow
  const generateAgentPrompt = () => {
    const shortcut = getAgentShortcut(task.assignee);
    const docMentions =
      task.document_references && task.document_references.length > 0
        ? `\n\n[Dokumen Referensi Terkait (PRD / Epics / Architecture / API)]:\n` +
          task.document_references
            .map((d) => `- [${(d.type || 'DOC').toUpperCase()}] ${d.title}: ${d.path}`)
            .join('\n')
        : '';

    const acList =
      task.acceptance_criteria && task.acceptance_criteria.length > 0
        ? task.acceptance_criteria
            .map((ac) => `- [${ac.checked ? 'x' : ' '}] ${ac.id}: ${ac.text}`)
            .join('\n')
        : '- (Belum ada Acceptance Criteria spesifik)';

    return `${shortcut.slash} Kerjakan task [${task.id}] — "${task.title}"

Peran: ${shortcut.role} (${shortcut.tag})
Task ID: ${task.id}
Feature Code: ${task.code}
Status Kesiapan: ${task.status.toUpperCase()}
Prioritas: ${task.priority}
Story Points: ${task.story_points ?? '-'}
Tags: ${task.tags && task.tags.length > 0 ? task.tags.join(', ') : '-'}

[File Spesifikasi Utama]:
- Path: ${task.spec_file || 'docs/03-requirements/features/...'}${docMentions}

[Acceptance Criteria]:
${acList}

[Panduan Eksekusi AI Agent (Antigravity)]:
1. Anda dapat membaca spesifikasi task ini secara instan di terminal menggunakan:
   \`node scripts/task.js get ${task.id}\`
   atau membaca langsung file 'data/backlog.json' dan '${task.spec_file}'.
2. Telusuri relasi arsitektur dan endpoint terdampak via 'data/knowledge-graph.json'.
3. Kerjakan implementasi dan pastikan seluruh Acceptance Criteria di atas terverifikasi.
4. Setelah selesai, perbarui status task di 'data/backlog.json' menjadi 'in_qa' atau 'done' (atau jalankan \`node scripts/task.js set-status ${task.id} done\`).`;
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(generateAgentPrompt());
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2500);
  };

  // Filter docs for mention picker
  const filteredAvailableDocs = availableDocs.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(docSearchQuery.toLowerCase()) ||
      doc.path.toLowerCase().includes(docSearchQuery.toLowerCase());
    const matchesCategory =
      docCategoryFilter === 'ALL' ||
      (docCategoryFilter === 'PRD' && doc.type === 'prd') ||
      (docCategoryFilter === 'EPIC' && doc.type === 'epic') ||
      (docCategoryFilter === 'FEATURE' && doc.type === 'feature') ||
      (docCategoryFilter === 'ARCH' && doc.type === 'architecture') ||
      (docCategoryFilter === 'API' && doc.type === 'api') ||
      (docCategoryFilter === 'QA' && doc.type === 'qa');

    return matchesSearch && matchesCategory;
  });

  const getDocTypeBadge = (type?: string) => {
    switch (type) {
      case 'prd':
        return <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-purple-100 text-purple-700">PRD</span>;
      case 'epic':
        return <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-700">EPIC</span>;
      case 'feature':
        return <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-700">FEAT</span>;
      case 'architecture':
        return <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700">ARCH/ADR</span>;
      case 'api':
        return <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800">API</span>;
      case 'security':
        return <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-100 text-red-700">SEC</span>;
      case 'qa':
        return <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-cyan-100 text-cyan-800">QA</span>;
      default:
        return <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-gray-100 text-gray-700">DOC</span>;
    }
  };

  const docRefCount = task.document_references?.length || 0;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-2xs transition-opacity animate-fade-in">
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Slide-over panel (Jira Light) */}
      <div className="relative z-10 w-full max-w-2xl bg-white border-l border-[#DFE1E6] h-full flex flex-col shadow-2xl overflow-hidden">
        {/* Header with Issue Key & Interactive Assignee */}
        <div className="p-5 border-b border-[#EBECF0] flex items-start justify-between gap-4 bg-[#FAFBFC]">
          <div className="flex flex-col gap-2 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              {/* Task ID (Nomor Task) dengan Tombol Salin */}
              <div className="flex items-center gap-1.5 bg-[#DEEBFF] border border-[#B3D4FF] rounded-md px-2.5 py-0.5 shadow-2xs">
                <span className="font-mono text-xs text-[#0747A6] font-bold" title="Nomor Task Unik">
                  {task.id}
                </span>
                <button
                  type="button"
                  onClick={handleCopyTaskId}
                  title="Salin Task ID ke Clipboard"
                  className="text-[#0747A6] hover:text-[#0052CC] p-0.5 rounded hover:bg-[#B3D4FF]/40 cursor-pointer transition-colors"
                >
                  {copiedTaskId ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              {/* Feature / Epic Code (jika berbeda dari Task ID) */}
              {task.code && task.code !== task.id && (
                <span
                  title="Feature / Epic Code"
                  className="font-mono text-xs px-2 py-0.5 rounded-md bg-[#F4F5F7] text-[#42526E] font-medium border border-[#DFE1E6]"
                >
                  {task.code}
                </span>
              )}

              <span className="text-xs text-[#8993A4]">•</span>

              {/* Interactive Assignee Dropdown */}
              <div className="flex items-center gap-1.5 bg-white border border-[#DFE1E6] rounded-md px-2.5 py-1 shadow-2xs hover:border-[#0052CC] transition-colors">
                <User className="w-3.5 h-3.5 text-[#0052CC]" />
                <span className="text-[11px] text-[#5E6C84] font-medium">Assignee:</span>
                <select
                  value={task.assignee || 'Unassigned'}
                  onChange={(e) => handleAssigneeChange(e.target.value)}
                  className="bg-transparent text-xs font-bold text-[#172B4D] focus:outline-hidden cursor-pointer"
                >
                  <option value="Unassigned">Unassigned</option>
                  {CANONICAL_ASSIGNEES.map((grp) => (
                    <optgroup key={grp.group} label={grp.group}>
                      {grp.options.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                  <option value="__custom__">✏️ Input Nama Kustom...</option>
                </select>
              </div>
            </div>

            <h2 className="text-base font-bold text-[#172B4D] leading-snug">{task.title}</h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#5E6C84] hover:text-[#172B4D] rounded-md hover:bg-[#EBECF0] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Custom Assignee Input Modal if triggered */}
        {isCustomAssigneeInput && (
          <form
            onSubmit={handleCustomAssigneeSubmit}
            className="p-3 bg-blue-50 border-b border-blue-200 flex items-center gap-2 animate-fade-in text-xs"
          >
            <span className="font-medium text-[#0747A6]">Masukkan Nama Assignee:</span>
            <input
              type="text"
              value={customAssigneeVal}
              onChange={(e) => setCustomAssigneeVal(e.target.value)}
              placeholder="Contoh: Refa, Backend Lead..."
              autoFocus
              className="flex-1 bg-white border border-[#DFE1E6] rounded px-2.5 py-1 text-xs text-[#172B4D] focus:outline-hidden focus:border-[#0052CC]"
            />
            <button
              type="submit"
              className="px-3 py-1 bg-[#0052CC] text-white rounded font-semibold text-xs hover:bg-[#0747A6] cursor-pointer"
            >
              Simpan
            </button>
            <button
              type="button"
              onClick={() => setIsCustomAssigneeInput(false)}
              className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-xs hover:bg-gray-300 cursor-pointer"
            >
              Batal
            </button>
          </form>
        )}

        {/* Toolbar: Status Changer & Prompt Copy & Open in Docs Hub */}
        <div className="px-5 py-3 border-b border-[#EBECF0] bg-white flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#5E6C84] font-medium">Status:</span>
            <select
              value={task.status}
              onChange={(e) => handleStatusChange(e.target.value as TaskItem['status'])}
              className="bg-[#F4F5F7] border border-[#DFE1E6] text-[#172B4D] text-xs font-semibold rounded-md px-2.5 py-1.5 focus:border-[#0052CC] focus:outline-hidden cursor-pointer"
            >
              {columns.map((col) => (
                <option key={col.id} value={col.id}>
                  {col.title}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            {activeDocPath && onOpenDocInHub && (
              <button
                onClick={() => {
                  onOpenDocInHub(activeDocPath);
                  onClose();
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#F4F5F7] hover:bg-[#EBECF0] text-[#42526E] text-xs font-semibold border border-[#DFE1E6] transition-all cursor-pointer"
                title="Buka dokumen aktif di Docs Hub"
              >
                <ExternalLink className="w-3.5 h-3.5 text-[#0052CC]" />
                <span>Buka di Docs Hub</span>
              </button>
            )}

            <button
              onClick={handleCopyPrompt}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#0052CC] hover:bg-[#0747A6] active:bg-[#003884] text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
              title={`Salin prompt tugas berformat resmi untuk Antigravity CLI (${getAgentShortcut(task.assignee).slash})`}
            >
              {copiedPrompt ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Prompt Antigravity Disalin!</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Salin Prompt AI ({getAgentShortcut(task.assignee).slash})</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Tabs: Spec Viewer vs Acceptance Criteria vs Document References */}
        <div className="flex border-b border-[#EBECF0] px-5 bg-[#FAFBFC] overflow-x-auto">
          <button
            onClick={() => setActiveTab('spec')}
            className={`flex items-center gap-2 py-3 px-3 text-xs font-bold border-b-2 transition-colors cursor-pointer shrink-0 ${
              activeTab === 'spec'
                ? 'border-[#0052CC] text-[#0052CC]'
                : 'border-transparent text-[#5E6C84] hover:text-[#172B4D]'
            }`}
          >
            <FileCode className="w-4 h-4" />
            <span>Dokumen Spesifikasi</span>
          </button>
          <button
            onClick={() => setActiveTab('ac')}
            className={`flex items-center gap-2 py-3 px-3 text-xs font-bold border-b-2 transition-colors cursor-pointer shrink-0 ${
              activeTab === 'ac'
                ? 'border-[#0052CC] text-[#0052CC]'
                : 'border-transparent text-[#5E6C84] hover:text-[#172B4D]'
            }`}
          >
            <CheckSquare className="w-4 h-4" />
            <span>
              Acceptance Criteria (
              {task.acceptance_criteria?.filter((a) => a.checked).length || 0}/
              {task.acceptance_criteria?.length || 0})
            </span>
          </button>
          <button
            onClick={() => setActiveTab('references')}
            className={`flex items-center gap-2 py-3 px-3 text-xs font-bold border-b-2 transition-colors cursor-pointer shrink-0 ${
              activeTab === 'references'
                ? 'border-[#0052CC] text-[#0052CC]'
                : 'border-transparent text-[#5E6C84] hover:text-[#172B4D]'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Dokumen Referensi ({docRefCount})</span>
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'spec' && (
            <div>
              {/* Document Switcher Toolbar (Allows toggling between primary spec and mentioned PRD/Epics) */}
              <div className="mb-4 flex flex-col gap-2 p-3 bg-[#F4F5F7] rounded-xl border border-[#DFE1E6]">
                <div className="flex items-center justify-between gap-2 flex-wrap text-xs">
                  <div className="flex items-center gap-1.5 font-semibold text-[#5E6C84]">
                    <FileText className="w-3.5 h-3.5 text-[#0052CC]" />
                    <span>Dokumen Aktif:</span>
                  </div>

                  <button
                    onClick={() => setIsDocPickerOpen(true)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#DEEBFF] hover:bg-[#B3D4FF] text-[#0747A6] font-bold text-[11px] transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ Mention Dokumen (PRD/Epic)</span>
                  </button>
                </div>

                {/* Document Pills */}
                <div className="flex items-center gap-1.5 flex-wrap pt-1">
                  {task.spec_file && (
                    <button
                      onClick={() => setActiveDocPath(task.spec_file!)}
                      className={`px-2.5 py-1 text-xs rounded-md font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                        activeDocPath === task.spec_file
                          ? 'bg-[#0052CC] text-white shadow-xs font-bold'
                          : 'bg-white text-[#42526E] border border-[#DFE1E6] hover:bg-[#EBECF0]'
                      }`}
                    >
                      <span>★ File Utama</span>
                    </button>
                  )}

                  {task.document_references?.map((ref) => (
                    <button
                      key={ref.path}
                      onClick={() => setActiveDocPath(ref.path)}
                      className={`px-2.5 py-1 text-xs rounded-md font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                        activeDocPath === ref.path
                          ? 'bg-[#0052CC] text-white shadow-xs font-bold'
                          : 'bg-white text-[#42526E] border border-[#DFE1E6] hover:bg-[#EBECF0]'
                      }`}
                    >
                      {getDocTypeBadge(ref.type)}
                      <span className="max-w-[140px] truncate">{ref.title}</span>
                    </button>
                  ))}
                </div>

                <div className="text-[11px] font-mono text-[#5E6C84] truncate border-t border-[#DFE1E6]/70 pt-1.5">
                  Path: {activeDocPath}
                </div>
              </div>

              {isLoadingSpec ? (
                <div className="flex items-center justify-center p-12 text-[#6B778C] text-xs font-mono">
                  Memuat dokumen...
                </div>
              ) : (
                <MarkdownViewer content={specContent} />
              )}
            </div>
          )}

          {activeTab === 'ac' && (
            <div className="flex flex-col gap-4">
              <div className="text-xs text-[#5E6C84]">
                Checklist kriteria penerimaan untuk fitur ini. Perubahan checklist tersimpan otomatis ke{' '}
                <code className="bg-[#EBECF0] px-1.5 py-0.5 rounded text-[#0747A6] font-mono">
                  data/backlog.json
                </code>
                .
              </div>

              <div className="flex flex-col gap-2 mt-2">
                {task.acceptance_criteria && task.acceptance_criteria.length > 0 ? (
                  task.acceptance_criteria.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleToggleAC(item.id)}
                      className={`flex items-start gap-3 p-3.5 rounded-lg border cursor-pointer transition-all ${
                        item.checked
                          ? 'border-emerald-300 bg-emerald-50/60 text-[#172B4D]'
                          : 'border-[#DFE1E6] bg-white hover:border-[#0052CC] text-[#172B4D]'
                      }`}
                    >
                      <button className="mt-0.5 shrink-0">
                        {item.checked ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Circle className="w-4 h-4 text-[#8993A4]" />
                        )}
                      </button>
                      <span
                        className={`text-xs leading-relaxed ${
                          item.checked ? 'line-through text-[#6B778C]' : 'font-medium'
                        }`}
                      >
                        {item.text}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-center p-8 text-[#6B778C] text-xs border border-dashed border-[#DFE1E6] rounded-lg">
                    Belum ada kriteria penerimaan yang didefinisikan untuk task ini.
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'references' && (
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between gap-3">
                <div className="text-xs text-[#5E6C84]">
                  Dokumen terhubung (PRD, Epics, ADR Arsitektur, Kontrak API, dll.) yang menjadi referensi task ini:
                </div>
                <button
                  onClick={() => setIsDocPickerOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#0052CC] hover:bg-[#0747A6] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Mention Dokumen</span>
                </button>
              </div>

              {/* List of Referenced Documents */}
              <div className="flex flex-col gap-2.5 mt-2">
                {task.document_references && task.document_references.length > 0 ? (
                  task.document_references.map((ref) => (
                    <div
                      key={ref.path}
                      className="p-3.5 rounded-xl border border-[#DFE1E6] bg-white hover:border-[#0052CC] transition-all flex items-start justify-between gap-3 group shadow-2xs"
                    >
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <div className="mt-0.5 shrink-0">{getDocTypeBadge(ref.type)}</div>
                        <div className="flex flex-col gap-1 min-w-0 flex-1">
                          <h4 className="text-xs font-bold text-[#172B4D] truncate">{ref.title}</h4>
                          <span className="text-[11px] font-mono text-[#5E6C84] truncate">{ref.path}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => {
                            setActiveDocPath(ref.path);
                            setActiveTab('spec');
                          }}
                          className="p-1.5 text-[#0052CC] hover:bg-[#DEEBFF] rounded-md transition-colors cursor-pointer text-xs flex items-center gap-1 font-semibold"
                          title="Baca di tab spesifikasi"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Baca</span>
                        </button>

                        {onOpenDocInHub && (
                          <button
                            onClick={() => {
                              onOpenDocInHub(ref.path);
                              onClose();
                            }}
                            className="p-1.5 text-[#5E6C84] hover:bg-[#EBECF0] rounded-md transition-colors cursor-pointer"
                            title="Buka di Docs Hub"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </button>
                        )}

                        <button
                          onClick={() => handleRemoveDocReference(ref.path)}
                          className="p-1.5 text-[#DE350B] hover:bg-red-50 rounded-md transition-colors cursor-pointer"
                          title="Hapus referensi ini"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center border border-dashed border-[#DFE1E6] rounded-xl flex flex-col items-center gap-3">
                    <BookOpen className="w-8 h-8 text-[#8993A4]" />
                    <div className="text-xs text-[#5E6C84]">
                      Belum ada dokumen referensi yang di-mention pada task ini.
                    </div>
                    <button
                      onClick={() => setIsDocPickerOpen(true)}
                      className="px-3 py-1.5 bg-[#DEEBFF] text-[#0747A6] font-bold text-xs rounded-md hover:bg-[#B3D4FF] transition-colors cursor-pointer"
                    >
                      + Hubungkan Dokumen PRD / Epic Pertama
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mention Document Popover / Search Modal */}
      {isDocPickerOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 backdrop-blur-2xs p-4 animate-fade-in">
          <div className="relative w-full max-w-xl bg-white border border-[#DFE1E6] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            {/* Modal Header */}
            <div className="p-4 px-6 border-b border-[#EBECF0] bg-[#FAFBFC] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AtSign className="w-5 h-5 text-[#0052CC]" />
                <h3 className="text-sm font-bold text-[#172B4D]">Mention & Hubungkan Dokumen Referensi</h3>
              </div>
              <button
                onClick={() => setIsDocPickerOpen(false)}
                className="p-1 text-[#5E6C84] hover:text-[#172B4D] rounded-md hover:bg-[#EBECF0]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Search Bar & Category Filter */}
            <div className="p-4 border-b border-[#EBECF0] bg-white flex flex-col gap-3">
              <div className="relative">
                <Search className="w-4 h-4 text-[#8993A4] absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={docSearchQuery}
                  onChange={(e) => setDocSearchQuery(e.target.value)}
                  placeholder="Cari PRD, Epic, ADR arsitektur, API endpoints, test cases..."
                  autoFocus
                  className="w-full bg-[#FAFBFC] border border-[#DFE1E6] rounded-lg pl-9 pr-4 py-2 text-xs text-[#172B4D] focus:border-[#0052CC] focus:outline-hidden"
                />
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto text-xs pb-1">
                {['ALL', 'PRD', 'EPIC', 'FEATURE', 'ARCH', 'API', 'QA'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setDocCategoryFilter(cat)}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer shrink-0 ${
                      docCategoryFilter === cat
                        ? 'bg-[#0052CC] text-white shadow-2xs'
                        : 'bg-[#EBECF0] text-[#42526E] hover:bg-[#DFE1E6]'
                    }`}
                  >
                    {cat === 'ALL' ? 'Semua Dokumen' : cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Document List */}
            <div className="flex-1 overflow-y-auto p-4 divide-y divide-[#EBECF0]">
              {filteredAvailableDocs.length === 0 ? (
                <div className="text-center p-8 text-[#8993A4] text-xs">
                  Tidak ditemukan dokumen yang cocok dengan kata kunci &quot;{docSearchQuery}&quot;.
                </div>
              ) : (
                filteredAvailableDocs.map((doc) => {
                  const isAlreadyMentioned = task.document_references?.some((r) => r.path === doc.path);
                  return (
                    <div
                      key={doc.path}
                      className="py-2.5 px-2 flex items-center justify-between gap-3 hover:bg-[#F4F5F7] rounded-lg transition-colors group"
                    >
                      <div className="flex items-start gap-2.5 min-w-0 flex-1">
                        <div className="mt-0.5 shrink-0">{getDocTypeBadge(doc.type)}</div>
                        <div className="flex flex-col min-w-0 flex-1">
                          <span className="text-xs font-semibold text-[#172B4D] group-hover:text-[#0052CC] truncate">
                            {doc.title}
                          </span>
                          <span className="text-[10px] font-mono text-[#8993A4] truncate">{doc.path}</span>
                        </div>
                      </div>

                      <button
                        disabled={isAlreadyMentioned}
                        onClick={() => handleAddDocReference(doc)}
                        className={`px-3 py-1 text-xs rounded-md font-semibold transition-all cursor-pointer shrink-0 ${
                          isAlreadyMentioned
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-[#0052CC] hover:bg-[#0747A6] text-white shadow-2xs'
                        }`}
                      >
                        {isAlreadyMentioned ? 'Terhubung' : '+ Mention'}
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

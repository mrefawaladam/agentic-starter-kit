'use client';

import React, { useState, useEffect } from 'react';
import { TaskItem, KanbanColumn } from '@/lib/storage';
import { MarkdownViewer } from './MarkdownViewer';
import {
  X,
  Copy,
  Check,
  CheckCircle2,
  Circle,
  Sparkles,
  FileCode,
  CheckSquare,
  Bookmark,
  Zap,
  Bug,
  ChevronRight,
  ExternalLink,
  FileText,
} from 'lucide-react';

interface SpecDrawerProps {
  task: TaskItem | null;
  columns: KanbanColumn[];
  onClose: () => void;
  onUpdateTask: (updatedTask: TaskItem) => void;
  onOpenDocInHub?: (path: string) => void;
}

export function SpecDrawer({
  task,
  columns,
  onClose,
  onUpdateTask,
  onOpenDocInHub,
}: SpecDrawerProps) {
  const [activeTab, setActiveTab] = useState<'spec' | 'ac'>('spec');
  const [specContent, setSpecContent] = useState<string>('');
  const [isLoadingSpec, setIsLoadingSpec] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  useEffect(() => {
    if (!task?.spec_file) {
      setSpecContent(
        '# Spesifikasi Belum Dibuat\n\nTask ini belum memiliki tautan `spec_file`. Anda dapat meminta PM Agent untuk menyusun spesifikasi terlebih dahulu atau membuatnya di Docs Hub.'
      );
      return;
    }

    setIsLoadingSpec(true);
    fetch(`/api/spec?path=${encodeURIComponent(task.spec_file)}`)
      .then((res) => res.json())
      .then((data) => {
        setSpecContent(data.content || '# Error memuat dokumen');
      })
      .catch((err) => {
        setSpecContent(`# Gagal Memuat Dokumen\n\nError: ${err.message}`);
      })
      .finally(() => {
        setIsLoadingSpec(false);
      });
  }, [task?.spec_file, task?.id]);

  if (!task) return null;

  const handleToggleAC = (acId: string) => {
    if (!task.acceptance_criteria) return;
    const updatedAC = task.acceptance_criteria.map((item) =>
      item.id === acId ? { ...item, checked: !item.checked } : item
    );
    onUpdateTask({ ...task, acceptance_criteria: updatedAC });
  };

  const handleStatusChange = (newStatus: TaskItem['status']) => {
    onUpdateTask({ ...task, status: newStatus });
  };

  const generateAgentPrompt = () => {
    return `@Developer
Bertindaklah sebagai Developer Agent.
Saya ingin mengimplementasikan fitur: "${task.title}" (${task.code}).

[Referensi Spesifikasi Wajib]:
- File Spesifikasi: ${task.spec_file || 'docs/03-requirements/features/...'}
- Status Kesiapan: ${task.status.toUpperCase()}
- Prioritas: ${task.priority}

Aturan Mutlak:
1. Baca dan pahami Acceptance Criteria & Business Rules di dalam file spesifikasi sebelum menulis kode.
2. Jangan merusak atau menghapus test yang sudah ada.
3. Buatkan unit test / integration test yang mencakup skenario happy path & edge case.`;
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(generateAgentPrompt());
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/30 backdrop-blur-2xs transition-opacity animate-fade-in">
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Slide-over panel (Jira Light) */}
      <div className="relative z-10 w-full max-w-2xl bg-white border-l border-[#DFE1E6] h-full flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-[#EBECF0] flex items-start justify-between gap-4 bg-[#FAFBFC]">
          <div className="flex flex-col gap-1.5 flex-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs px-2.5 py-0.5 rounded-md bg-[#DEEBFF] text-[#0747A6] font-bold">
                {task.code || task.id}
              </span>
              <span className="text-xs text-[#5E6C84]">•</span>
              <span className="text-xs text-[#5E6C84]">
                Assignee: <strong className="text-[#172B4D]">{task.assignee || 'Unassigned'}</strong>
              </span>
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

        {/* Toolbar: Status Changer & Prompt Copy & Open in Docs Hub */}
        <div className="px-5 py-3 border-b border-[#EBECF0] bg-white flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#5E6C84] font-medium">Status:</span>
            <select
              value={task.status}
              onChange={(e) => handleStatusChange(e.target.value as TaskItem['status'])}
              className="bg-[#F4F5F7] border border-[#DFE1E6] text-[#172B4D] text-xs font-semibold rounded-md px-2.5 py-1.5 focus:border-[#0052CC] focus:outline-hidden"
            >
              {columns.map((col) => (
                <option key={col.id} value={col.id}>
                  {col.title}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            {task.spec_file && onOpenDocInHub && (
              <button
                onClick={() => {
                  onOpenDocInHub(task.spec_file!);
                  onClose();
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#F4F5F7] hover:bg-[#EBECF0] text-[#42526E] text-xs font-semibold border border-[#DFE1E6] transition-all cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5 text-[#0052CC]" />
                <span>Buka di Docs Hub</span>
              </button>
            )}

            <button
              onClick={handleCopyPrompt}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#0052CC] hover:bg-[#0747A6] active:bg-[#003884] text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
            >
              {copiedPrompt ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Prompt Disalin!</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Salin Prompt AI</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Tabs: Spec Viewer vs Acceptance Criteria */}
        <div className="flex border-b border-[#EBECF0] px-5 bg-[#FAFBFC]">
          <button
            onClick={() => setActiveTab('spec')}
            className={`flex items-center gap-2 py-3 px-3 text-xs font-bold border-b-2 transition-colors cursor-pointer ${
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
            className={`flex items-center gap-2 py-3 px-3 text-xs font-bold border-b-2 transition-colors cursor-pointer ${
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
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'spec' ? (
            <div>
              {task.spec_file && (
                <div className="mb-4 text-xs font-mono text-[#5E6C84] bg-[#F4F5F7] px-3 py-2 rounded-lg border border-[#DFE1E6] flex items-center justify-between">
                  <span className="flex items-center gap-1.5"><FileText className="w-3.5 h-3.5 text-[#5E6C84]" /> {task.spec_file}</span>
                </div>
              )}

              {isLoadingSpec ? (
                <div className="flex items-center justify-center p-12 text-[#6B778C] text-xs font-mono">
                  Memuat dokumen spesifikasi...
                </div>
              ) : (
                <MarkdownViewer content={specContent} />
              )}
            </div>
          ) : (
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
        </div>
      </div>
    </div>
  );
}

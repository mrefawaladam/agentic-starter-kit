'use client';

import React, { useState } from 'react';
import { TaskItem, KanbanColumn, DocumentReference } from '@/lib/storage';
import { X, Plus, Bookmark, Zap, CheckSquare, Bug, FileText, User } from 'lucide-react';

interface NewTaskModalProps {
  columns: KanbanColumn[];
  isOpen: boolean;
  onClose: () => void;
  onAddTask: (newTask: TaskItem) => void;
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

const COMMON_DOC_REFERENCES: DocumentReference[] = [
  {
    title: 'Master PRD — KasirSakti Platform',
    path: 'docs/03-requirements/prd/PRD-001-kasirsakti.md',
    type: 'prd',
  },
  {
    title: 'EPIC-POS: Point of Sale & Anti-Fraud',
    path: 'docs/03-requirements/epics/EPIC-POS.md',
    type: 'epic',
  },
  {
    title: 'EPIC-INVENTORY: Multi-Unit Inventory & Stock',
    path: 'docs/03-requirements/epics/EPIC-INVENTORY.md',
    type: 'epic',
  },
  {
    title: 'EPIC-FINANCE: Automated Double-Entry Accounting',
    path: 'docs/03-requirements/epics/EPIC-FINANCE.md',
    type: 'epic',
  },
  {
    title: 'EPIC-HRIS: Human Resources & Payroll',
    path: 'docs/03-requirements/epics/EPIC-HRIS.md',
    type: 'epic',
  },
  {
    title: 'ADR-001: Strict Clean Architecture',
    path: 'docs/05-architecture/adr/ADR-001-clean-architecture.md',
    type: 'architecture',
  },
  {
    title: 'ADR-002: Double-Entry Bookkeeping Ledger',
    path: 'docs/05-architecture/adr/ADR-002-double-entry-bookkeeping.md',
    type: 'architecture',
  },
];

export function NewTaskModal({ columns, isOpen, onClose, onAddTask }: NewTaskModalProps) {
  const [code, setCode] = useState('FEAT-POS-006');
  const [title, setTitle] = useState('');
  const [type, setType] = useState<TaskItem['type']>('FEATURE');
  const [priority, setPriority] = useState<TaskItem['priority']>('HIGH');
  const [status, setStatus] = useState<TaskItem['status']>('ready_for_dev');
  const [assignee, setAssignee] = useState('Backend Developer');
  const [isCustomAssignee, setIsCustomAssignee] = useState(false);
  const [customAssigneeVal, setCustomAssigneeVal] = useState('');
  const [specFile, setSpecFile] = useState('docs/03-requirements/features/FEAT-POS-001-sales/README.md');
  const [tagsInput, setTagsInput] = useState('kasirsakti, backend');
  const [storyPoints, setStoryPoints] = useState(5);
  const [selectedDocRefs, setSelectedDocRefs] = useState<DocumentReference[]>([]);

  if (!isOpen) return null;

  const handleToggleDocRef = (doc: DocumentReference) => {
    if (selectedDocRefs.some((d) => d.path === doc.path)) {
      setSelectedDocRefs(selectedDocRefs.filter((d) => d.path !== doc.path));
    } else {
      setSelectedDocRefs([...selectedDocRefs, doc]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const finalAssignee = isCustomAssignee ? customAssigneeVal.trim() || 'Unassigned' : assignee;

    const newTask: TaskItem = {
      id: `TASK-${Date.now().toString().slice(-4)}`,
      code: code.trim(),
      title: title.trim(),
      type,
      priority,
      status,
      assignee: finalAssignee,
      spec_file: specFile.trim() || undefined,
      document_references: selectedDocRefs.length > 0 ? selectedDocRefs : undefined,
      tags,
      story_points: Number(storyPoints) || 0,
      acceptance_criteria: [],
      updated_at: new Date().toISOString(),
    };

    onAddTask(newTask);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-2xs p-4 animate-fade-in">
      <div className="relative w-full max-w-xl bg-white border border-[#DFE1E6] rounded-xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 px-6 border-b border-[#EBECF0] bg-[#FAFBFC]">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-[#0052CC] text-white flex items-center justify-center font-bold text-xs">
              +
            </div>
            <h3 className="font-bold text-[#172B4D] text-sm">Create Issue / Task Baru</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#5E6C84] hover:text-[#172B4D] rounded-md hover:bg-[#EBECF0] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex flex-col gap-4 text-xs">
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-1 flex flex-col gap-1.5">
              <label className="text-[#42526E] font-semibold">Issue Key</label>
              <input
                type="text"
                required
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="FEAT-POS-006"
                className="bg-[#F4F5F7] border border-[#DFE1E6] rounded-md px-3 py-2 text-[#172B4D] font-mono focus:border-[#0052CC] focus:outline-hidden"
              />
            </div>
            <div className="col-span-2 flex flex-col gap-1.5">
              <label className="text-[#42526E] font-semibold">Summary / Judul Task</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="misal: Implementasi Reversal Journal Void Transaksi"
                className="border border-[#DFE1E6] rounded-md px-3 py-2 text-[#172B4D] focus:border-[#0052CC] focus:outline-hidden"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-[#42526E] font-semibold">Issue Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as TaskItem['type'])}
                className="border border-[#DFE1E6] rounded-md px-2.5 py-2 text-[#172B4D] focus:border-[#0052CC] focus:outline-hidden"
              >
                <option value="FEATURE">Feature (Fitur)</option>
                <option value="STORY">Story (User Story)</option>
                <option value="TASK">Task (Teknis)</option>
                <option value="BUG">Bug (Cacat)</option>
                <option value="SPIKE">Spike (Riset)</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[#42526E] font-semibold">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as TaskItem['priority'])}
                className="border border-[#DFE1E6] rounded-md px-2.5 py-2 text-[#172B4D] focus:border-[#0052CC] focus:outline-hidden"
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
                <option value="CRITICAL">Critical</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[#42526E] font-semibold">Status Awal</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as TaskItem['status'])}
                className="border border-[#DFE1E6] rounded-md px-2.5 py-2 text-[#172B4D] focus:border-[#0052CC] focus:outline-hidden"
              >
                {columns.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Assignee Selector */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-[#42526E] font-semibold flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-[#0052CC]" /> Assignee (Orang / AI Agent)
              </label>
              {!isCustomAssignee ? (
                <div className="flex gap-1.5">
                  <select
                    value={assignee}
                    onChange={(e) => {
                      if (e.target.value === '__custom__') {
                        setIsCustomAssignee(true);
                        setCustomAssigneeVal('');
                      } else {
                        setAssignee(e.target.value);
                      }
                    }}
                    className="flex-1 border border-[#DFE1E6] rounded-md px-2.5 py-2 text-[#172B4D] focus:border-[#0052CC] focus:outline-hidden"
                  >
                    {CANONICAL_ASSIGNEES.map((grp) => (
                      <optgroup key={grp.group} label={grp.group}>
                        {grp.options.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                    <option value="__custom__">✏️ Input Nama Lain...</option>
                  </select>
                </div>
              ) : (
                <div className="flex gap-1.5">
                  <input
                    type="text"
                    value={customAssigneeVal}
                    onChange={(e) => setCustomAssigneeVal(e.target.value)}
                    placeholder="Nama anggota tim..."
                    className="flex-1 border border-[#DFE1E6] rounded-md px-2.5 py-2 text-[#172B4D] focus:border-[#0052CC] focus:outline-hidden"
                  />
                  <button
                    type="button"
                    onClick={() => setIsCustomAssignee(false)}
                    className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded"
                  >
                    Batal
                  </button>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[#42526E] font-semibold">Story Points</label>
              <input
                type="number"
                min="0"
                max="50"
                value={storyPoints}
                onChange={(e) => setStoryPoints(Number(e.target.value))}
                className="border border-[#DFE1E6] rounded-md px-3 py-2 text-[#172B4D] font-mono focus:border-[#0052CC] focus:outline-hidden"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[#42526E] font-semibold">Tautan Dokumen Spesifikasi Utama (.md)</label>
            <input
              type="text"
              value={specFile}
              onChange={(e) => setSpecFile(e.target.value)}
              placeholder="docs/03-requirements/features/FEAT-POS-001-sales/README.md"
              className="border border-[#DFE1E6] rounded-md px-3 py-2 text-[#172B4D] font-mono focus:border-[#0052CC] focus:outline-hidden"
            />
          </div>

          {/* Document References / Mentions Picker */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[#42526E] font-semibold flex items-center gap-1">
              <FileText className="w-3.5 h-3.5 text-[#0052CC]" /> Mention Dokumen Referensi (PRD / Epics / ADR)
            </label>
            <div className="p-2.5 border border-[#DFE1E6] rounded-lg bg-[#FAFBFC] flex flex-col gap-2 max-h-36 overflow-y-auto">
              {COMMON_DOC_REFERENCES.map((doc) => {
                const isSelected = selectedDocRefs.some((d) => d.path === doc.path);
                return (
                  <div
                    key={doc.path}
                    onClick={() => handleToggleDocRef(doc)}
                    className={`flex items-center justify-between p-2 rounded cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-blue-50 border border-blue-300 text-[#0052CC]'
                        : 'bg-white border border-[#DFE1E6] hover:border-gray-300 text-[#172B4D]'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-purple-100 text-purple-700 uppercase">
                        {doc.type}
                      </span>
                      <span className="text-xs font-medium truncate">{doc.title}</span>
                    </div>
                    <span className="text-xs font-bold text-[#0052CC]">
                      {isSelected ? '✓ Terhubung' : '+ Hubungkan'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[#42526E] font-semibold">Tags (pisahkan koma)</label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="pos, shift, audit-trail"
              className="border border-[#DFE1E6] rounded-md px-3 py-2 text-[#172B4D] focus:border-[#0052CC] focus:outline-hidden"
            />
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#EBECF0] mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md text-[#42526E] hover:text-[#172B4D] hover:bg-[#EBECF0] font-semibold transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-md bg-[#0052CC] hover:bg-[#0747A6] active:bg-[#003884] text-white font-semibold shadow-xs transition-colors cursor-pointer"
            >
              Create Issue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

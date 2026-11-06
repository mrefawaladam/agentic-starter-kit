'use client';

import React, { useState } from 'react';
import { TaskItem, KanbanColumn } from '@/lib/storage';
import { X, Plus, Bookmark, Zap, CheckSquare, Bug } from 'lucide-react';

interface NewTaskModalProps {
  columns: KanbanColumn[];
  isOpen: boolean;
  onClose: () => void;
  onAddTask: (newTask: TaskItem) => void;
}

export function NewTaskModal({ columns, isOpen, onClose, onAddTask }: NewTaskModalProps) {
  const [code, setCode] = useState('FEAT-002');
  const [title, setTitle] = useState('');
  const [type, setType] = useState<TaskItem['type']>('FEATURE');
  const [priority, setPriority] = useState<TaskItem['priority']>('MEDIUM');
  const [status, setStatus] = useState<TaskItem['status']>('backlog');
  const [assignee, setAssignee] = useState('PM Agent');
  const [specFile, setSpecFile] = useState('docs/03-requirements/features/FEAT-002/README.md');
  const [tagsInput, setTagsInput] = useState('core, frontend');
  const [storyPoints, setStoryPoints] = useState(3);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const newTask: TaskItem = {
      id: `TASK-${Date.now().toString().slice(-4)}`,
      code: code.trim(),
      title: title.trim(),
      type,
      priority,
      status,
      assignee: assignee.trim(),
      spec_file: specFile.trim() || undefined,
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
      <div className="relative w-full max-w-lg bg-white border border-[#DFE1E6] rounded-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 px-6 border-b border-[#EBECF0] bg-[#FAFBFC]">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-[#0052CC] text-white flex items-center justify-center font-bold text-xs">
              +
            </div>
            <h3 className="font-bold text-[#172B4D] text-sm">Create Issue / Task</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#5E6C84] hover:text-[#172B4D] rounded-md hover:bg-[#EBECF0] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4 text-xs">
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-1 flex flex-col gap-1.5">
              <label className="text-[#42526E] font-semibold">Issue Key</label>
              <input
                type="text"
                required
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="FEAT-002"
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
                placeholder="misal: Fitur Keranjang Belanja"
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

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-[#42526E] font-semibold">Assignee (AI Agent / Human)</label>
              <input
                type="text"
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
                placeholder="PM Agent / Developer Agent"
                className="border border-[#DFE1E6] rounded-md px-3 py-2 text-[#172B4D] focus:border-[#0052CC] focus:outline-hidden"
              />
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
            <label className="text-[#42526E] font-semibold">Tautan Dokumen Spesifikasi (.md)</label>
            <input
              type="text"
              value={specFile}
              onChange={(e) => setSpecFile(e.target.value)}
              placeholder="docs/03-requirements/features/FEAT-XXX/README.md"
              className="border border-[#DFE1E6] rounded-md px-3 py-2 text-[#172B4D] font-mono focus:border-[#0052CC] focus:outline-hidden"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[#42526E] font-semibold">Tags (pisahkan koma)</label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="auth, backend, security"
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

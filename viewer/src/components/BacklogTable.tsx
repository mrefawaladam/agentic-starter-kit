'use client';

import React, { useState } from 'react';
import { TaskItem, KanbanColumn } from '@/lib/storage';
import {
  Search,
  Filter,
  CheckSquare,
  FileText,
  ChevronRight,
  Bookmark,
  Zap,
  Bug,
  ChevronUp,
  ChevronsUp,
  ChevronDown,
  Minus,
} from 'lucide-react';

interface BacklogTableProps {
  tasks: TaskItem[];
  columns: KanbanColumn[];
  onSelectTask: (task: TaskItem) => void;
  onUpdateTaskStatus: (taskId: string, newStatus: TaskItem['status']) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export function BacklogTable({
  tasks,
  columns,
  onSelectTask,
  onUpdateTaskStatus,
  searchTerm,
  setSearchTerm,
}: BacklogTableProps) {
  const [filterPriority, setFilterPriority] = useState<string>('ALL');
  const [filterType, setFilterType] = useState<string>('ALL');

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.tags?.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesPriority = filterPriority === 'ALL' || task.priority === filterPriority;
    const matchesType = filterType === 'ALL' || task.type === filterType;

    return matchesSearch && matchesPriority && matchesType;
  });

  const typeIcons: Record<TaskItem['type'], { icon: React.ReactNode; color: string }> = {
    STORY: { icon: <Bookmark className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />, color: 'text-emerald-700' },
    FEATURE: { icon: <Zap className="w-3.5 h-3.5 text-purple-600 fill-purple-600" />, color: 'text-purple-700' },
    TASK: { icon: <CheckSquare className="w-3.5 h-3.5 text-blue-600" />, color: 'text-blue-700' },
    BUG: { icon: <Bug className="w-3.5 h-3.5 text-red-600" />, color: 'text-red-700' },
    SPIKE: { icon: <Zap className="w-3.5 h-3.5 text-amber-600" />, color: 'text-amber-700' },
  };

  const priorityIcons: Record<TaskItem['priority'], { icon: React.ReactNode; text: string }> = {
    CRITICAL: { icon: <ChevronsUp className="w-3.5 h-3.5 text-red-600 stroke-[2.5]" />, text: 'text-red-700' },
    HIGH: { icon: <ChevronUp className="w-3.5 h-3.5 text-orange-600 stroke-[2.5]" />, text: 'text-orange-700' },
    MEDIUM: { icon: <Minus className="w-3.5 h-3.5 text-amber-500 stroke-[2.5]" />, text: 'text-amber-700' },
    LOW: { icon: <ChevronDown className="w-3.5 h-3.5 text-slate-400 stroke-[2.5]" />, text: 'text-slate-600' },
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Filter Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-white border border-[#DFE1E6] jira-card-shadow">
        <div className="flex items-center gap-2 flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#5E6C84]" />
            <input
              type="text"
              placeholder="Cari task, kode (FEAT-001), atau tag..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#F4F5F7] border border-[#DFE1E6] rounded-md pl-9 pr-3 py-1.5 text-xs text-[#172B4D] placeholder:text-[#6B778C] focus:bg-white focus:border-[#0052CC] focus:outline-hidden transition-colors"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <Filter className="w-3.5 h-3.5 text-[#5E6C84]" />
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="bg-[#F4F5F7] border border-[#DFE1E6] rounded-md px-2.5 py-1.5 text-xs text-[#172B4D] font-medium focus:outline-hidden focus:border-[#0052CC]"
          >
            <option value="ALL">Semua Prioritas</option>
            <option value="CRITICAL">Critical</option>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
          </select>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="bg-[#F4F5F7] border border-[#DFE1E6] rounded-md px-2.5 py-1.5 text-xs text-[#172B4D] font-medium focus:outline-hidden focus:border-[#0052CC]"
          >
            <option value="ALL">Semua Tipe</option>
            <option value="FEATURE">Feature</option>
            <option value="BUG">Bug</option>
            <option value="TASK">Task</option>
            <option value="STORY">Story</option>
          </select>
        </div>
      </div>

      {/* Jira Backlog Table Container */}
      <div className="rounded-xl border border-[#DFE1E6] overflow-hidden bg-white jira-card-shadow">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#F4F5F7] border-b border-[#DFE1E6] text-[#5E6C84] font-bold uppercase text-[11px] tracking-wider">
            <tr>
              <th className="py-3 px-4 w-32">Kode</th>
              <th className="py-3 px-4">Judul Task</th>
              <th className="py-3 px-4 w-44">Status</th>
              <th className="py-3 px-4 w-28">Prioritas</th>
              <th className="py-3 px-4 w-36">Assignee</th>
              <th className="py-3 px-4 w-24">AC Progress</th>
              <th className="py-3 px-4 w-12 text-center"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EBECF0]">
            {filteredTasks.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-10 text-center text-[#6B778C]">
                  Tidak ada task yang sesuai dengan kriteria filter.
                </td>
              </tr>
            ) : (
              filteredTasks.map((task) => {
                const completedAC = task.acceptance_criteria?.filter((a) => a.checked).length || 0;
                const totalAC = task.acceptance_criteria?.length || 0;
                const typeInfo = typeIcons[task.type] || typeIcons.TASK;
                const prioInfo = priorityIcons[task.priority] || priorityIcons.MEDIUM;

                return (
                  <tr
                    key={task.id}
                    onClick={() => onSelectTask(task)}
                    className="hover:bg-[#F4F5F7]/80 cursor-pointer transition-colors group"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        {typeInfo.icon}
                        <span className="font-mono font-semibold text-[#0052CC]">
                          {task.code || task.id}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-medium text-[#172B4D] group-hover:text-[#0052CC] transition-colors">
                      <div className="flex items-center gap-2">
                        <span>{task.title}</span>
                        {task.spec_file && (
                          <span title="Spesifikasi Tersedia" className="text-[#0052CC]">
                            <FileText className="w-3.5 h-3.5" />
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4" onClick={(e) => e.stopPropagation()}>
                      <select
                        value={task.status}
                        onChange={(e) =>
                          onUpdateTaskStatus(task.id, e.target.value as TaskItem['status'])
                        }
                        className="bg-[#F4F5F7] border border-[#DFE1E6] text-[#172B4D] text-[11px] font-semibold rounded-md px-2 py-1 focus:outline-hidden focus:border-[#0052CC]"
                      >
                        {columns.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.title}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5 font-medium">
                        {prioInfo.icon}
                        <span className="text-[11px] text-[#42526E]">{task.priority}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-[#42526E] font-medium">
                      {task.assignee || 'Unassigned'}
                    </td>
                    <td className="py-3 px-4 font-mono text-[#5E6C84]">
                      {totalAC > 0 ? (
                        <span
                          className={`flex items-center gap-1 font-semibold ${
                            completedAC === totalAC ? 'text-emerald-700 font-bold' : ''
                          }`}
                        >
                          <CheckSquare className="w-3 h-3" />
                          {completedAC}/{totalAC}
                        </span>
                      ) : (
                        '-'
                      )}
                    </td>
                    <td className="py-3 px-4 text-right text-[#6B778C] group-hover:text-[#172B4D]">
                      <ChevronRight className="w-4 h-4 ml-auto" />
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

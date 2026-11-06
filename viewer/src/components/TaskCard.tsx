'use client';

import React from 'react';
import { TaskItem } from '@/lib/storage';
import {
  FileText,
  CheckSquare,
  Bookmark,
  Bug,
  CheckCircle2,
  Zap,
  ChevronUp,
  ChevronsUp,
  ChevronDown,
  Minus,
} from 'lucide-react';

interface TaskCardProps {
  task: TaskItem;
  onSelect: (task: TaskItem) => void;
  onDragStart: (e: React.DragEvent, taskId: string) => void;
}

export function TaskCard({ task, onSelect, onDragStart }: TaskCardProps) {
  const completedAC = task.acceptance_criteria?.filter((ac) => ac.checked).length || 0;
  const totalAC = task.acceptance_criteria?.length || 0;

  // Jira Type Icons & Colors
  const typeIcons: Record<TaskItem['type'], { icon: React.ReactNode; bg: string; text: string }> = {
    STORY: {
      icon: <Bookmark className="w-3 h-3 text-emerald-600 fill-emerald-600" />,
      bg: 'bg-emerald-50 border-emerald-200',
      text: 'text-emerald-700',
    },
    FEATURE: {
      icon: <Zap className="w-3 h-3 text-purple-600 fill-purple-600" />,
      bg: 'bg-purple-50 border-purple-200',
      text: 'text-purple-700',
    },
    TASK: {
      icon: <CheckSquare className="w-3 h-3 text-blue-600" />,
      bg: 'bg-blue-50 border-blue-200',
      text: 'text-blue-700',
    },
    BUG: {
      icon: <Bug className="w-3 h-3 text-red-600" />,
      bg: 'bg-red-50 border-red-200',
      text: 'text-red-700',
    },
    SPIKE: {
      icon: <Zap className="w-3 h-3 text-amber-600" />,
      bg: 'bg-amber-50 border-amber-200',
      text: 'text-amber-700',
    },
  };

  // Jira Priority Icons
  const priorityIcons: Record<TaskItem['priority'], { icon: React.ReactNode; text: string; label: string }> = {
    CRITICAL: {
      icon: <ChevronsUp className="w-3.5 h-3.5 text-red-600 stroke-[2.5]" />,
      text: 'text-red-600',
      label: 'Critical',
    },
    HIGH: {
      icon: <ChevronUp className="w-3.5 h-3.5 text-orange-600 stroke-[2.5]" />,
      text: 'text-orange-600',
      label: 'High',
    },
    MEDIUM: {
      icon: <Minus className="w-3.5 h-3.5 text-amber-500 stroke-[2.5]" />,
      text: 'text-amber-600',
      label: 'Medium',
    },
    LOW: {
      icon: <ChevronDown className="w-3.5 h-3.5 text-slate-400 stroke-[2.5]" />,
      text: 'text-slate-500',
      label: 'Low',
    },
  };

  const currentType = typeIcons[task.type] || typeIcons.TASK;
  const currentPriority = priorityIcons[task.priority] || priorityIcons.MEDIUM;

  // Generate initials for avatar
  const getInitials = (name?: string) => {
    if (!name || name === 'Unassigned') return '?';
    return name
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
      onClick={() => onSelect(task)}
      className="group relative cursor-grab active:cursor-grabbing rounded-lg border border-[#DFE1E6] bg-white p-3.5 jira-card-shadow transition-all duration-150 hover:border-[#0052CC] flex flex-col gap-2.5"
    >
      {/* Title */}
      <h4 className="text-[13px] font-medium text-[#172B4D] group-hover:text-[#0052CC] leading-snug line-clamp-2">
        {task.title}
      </h4>

      {/* Tags */}
      {task.tags && task.tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {task.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-2 py-0.5 rounded-sm bg-[#EBECF0] text-[#42526E] font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Card Footer: Jira Issue Key, Type Icon, Priority, AC and Avatar */}
      <div className="flex items-center justify-between pt-2 border-t border-[#EBECF0] text-xs">
        <div className="flex items-center gap-1.5 flex-wrap">
          {/* Type Icon */}
          <span title={task.type}>{currentType.icon}</span>

          {/* Task ID (Nomor Task) */}
          <span
            title={`Task ID: ${task.id}`}
            className="font-mono text-[11px] font-bold text-[#0747A6] bg-[#DEEBFF] px-1.5 py-0.5 rounded border border-[#B3D4FF] group-hover:border-[#0052CC] transition-colors"
          >
            {task.id}
          </span>

          {/* Feature Code (jika berbeda dari ID) */}
          {task.code && task.code !== task.id && (
            <span
              title={`Feature Code: ${task.code}`}
              className="font-mono text-[10px] text-[#5E6C84] bg-[#F4F5F7] px-1 py-0.5 rounded border border-[#EBECF0]"
            >
              {task.code}
            </span>
          )}

          {/* Priority */}
          <span title={`Priority: ${currentPriority.label}`} className="ml-0.5">
            {currentPriority.icon}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Acceptance Criteria Status */}
          {totalAC > 0 && (
            <span
              title={`Acceptance Criteria: ${completedAC}/${totalAC}`}
              className={`flex items-center gap-1 text-[11px] font-mono px-1.5 py-0.5 rounded ${
                completedAC === totalAC
                  ? 'bg-emerald-50 text-emerald-700 font-semibold'
                  : 'text-[#6B778C]'
              }`}
            >
              <CheckSquare className="w-3 h-3" />
              {completedAC}/{totalAC}
            </span>
          )}

          {/* Document References Badge */}
          {task.document_references && task.document_references.length > 0 && (
            <span
              title={`${task.document_references.length} Dokumen Referensi (PRD/Epics/ADR)`}
              className="flex items-center gap-1 text-[10px] font-mono px-1.5 py-0.5 rounded bg-purple-50 text-purple-700 font-semibold border border-purple-200"
            >
              <FileText className="w-2.5 h-2.5 text-purple-600" />
              {task.document_references.length} doc{task.document_references.length > 1 ? 's' : ''}
            </span>
          )}

          {/* Story Points */}
          {task.story_points !== undefined && (
            <span className="text-[10px] font-mono bg-[#DFE1E6] text-[#172B4D] font-bold px-1.5 py-0.5 rounded-full">
              {task.story_points}
            </span>
          )}

          {/* Assignee Avatar */}
          <div
            title={`Assignee: ${task.assignee || 'Unassigned'}`}
            className="w-5 h-5 rounded-full bg-[#0052CC] text-white text-[9px] font-bold flex items-center justify-center shrink-0 shadow-xs"
          >
            {getInitials(task.assignee)}
          </div>
        </div>
      </div>
    </div>
  );
}

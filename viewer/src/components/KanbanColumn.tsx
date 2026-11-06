'use client';

import React, { useState } from 'react';
import { KanbanColumn as ColumnType, TaskItem } from '@/lib/storage';
import { TaskCard } from './TaskCard';

interface KanbanColumnProps {
  column: ColumnType;
  tasks: TaskItem[];
  onSelectTask: (task: TaskItem) => void;
  onDropTask: (taskId: string, targetColumnId: string) => void;
  onDragStartTask: (e: React.DragEvent, taskId: string) => void;
}

export function KanbanColumn({
  column,
  tasks,
  onSelectTask,
  onDropTask,
  onDragStartTask,
}: KanbanColumnProps) {
  const [isOver, setIsOver] = useState(false);

  // Status header badge styles in Jira
  const columnStyles: Record<string, { headerColor: string; pillColor: string }> = {
    backlog: { headerColor: 'text-[#5E6C84]', pillColor: 'bg-[#DFE1E6] text-[#42526E]' },
    spec_drafting: { headerColor: 'text-[#0052CC]', pillColor: 'bg-[#DEEBFF] text-[#0747A6]' },
    in_review: { headerColor: 'text-[#874CEF]', pillColor: 'bg-[#EAE6FF] text-[#403294]' },
    ready_for_dev: { headerColor: 'text-[#00875A]', pillColor: 'bg-[#E3FCEF] text-[#006644]' },
    in_progress: { headerColor: 'text-[#0052CC]', pillColor: 'bg-[#DEEBFF] text-[#0747A6]' },
    in_qa: { headerColor: 'text-[#874CEF]', pillColor: 'bg-[#EAE6FF] text-[#403294]' },
    done: { headerColor: 'text-[#00875A]', pillColor: 'bg-[#E3FCEF] text-[#006644]' },
  };

  const currentStyle = columnStyles[column.id] || {
    headerColor: 'text-[#5E6C84]',
    pillColor: 'bg-[#DFE1E6] text-[#42526E]',
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsOver(true);
  };

  const handleDragLeave = () => {
    setIsOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsOver(false);
    const taskId = e.dataTransfer.getData('text/plain');
    if (taskId) {
      onDropTask(taskId, column.id);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`flex flex-col w-72 shrink-0 rounded-xl bg-[#F4F5F7] border transition-all duration-150 ${
        isOver
          ? 'border-[#0052CC] bg-[#DEEBFF]/30 ring-2 ring-[#0052CC]/20'
          : 'border-[#DFE1E6]'
      }`}
    >
      {/* Column Header */}
      <div className="flex items-center justify-between p-3 border-b border-[#EBECF0]">
        <div className="flex items-center gap-2">
          <h3 className={`text-xs font-bold uppercase tracking-wider ${currentStyle.headerColor}`}>
            {column.title}
          </h3>
          <span
            className={`text-[11px] font-mono px-2 py-0.2 rounded-full font-bold ${currentStyle.pillColor}`}
          >
            {tasks.length}
          </span>
        </div>
      </div>

      {/* Column Body / Droppable Cards Container */}
      <div className="flex-1 p-2.5 flex flex-col gap-2.5 min-h-[480px] max-h-[calc(100vh-220px)] overflow-y-auto">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onSelect={onSelectTask}
            onDragStart={onDragStartTask}
          />
        ))}

        {tasks.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center p-6 border-2 border-dashed border-[#DFE1E6] rounded-lg text-[#6B778C] text-xs text-center font-medium">
            Tarik kartu ke kolom ini
          </div>
        )}
      </div>
    </div>
  );
}

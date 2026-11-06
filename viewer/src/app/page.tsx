'use client';

import React, { useState, useEffect } from 'react';
import { BacklogData, TaskItem } from '@/lib/storage';
import { Header, ActiveTab } from '@/components/Header';
import { KanbanColumn } from '@/components/KanbanColumn';
import { BacklogTable } from '@/components/BacklogTable';
import { DocsHub } from '@/components/DocsHub';
import { AgentsHub } from '@/components/AgentsHub';
import { KnowledgeGraphHub } from '@/components/KnowledgeGraphHub';
import { SpecDrawer } from '@/components/SpecDrawer';
import { NewTaskModal } from '@/components/NewTaskModal';
import { AuthScreen } from '@/components/AuthScreen';
import { PublicUser } from '@/lib/auth-types';
import { Loader2, AlertCircle } from 'lucide-react';

export default function Home() {
  const [currentUser, setCurrentUser] = useState<PublicUser | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [data, setData] = useState<BacklogData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<ActiveTab>('board');
  const [selectedTask, setSelectedTask] = useState<TaskItem | null>(null);
  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [docsInitialFile, setDocsInitialFile] = useState<string>(
    'docs/03-requirements/features/FEAT-001-user-auth/README.md'
  );

  // Check auth session
  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((resData) => {
        if (resData.user) {
          setCurrentUser(resData.user);
        }
      })
      .catch((err) => console.error('Auth check error:', err))
      .finally(() => setIsCheckingAuth(false));
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setCurrentUser(null);
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  // Fetch initial backlog data
  useEffect(() => {
    fetch('/api/backlog')
      .then((res) => {
        if (!res.ok) throw new Error('Gagal memuat data backlog');
        return res.json();
      })
      .then((resData: BacklogData) => {
        setData(resData);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  // Persist backlog changes to disk
  const persistBacklog = async (updatedData: BacklogData) => {
    setData(updatedData);
    try {
      await fetch('/api/backlog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
    } catch (err) {
      console.error('Failed to save backlog:', err);
    }
  };

  // Drag and drop handlers
  const handleDragStartTask = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData('text/plain', taskId);
  };

  const handleDropTask = (taskId: string, targetColumnId: string) => {
    if (!data) return;
    const taskIndex = data.tasks.findIndex((t) => t.id === taskId);
    if (taskIndex === -1) return;

    const task = data.tasks[taskIndex];
    if (task.status === targetColumnId) return;

    const updatedTask: TaskItem = {
      ...task,
      status: targetColumnId as TaskItem['status'],
      updated_at: new Date().toISOString(),
    };

    const updatedTasks = [...data.tasks];
    updatedTasks[taskIndex] = updatedTask;

    const updatedData = { ...data, tasks: updatedTasks };
    persistBacklog(updatedData);

    if (selectedTask?.id === taskId) {
      setSelectedTask(updatedTask);
    }
  };

  const handleUpdateTask = (updatedTask: TaskItem) => {
    if (!data) return;
    const updatedTasks = data.tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t));
    const updatedData = { ...data, tasks: updatedTasks };
    persistBacklog(updatedData);
    setSelectedTask(updatedTask);
  };

  const handleAddTask = (newTask: TaskItem) => {
    if (!data) return;
    const updatedTasks = [newTask, ...data.tasks];
    const updatedData = { ...data, tasks: updatedTasks };
    persistBacklog(updatedData);
  };

  const handleOpenDocInHub = (docPath: string) => {
    setDocsInitialFile(docPath);
    setActiveTab('docs');
  };

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-[#F4F5F7] flex flex-col items-center justify-center text-[#5E6C84] gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-[#0052CC]" />
        <p className="text-xs font-mono font-medium">Memverifikasi sesi pengguna...</p>
      </div>
    );
  }

  if (!currentUser) {
    return <AuthScreen onSuccess={(user) => setCurrentUser(user)} />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F4F5F7] flex flex-col items-center justify-center text-[#5E6C84] gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-[#0052CC]" />
        <p className="text-xs font-mono font-medium">Memuat Jira SpecOS Workspace...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-[#F4F5F7] flex flex-col items-center justify-center p-6">
        <div className="p-6 rounded-xl bg-white border border-red-200 shadow-md max-w-md text-center flex flex-col items-center gap-3">
          <AlertCircle className="w-10 h-10 text-red-600" />
          <h2 className="text-base font-bold text-[#172B4D]">Gagal Memuat Workspace</h2>
          <p className="text-xs text-[#5E6C84]">{error || 'Data backlog tidak ditemukan'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F5F7] text-[#172B4D] flex flex-col font-sans selection:bg-[#DEEBFF] selection:text-[#0052CC]">
      {/* Jira Top Header & Navigation */}
      <Header
        projectName={data.project_name}
        tasks={data.tasks}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenNewTask={() => setIsNewTaskOpen(true)}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* Main Workspace Body */}
      <main className="flex-1 p-6 max-w-[1600px] w-full mx-auto overflow-hidden flex flex-col">
        {activeTab === 'board' && (
          <div className="flex-1 flex gap-4 overflow-x-auto pb-6 scrollbar-thin">
            {data.columns.map((column) => {
              const columnTasks = data.tasks.filter((t) => {
                const matchesCol = t.status === column.id;
                const matchesSearch =
                  !searchTerm ||
                  t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  t.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  t.tags?.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
                return matchesCol && matchesSearch;
              });

              return (
                <KanbanColumn
                  key={column.id}
                  column={column}
                  tasks={columnTasks}
                  onSelectTask={setSelectedTask}
                  onDropTask={handleDropTask}
                  onDragStartTask={handleDragStartTask}
                />
              );
            })}
          </div>
        )}

        {activeTab === 'backlog' && (
          <BacklogTable
            tasks={data.tasks}
            columns={data.columns}
            onSelectTask={setSelectedTask}
            onUpdateTaskStatus={(id, status) => handleDropTask(id, status)}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        )}

        {activeTab === 'docs' && <DocsHub initialFile={docsInitialFile} />}

        {activeTab === 'graph' && <KnowledgeGraphHub onOpenDoc={handleOpenDocInHub} />}

        {activeTab === 'agents' && <AgentsHub onOpenDoc={handleOpenDocInHub} />}
      </main>

      {/* Slide-over Task Spec & AC Drawer */}
      <SpecDrawer
        task={selectedTask}
        columns={data.columns}
        onClose={() => setSelectedTask(null)}
        onUpdateTask={handleUpdateTask}
        onOpenDocInHub={handleOpenDocInHub}
      />

      {/* Modal Create Issue / Task */}
      <NewTaskModal
        columns={data.columns}
        isOpen={isNewTaskOpen}
        onClose={() => setIsNewTaskOpen(false)}
        onAddTask={handleAddTask}
      />
    </div>
  );
}

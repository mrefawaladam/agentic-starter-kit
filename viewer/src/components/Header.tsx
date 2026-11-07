'use client';

import React from 'react';
import {
  LayoutGrid,
  List,
  Plus,
  BookOpen,
  Bot,
  Search,
  FolderGit2,
  CheckCircle2,
  Clock,
  Sparkles,
  Share2,
  Zap,
  LogOut,
  User,
  Shield,
  UserCheck,
} from 'lucide-react';
import { TaskItem } from '@/lib/storage';
import { PublicUser } from '@/lib/auth-types';

export type ActiveTab = 'board' | 'backlog' | 'docs' | 'graph' | 'agents';

interface HeaderProps {
  projectName: string;
  tasks: TaskItem[];
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenNewTask: () => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  currentUser?: PublicUser | null;
  onLogout?: () => void;
  onOpenUserApproval?: () => void;
}

export function Header({
  projectName,
  tasks,
  activeTab,
  setActiveTab,
  onOpenNewTask,
  searchTerm,
  setSearchTerm,
  currentUser,
  onLogout,
  onOpenUserApproval,
}: HeaderProps) {
  const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false);
  const readyCount = tasks.filter((t) => t.status === 'ready_for_dev').length;
  const inProgressCount = tasks.filter((t) => t.status === 'in_progress').length;
  const doneCount = tasks.filter((t) => t.status === 'done').length;

  const isAdmin =
    currentUser?.role === 'ADMINISTRATOR' ||
    currentUser?.role === 'LEAD_DEVELOPER' ||
    currentUser?.id === 'usr_default_admin';

  const initials = currentUser?.name
    ? currentUser.name
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'LD';

  return (
    <header className="border-b border-[#DFE1E6] bg-white sticky top-0 z-40 shadow-xs">
      {/* Top Primary Bar */}
      <div className="max-w-[1600px] mx-auto px-6 py-2.5 flex items-center justify-between gap-4">
        {/* Left: Jira-style Logo & Project Identity */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-md bg-[#0052CC] flex items-center justify-center text-white shadow-xs">
              <Zap className="w-4 h-4 fill-white text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-[#172B4D] tracking-tight">{projectName}</span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded font-bold bg-[#DEEBFF] text-[#0747A6]">
                  PROJ-AI
                </span>
              </div>
              <p className="text-[11px] text-[#5E6C84] -mt-0.5">Software Project • Kanban & Docs Hub</p>
            </div>
          </div>

          {/* Quick Metrics Badges */}
          <div className="hidden lg:flex items-center gap-3 pl-4 border-l border-[#EBECF0] text-xs">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#F4F5F7] border border-[#DFE1E6] text-[#42526E] font-medium">
              Total: <strong className="font-mono text-[#172B4D]">{tasks.length}</strong>
            </span>
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#E3FCEF] border border-emerald-200 text-[#006644] font-medium">
              Ready Dev: <strong className="font-mono">{readyCount}</strong>
            </span>
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#DEEBFF] border border-blue-200 text-[#0747A6] font-medium">
              In Progress: <strong className="font-mono">{inProgressCount}</strong>
            </span>
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#E3FCEF] border border-emerald-200 text-[#006644] font-medium">
              Done: <strong className="font-mono">{doneCount}</strong>
            </span>
          </div>
        </div>

        {/* Right: Search, Create Button, Profile */}
        <div className="flex items-center gap-3">
          {/* Quick Search */}
          <div className="relative w-64 hidden sm:block">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#5E6C84]" />
            <input
              type="text"
              placeholder="Cari task, kode, docs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#F4F5F7] hover:bg-[#EBECF0] focus:bg-white border border-[#DFE1E6] focus:border-[#0052CC] rounded-md pl-8 pr-3 py-1.5 text-xs text-[#172B4D] placeholder:text-[#6B778C] focus:outline-hidden transition-colors"
            />
          </div>

          {/* Jira Create Button */}
          <button
            onClick={onOpenNewTask}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-[#0052CC] hover:bg-[#0747A6] active:bg-[#003884] text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Create</span>
          </button>

          {/* User Avatar with Profile Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              title={currentUser ? `${currentUser.name} (${currentUser.role})` : 'Lead Developer'}
              className="w-8 h-8 rounded-full bg-[#0052CC] text-white text-xs font-bold flex items-center justify-center ring-2 ring-blue-100 shadow-xs cursor-pointer hover:ring-blue-300 transition-all"
            >
              {initials}
            </button>

            {isUserMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsUserMenuOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-64 bg-white border border-[#DFE1E6] rounded-xl shadow-lg z-50 p-2 animate-fade-in text-[#172B4D]">
                  <div className="p-3 border-b border-[#EBECF0]">
                    <p className="text-xs font-bold text-[#172B4D] truncate">
                      {currentUser?.name || 'Lead Developer'}
                    </p>
                    <p className="text-[11px] font-mono text-[#5E6C84] truncate">
                      {currentUser?.email || 'admin@kasirsakti.local'}
                    </p>
                    <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-sm bg-[#DEEBFF] text-[#0747A6] text-[10px] font-bold uppercase font-mono">
                      <Shield className="w-3 h-3" />
                      {currentUser?.role || 'LEAD_DEVELOPER'}
                    </div>
                  </div>

                  <div className="p-1 space-y-0.5">
                    {isAdmin && onOpenUserApproval && (
                      <button
                        type="button"
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          onOpenUserApproval();
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs text-[#0052CC] hover:bg-[#DEEBFF]/60 rounded-lg transition-colors cursor-pointer font-semibold"
                      >
                        <UserCheck className="w-3.5 h-3.5" />
                        <span>Approval Pengguna Baru</span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        if (onLogout) onLogout();
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer font-semibold"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Keluar (Logout)</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Tabs Bar (Jira Style Underline) */}
      <div className="max-w-[1600px] mx-auto px-6 flex items-center gap-1 border-t border-[#EBECF0] bg-white">
        <button
          onClick={() => setActiveTab('board')}
          className={`flex items-center gap-2 py-3 px-3.5 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
            activeTab === 'board'
              ? 'border-[#0052CC] text-[#0052CC]'
              : 'border-transparent text-[#5E6C84] hover:text-[#172B4D]'
          }`}
        >
          <LayoutGrid className="w-4 h-4" />
          <span>Kanban Board</span>
        </button>

        <button
          onClick={() => setActiveTab('backlog')}
          className={`flex items-center gap-2 py-3 px-3.5 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
            activeTab === 'backlog'
              ? 'border-[#0052CC] text-[#0052CC]'
              : 'border-transparent text-[#5E6C84] hover:text-[#172B4D]'
          }`}
        >
          <List className="w-4 h-4" />
          <span>Backlog</span>
        </button>

        <button
          onClick={() => setActiveTab('docs')}
          className={`flex items-center gap-2 py-3 px-3.5 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
            activeTab === 'docs'
              ? 'border-[#0052CC] text-[#0052CC]'
              : 'border-transparent text-[#5E6C84] hover:text-[#172B4D]'
          }`}
        >
          <BookOpen className="w-4 h-4 text-amber-600" />
          <span>Documentation Hub (00 - 10)</span>
          <span className="text-[10px] bg-amber-50 text-amber-700 font-bold px-1.5 py-0.2 rounded-full border border-amber-200">
            11 Modules
          </span>
        </button>

        <button
          onClick={() => setActiveTab('graph')}
          className={`flex items-center gap-2 py-3 px-3.5 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
            activeTab === 'graph'
              ? 'border-[#0052CC] text-[#0052CC]'
              : 'border-transparent text-[#5E6C84] hover:text-[#172B4D]'
          }`}
        >
          <Share2 className="w-4 h-4 text-indigo-600" />
          <span>Knowledge Graph & Scope</span>
          <span className="text-[10px] bg-indigo-50 text-indigo-700 font-bold px-1.5 py-0.2 rounded-full border border-indigo-200">
            Token Saver
          </span>
        </button>

        <button
          onClick={() => setActiveTab('agents')}
          className={`flex items-center gap-2 py-3 px-3.5 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
            activeTab === 'agents'
              ? 'border-[#0052CC] text-[#0052CC]'
              : 'border-transparent text-[#5E6C84] hover:text-[#172B4D]'
          }`}
        >
          <Bot className="w-4 h-4 text-purple-600" />
          <span>AI Agents & Skills</span>
          <span className="text-[10px] bg-purple-50 text-purple-700 font-bold px-1.5 py-0.2 rounded-full border border-purple-200">
            8 Roles
          </span>
        </button>
      </div>
    </header>
  );
}

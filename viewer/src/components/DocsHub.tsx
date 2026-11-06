'use client';

import React, { useState, useEffect } from 'react';
import { DocNode } from '@/lib/storage';
import { MarkdownViewer } from './MarkdownViewer';
import {
  Folder,
  FolderOpen,
  FileText,
  Plus,
  FolderPlus,
  Edit3,
  Eye,
  Save,
  Check,
  ChevronRight,
  ChevronDown,
  Sparkles,
  FileCode,
  LayoutTemplate,
  RefreshCw,
} from 'lucide-react';

interface DocsHubProps {
  initialFile?: string;
}

export function DocsHub({ initialFile }: DocsHubProps) {
  const [tree, setTree] = useState<DocNode[]>([]);
  const [isLoadingTree, setIsLoadingTree] = useState(true);
  const [selectedFilePath, setSelectedFilePath] = useState<string>(
    initialFile || 'docs/03-requirements/features/FEAT-001-user-auth/README.md'
  );
  const [fileContent, setFileContent] = useState<string>('');
  const [editContent, setEditContent] = useState<string>('');
  const [isLoadingFile, setIsLoadingFile] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Expanded folders in the tree
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    'docs/00-governance': true,
    'docs/03-requirements': true,
    'docs/03-requirements/features': true,
    'docs/03-requirements/features/FEAT-001-user-auth': true,
    'docs/05-architecture': true,
  });

  // Modal states
  const [isNewFileModalOpen, setIsNewFileModalOpen] = useState(false);
  const [isNewFolderModalOpen, setIsNewFolderModalOpen] = useState(false);
  const [modalParentFolder, setModalParentFolder] = useState('docs/03-requirements');
  const [newFileName, setNewFileName] = useState('');
  const [newFolderName, setNewFolderName] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('blank');

  // Load Doc Tree
  const fetchTree = () => {
    setIsLoadingTree(true);
    fetch('/api/docs/tree')
      .then((res) => res.json())
      .then((data) => {
        setTree(data.tree || []);
      })
      .catch((err) => console.error('Error fetching tree:', err))
      .finally(() => setIsLoadingTree(false));
  };

  useEffect(() => {
    fetchTree();
  }, []);

  // Load selected file content
  useEffect(() => {
    if (!selectedFilePath) return;
    setIsLoadingFile(true);
    fetch(`/api/spec?path=${encodeURIComponent(selectedFilePath)}`)
      .then((res) => res.json())
      .then((data) => {
        setFileContent(data.content || '');
        setEditContent(data.content || '');
      })
      .catch((err) => {
        setFileContent(`# Error memuat dokumen: ${err.message}`);
        setEditContent(`# Error memuat dokumen: ${err.message}`);
      })
      .finally(() => setIsLoadingFile(false));
  }, [selectedFilePath]);

  const toggleFolder = (folderPath: string) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [folderPath]: !prev[folderPath],
    }));
  };

  const handleSaveFile = async () => {
    setIsSaving(true);
    try {
      const res = await fetch('/api/docs/file', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          path: selectedFilePath,
          content: editContent,
        }),
      });

      if (res.ok) {
        setFileContent(editContent);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 2500);
      } else {
        alert('Gagal menyimpan file');
      }
    } catch (err) {
      alert('Error menyimpan file: ' + err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCreateFile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFileName.trim()) return;

    const sanitizedName = newFileName.endsWith('.md') ? newFileName : `${newFileName}.md`;
    const fullPath = `${modalParentFolder}/${sanitizedName}`.replace(/\/+/g, '/');

    let initialBody = `# ${sanitizedName.replace('.md', '')}\n\nDokumen dibuat pada: ${new Date().toLocaleDateString('id-ID')}\n\n`;

    if (selectedTemplate === 'feature') {
      initialBody += `---
id: FEAT-XXX-001
title: "[Nama Fitur]"
type: feature
status: DRAFT
priority: P2
owner: PM Agent
---

## 1. Overview
Jelaskan tujuan dan nilai bisnis fitur ini.

## 2. Business Rules
- **BR-XXX-001**: Aturan pertama...

## 3. Acceptance Criteria
### AC-XXX-001: Skenario Utama
- **Given** kondisi awal
- **When** aksi dilakukan
- **Then** hasil yang diharapkan
`;
    } else if (selectedTemplate === 'adr') {
      initialBody += `# Architecture Decision Record: ADR-XXX

## Judul: [Keputusan Arsitektur]
- **Status**: DRAFT
- **Pengusul**: Solution Architect

## 1. Konteks & Masalah
Jelaskan latar belakang masalah.

## 2. Pilihan yang Dipertimbangkan
1. Pilihan A
2. Pilihan B

## 3. Keputusan & Alasan
Pilihan yang diambil dan konsikuensinya.
`;
    }

    try {
      const res = await fetch('/api/docs/file', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: fullPath, content: initialBody }),
      });

      if (res.ok) {
        setIsNewFileModalOpen(false);
        setNewFileName('');
        fetchTree();
        setSelectedFilePath(fullPath);
      } else {
        alert('Gagal membuat file');
      }
    } catch (err) {
      alert('Error membuat file: ' + err);
    }
  };

  const handleCreateFolder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFolderName.trim()) return;

    const fullPath = `${modalParentFolder}/${newFolderName}`.replace(/\/+/g, '/');

    try {
      const res = await fetch('/api/docs/folder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: fullPath }),
      });

      if (res.ok) {
        setIsNewFolderModalOpen(false);
        setNewFolderName('');
        fetchTree();
        setExpandedFolders((prev) => ({ ...prev, [modalParentFolder]: true }));
      } else {
        alert('Gagal membuat folder');
      }
    } catch (err) {
      alert('Error membuat folder: ' + err);
    }
  };

  // Helper to insert markdown templates into editor
  const insertTemplateToEditor = (snippet: string) => {
    setEditContent((prev) => prev + '\n' + snippet);
  };

  // Render tree node recursively
  const renderTreeNode = (node: DocNode, level = 0) => {
    const isFolder = node.type === 'directory';
    const isExpanded = !!expandedFolders[node.path];
    const isSelected = selectedFilePath === node.path;

    return (
      <div key={node.path} className="flex flex-col select-none">
        <div
          onClick={() => {
            if (isFolder) {
              toggleFolder(node.path);
            } else {
              setSelectedFilePath(node.path);
              setIsEditing(false);
            }
          }}
          style={{ paddingLeft: `${Math.max(level * 14 + 10, 10)}px` }}
          className={`flex items-center justify-between py-1.5 pr-2.5 rounded-md cursor-pointer text-xs font-medium transition-colors ${
            isSelected
              ? 'bg-[#DEEBFF] text-[#0052CC] font-semibold'
              : 'text-[#42526E] hover:bg-[#EBECF0] hover:text-[#172B4D]'
          }`}
        >
          <div className="flex items-center gap-2 truncate">
            {isFolder ? (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFolder(node.path);
                  }}
                  className="p-0.5 text-[#6B778C] hover:text-[#172B4D]"
                >
                  {isExpanded ? (
                    <ChevronDown className="w-3.5 h-3.5" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5" />
                  )}
                </button>
                {isExpanded ? (
                  <FolderOpen className="w-4 h-4 text-amber-500 shrink-0" />
                ) : (
                  <Folder className="w-4 h-4 text-amber-500 shrink-0" />
                )}
                <span className="truncate">{node.name}</span>
              </>
            ) : (
              <>
                <FileText className="w-4 h-4 text-[#0052CC] shrink-0 ml-4" />
                <span className="truncate">{node.name}</span>
              </>
            )}
          </div>

          {isFolder && node.children && node.children.length > 0 && (
            <span className="text-[10px] text-[#6B778C] font-mono px-1 rounded bg-[#EBECF0]">
              {node.children.length}
            </span>
          )}
        </div>

        {isFolder && isExpanded && node.children && (
          <div className="flex flex-col">
            {node.children.map((child) => renderTreeNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex-1 flex overflow-hidden bg-white border border-[#DFE1E6] rounded-xl shadow-xs">
      {/* Left Pane: Tree Navigator */}
      <div className="w-80 shrink-0 border-r border-[#DFE1E6] bg-[#F4F5F7] flex flex-col">
        {/* Explorer Header */}
        <div className="p-3.5 border-b border-[#DFE1E6] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#172B4D]">
              Spec Explorer
            </span>
            <span className="text-[10px] font-mono bg-[#DEEBFF] text-[#0747A6] px-1.5 py-0.2 rounded font-bold">
              11 Modules
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => {
                setModalParentFolder('docs/03-requirements');
                setIsNewFolderModalOpen(true);
              }}
              title="Buat Folder Baru"
              className="p-1 text-[#5E6C84] hover:text-[#0052CC] hover:bg-[#DEEBFF] rounded transition-colors"
            >
              <FolderPlus className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setModalParentFolder('docs/03-requirements');
                setIsNewFileModalOpen(true);
              }}
              title="Buat File .md Baru"
              className="p-1 text-[#5E6C84] hover:text-[#0052CC] hover:bg-[#DEEBFF] rounded transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
            <button
              onClick={fetchTree}
              title="Muat Ulang Folder"
              className="p-1 text-[#5E6C84] hover:text-[#172B4D] hover:bg-[#EBECF0] rounded transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Tree Content */}
        <div className="flex-1 overflow-y-auto p-2 flex flex-col gap-0.5">
          {isLoadingTree ? (
            <div className="p-6 text-center text-xs text-[#6B778C] font-mono">
              Memindai folder docs/...
            </div>
          ) : (
            tree.map((node) => renderTreeNode(node))
          )}
        </div>
      </div>

      {/* Right Pane: Document Viewer / Editor */}
      <div className="flex-1 flex flex-col overflow-hidden bg-white">
        {/* Document Header & Action Bar */}
        <div className="p-3.5 px-6 border-b border-[#DFE1E6] flex flex-wrap items-center justify-between gap-3 bg-white">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#6B778C]">Path:</span>
            <code className="bg-[#F4F5F7] text-[#172B4D] px-2.5 py-1 rounded-md font-mono text-xs border border-[#DFE1E6] font-semibold">
              {selectedFilePath}
            </code>
          </div>

          <div className="flex items-center gap-2">
            {/* View / Edit Mode Toggle */}
            <div className="flex items-center bg-[#EBECF0] p-0.5 rounded-lg text-xs">
              <button
                onClick={() => setIsEditing(false)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-md font-medium transition-all ${
                  !isEditing
                    ? 'bg-white text-[#0052CC] shadow-xs'
                    : 'text-[#5E6C84] hover:text-[#172B4D]'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Preview</span>
              </button>
              <button
                onClick={() => setIsEditing(true)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-md font-medium transition-all ${
                  isEditing
                    ? 'bg-white text-[#0052CC] shadow-xs'
                    : 'text-[#5E6C84] hover:text-[#172B4D]'
                }`}
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit File</span>
              </button>
            </div>

            {/* Save Button (when editing) */}
            {isEditing && (
              <button
                onClick={handleSaveFile}
                disabled={isSaving}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-[#0052CC] hover:bg-[#0747A6] active:bg-[#003884] text-white text-xs font-semibold shadow-xs transition-all disabled:opacity-50"
              >
                {saveSuccess ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-300" />
                    <span>Tersimpan!</span>
                  </>
                ) : (
                  <>
                    <Save className="w-3.5 h-3.5" />
                    <span>{isSaving ? 'Menyimpan...' : 'Simpan Perubahan'}</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Quick Toolbar for Editor */}
        {isEditing && (
          <div className="px-6 py-2 border-b border-[#EBECF0] bg-[#FAFBFC] flex flex-wrap items-center gap-2 text-xs">
            <span className="text-[#6B778C] text-[11px] font-semibold mr-1">Insert Template:</span>
            <button
              onClick={() => insertTemplateToEditor('### Judul Sub-Seksi\nPenjelasan singkat di sini.')}
              className="px-2 py-0.8 bg-white border border-[#DFE1E6] hover:border-[#0052CC] rounded text-[#42526E] text-[11px] font-medium"
            >
              + Heading
            </button>
            <button
              onClick={() =>
                insertTemplateToEditor('| No | Kolom 1 | Kolom 2 |\n| :--- | :--- | :--- |\n| 1 | Data A | Data B |')
              }
              className="px-2 py-0.8 bg-white border border-[#DFE1E6] hover:border-[#0052CC] rounded text-[#42526E] text-[11px] font-medium"
            >
              + Tabel
            </button>
            <button
              onClick={() =>
                insertTemplateToEditor(`\`\`\`mermaid
sequenceDiagram
    actor User as Pengguna
    participant UI as Frontend
    participant API as Backend Server
    User->>UI: Klik Tombol
    UI->>API: POST /api/data
    API-->>UI: 200 OK
\`\`\``)
              }
              className="px-2 py-0.8 bg-purple-50 border border-purple-200 hover:border-purple-400 text-purple-700 rounded text-[11px] font-medium flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3" />
              + Mermaid Diagram
            </button>
            <button
              onClick={() =>
                insertTemplateToEditor(`- [ ] Kriteria 1: Kondisi terpenuhi\n- [ ] Kriteria 2: Validasi sukses`)
              }
              className="px-2 py-0.8 bg-white border border-[#DFE1E6] hover:border-[#0052CC] rounded text-[#42526E] text-[11px] font-medium"
            >
              + Checklist AC
            </button>
          </div>
        )}

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-8">
          {isLoadingFile ? (
            <div className="flex items-center justify-center p-12 text-[#6B778C] text-xs font-mono">
              Memuat file markdown...
            </div>
          ) : isEditing ? (
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              placeholder="Tulis markdown spesifikasi di sini..."
              className="w-full h-full min-h-[500px] p-4 bg-[#FAFBFC] border border-[#DFE1E6] rounded-xl font-mono text-xs leading-relaxed text-[#172B4D] focus:border-[#0052CC] focus:outline-hidden focus:bg-white resize-none"
            />
          ) : (
            <div className="max-w-4xl mx-auto">
              <MarkdownViewer content={fileContent} />
            </div>
          )}
        </div>
      </div>

      {/* Modal: Create File */}
      {isNewFileModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white border border-[#DFE1E6] rounded-xl shadow-xl w-full max-w-md p-6 flex flex-col gap-4">
            <h3 className="text-sm font-bold text-[#172B4D]">Buat Dokumen Markdown Baru (.md)</h3>

            <div className="flex flex-col gap-1.5 text-xs">
              <label className="font-semibold text-[#42526E]">Folder Tujuan</label>
              <input
                type="text"
                value={modalParentFolder}
                onChange={(e) => setModalParentFolder(e.target.value)}
                placeholder="docs/03-requirements"
                className="bg-[#F4F5F7] border border-[#DFE1E6] rounded-lg px-3 py-2 text-[#172B4D] font-mono focus:border-[#0052CC] focus:outline-hidden"
              />
            </div>

            <div className="flex flex-col gap-1.5 text-xs">
              <label className="font-semibold text-[#42526E]">Nama File</label>
              <input
                type="text"
                required
                value={newFileName}
                onChange={(e) => setNewFileName(e.target.value)}
                placeholder="misal: api-order.md atau checkout-spec.md"
                className="border border-[#DFE1E6] rounded-lg px-3 py-2 text-[#172B4D] font-mono focus:border-[#0052CC] focus:outline-hidden"
              />
            </div>

            <div className="flex flex-col gap-1.5 text-xs">
              <label className="font-semibold text-[#42526E]">Gunakan Template</label>
              <select
                value={selectedTemplate}
                onChange={(e) => setSelectedTemplate(e.target.value)}
                className="border border-[#DFE1E6] rounded-lg px-3 py-2 text-[#172B4D] focus:border-[#0052CC] focus:outline-hidden"
              >
                <option value="blank">Blank (Kosong)</option>
                <option value="feature">Feature Specification (PRD)</option>
                <option value="adr">Architecture Decision Record (ADR)</option>
              </select>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#EBECF0]">
              <button
                type="button"
                onClick={() => setIsNewFileModalOpen(false)}
                className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-[#42526E] hover:bg-[#EBECF0]"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleCreateFile}
                className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-[#0052CC] hover:bg-[#0747A6] text-white shadow-xs"
              >
                Buat File
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Create Folder */}
      {isNewFolderModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white border border-[#DFE1E6] rounded-xl shadow-xl w-full max-w-md p-6 flex flex-col gap-4">
            <h3 className="text-sm font-bold text-[#172B4D]">Buat Folder Baru di docs/</h3>

            <div className="flex flex-col gap-1.5 text-xs">
              <label className="font-semibold text-[#42526E]">Parent Folder</label>
              <input
                type="text"
                value={modalParentFolder}
                onChange={(e) => setModalParentFolder(e.target.value)}
                placeholder="docs/03-requirements"
                className="bg-[#F4F5F7] border border-[#DFE1E6] rounded-lg px-3 py-2 text-[#172B4D] font-mono focus:border-[#0052CC] focus:outline-hidden"
              />
            </div>

            <div className="flex flex-col gap-1.5 text-xs">
              <label className="font-semibold text-[#42526E]">Nama Folder Baru</label>
              <input
                type="text"
                required
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                placeholder="misal: features/FEAT-002-checkout"
                className="border border-[#DFE1E6] rounded-lg px-3 py-2 text-[#172B4D] font-mono focus:border-[#0052CC] focus:outline-hidden"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#EBECF0]">
              <button
                type="button"
                onClick={() => setIsNewFolderModalOpen(false)}
                className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-[#42526E] hover:bg-[#EBECF0]"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleCreateFolder}
                className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-[#0052CC] hover:bg-[#0747A6] text-white shadow-xs"
              >
                Buat Folder
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

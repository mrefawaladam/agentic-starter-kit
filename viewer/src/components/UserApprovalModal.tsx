'use client';

import React, { useState, useEffect } from 'react';
import {
  Users,
  Shield,
  CheckCircle,
  XCircle,
  Clock,
  Trash2,
  X,
  AlertCircle,
  RefreshCw,
  Search,
} from 'lucide-react';
import { PublicUser } from '@/lib/auth-types';

interface UserApprovalModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: PublicUser;
}

export function UserApprovalModal({ isOpen, onClose, currentUser }: UserApprovalModalProps) {
  const [users, setUsers] = useState<PublicUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const fetchUsers = () => {
    setIsLoading(true);
    setError(null);
    fetch('/api/auth/users')
      .then((res) => {
        if (!res.ok) throw new Error('Gagal memuat daftar pengguna');
        return res.json();
      })
      .then((data) => {
        setUsers(data.users || []);
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (isOpen) {
      fetchUsers();
    }
  }, [isOpen]);

  const handleAction = async (targetUserId: string, action: 'APPROVE' | 'REJECT' | 'DELETE') => {
    try {
      const res = await fetch('/api/auth/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetUserId, action }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Gagal memproses aksi');

      setUsers(data.users || []);
      setActionSuccess(`Sukses: ${data.message}`);
      setTimeout(() => setActionSuccess(null), 2500);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error';
      setError(message);
    }
  };

  if (!isOpen) return null;

  const filteredUsers = users.filter((u) => {
    const q = search.toLowerCase();
    return (
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.role.toLowerCase().includes(q)
    );
  });

  const pendingCount = users.filter((u) => u.status === 'PENDING_APPROVAL').length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-2xs p-4 animate-fade-in">
      <div className="bg-white border border-[#DFE1E6] rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Modal Header */}
        <div className="p-4 px-6 border-b border-[#EBECF0] bg-[#FAFBFC] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#DEEBFF] text-[#0052CC] flex items-center justify-center font-bold">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-[#172B4D]">Manajemen Persetujuan Pendaftaran (Approval)</h3>
                {pendingCount > 0 && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                    {pendingCount} Menunggu Approval
                  </span>
                )}
              </div>
              <p className="text-[11px] text-[#5E6C84]">Otorisasi akses akun pendaftar baru oleh Administrator</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-md text-[#5E6C84] hover:bg-[#EBECF0] hover:text-[#172B4D]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Toolbar & Filter */}
        <div className="p-4 border-b border-[#EBECF0] bg-white flex items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-[#5E6C84]" />
            <input
              type="text"
              placeholder="Cari nama, email, atau role..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#FAFBFC] border border-[#DFE1E6] rounded-lg pl-8 pr-3 py-1.5 text-xs text-[#172B4D] focus:border-[#0052CC] focus:outline-hidden"
            />
          </div>
          <button
            onClick={fetchUsers}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#DFE1E6] bg-[#F4F5F7] hover:bg-[#EBECF0] text-xs font-semibold text-[#42526E]"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh</span>
          </button>
        </div>

        {/* Status Alerts */}
        {actionSuccess && (
          <div className="px-6 py-2 bg-emerald-50 text-emerald-800 text-xs font-medium border-b border-emerald-200">
            {actionSuccess}
          </div>
        )}
        {error && (
          <div className="px-6 py-2 bg-red-50 text-red-800 text-xs font-medium border-b border-red-200 flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-red-600" />
            <span>{error}</span>
          </div>
        )}

        {/* User Table List */}
        <div className="flex-1 overflow-y-auto p-4 divide-y divide-[#EBECF0]">
          {isLoading ? (
            <div className="p-8 text-center text-xs text-[#5E6C84]">Memuat daftar pengguna...</div>
          ) : filteredUsers.length === 0 ? (
            <div className="p-8 text-center text-xs text-[#8993A4]">Tidak ada pengguna ditemukan.</div>
          ) : (
            filteredUsers.map((user) => {
              const isDefaultAdmin = user.id === 'usr_default_admin';
              const isPending = user.status === 'PENDING_APPROVAL';
              const isRejected = user.status === 'REJECTED';
              const isActive = user.status === 'ACTIVE' || !user.status;

              return (
                <div key={user.id} className="py-3 px-2 flex items-center justify-between gap-3 hover:bg-[#FAFBFC] rounded-lg transition-colors">
                  <div className="flex flex-col min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#172B4D] truncate">{user.name}</span>
                      {isDefaultAdmin && (
                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-purple-100 text-purple-700">
                          MASTER ADMIN
                        </span>
                      )}
                      <span
                        className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase font-mono ${
                          isActive
                            ? 'bg-emerald-100 text-emerald-700'
                            : isPending
                            ? 'bg-amber-100 text-amber-800 border border-amber-300'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {user.status || 'ACTIVE'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-[#5E6C84] mt-0.5">
                      <span className="font-mono truncate">{user.email}</span>
                      <span>•</span>
                      <span className="font-semibold text-[#0052CC]">{user.role}</span>
                    </div>
                  </div>

                  {/* Action buttons */}
                  {!isDefaultAdmin && (
                    <div className="flex items-center gap-1.5 shrink-0">
                      {isPending && (
                        <>
                          <button
                            onClick={() => handleAction(user.id, 'APPROVE')}
                            className="flex items-center gap-1 px-2.5 py-1.5 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-2xs transition-colors cursor-pointer"
                            title="Setujui pendaftaran akun"
                          >
                            <CheckCircle className="w-3.5 h-3.5" />
                            <span>Setujui</span>
                          </button>
                          <button
                            onClick={() => handleAction(user.id, 'REJECT')}
                            className="flex items-center gap-1 px-2.5 py-1.5 rounded-md bg-red-600 hover:bg-red-700 text-white text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
                            title="Tolak pendaftaran akun"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                            <span>Tolak</span>
                          </button>
                        </>
                      )}

                      {isRejected && (
                        <button
                          onClick={() => handleAction(user.id, 'APPROVE')}
                          className="px-2.5 py-1 rounded bg-gray-100 hover:bg-gray-200 text-[#172B4D] text-xs font-semibold"
                        >
                          Aktifkan Kembali
                        </button>
                      )}

                      {isActive && (
                        <span className="text-[11px] font-semibold text-emerald-600 px-2 py-1 flex items-center gap-1">
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>Aktif</span>
                        </span>
                      )}

                      <button
                        onClick={() => {
                          if (confirm(`Hapus akun ${user.name} (${user.email})?`)) {
                            handleAction(user.id, 'DELETE');
                          }
                        }}
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                        title="Hapus user"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

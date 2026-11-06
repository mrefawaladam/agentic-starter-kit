'use client';

import React, { useState } from 'react';
import {
  Lock,
  Mail,
  User,
  ArrowRight,
  Eye,
  EyeOff,
  AlertCircle,
  Zap,
  ShieldCheck,
  Sparkles,
  KeyRound,
  Check,
} from 'lucide-react';
import { PublicUser, DEFAULT_USER_EMAIL, DEFAULT_USER_PASSWORD } from '@/lib/auth-types';

interface AuthScreenProps {
  onSuccess: (user: PublicUser) => void;
}

export function AuthScreen({ onSuccess }: AuthScreenProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('LEAD_DEVELOPER');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);
  const [autoFilled, setAutoFilled] = useState(false);

  // Password requirements calculation
  const passHasLength = password.length >= 8;
  const passHasUpper = /[A-Z]/.test(password);
  const passHasLower = /[a-z]/.test(password);
  const passHasNumber = /[0-9]/.test(password);
  const passHasSymbol = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
  const isPasswordStrong = passHasLength && passHasUpper && passHasLower && passHasNumber && passHasSymbol;

  const handleFillDefault = () => {
    setMode('login');
    setEmail(DEFAULT_USER_EMAIL);
    setPassword(DEFAULT_USER_PASSWORD);
    setError(null);
    setSuccessNotice(null);
    setAutoFilled(true);
    setTimeout(() => setAutoFilled(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessNotice(null);

    if (mode === 'register' && !isPasswordStrong) {
      setIsLoading(false);
      setError('Password belum memenuhi standar keamanan anti-brute force.');
      return;
    }

    const endpoint = mode === 'login' ? '/api/auth/login' : '/api/auth/register';
    const payload = mode === 'login' ? { email, password } : { name, email, password, role };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Terjadi kesalahan otentikasi');
      }

      if (data.pendingApproval) {
        setSuccessNotice(data.message);
        setMode('login');
        setPassword('');
        return;
      }

      onSuccess(data.user);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Gagal menghubungi server';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F5F7] flex flex-col justify-center items-center p-4 sm:p-6 selection:bg-[#DEEBFF] selection:text-[#0052CC]">
      <div className="w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#0052CC] text-white shadow-md mb-3">
            <Zap className="w-6 h-6 fill-white text-white" />
          </div>
          <h1 className="text-xl font-bold text-[#172B4D] tracking-tight">
            Jira SpecOS Workspace
          </h1>
          <p className="text-xs text-[#5E6C84] mt-1">
            AI Spec-Driven Development Platform & Kanban Board
          </p>
        </div>

        {/* Default Account Fast-Fill Pill */}
        <div className="mb-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-[#B3D4FF] rounded-xl p-3.5 shadow-2xs flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white border border-[#B3D4FF] flex items-center justify-center text-[#0052CC] shadow-2xs shrink-0">
              <KeyRound className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-[#0747A6] flex items-center gap-1">
                <span>Default Password & Akun:</span>
              </p>
              <p className="text-[10px] font-mono text-[#5E6C84]">
                {DEFAULT_USER_EMAIL} • <span className="font-semibold text-[#172B4D]">password123</span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleFillDefault}
            className="px-2.5 py-1.5 rounded-md bg-[#0052CC] hover:bg-[#0747A6] text-white text-[11px] font-semibold transition-all shadow-2xs shrink-0 active:scale-95 flex items-center gap-1"
          >
            {autoFilled ? <Check className="w-3 h-3" /> : <Sparkles className="w-3 h-3" />}
            {autoFilled ? 'Terisi!' : 'Isi Akun'}
          </button>
        </div>

        {/* Card Form */}
        <div className="bg-white border border-[#DFE1E6] rounded-xl shadow-xs p-6">
          {/* Mode Switch Tabs */}
          <div className="grid grid-cols-2 p-1 bg-[#F4F5F7] rounded-lg mb-5 border border-[#DFE1E6]">
            <button
              type="button"
              onClick={() => {
                setMode('login');
                setError(null);
              }}
              className={`py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                mode === 'login'
                  ? 'bg-white text-[#0052CC] shadow-2xs'
                  : 'text-[#5E6C84] hover:text-[#172B4D]'
              }`}
            >
              Masuk (Login)
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('register');
                setError(null);
              }}
              className={`py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                mode === 'register'
                  ? 'bg-white text-[#0052CC] shadow-2xs'
                  : 'text-[#5E6C84] hover:text-[#172B4D]'
              }`}
            >
              Daftar Akun Baru
            </button>
          </div>

          {/* Success / Pending Approval Banner */}
          {successNotice && (
            <div className="mb-4 p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-start gap-2.5">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="flex flex-col gap-0.5">
                <span className="font-bold">Menunggu Persetujuan Admin</span>
                <span className="leading-relaxed">{successNotice}</span>
              </div>
            </div>
          )}

          {/* Error Banner */}
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="block text-xs font-semibold text-[#172B4D] mb-1">
                  Nama Lengkap
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#5E6C84]" />
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Budi Santoso"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-white border border-[#DFE1E6] rounded-md text-xs text-[#172B4D] focus:outline-hidden focus:border-[#0052CC] focus:ring-2 focus:ring-[#0052CC]/20"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-[#172B4D] mb-1">
                Alamat Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#5E6C84]" />
                <input
                  type="email"
                  required
                  placeholder="nama@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-white border border-[#DFE1E6] rounded-md text-xs text-[#172B4D] focus:outline-hidden focus:border-[#0052CC] focus:ring-2 focus:ring-[#0052CC]/20"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-[#172B4D]">
                  Password
                </label>
                {mode === 'login' && (
                  <span className="text-[10px] text-[#5E6C84]">Default: password123</span>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#5E6C84]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder={mode === 'register' ? 'Min. 8 karakter (besar, kecil, angka, simbol)' : 'Masukkan password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-9 py-2 bg-white border border-[#DFE1E6] rounded-md text-xs text-[#172B4D] focus:outline-hidden focus:border-[#0052CC] focus:ring-2 focus:ring-[#0052CC]/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#5E6C84] hover:text-[#172B4D] p-0.5"
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Password Strength Checklist saat registrasi */}
              {mode === 'register' && password.length > 0 && (
                <div className="mt-2.5 p-2.5 bg-[#F4F5F7] rounded-md border border-[#DFE1E6] grid grid-cols-2 gap-1.5 text-[10px]">
                  <span className={`flex items-center gap-1 ${passHasLength ? 'text-emerald-700 font-semibold' : 'text-[#6B778C]'}`}>
                    <Check className={`w-3 h-3 ${passHasLength ? 'text-emerald-600' : 'text-gray-400'}`} />
                    Min. 8 Karakter
                  </span>
                  <span className={`flex items-center gap-1 ${passHasUpper ? 'text-emerald-700 font-semibold' : 'text-[#6B778C]'}`}>
                    <Check className={`w-3 h-3 ${passHasUpper ? 'text-emerald-600' : 'text-gray-400'}`} />
                    Huruf Besar (A-Z)
                  </span>
                  <span className={`flex items-center gap-1 ${passHasLower ? 'text-emerald-700 font-semibold' : 'text-[#6B778C]'}`}>
                    <Check className={`w-3 h-3 ${passHasLower ? 'text-emerald-600' : 'text-gray-400'}`} />
                    Huruf Kecil (a-z)
                  </span>
                  <span className={`flex items-center gap-1 ${passHasNumber ? 'text-emerald-700 font-semibold' : 'text-[#6B778C]'}`}>
                    <Check className={`w-3 h-3 ${passHasNumber ? 'text-emerald-600' : 'text-gray-400'}`} />
                    Angka (0-9)
                  </span>
                  <span className={`col-span-2 flex items-center gap-1 ${passHasSymbol ? 'text-emerald-700 font-semibold' : 'text-[#6B778C]'}`}>
                    <Check className={`w-3 h-3 ${passHasSymbol ? 'text-emerald-600' : 'text-gray-400'}`} />
                    Simbol Khusus (!@#$%^&* dsb.)
                  </span>
                </div>
              )}
            </div>

            {mode === 'register' && (
              <div>
                <label className="block text-xs font-semibold text-[#172B4D] mb-1">
                  Peran di Tim
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#DFE1E6] rounded-md text-xs text-[#172B4D] focus:outline-hidden focus:border-[#0052CC]"
                >
                  <option value="LEAD_DEVELOPER">Lead Developer (Human Lead)</option>
                  <option value="PRODUCT_OWNER">Product Owner / PM</option>
                  <option value="SOLUTION_ARCHITECT">Solution Architect</option>
                  <option value="QUALITY_ENGINEER">Quality Engineer / QA</option>
                  <option value="DEVELOPER">Developer (Full-Stack)</option>
                </select>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-2.5 px-4 rounded-md bg-[#0052CC] hover:bg-[#0747A6] active:bg-[#003884] text-white text-xs font-semibold shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>{mode === 'login' ? 'Masuk ke Dashboard' : 'Buat Akun Sekarang'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Security Footer Note */}
        <div className="mt-4 text-center flex items-center justify-center gap-1.5 text-[11px] text-[#5E6C84]">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Local-First Auth: Data tersimpan aman di <code>data/users.json</code></span>
        </div>
      </div>
    </div>
  );
}

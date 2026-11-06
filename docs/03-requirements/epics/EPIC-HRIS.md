---
id: EPIC-HRIS
title: Epic — HRIS, Attendance & Integrated Payroll Accounting
type: epic
status: APPROVED
priority: P1
owner: PM Agent
version: 1.0.0
created_at: 2026-11-05
updated_at: 2026-11-05
related_prd:
  - PRD-001-kasirsakti
---

# 👥 EPIC-HRIS: Human Resources & Integrated Payroll

## 1. Sasaran Bisnis & Nilai (Objective & Business Value)
Mengelola siklus operasional ketenagakerjaan outlet mulai dari penjadwalan kerja staf, presensi absensi harian, lembur, pemotongan kasbon staf, hingga perhitungan penggajian (*payroll*) yang terintegrasi langsung dengan pembukuan akuntansi umum (*General Ledger*).

---

## 2. Fitur-Fitur Terkait (Related Features)
- `FEAT-HRIS-001-payroll-journal`: Penggajian otomatis, slip gaji digital, dan pembebanan akuntansi ke akun buku besar (`5201`, `1101`/`1102`, `2103`).
- `FEAT-HRIS-002-attendance`: Presensi berbasis GPS/jadwal outlet dan persetujuan lembur.

---

## 3. Aturan Kunci (Core Business Rules)
1. Perhitungan gaji bersih (*Take-Home Pay*) wajib memperhitungkan komponen pokok, tunjangan kehadiran, upah lembur yang disetujui, serta memotong angsuran kasbon staf secara otomatis.
2. Saat penggajian berstatus `PAID` / `DISBURSED`, sistem wajib memicu pembuatan jurnal akuntansi pengeluaran kas dan beban gaji secara instan.

---

## 4. Kriteria Kelulusan Epic (Success Criteria)
- Tidak ada selisih antara nominal slip gaji staf dengan total pengeluaran kas di buku besar keuangan.
- Rekonsiliasi pemotongan kasbon staf otomatis mengurangi saldo piutang staf.

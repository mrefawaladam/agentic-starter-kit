---
id: DELIV-SPRINT-001
title: Rencana Sprint Mingguan (Sprint Plan)
type: sprint-plan
status: APPROVED
owner: PM Agent
version: 1.0.0
created_at: 2026-11-05
updated_at: 2026-11-05
---

# 🏃 Rencana Sprint Mingguan (Sprint Plan)

Alokasi item backlog ke dalam iterasi kerja tim rekayasa perangkat lunak.

---

## Sprint 1 (Current: Minggu 1 November 2026)
- **Fokus Utama**: Fondasi Dokumentasi, Standardisasi Agent, dan Perbaikan Shift Kasir / Void.
- **Task List**:
  - [x] Struktur Dokumentasi Spek Produk & Blueprint Agent (`docs/`, `agents/`).
  - [x] Penyelarasan Root `AGENTS.md` dengan Standar Tata Kelola.
  - [ ] Implementasi pengikatan `shift_log_id` ke tabel transactions dan `total_expense_cash` ke `cashier_shift_logs`.
  - [ ] Implementasi reversal journal pada saat transaksi di-void.

---

## Sprint 2 (Next: Minggu 2 November 2026)
- **Fokus Utama**: Modul Kasbon Pertanian (`FEAT-CREDIT-001`) dan Dokumen Perjanjian (`FEAT-LEGAL-001`).
- **Task List**:
  - [ ] Pembuatan migrasi skema tabel `agreements` dan relasi ke `customer_debts`.
  - [ ] Endpoint validasi credit limit dan approval level 2.
  - [ ] Endpoint pencatatan pembayaran cicilan kasbon.

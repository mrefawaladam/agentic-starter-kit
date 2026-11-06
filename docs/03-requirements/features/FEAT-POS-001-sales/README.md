---
id: FEAT-POS-001
title: Feature — POS Checkout & Cashier Operations
type: feature
status: READY_FOR_DEV
priority: P0
owner: PM Agent
version: 1.1.0
created_at: 2026-11-05
updated_at: 2026-11-05
related_epics:
  - EPIC-POS
depends_on: []
---

# 🛒 FEAT-POS-001: POS Checkout & Cashier Operations

## 1. Ringkasan Fitur (Overview)
Fitur inti penjualan kasir yang melayani pencatatan transaksi barang, perhitungan diskon, validasi stok multi-unit, penerbitan struk, pemotongan stok otomatis, pencatatan jurnal akuntansi instan, penegakan shift kasir anti-fraud, pembatalan nota (void) terotorisasi, dan pencatatan kas kecil laci (petty cash).

---

## 2. Indeks Dokumen Spesifikasi Fitur
- [`problem-and-goals.md`](./problem-and-goals.md): Masalah kebocoran kas dan tujuan implementasi.
- [`scope.md`](./scope.md): Batasan in-scope & out-of-scope checkout kasir.
- [`workflows.md`](./workflows.md): Diagram alur interaksi checkout dan penutupan shift.
- [`use-cases/`](./use-cases/):
  - [`UC-POS-001-checkout.md`](./use-cases/UC-POS-001-checkout.md): Alur checkout transaksi kasir.
  - [`UC-POS-002-blind-shift-close.md`](./use-cases/UC-POS-002-blind-shift-close.md): Alur tutup shift kasir blind count.
  - [`UC-POS-003-void-transaction.md`](./use-cases/UC-POS-003-void-transaction.md): Alur pembatalan nota (void), pemulihan stok & reversal journal.
  - [`UC-POS-004-petty-cash-shift.md`](./use-cases/UC-POS-004-petty-cash-shift.md): Alur pencatatan pengeluaran kas kecil laci kasir.
- [`user-stories.md`](./user-stories.md): Kumpulan cerita pengguna kasir dan manajer.
- [`business-rules.md`](./business-rules.md): Aturan `BR-POS-001` s/d `BR-POS-009`.
- [`acceptance-criteria.md`](./acceptance-criteria.md): Skenario Given-When-Then BDD (`AC-POS-001` s/d `AC-POS-005`).
- [`permissions.md`](./permissions.md): Matriks hak akses role kasir, admin, owner.
- [`states-and-transitions.md`](./states-and-transitions.md): Siklus status order & shift.
- [`data-requirements.md`](./data-requirements.md): Skema data transaksi dan relasi.
- [`edge-cases.md`](./edge-cases.md): Penanganan offline, stok habis bersamaan, void.
- [`dependencies-and-risks.md`](./dependencies-and-risks.md): Keterkaitan dengan modul inventori & finansial.
- [`open-questions.md`](./open-questions.md): Pertanyaan terbuka terkait kebijakan toleransi deviasi kas.

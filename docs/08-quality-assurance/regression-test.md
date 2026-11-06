---
id: QA-REG-001
title: Daftar Checklist Uji Regresi (Regression Test Suite)
type: regression-test
status: APPROVED
owner: QA Agent
version: 1.0.0
created_at: 2026-11-05
updated_at: 2026-11-05
---

# 🔁 Daftar Checklist Uji Regresi (Regression Test Suite)

Daftar pengujian wajib yang dijalankan sebelum rilis versi baru untuk memastikan fitur-fitur kritis tidak mengalami regresi.

---

## Checklist Regresi Kritis (P0)
- [ ] **Auth & Token**: Login dengan kredensial benar menghasilkan token JWT valid; token kedaluwarsa ditolak (401).
- [ ] **Shift Enforcement**: Checkout tanpa shift aktif wajib ditolak (400).
- [ ] **Blind Closing Formula**: Penutupan shift menghitung deviasi kas: `closing_cash - (opening_cash + cash_sales - cash_expenses)`.
- [ ] **Atomic Checkout**: Checkout memotong stok varian dan mencatat mutasi stok secara simultan.
- [ ] **Balanced Journal**: Setiap transaksi penjualan tunai memposting entri jurnal seimbang (Debit Kas = Kredit Penjualan).
- [ ] **Void Reversal**: Pembatalan transaksi membalik jurnal akuntansi dan memulihkan stok varian.
- [ ] **Multi-Tenant Isolation**: Request dengan token merchant A dilarang membaca data transaksi merchant B.

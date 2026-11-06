---
id: FEAT-POS-004
title: Feature — Split Payment & Multi-Method Checkout POS
type: feature
status: APPROVED
priority: P2
owner: PM Agent
version: 1.0.0
created_at: 2026-11-05
updated_at: 2026-11-05
related_epics:
  - EPIC-POS
  - EPIC-FINANCE
depends_on:
  - FEAT-POS-001
---

# 💳 FEAT-POS-004: Split Payment & Multi-Method Checkout POS

## 1. Ringkasan Fitur (Overview)
Fitur pembayaran kombinasi (*Split Payment*) yang memungkinkan pelanggan membagi pembayaran satu transaksi belanja kasir menjadi dua atau lebih metode bayar yang berbeda (contoh: sebagian dibayar uang tunai Rp50.000 dan sisanya dibayar via QRIS/Transfer Rp75.000). Sistem memvalidasi kelengkapan akumulasi nominal, menyimpan rincian metode pembayaran pada tabel berelasi `transaction_payments`, dan menerbitkan baris debit terpisah untuk masing-masing akun kas/bank di jurnal akuntansi.

---

## 2. Struktur Dokumen Fitur
- [`user-stories.md`](./user-stories.md): Kebutuhan kasir toko dan pelanggan belanja.
- [`business-rules.md`](./business-rules.md): Aturan `BR-POS-010` s/d `BR-POS-013`.
- [`acceptance-criteria.md`](./acceptance-criteria.md): Skenario Given-When-Then BDD (`AC-POS-006` & `AC-POS-007`).
- [`use-cases/`](./use-cases/):
  - [`UC-POS-005-split-payment.md`](./use-cases/UC-POS-005-split-payment.md): Alur checkout pesanan dengan pembayaran kombinasi.

---

## 3. Matriks Kesiapan (Readiness Checklist)
- [x] Problem statement terdefinisi dengan jelas.
- [x] Use Case pembayaran split terpetakan lengkap dengan alur alternatif.
- [x] Aturan bisnis bernomor eksplisit (`BR-POS-010` s/d `BR-POS-013`).
- [x] Acceptance criteria berformat Given-When-Then BDD.
- [x] Integrasi pembukuan jurnal akuntansi multi-debit terpetakan.
- [ ] Disetujui oleh Product Owner (Status `IN_REVIEW` -> `APPROVED` -> `READY_FOR_DEV`).

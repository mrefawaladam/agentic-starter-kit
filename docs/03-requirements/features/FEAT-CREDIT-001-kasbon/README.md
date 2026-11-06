---
id: FEAT-CREDIT-001
title: Feature — Kasbon & Receivable Management
type: feature
status: APPROVED
priority: P0
owner: PM Agent
version: 1.0.0
created_at: 2026-11-05
updated_at: 2026-11-05
related_epics:
  - EPIC-CREDIT
related_features:
  - FEAT-LEGAL-001
depends_on:
  - FEAT-POS-001
  - FEAT-MEMBER-001
---

# 💳 FEAT-CREDIT-001: Kasbon & Receivable Management

## 1. Ringkasan Fitur (Overview)
Modul manajemen fasilitas pembayaran tertunda (kasbon) bagi anggota dan pelanggan koperasi. Menegakkan limit kredit, klasifikasi transaksi berjenjang (Level 1 tanpa perjanjian vs Level 2 wajib perjanjian tertulis), approval manajer, pembayaran cicilan berkala/panen, dan pencatatan buku piutang yang dapat diaudit.

---

## 2. Indeks Dokumen Spesifikasi Fitur
- [`problem-and-goals.md`](./problem-and-goals.md): Masalah kredit macet dan tujuan pembatasan piutang.
- [`scope.md`](./scope.md): Batasan ruang lingkup kasbon dan pelunasan.
- [`workflows.md`](./workflows.md): Diagram siklus hidup kasbon dan proses penandatanganan.
- [`use-cases/`](./use-cases/):
  - [`UC-CREDIT-001-create-kasbon.md`](./use-cases/UC-CREDIT-001-create-kasbon.md): Pembuatan pengajuan kasbon kasir.
  - [`UC-CREDIT-002-approve-kasbon.md`](./use-cases/UC-CREDIT-002-approve-kasbon.md): Persetujuan kasbon bernilai besar oleh manajer.
  - [`UC-CREDIT-003-repayment.md`](./use-cases/UC-CREDIT-003-repayment.md): Pencatatan pembayaran cicilan dan pelunasan.
  - [`UC-CREDIT-004-seasonal-payment.md`](./use-cases/UC-CREDIT-004-seasonal-payment.md): Pengaturan jadwal pembayaran musiman pascapanen.
- [`user-stories.md`](./user-stories.md): Kebutuhan kasbon dari sudut pandang kasir, anggota, dan manajer.
- [`business-rules.md`](./business-rules.md): Aturan `BR-CREDIT-001` s/d `BR-CREDIT-007`.
- [`acceptance-criteria.md`](./acceptance-criteria.md): Skenario BDD Given-When-Then.
- [`permissions.md`](./permissions.md): Matriks hak akses pengajuan, approval, dan pelunasan.
- [`states-and-transitions.md`](./states-and-transitions.md): Diagram siklus status kasbon.
- [`data-requirements.md`](./data-requirements.md): Entitas `customer_debts` dan `customer_debt_payments`.
- [`edge-cases.md`](./edge-cases.md): Penanganan overlimit, double submission, dan penolakan perjanjian.
- [`dependencies-and-risks.md`](./dependencies-and-risks.md): Risiko kredit macet dan mitigasi hukum.
- [`open-questions.md`](./open-questions.md): Pertanyaan terbuka terkait denda keterlambatan.

---
id: FEAT-HRIS-001
title: Feature — Payroll HRIS & Automated General Ledger Integration
type: feature
status: APPROVED
priority: P1
owner: PM Agent
version: 1.0.0
created_at: 2026-11-05
updated_at: 2026-11-05
related_epics:
  - EPIC-HRIS
  - EPIC-FINANCE
depends_on: []
---

# 💼 FEAT-HRIS-001: Payroll HRIS & Automated General Ledger Integration

## 1. Ringkasan Fitur (Overview)
Modul integrasi antara modul pengelolaan sumber daya manusia (HRIS Payroll) dengan modul akuntansi keuangan (*General Ledger*). Saat kalkulasi gaji karyawan (gaji pokok, tunjangan, upah lembur, potongan keterlambatan, dan angsuran kasbon staf) disetujui dan dibayarkan oleh owner/manajer, sistem secara otomatis menerbitkan entri jurnal umum pengeluaran beban gaji dan kas secara berpasangan (`debit == credit`), menghilangkan pencatatan jurnal ganda manual.

---

## 2. Struktur Dokumen Fitur
- [`user-stories.md`](./user-stories.md): Kebutuhan Admin Keuangan, Manajer HR, dan Owner.
- [`business-rules.md`](./business-rules.md): Aturan `BR-HRIS-001` s/d `BR-HRIS-004`.
- [`acceptance-criteria.md`](./acceptance-criteria.md): Skenario Given-When-Then BDD (`AC-HRIS-001` & `AC-HRIS-002`).
- [`use-cases/`](./use-cases/):
  - [`UC-HRIS-001-payroll-posting.md`](./use-cases/UC-HRIS-001-payroll-posting.md): Otomasi posting jurnal beban gaji saat pembayaran payroll.

---

## 3. Matriks Kesiapan (Readiness Checklist)
- [x] Problem statement terdefinisi dengan jelas.
- [x] Use Case pembebanan gaji ke buku besar terpetakan.
- [x] Aturan bisnis bernomor eksplisit (`BR-HRIS-001` s/d `BR-HRIS-004`).
- [x] Acceptance criteria berformat Given-When-Then BDD.
- [x] Penanganan pemotongan kasbon staf dan hutang premi terpetakan.
- [ ] Disetujui oleh Product Owner (Status `IN_REVIEW` -> `APPROVED` -> `READY_FOR_DEV`).

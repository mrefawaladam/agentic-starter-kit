---
id: EPIC-CREDIT
title: Epic — Credit, Kasbon & Receivable Management
type: epic
status: APPROVED
priority: P0
owner: PM Agent
version: 1.0.0
created_at: 2026-11-05
updated_at: 2026-11-05
related_prd:
  - PRD-001-kasirsakti
---

# 💳 EPIC-CREDIT: Credit, Kasbon & Receivable Management

## 1. Sasaran Bisnis & Nilai (Objective & Business Value)
Memfasilitasi pemberian fasilitas pembayaran tertunda (kasbon) bagi anggota koperasi dan pelanggan terverifikasi secara aman dan terkontrol. Menegakkan limit kredit, integrasi dokumen perjanjian berkekuatan hukum, penjadwalan pembayaran cicilan panen, dan pelacakan kartu piutang transparan untuk meminimalkan piutang macet.

---

## 2. Fitur-Fitur Terkait (Related Features)
- [`FEAT-CREDIT-001-kasbon`](../features/FEAT-CREDIT-001-kasbon/): Manajemen kasbon, pemeriksaan plafon credit limit, approval kasbon, pembayaran cicilan berkala, pelunasan, dan pencatatan piutang.
- [`FEAT-LEGAL-001-agreement`](../features/FEAT-LEGAL-001-agreement/): Pembuatan surat perjanjian kasbon otomatis untuk transaksi di atas batas threshold (> Rp100.000).
- [`FEAT-MEMBER-001-members`](../features/FEAT-MEMBER-001-members/): Master data anggota, Nomor Induk Anggota (NIA), profil kelayakan kredit.

---

## 3. Kriteria Kelulusan Epic (Success Criteria)
- Tidak ada transaksi kasbon yang dapat melampaui credit limit tanpa persetujuan berwenang.
- Tidak ada transaksi kasbon Level 2 (> Rp100.000) yang difinalisasi sebelum dokumen perjanjian ditandatangani.
- Seluruh riwayat pembayaran cicilan memiliki nomor tanda terima kas dan referensi akun piutang yang valid.

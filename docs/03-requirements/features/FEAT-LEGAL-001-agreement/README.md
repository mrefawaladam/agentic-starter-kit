---
id: FEAT-LEGAL-001
title: Feature — Agreement & Legal Document Generation
type: feature
status: APPROVED
priority: P1
owner: PM Agent
version: 1.0.0
created_at: 2026-11-05
updated_at: 2026-11-05
related_epics:
  - EPIC-CREDIT
depends_on:
  - FEAT-CREDIT-001
---

# 📜 FEAT-LEGAL-001: Agreement & Legal Document Generation

## 1. Ringkasan Fitur
Modul otomatisasi pembuatan surat perjanjian pengakuan hutang / kasbon untuk transaksi Level 2 (> Rp100.000). Modul ini menghasilkan dokumen berformat standar yang mencantumkan identitas debitur, rincian barang, total kewajiban, tanggal jatuh tempo, dan klausul persetujuan para pihak.

---

## 2. Business Rules Utama
- **`BR-LEGAL-001`**: Setiap dokumen perjanjian memiliki nomor seri unik (`AGR-YYYYMM-XXXXX`) dan hash integritas file.
- **`BR-LEGAL-002`**: Perjanjian yang telah ditandatangani berstatus `ARCHIVED` dan tidak boleh diubah atau dihapus (*immutable*).
- **`BR-LEGAL-003`**: [PENDING_LEGAL_REVIEW] Klausul hukum final wajib diverifikasi oleh konsultan hukum resmi koperasi.

---

## 3. Acceptance Criteria
```gherkin
Given Transaksi kasbon bernilai Rp250.000 disetujui manajer
 When Sistem memicu pembuatan perjanjian
 Then Sistem membuat record di tabel agreements
  And Sistem mencantumkan klausul pengakuan hutang dan jatuh tempo
  And File PDF perjanjian tersedia untuk dicetak atau ditandatangani digital
```

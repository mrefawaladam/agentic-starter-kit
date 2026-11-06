---
id: EPIC-FINANCE
title: Epic — Financial Bookkeeping & Automated Double-Entry Accounting
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

# 💰 EPIC-FINANCE: Financial Bookkeeping & Automated Accounting

## 1. Sasaran Bisnis & Nilai (Objective & Business Value)
Menyediakan mesin pembukuan berpasangan otomatis (*Automated Double-Entry Bookkeeping*) yang secara realtime dan konsisten merekam setiap transaksi bisnis (penjualan kasir, kas keluar laci kasir, pembatalan void, piutang kasbon, hutang pemasok, hingga beban penggajian) ke dalam buku besar (*General Ledger*) yang seimbang (`debit == credit`), akurat, dan terisolasi multi-tenant.

---

## 2. Fitur-Fitur Terkait (Related Features)
- `FEAT-POS-001-sales`: Otomasi jurnal penjualan, pembatalan void reversal journal, petty cash rekonsiliasi shift.
- `FEAT-CREDIT-001-kasbon`: Jurnal piutang anggota dan pelunasan kasbon cicilan.
- `FEAT-HRIS-001-payroll-journal`: Otomasi pembebanan gaji dan potongan BPJS/kasbon ke buku besar.
- `FEAT-FIN-001-reports`: Laporan Neraca, Laba Rugi, Arus Kas, dan Buku Besar.

---

## 3. Aturan Kunci (Core Business Rules)
1. **Total Debit == Total Credit**: Sistem wajib menolak penyimpanan entri jurnal jika total saldo debit tidak sama dengan total kredit.
2. **Immutability of Closed Journals**: Jurnal yang sudah diposting tidak boleh di-edit atau dihapus langsung; koreksi wajib melalui jurnal pembalik (*reversal journal*) atau jurnal penyesuaian (*adjusting journal*).
3. **Multi-Tenant Isolation**: Bagan akun (*Chart of Accounts*) dan jurnal terisolasi penuh berbasis `merchant_id`.

---

## 4. Kriteria Kelulusan Epic (Success Criteria)
- 100% mutasi moneter di platform menghasilkan entri jurnal seimbang.
- Neraca saldo (*Trial Balance*) selalu menunjukkan selisih Rp 0.
- Laporan keuangan dapat diakses secara realtime tanpa proses batch closing manual yang lambat.

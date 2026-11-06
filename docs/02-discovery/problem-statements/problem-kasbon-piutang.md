---
id: PROB-001
title: Problem Statement — Tata Kelola Piutang Kasbon Tanpa Limit & Tanpa Perjanjian
type: problem-statement
status: APPROVED
owner: PM Agent
version: 1.0.0
created_at: 2026-11-05
updated_at: 2026-11-05
---

# ⚠️ Problem Statement: Tata Kelola Piutang Kasbon Tanpa Limit & Tanpa Perjanjian

## 1. Pernyataan Masalah (Problem Statement)
Koperasi dan toko kelontong memberikan fasilitas pembelian barang dengan pembayaran tertunda (kasbon) kepada anggota dan warga sekitar. Namun, saat ini proses pencatatan piutang masih tidak terstruktur, tidak memiliki batas plafon kredit (*credit limit*), dan tidak disertai dokumen perjanjian berkekuatan hukum.

---

## 2. Kondisi Saat Ini (Current Condition)
- Pembelian kasbon dicatat di buku tulis fisik kasir.
- Format bukti kasbon tidak seragam dan rawan hilang.
- Tidak ada pemeriksaan credit limit; seorang pelanggan dapat berhutang melebihi kemampuan bayarnya.
- Pembayaran cicilan dicatat seadanya tanpa ada konfirmasi sisa pokok hutang.
- Nilai transaksi kasbon besar (> Rp100.000 hingga jutaan rupiah) hanya berlandaskan kepercayaan lisan tanpa tanda tangan persetujuan resmi.

---

## 3. Dampak terhadap Bisnis & Pengguna (User & Business Impact)
- **Tingginya Risiko Piutang Macet**: Koperasi mengalami krisis likuiditas kas karena dana usaha tertahan pada piutang tak tertagih.
- **Sengketa Nominal Hutang**: Terjadi perbedaan klaim jumlah sisa hutang antara kasir dan pelanggan saat waktu pelunasan panen.
- **Ketiadaan Dasar Hukum**: Saat pelanggan wanprestasi atau pindah domisili, pengurus koperasi tidak memiliki dokumen bukti perjanjian tertulis yang sah untuk proses penagihan formal.

---

## 4. Solusi yang Diusulkan (Proposed Solution)
Membangun modul manajemen kasbon terintegrasi (`FEAT-CREDIT-001`) yang mencakup:
1. Pengecekan status verifikasi anggota dan credit limit aktif.
2. Klasifikasi kasbon berjenjang:
   - Level 1 (&le; Rp100.000): Pencatatan langsung via POS dengan struk kasbon.
   - Level 2 (&gt; Rp100.000): Wajib melalui proses persetujuan dan penerbitan dokumen perjanjian (`FEAT-LEGAL-001`).
3. Kartu piutang digital dengan riwayat pembayaran cicilan parsial yang transparan.

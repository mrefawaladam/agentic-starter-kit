---
id: PRD-001-kasirsakti
title: Master PRD — KasirSakti Platform
type: prd
status: APPROVED
priority: P0
owner: PM Agent
version: 1.0.0
created_at: 2026-11-05
updated_at: 2026-11-05
---

# 📄 PRD-001: Master Product Requirements Document — KasirSakti Platform

## 1. Product Overview (Ringkasan Produk)
KasirSakti adalah platform Point of Sale (POS), Manajemen Inventori, dan Akuntansi Terpadu yang dirancang khusus untuk mengatasi masalah operasional paling kritis yang dihadapi oleh UMKM, Retail, dan Koperasi Desa/KDKMP di Indonesia. Sistem dibangun berbasis multi-tenant dengan isolasi `merchant_id` dan `outlet_id`, serta menerapkan mesin pembukuan berpasangan (*double-entry bookkeeping*) otomatis.

---

## 2. Background & Problem Statement
Berdasarkan temuan di lapangan:
1. **Kebocoran Kas Laci**: Selisih kas fisik laci kasir sulit dipertanggungjawabkan karena tidak adanya isolasi shift dan kasir mengetahui nominal ekspektasi sistem.
2. **Kecurangan Pembatalan Transaksi (*Post-sale Void*)**: Oknum kasir membatalkan nota tunai setelah pembeli keluar dari toko.
3. **Piutang Kasbon Liar**: Pembelian tempo tidak dibatasi credit limit dan tidak memiliki dokumen perjanjian tertulis, memicu kredit macet di koperasi.
4. **Kesalahan Konversi Multi-Unit**: Penjualan barang bertingkat (Dus -> Pak -> Pcs) sering memunculkan kekacauan stok gudang.

---

## 3. Goals & Objectives
- **Zero Cash Discrepancy**: Menerapkan *blind cash shift closing* dan rekonsiliasi pengeluaran kas operasional laci kasir.
- **Traceable Credit Lifecycle**: Mengontrol siklus kasbon mulai dari pemeriksaan limit, approval, dokumen perjanjian hukum, hingga pembayaran cicilan.
- **Automated Financial Bookkeeping**: Setiap transaksi moneter otomatis menghasilkan entri jurnal berpasangan seimbang (`debit == credit`).
- **Strict Tenant & Branch Isolation**: Data transaksi dan keuangan terisolasi ketat per merchant dan outlet.

---

## 4. Target Users & Personas
- **Owner / Cooperative Admin**: Memantau laba rugi, mengatur credit limit, otorisasi transaksi berisiko.
- **Admin Cabang / Gudang**: Manajemen stok barang, penerimaan transfer antar cabang, stock opname.
- **Kasir (Cashier)**: Operasi kasir harian, buka/tutup shift, input penjualan, input petty cash.
- **Admin Keuangan (Finance)**: Buku besar, neraca, rekonsiliasi kasbon dan hutang supplier.
- **Anggota / Pelanggan (Member/Customer)**: Pembeli tunai atau kredit kasbon.

---

## 5. Product Scope Breakdown
Master PRD ini membawahi beberapa Epic bisnis utama:
1. [`EPIC-POS`](../epics/EPIC-POS.md): Penjualan kasir, shift laci kasir, void reversal, split payment, dan KDS dapur.
2. [`EPIC-INVENTORY`](../epics/EPIC-INVENTORY.md): Multi-unit, resep bahan baku (BOM), transfer stok, opname, mutasi barang.
3. [`EPIC-CREDIT`](../epics/EPIC-CREDIT.md): Manajemen kasbon, credit limit, jadwal cicilan panen.
4. [`EPIC-FINANCE`](../epics/EPIC-FINANCE.md): Pembukuan jurnal berpasangan otomatis, buku besar, neraca, dan arus kas.
5. [`EPIC-HRIS`](../epics/EPIC-HRIS.md): Pengelolaan shift karyawan, absensi, lembur, dan integrasi payroll ke buku besar.
6. [`EPIC-INTEGRATION`](../epics/EPIC-INTEGRATION.md): Sinkronisasi data SIMKOPDES via Transactional Outbox.

---

## 6. Functional Requirements (Kebutuhan Fungsional Induk)
| ID Kebutuhan | Deskripsi Kebutuhan | Prioritas | Epic / Fitur Terkait |
| :--- | :--- | :--- | :--- |
| **FR-POS-001** | Sistem wajib mewajibkan kasir memiliki shift aktif berstatus `OPEN` sebelum dapat melayani checkout penjualan. | P0 | `EPIC-POS` |
| **FR-POS-002** | Sistem wajib menerapkan prosedur blind closing: kasir hanya menginput nominal fisik uang tanpa melihat saldo sistem. | P0 | `EPIC-POS` |
| **FR-POS-003** | Transaksi void wajib membalik jurnal akuntansi, mengembalikan stok varian/bahan baku, membatalkan kasbon, dan mencatat audit log. | P0 | `EPIC-POS`, `EPIC-FINANCE` |
| **FR-POS-004** | Sistem mendukung pemesanan dapur digital via Kitchen Display System (KDS) realtime tanpa struk kertas fisik. | P1 | `EPIC-POS` (`FEAT-POS-005`) |
| **FR-POS-005** | Sistem mendukung multi-payment (Split Payment) dengan pemisahan baris jurnal debit untuk kas dan non-tunai. | P2 | `EPIC-POS` (`FEAT-POS-004`) |
| **FR-INV-001** | Penjualan produk jadi olahan F&B wajib otomatis memotong stok bahan baku mentah penyusunnya sesuai resep (BOM). | P1 | `EPIC-INVENTORY` (`FEAT-POS-003`) |
| **FR-CREDIT-001**| Sistem wajib memeriksa status limit kredit pelanggan sebelum mengizinkan metode pembayaran kasbon. | P0 | `EPIC-CREDIT` |
| **FR-CREDIT-002**| Transaksi kasbon bernilai > Rp100.000 wajib menerbitkan dokumen perjanjian formal sebelum transaksi difinalisasi. | P0 | `EPIC-CREDIT`, `EPIC-LEGAL` |
| **FR-ACC-001** | Setiap mutasi moneter (penjualan, void, pelunasan kasbon, pengeluaran kasir, gaji payroll) wajib menerbitkan jurnal seimbang. | P0 | `EPIC-FINANCE` |
| **FR-HRIS-001** | Pembayaran gaji staf payroll wajib otomatis menerbitkan jurnal beban gaji ke akun buku besar umum. | P1 | `EPIC-HRIS`, `EPIC-FINANCE` |

---

## 7. Non-Functional Requirements (Kebutuhan Non-Fungsional)
- **Keamanan Multi-Tenant**: Ekstraksi token JWT wajib menghasilkan `merchant_id` yang memfilter seluruh query basis data.
- **Performa Transaksi**: Transaksi checkout kasir harus selesai dalam waktu &lt; 50ms di backend.
- **Integritas ACID**: Operasi checkout, void, transfer stok, dan tutup shift wajib dibungkus dalam `TransactionManager`.
- **Kepatuhan Audit**: Seluruh pembatalan dan penyesuaian wajib mencatat baris permanen di `audit_logs`.

---
id: UC-POS-001
title: Checkout Transaksi Penjualan
type: use-case
status: APPROVED
priority: P0
feature_id: FEAT-POS-001
actor: Kasir
---

# 🎯 UC-POS-001: Checkout Transaksi Penjualan

## 1. Informasi Use Case
- **Primary Actor**: Kasir
- **Secondary Actor**: Pelanggan, Sistem Akuntansi, Sistem Inventori
- **Priority**: P0 (Kritis)

## 2. Prasyarat (Preconditions)
1. Kasir telah login dan memiliki token otentikasi JWT valid.
2. Kasir memiliki shift kerja aktif berstatus `OPEN` pada outlet yang bersangkutan.
3. Seluruh produk yang dibeli berstatus aktif dan stok outlet mencukupi.

## 3. Pemicu (Trigger)
Kasir menekan tombol "Bayar / Selesaikan Transaksi" di aplikasi POS.

## 4. Alur Utama (Main Flow)
1. Kasir memilih atau memindai barcode produk ke keranjang belanja.
2. Kasir memilih pelanggan (opsional untuk tunai, wajib untuk kasbon).
3. Kasir memilih metode pembayaran (`CASH`, `TRANSFER`, `QRIS`, `DEBT`).
4. Sistem backend memvalidasi token JWT, `merchant_id`, dan memeriksa shift kasir aktif.
5. Sistem memulai transaksi basis data (`TransactionManager`).
6. Sistem memotong kuantitas stok varian dan mencatat mutasi stok `OUT`.
7. Sistem membuat record transaksi penjualan (`transactions`) dan mengikatkan `shift_log_id`.
8. Sistem menerbitkan jurnal umum berpasangan (Debit Kas/Piutang, Kredit Penjualan, Debit HPP, Kredit Persediaan).
9. Sistem meng-commit transaksi database.
10. Sistem mengembalikan respons JSON 200 OK dengan rincian invoice ke kasir.

## 5. Alur Alternatif & Pengecualian
- **A1: Shift Kasir Belum Dibuka**:
  - Sistem menolak pemrosesan dan mengembalikan HTTP 400: *"Silakan buka shift kasir terlebih dahulu sebelum melayani transaksi"*.
- **A2: Stok Varian Tidak Mencukupi**:
  - Sistem membatalkan transaksi dan mengembalikan HTTP 400: *"Stok produk [Nama Produk] tidak mencukupi"*.
- **A3: Pembayaran Kasbon Melebihi Limit**:
  - Sistem mengarahkan ke alur penanganan kasbon `FEAT-CREDIT-001`.

## 6. Kondisi Akhir (Postconditions)
- Transaksi tersimpan dengan status `COMPLETED`.
- Stok fisik terpotong di database.
- Jurnal keuangan tercatat seimbang.

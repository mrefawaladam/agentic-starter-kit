---
id: UC-CREDIT-001
title: Pembuatan Transaksi Kasbon (Create Kasbon)
type: use-case
status: APPROVED
priority: P0
feature_id: FEAT-CREDIT-001
actor: Kasir
---

# 🎯 UC-CREDIT-001: Pembuatan Transaksi Kasbon (Create Kasbon)

## 1. Informasi Use Case
- **Use Case ID**: `UC-CREDIT-001`
- **Feature ID**: `FEAT-CREDIT-001`
- **Primary Actor**: Kasir
- **Secondary Actor**: Pelanggan, Manajer, Sistem Keuangan
- **Priority**: P0 (Kritis)

## 2. Prasyarat (Preconditions)
1. Kasir telah login dan shift kasir berstatus `OPEN`.
2. Pelanggan terdaftar dan terverifikasi di master anggota/pelanggan.
3. Fasilitas kasbon pelanggan berstatus aktif dan tidak sedang diblokir.
4. Total akumulasi sisa hutang ditambah nilai transaksi baru tidak melampaui credit limit.

## 3. Pemicu (Trigger)
Pelanggan meminta pembayaran barang menggunakan metode kasbon.

## 4. Alur Utama (Main Flow)
1. Kasir memilih pelanggan terdaftar pada layar POS.
2. Kasir menambahkan barang ke keranjang belanja.
3. Kasir memilih metode bayar `KASBON / DEBT`.
4. Sistem backend memverifikasi saldo piutang berjalan dan plafon credit limit pelanggan.
5. Sistem menentukan tingkat kasbon:
   - Jika total transaksi &le; Rp100.000: Klasifikasi Level 1 (kasbon ringan).
   - Jika total transaksi &gt; Rp100.000: Klasifikasi Level 2 (wajib perjanjian).
6. Untuk Level 2: Sistem menerbitkan draft perjanjian (`agreement_id`) dan meminta tanda tangan pelanggan serta approval manajer.
7. Setelah persetujuan terpenuhi, sistem memfinalisasi transaksi pesanan.
8. Sistem membuat record piutang baru di tabel `customer_debts` dengan status `ACTIVE` / `UNPAID`.
9. Sistem memotong stok barang dan mencatat entri jurnal akuntansi (Debit Piutang Usaha, Kredit Penjualan).
10. Kasir menyerahkan struk bukti transaksi beserta salinan perjanjian kasbon.

## 5. Alur Alternatif
- **A1: Credit Limit Terlampaui**:
  - Sistem menolak transaksi dan menampilkan pesan: *"Batas credit limit terlampaui. Sisa limit: RpX, Total transaksi: RpY"*.
- **A2: Pelanggan Menolak Menandatangani Dokumen Perjanjian**:
  - Transaksi dibatalkan secara bersih tanpa perubahan stok maupun saldo piutang.

## 6. Kondisi Akhir (Postconditions)
- Record piutang tersimpan dengan status `ACTIVE`.
- Stok outlet berkurang.
- Saldo piutang pelanggan bertambah.

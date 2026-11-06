---
id: UC-POS-005
title: Checkout Transaksi dengan Pembayaran Kombinasi (Split Payment)
type: use-case
status: IN_REVIEW
priority: P2
feature_id: FEAT-POS-004
actor: Kasir POS
---

# 🎯 UC-POS-005: Checkout Transaksi dengan Pembayaran Kombinasi (Split Payment)

## 1. Informasi Use Case
- **Primary Actor**: Kasir POS
- **Secondary Actor**: Pelanggan, Sistem Akuntansi, Shift Kasir
- **Priority**: P2 (Menengah)

## 2. Deskripsi Singkat
Kasir memproses transaksi penjualan pelanggan di mana pelanggan membayar menggunakan dua atau lebih metode bayar (kombinasi kas dan non-tunai) untuk melunasi satu transaksi belanja yang sama.

## 3. Prasyarat (Preconditions)
1. Kasir memiliki sesi shift aktif `OPEN`.
2. Total item dalam keranjang belanja telah dikalkulasi.

## 4. Pemicu (Trigger)
Kasir memilih mode "Split Payment / Multi Pembayaran" pada antarmuka checkout POS.

## 5. Alur Utama (Main Flow)
1. Kasir mengaktifkan opsi Split Payment pada antarmuka POS.
2. Kasir menambahkan baris metode bayar:
   - Baris 1: Metode `CASH`, nominal Rp50.000.
   - Baris 2: Metode `QRIS`, nominal Rp75.000.
3. Kasir menekan tombol "Selesaikan Transaksi".
4. Backend memvalidasi `SUM(payments.amount) == transaction.total_price`.
5. Backend memulai transaksi database ACID (`TransactionManager`):
   - Membuat record `transactions` dengan metode bayar `SPLIT`.
   - Mengikatkan `shift_log_id`.
   - Menyisipkan setiap metode ke tabel relasi `transaction_payments`.
   - Memotong kuantitas stok produk.
   - Menerbitkan jurnal umum dengan multi-debit untuk masing-masing akun kas/bank dan kredit pendapatan penjualan.
6. Backend meng-commit transaksi.
7. Backend mengembalikan status 200 OK dan mencetak struk belanja dengan rincian porsi pembayaran.

## 6. Alur Alternatif & Pengecualian
- **A1: Jumlah Pembayaran Kurang atau Berlebih**:
  - Backend mengembalikan error 400 Bad Request: *"Total rincian pembayaran tidak sesuai dengan total tagihan"*.
- **A2: Salah Satu Pembayaran Non-Tunai Mengalami Kegagalan**:
  - Transaksi tidak difinalisasi, seluruh perubahan di-rollback.

## 7. Kondisi Akhir (Postconditions)
- Transaksi tercatat `COMPLETED`.
- Rincian metode bayar tersimpan di `transaction_payments`.
- Hanya porsi tunai yang mempengaruhi uang fisik shift kasir.
- Jurnal umum seimbang dengan baris multi-debit tersimpan di buku besar.

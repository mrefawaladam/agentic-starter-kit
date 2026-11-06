---
id: UC-POS-003
title: Pembatalan Transaksi Penjualan (Void) & Reversal Journal
type: use-case
status: READY_FOR_DEV
priority: P0
feature_id: FEAT-POS-001
actor: Manajer Cabang / Admin / Owner
---

# 🎯 UC-POS-003: Pembatalan Transaksi Penjualan (Void) & Reversal Journal

## 1. Informasi Use Case
- **Use Case ID**: `UC-POS-003`
- **Feature ID**: `FEAT-POS-001`
- **Nama Use Case**: Pembatalan Transaksi Penjualan (Void) & Reversal Journal
- **Primary Actor**: Manajer Cabang / Admin Cabang / Owner
- **Secondary Actor**: Kasir, Sistem Akuntansi, Sistem Inventori
- **Priority**: P0 (Kritis)

## 2. Deskripsi Singkat
Proses pembatalan transaksi nota penjualan yang telah berstatus `COMPLETED`. Mengingat aksi ini berisiko tinggi terhadap kecurangan kas (*post-sale internal fraud*), void wajib diotorisasi oleh peran manajerial, membalikkan seluruh entri jurnal keuangan secara seimbang, mengembalikan saldo stok unit dasar di inventori outlet, membatalkan piutang kasbon (jika metode bayar kasbon/tempo), serta mencatat jejak audit permanen.

## 3. Prasyarat (Preconditions)
1. Pengguna telah login dengan hak akses manajerial (`admin` atau `owner`). Jika kasir yang mengajukan di kasir POS, kasir harus memasukkan PIN otorisasi supervisor/manajer.
2. Transaksi yang akan dibatalkan berstatus `COMPLETED` dan berada di outlet yang sama dengan hak akses pengguna.
3. Periode akuntansi belum ditutup (transaksi masih dalam periode buku yang aktif).

## 4. Pemicu (Trigger)
Manajer/Supervisor menekan tombol "Void Transaksi / Batalkan Nota" pada detail transaksi kasir atau riwayat penjualan.

## 5. Alur Utama (Main Flow)
1. Aktor membuka rincian transaksi penjualan yang hendak dibatalkan.
2. Aktor memilih tombol "Void Transaksi".
3. Sistem menampilkan formulir konfirmasi yang mewajibkan input alasan pembatalan (*void reason*).
4. Aktor mengisi alasan pembatalan yang valid (misal: "Salah input varian pelanggan", "Barang tertinggal").
5. Sistem backend memvalidasi hak akses RBAC dan parameter alasan pembatalan.
6. Sistem menjalankan transaksi database atomik (`TransactionManager.WithTransaction`):
   - Mengubah status transaksi di tabel `transactions` dari `COMPLETED` menjadi `CANCELLED` (atau `VOIDED`), mencatat `void_reason` dan `voided_by`.
   - Mengambil seluruh item transaksi pada `transaction_details`.
   - Untuk setiap item, mengembalikan saldo stok di tabel `stocks` / `outlet_inventory` sebesar kuantitas item dikalikan nilai konversi unit dasar (`quantity * conversion_rate`).
   - Mencatat kartu mutasi stok (`stock_movements`) dengan tipe `IN_VOID`.
   - Jika transaksi dibayar menggunakan metode `DEBT` / `KASBON`: mencari catatan piutang pada `customer_debts` berdasarkan `transaction_id` dan mengubah statusnya menjadi `VOIDED` / `CANCELLED`.
   - Menerbitkan entri jurnal pembalik (*reversal journal*):
     - **Debit**: Akun `4101` (Pendapatan Penjualan) senilai omzet yang dibatalkan.
     - **Kredit**: Akun `1101` (Kas) atau `1102` (Bank/QRIS) senilai penerimaan pembayaran yang dibatalkan.
     - **Debit**: Akun `1201` (Persediaan Barang) senilai HPP barang yang dikembalikan ke rak.
     - **Kredit**: Akun `5101` (Beban Pokok Penjualan / HPP) senilai HPP barang.
   - Mencatat baris permanen pada tabel `audit_logs` dengan modul `TRANSACTION`, aksi `VOID`, user pemanggil, supervisor otorisator, IP address, dan nomor nota.
7. Sistem meng-commit transaksi database.
8. Sistem mengirimkan respons HTTP 200 OK dengan detail pembatalan sukses ke antarmuka POS.
9. Antarmuka POS mencetak slip tanda void nota untuk arsip toko.

## 6. Alur Alternatif & Pengecualian
- **A1: Kasir Tanpa Otorisasi Manajer**:
  - Sistem menolak aksi dengan HTTP 403 Forbidden: *"Aksi void hanya dapat dilakukan oleh Admin atau Owner"*.
- **A2: Transaksi Sudah Dibatalkan Sebelumnya**:
  - Sistem menolak aksi dengan HTTP 400 Bad Request: *"Transaksi ini telah dibatalkan sebelumnya"*.
- **A3: Alasan Void Kosong**:
  - Sistem menolak aksi dengan HTTP 400 Bad Request: *"Alasan pembatalan wajib diisi minimal 5 karakter"*.

## 7. Kondisi Akhir (Postconditions)
- Status transaksi `transactions.status` berubah menjadi `CANCELLED`.
- Stok unit dasar di inventori outlet bertambah kembali secara akurat.
- Catatan mutasi stok `IN_VOID` tercatat di kartu stok.
- Jurnal pembalik seimbang (`debit == credit`) tercatat di buku besar.
- Piutang kasbon (jika ada) dibatalkan dan tidak lagi ditagihkan ke pelanggan.
- Audit trail tersimpan permanen di `audit_logs`.

## 8. Referensi Terkait
- **Business Rules**: `BR-POS-005`, `BR-POS-006`, `BR-POS-007`
- **Acceptance Criteria**: `AC-POS-004`
- **Traceability**: `EPIC-POS`, `PRD-001-kasirsakti`

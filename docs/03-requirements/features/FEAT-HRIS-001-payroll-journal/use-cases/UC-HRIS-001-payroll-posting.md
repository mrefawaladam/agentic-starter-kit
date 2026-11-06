---
id: UC-HRIS-001
title: Otomasi Posting Jurnal Beban Gaji Saat Pembayaran Payroll
type: use-case
status: IN_REVIEW
priority: P1
feature_id: FEAT-HRIS-001
actor: Owner / Finance Admin
---

# 🎯 UC-HRIS-001: Otomasi Posting Jurnal Beban Gaji Saat Pembayaran Payroll

## 1. Informasi Use Case
- **Primary Actor**: Owner / Admin Keuangan (Finance)
- **Secondary Actor**: Sistem HRIS, Sistem Buku Besar (General Ledger)
- **Priority**: P1 (Tinggi)

## 2. Deskripsi Singkat
Aktor menyetujui dan memproses pembayaran gaji staf setelah perhitungan lembur dan potongan diverifikasi. Sistem secara atomik mengupdate status pembayaran gaji staf dan menerbitkan entri jurnal keuangan ke buku besar.

## 3. Prasyarat (Preconditions)
1. Aktor telah login dengan role `owner` atau `finance`.
2. Batch penggajian periode berjalan telah berstatus `APPROVED`.
3. Akun kas/bank operasional dan akun beban gaji telah terkonfigurasi pada bagan akun merchant.

## 4. Pemicu (Trigger)
Aktor menekan tombol "Bayarkan Gaji / Cairkan Payroll" pada antarmuka manajemen gaji HRIS.

## 5. Alur Utama (Main Flow)
1. Aktor membuka rekap pembayaran penggajian yang telah disetujui.
2. Aktor memilih metode pencairan (Kas Toko atau Transfer Bank) dan menekan "Bayar".
3. Backend memvalidasi hak akses dan keabsahan status batch gaji.
4. Backend memulai transaksi database ACID (`TransactionManager`):
   - Mengubah status payroll menjadi `PAID` dan merekam timestamp pembayaran.
   - Menghitung total gaji kotor, gaji bersih, potongan kasbon, dan potongan kewajiban lain.
   - Memanggil `FinanceUseCase` untuk menerbitkan entri jurnal umum berpasangan seimbang (Debit Akun 5201, Kredit Kas/Bank, Kredit Piutang Staf, Kredit Hutang BPJS).
   - Memotong sisa saldo piutang kasbon staf di tabel data staf terkait.
   - Menyimpan entri jejak audit di tabel `audit_logs`.
5. Backend meng-commit transaksi database.
6. Backend mengembalikan status 200 OK dengan nomor bukti jurnal umum yang terbentuk.
7. Antarmuka menampilkan slip gaji terbayar dan rincian jurnal yang sukses terposting.

## 6. Alur Alternatif & Pengecualian
- **A1: Jurnal Tidak Seimbang**:
  - Jika kalkulasi debit dan kredit terdapat selisih pembulatan, sistem membatalkan proses pencairan gaji (*rollback*) dan mengembalikan pesan error: *"Gagal mencatat jurnal: total debit dan kredit tidak seimbang"*.
- **A2: Role Pengguna Tidak Memiliki Izin**:
  - Sistem mengembalikan HTTP 403 Forbidden.

## 7. Kondisi Akhir (Postconditions)
- Status payroll tersimpan `PAID`.
- Beban operasional gaji tercatat di Laporan Laba Rugi dan Neraca Saldo.
- Saldo kas/bank berkurang sebesar nominal gaji bersih yang dicairkan.

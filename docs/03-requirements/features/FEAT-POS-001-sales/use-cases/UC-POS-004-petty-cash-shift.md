---
id: UC-POS-004
title: Pencatatan Pengeluaran Kas Kecil (Petty Cash) dalam Shift Kasir
type: use-case
status: READY_FOR_DEV
priority: P0
feature_id: FEAT-POS-001
actor: Kasir Toko
---

# 🎯 UC-POS-004: Pencatatan Pengeluaran Kas Kecil (Petty Cash) dalam Shift Kasir

## 1. Informasi Use Case
- **Use Case ID**: `UC-POS-004`
- **Feature ID**: `FEAT-POS-001`
- **Nama Use Case**: Pencatatan Pengeluaran Kas Kecil (Petty Cash) dalam Shift Kasir
- **Primary Actor**: Kasir Toko
- **Secondary Actor**: Sistem Keuangan / Buku Besar
- **Priority**: P0 (Kritis)

## 2. Deskripsi Singkat
Proses pencatatan pengeluaran uang tunai langsung dari laci kasir (*cash drawer*) untuk kebutuhan operasional mendesak (misal: beli es batu, bayar galon air, parkir supplier, beli ATK kasir). Pengeluaran ini secara otomatis terikat pada shift kasir aktif dan mengurangi nominal ekspektasi uang kas fisik saat penutupan shift (*blind close*).

## 3. Prasyarat (Preconditions)
1. Kasir telah login dan memiliki sesi shift aktif berstatus `OPEN`.
2. Kas fisik di laci kasir mencukupi untuk nominal pengeluaran yang diajukan.

## 4. Pemicu (Trigger)
Kasir menekan tombol "Kas Keluar / Biaya Operasional Laci" pada antarmuka kasir POS.

## 5. Alur Utama (Main Flow)
1. Kasir membuka menu kas keluar di POS.
2. Kasir menginput nominal pengeluaran, kategori beban (misal: `Beban Operasional Toko`, `Beban Perlengkapan`), dan keterangan keperluan.
3. Kasir mengonfirmasi transaksi kas keluar.
4. Sistem backend memvalidasi:
   - Shift kasir berstatus `OPEN`.
   - Nominal pengeluaran > 0 dan tidak melebihi batas toleransi kas laci.
5. Sistem menjalankan transaksi database atomik:
   - Mencatat pengeluaran di tabel `expenses` dengan kolom `outlet_id`, `created_by`, `amount`, `category`, `description`, dan `created_at`.
   - Mengakumulasikan nilai pengeluaran ke `total_expense_cash` pada tabel `cashier_shift_logs`.
   - Menerbitkan entri jurnal akuntansi berpasangan:
     - **Debit**: Akun beban terkait (misal `5202` Beban Operasional Toko) senilai nominal.
     - **Kredit**: Akun `1101` (Kas di Laci Kasir) senilai nominal.
   - Mencatat entri jejak audit di `audit_logs` (Modul `FINANCE`, Aksi `PETTY_CASH_EXPENSE`).
6. Sistem meng-commit transaksi database.
7. Sistem mengembalikan respons 201 Created dan mencetak bukti pengeluaran kas laci.

## 6. Alur Alternatif & Pengecualian
- **A1: Kasir Belum Membuka Shift**:
  - Sistem menolak aksi dengan HTTP 400 Bad Request: *"Silakan buka shift kasir terlebih dahulu"*.
- **A2: Nominal Kas Keluar Negatif atau Nol**:
  - Sistem menolak aksi dengan HTTP 400 Bad Request: *"Nominal pengeluaran harus lebih besar dari 0"*.

## 7. Kondisi Akhir (Postconditions)
- Record pengeluaran tersimpan di tabel `expenses`.
- Kolom `total_expense_cash` pada shift kasir aktif bertambah.
- Jurnal beban operasional tercatat di buku besar.
- Saat penutupan shift nantinya, rumus `expectedCash = opening_cash + cash_sales - total_expense_cash` mencerminkan nilai pengeluaran ini.

## 8. Referensi Terkait
- **Business Rules**: `BR-POS-001`, `BR-POS-008`
- **Acceptance Criteria**: `AC-POS-003`
- **Traceability**: `EPIC-POS`, `PRD-001-kasirsakti`

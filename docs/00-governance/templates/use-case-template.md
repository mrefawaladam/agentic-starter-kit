---
id: UC-MODUL-001
title: "[Nama Use Case]"
type: use-case
status: DRAFT # DRAFT | IN_REVIEW | APPROVED | READY_FOR_DEV
priority: P1
feature_id: FEAT-MODUL-001
actor: "[Primary Actor]"
---

# 🎯 Use Case: [Nama Use Case]

## 1. Metadata Informasi
- **Use Case ID**: `UC-MODUL-001`
- **Feature ID**: `FEAT-MODUL-001`
- **Nama Use Case**: [Nama Deskriptif]
- **Primary Actor**: [Contoh: Kasir, Admin, Pelanggan]
- **Secondary Actor**: [Contoh: Manajer, Sistem Akuntansi]
- **Tingkat Prioritas**: P0 (Kritis) / P1 / P2

## 2. Deskripsi Singkat (Description)
Deskripsi ringkas mengenai interaksi apa yang ingin diselesaikan oleh aktor melalui sistem.

## 3. Prasyarat Awal (Preconditions)
1. Pengguna telah terotentikasi dan memiliki token sesi aktif.
2. Outlet berstatus aktif dan shift kasir sedang terbuka.
3. [Prasyarat lainnya]

## 4. Pemicu (Trigger)
Aksi spesifik yang memicu use case dimulai (contoh: Kasir menekan tombol "Bayar").

## 5. Alur Utama (Main Flow / Happy Path)
1. Aktor memilih aksi X pada antarmuka sistem.
2. Sistem memvalidasi parameter Y.
3. Sistem memproses transaksi Z dalam satu transaksi database ACID.
4. Sistem mencatat jejak audit dan jurnal akuntansi otomatis.
5. Sistem menampilkan konfirmasi sukses dan mencetak bukti transaksi.

## 6. Alur Alternatif & Pengecualian (Alternative & Exception Flows)
- **A1: Parameter tidak valid / Stok tidak cukup**
  1. Sistem mendeteksi kekurangan kuantitas stok varian.
  2. Sistem menolak pemrosesan transaksi dan mengembalikan kode error 400.
  3. Aktor menerima pesan peringatan pada antarmuka.
- **A2: Sesi kedaluwarsa atau RBAC tidak mencukupi**
  1. Sistem mengembalikan status 401 Unauthorized / 403 Forbidden.

## 7. Kondisi Akhir (Postconditions)
- Status transaksi berubah menjadi `COMPLETED`.
- Stok inventori berkurang di database.
- Baris jurnal akuntansi debit/kredit tersimpan seimbang.

## 8. Referensi Terkait
- **Business Rules**: `BR-MODUL-001` s/d `BR-MODUL-005`
- **Acceptance Criteria**: `AC-MODUL-001`

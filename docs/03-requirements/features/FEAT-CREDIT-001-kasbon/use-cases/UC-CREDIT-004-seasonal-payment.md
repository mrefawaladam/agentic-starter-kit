---
id: UC-CREDIT-004
title: Penjadwalan Pembayaran Musiman / Panen (Seasonal Payment)
type: use-case
status: APPROVED
priority: P1
feature_id: FEAT-CREDIT-001
actor: Manajer / Admin Koperasi
---

# 🎯 UC-CREDIT-004: Penjadwalan Pembayaran Musiman / Panen

## 1. Informasi Use Case
- **Primary Actor**: Admin Koperasi / Manajer
- **Secondary Actor**: Petani Anggota
- **Priority**: P1

## 2. Prasyarat (Preconditions)
1. Anggota memiliki profil jenis komoditas panen (misal: Jagung, Padi).
2. Transaksi kasbon pupuk/bibit disetujui untuk skema pembayaran tunda panen (*yarnen / bayar panen*).

## 3. Pemicu (Trigger)
Pendaftaran jatuh tempo kredit saat transaksi pembelian saprotan (sarana produksi pertanian).

## 4. Alur Utama (Main Flow)
1. Petugas memilih skema pembayaran "Tempo Panen".
2. Petugas menginput estimasi tanggal jatuh tempo (misal: 90 hari / 120 hari ke depan sesuai estimasi waktu panen).
3. Sistem menetapkan `due_date` pada piutang sesuai tanggal panen yang disepakati.
4. Sistem memuat klausul jatuh tempo panen pada dokumen perjanjian tertulis (`FEAT-LEGAL-001`).
5. Sistem menjadwalkan notifikasi penagihan H-7 sebelum tanggal jatuh tempo tiba.

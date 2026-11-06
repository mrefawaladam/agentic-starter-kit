---
id: UC-CREDIT-002
title: Persetujuan Kasbon Bernilai Besar (Approve Kasbon)
type: use-case
status: APPROVED
priority: P0
feature_id: FEAT-CREDIT-001
actor: Manajer
---

# 🎯 UC-CREDIT-002: Persetujuan Kasbon Bernilai Besar (Approve Kasbon)

## 1. Informasi Use Case
- **Primary Actor**: Manajer Cabang / Owner
- **Secondary Actor**: Kasir, Pelanggan
- **Priority**: P0 (Kritis)

## 2. Prasyarat (Preconditions)
1. Terdapat transaksi kasbon Level 2 (> Rp100.000) yang berstatus `PENDING_APPROVAL`.
2. Manajer memiliki role `admin` atau `owner`.

## 3. Pemicu (Trigger)
Manajer menerima permintaan otorisasi kasbon pada aplikasi POS/dashboard back-office.

## 4. Alur Utama (Main Flow)
1. Manajer membuka daftar permohonan kasbon tertunda.
2. Manajer meninjau profil pelanggan, riwayat pelunasan masa lalu, dan rincian barang yang dibeli.
3. Manajer memilih aksi "Setujui (Approve)".
4. Sistem backend memverifikasi token dan hak akses manajer.
5. Sistem memperbarui status kasbon menjadi `ACTIVE` dan mengizinkan POS mencetak struk belanja.
6. Rekam jejak approval dicatat ke dalam `audit_logs`.

## 5. Alur Alternatif
- **A1: Manajer Menolak Permohonan**:
  - Manajer menginput alasan penolakan.
  - Status kasbon berubah menjadi `REJECTED`.
  - Transaksi checkout POS dibatalkan.

---
id: UC-POS-002
title: Penutupan Shift Kasir (Blind Cash Closing)
type: use-case
status: APPROVED
priority: P0
feature_id: FEAT-POS-001
actor: Kasir
---

# 🎯 UC-POS-002: Penutupan Shift Kasir (Blind Cash Closing)

## 1. Informasi Use Case
- **Primary Actor**: Kasir
- **Secondary Actor**: Manajer Toko, Sistem Keuangan
- **Priority**: P0 (Kritis)

## 2. Prasyarat (Preconditions)
1. Kasir memiliki shift kerja berstatus `OPEN` pada outlet terkait.
2. Tidak ada transaksi yang sedang menggantung di kasir.

## 3. Pemicu (Trigger)
Kasir memilih menu "Tutup Shift" di akhir jam kerjanya.

## 4. Alur Utama (Main Flow)
1. Kasir membuka menu Tutup Shift pada POS.
2. Sistem menampilkan formulir hitung fisik uang tanpa menampilkan omzet yang dihitung sistem (*Blind Count*).
3. Kasir menghitung fisik uang tunai di laci dan menginput nominal total (`closing_cash`) beserta catatan.
4. Kasir menekan tombol "Konfirmasi Tutup Shift".
5. Backend mengambil data shift aktif:
   - Menghitung total penjualan tunai dari transaksi yang terikat `shift_log_id`.
   - Mengambil total pengeluaran operasional (*expenses / petty cash*) kasir selama shift.
   - Menghitung rumus matematis:
     $$\text{expectedCash} = \text{OpeningCash} + \text{CashSales} - \text{CashExpenses}$$
     $$\text{CashDifference} = \text{ClosingCash} - \text{expectedCash}$$
6. Backend mengupdate status shift menjadi `CLOSED`, mencatat `closed_at`, `closing_cash`, dan `cash_difference`.
7. Backend mengembalikan rekapitulasi shift (Z-report ringkas) kepada kasir.

## 5. Alur Alternatif
- **A1: Shift Sudah Pernah Ditutup**:
  - Sistem mengembalikan error HTTP 400: *"Shift kasir sudah berstatus CLOSED"*.

## 6. Kondisi Akhir (Postconditions)
- Shift berubah status menjadi `CLOSED`.
- Kasir tidak dapat lagi melayani transaksi baru sebelum membuka shift berikutnya.

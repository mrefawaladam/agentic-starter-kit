---
id: UC-CREDIT-003
title: Pembayaran Cicilan & Pelunasan Piutang Kasbon (Repayment)
type: use-case
status: APPROVED
priority: P0
feature_id: FEAT-CREDIT-001
actor: Kasir / Finance
---

# 🎯 UC-CREDIT-003: Pembayaran Cicilan & Pelunasan Piutang Kasbon

## 1. Informasi Use Case
- **Primary Actor**: Kasir / Bagian Keuangan (Finance)
- **Secondary Actor**: Pelanggan, Sistem Akuntansi
- **Priority**: P0 (Kritis)

## 2. Prasyarat (Preconditions)
1. Pelanggan memiliki record piutang berstatus `ACTIVE` atau `PARTIALLY_PAID`.
2. Jumlah nominal yang dibayarkan &gt; 0 dan &le; sisa pokok hutang.

## 3. Pemicu (Trigger)
Pelanggan datang ke kasir untuk menyetorkan uang cicilan atau pelunasan kasbon.

## 4. Alur Utama (Main Flow)
1. Kasir mencari data pelanggan dan membuka daftar tagihan piutang aktif.
2. Kasir memilih tagihan spesifik dan memasukkan nominal pembayaran beserta metode bayar (Tunai/Transfer).
3. Kasir menekan tombol "Simpan Pembayaran".
4. Backend memvalidasi jumlah pembayaran:
   - Mengurangi `remaining_amount` pada tabel `customer_debts`.
   - Jika `remaining_amount == 0`, sistem mengubah status piutang menjadi `PAID`.
   - Jika `remaining_amount > 0`, sistem mengubah status piutang menjadi `PARTIALLY_PAID`.
5. Backend membuat record riwayat di `customer_debt_payments`.
6. Backend memposting jurnal: Debit Kas/Bank, Kredit Piutang Usaha.
7. Kasir mencetak tanda terima pembayaran yang memuat sisa saldo hutang terkini.

## 5. Alur Alternatif
- **A1: Pembayaran Melebihi Sisa Tagihan**:
  - Sistem menolak transaksi dan menampilkan pesan: *"Nominal pembayaran melebihi sisa hutang (Maksimal RpX)"*.

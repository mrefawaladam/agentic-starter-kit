---
id: EPIC-POS
title: Epic — Point of Sale (POS) & Anti-Fraud Cash Operations
type: epic
status: APPROVED
priority: P0
owner: PM Agent
version: 1.0.0
created_at: 2026-11-05
updated_at: 2026-11-05
related_prd:
  - PRD-001-kasirsakti
---

# 🛒 EPIC-POS: Point of Sale & Anti-Fraud Cashier Operations

## 1. Sasaran Bisnis & Nilai (Objective & Business Value)
Menyediakan antarmuka dan API backend penjualan kasir berkecepatan tinggi yang memproses transaksi belanja secara realtime, memotong stok outlet secara otomatis, dan mengeliminasi kecurangan kasir laci (*cash drawer theft*) melalui prosedur *blind cash closing* dan audit logging ketat.

---

## 2. Fitur-Fitur Terkait (Related Features)
- [`FEAT-POS-001-sales`](../features/FEAT-POS-001-sales/): Penjualan POS, checkout multi-metode bayar, struk belanja, dan pembatalan nota (*void*).
- `FEAT-POS-002-shift`: Manajemen shift kasir, input modal awal (*opening cash*), pencatatan kas kecil laci (*petty cash*), dan penutupan shift (*blind shift closing*).

---

## 3. Aturan Kunci (Core Business Rules)
1. Tidak ada transaksi checkout yang diizinkan tanpa adanya shift kasir aktif berstatus `OPEN`.
2. Kasir tidak diperbolehkan melihat saldo omzet sistem saat menghitung fisik uang penutupan kas (*Blind Count*).
3. Transaksi void harus membalik jurnal pendapatan dan persediaan, serta mengembalikan stok varian.

---

## 4. Kriteria Kelulusan Epic (Success Criteria)
- Seluruh endpoint POS merespons dalam waktu &lt; 50ms.
- 100% transaksi void menghasilkan reversal journal dan audit log.
- Deviasi selisih kas laci kasir tercatat akurat dan dapat diaudit oleh manajer/owner.

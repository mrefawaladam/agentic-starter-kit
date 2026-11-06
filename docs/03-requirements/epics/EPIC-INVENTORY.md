---
id: EPIC-INVENTORY
title: Epic — Inventory & Multi-Unit Stock Management
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

# 📦 EPIC-INVENTORY: Multi-Unit Inventory & Stock Management

## 1. Sasaran Bisnis & Nilai (Objective & Business Value)
Menyediakan sistem pelacakan persediaan multi-cabang yang presisi dengan mendukung konversi unit bertingkat (Dus, Pak, Lusin, Pcs), transfer barang antar outlet, audit stock opname berkala, dan rumus bahan baku (BOM) untuk mencegah kehilangan fisik barang.

---

## 2. Fitur-Fitur Terkait (Related Features)
- [`FEAT-INVENTORY-001-stock`](../features/FEAT-INVENTORY-001-stock/): Master produk, varian harga, konversi unit dasar, stok per outlet, dan kartu mutasi stok (`stock_movements`).
- `FEAT-INVENTORY-002-transfer`: Pengajuan transfer barang antar cabang (`PENDING` -> `IN_TRANSIT` -> `RECEIVED`).
- `FEAT-INVENTORY-003-opname`: Audit fisik berkala dan penyesuaian (*stock adjustment*) otomatis ke jurnal selisih persediaan.

---

## 3. Kriteria Kelulusan Epic (Success Criteria)
- Seluruh mutasi persediaan mencatat tipe (`IN`, `OUT`, `ADJUSTMENT`), referensi transaksi, dan saldo akhir unit dasar.
- Nilai aset persediaan di neraca akuntansi selalu sinkron dengan saldo kuantitas fisik dikalikan harga modal rata-rata / FIFO.

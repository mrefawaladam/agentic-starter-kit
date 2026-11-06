---
id: TC-POS-001
title: Test Case — Checkout POS & Validasi Shift Kasir
type: test-case
status: APPROVED
owner: QA Agent
related_features:
  - FEAT-POS-001
related_use_cases:
  - UC-POS-001
---

# 🧪 TC-POS-001: Checkout POS & Validasi Shift Kasir

## 1. Skenario Uji 1: Checkout Berhasil dengan Shift Aktif
- **Preconditions**: User kasir terotentikasi, shift kasir berstatus `OPEN`, stok varian = 10 pcs.
- **Steps**:
  1. POST `/api/v1/products/checkout` dengan payload 2 pcs varian.
- **Expected Result**:
  - HTTP 200 OK.
  - Sisa stok varian di database = 8 pcs.
  - Record transaksi mengikat `shift_log_id` yang sesuai.
  - Entri jurnal debit kas dan kredit penjualan tercatat seimbang.
- **Status**: `PASSED`

---

## 2. Skenario Uji 2: Checkout Ditolak Saat Shift Belum Dibuka
- **Preconditions**: User kasir tidak memiliki shift berstatus `OPEN`.
- **Steps**:
  1. POST `/api/v1/products/checkout`.
- **Expected Result**:
  - HTTP 400 Bad Request.
  - Pesan error: "silakan buka shift kasir terlebih dahulu sebelum melayani transaksi".
  - Tidak ada mutasi stok atau transaksi baru yang tersimpan di database.
- **Status**: `PASSED`

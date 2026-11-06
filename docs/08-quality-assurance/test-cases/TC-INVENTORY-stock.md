---
id: TC-INV-001
title: Test Case — Konversi Multi-Unit & Potong Stok
type: test-case
status: APPROVED
owner: QA Agent
related_features:
  - FEAT-INVENTORY-001
---

# 🧪 TC-INV-001: Konversi Multi-Unit & Potong Stok

## 1. Skenario Uji: Penjualan Multi-Unit Satuan Dus
- **Preconditions**: 1 Dus = 24 Pcs. Stok awal di outlet = 120 Pcs.
- **Steps**:
  1. POST checkout penjualan 2 Dus.
- **Expected Result**:
  - Sistem mengalikan 2 Dus x 24 = 48 Pcs unit dasar.
  - Sisa stok outlet di tabel `stocks` berkurang menjadi 72 Pcs.
  - Kartu mutasi stok mencatat pengeluaran 48 Pcs.
- **Status**: `PASSED`

---
id: FEAT-INVENTORY-001
title: Feature — Multi-Unit Inventory & Stock Movement
type: feature
status: APPROVED
priority: P0
owner: PM Agent
version: 1.0.0
created_at: 2026-11-05
updated_at: 2026-11-05
related_epics:
  - EPIC-INVENTORY
depends_on: []
---

# 📦 FEAT-INVENTORY-001: Multi-Unit Inventory & Stock Movement

## 1. Ringkasan Fitur
Modul manajemen master produk, varian harga, unit bertingkat (Dus -> Pak -> Pcs), dan kartu mutasi stok per outlet. Setiap perubahan stok dicatat dengan referensi jelas (`IN`, `OUT`, `ADJUSTMENT`, `TRANSFER`).

---

## 2. Business Rules Utama
- **`BR-INV-001`**: Saldo stok fisik disimpan dalam satuan unit dasar terkecil (*base unit*).
- **`BR-INV-002`**: Mutasi stok dilarang menghasilkan saldo negatif kecuali konfigurasi allow negative stock diaktifkan secara eksplisit oleh `owner`.
- **`BR-INV-003`**: Perubahan stok manual wajib melalui prosedur stock opname dengan catatan alasan yang jelas.

---

## 3. Acceptance Criteria
```gherkin
Given Produk Indomie memiliki unit dasar Pcs dan unit Dus (1 Dus = 40 Pcs)
 When Kasir menjual 1 Dus Indomie
 Then Sistem memotong kuantitas stok di database sebanyak 40 Pcs
  And Kartu stok mencatat mutasi OUT sebanyak 40 Pcs
```

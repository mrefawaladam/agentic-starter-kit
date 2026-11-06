---
id: FEAT-POS-003
title: Feature — Bill of Materials (BOM) & Raw Ingredient Auto-Deduction
type: feature
status: APPROVED
priority: P1
owner: PM Agent
version: 1.0.0
created_at: 2026-11-05
updated_at: 2026-11-05
related_epics:
  - EPIC-INVENTORY
  - EPIC-POS
depends_on:
  - FEAT-INVENTORY-001
  - FEAT-POS-001
---

# ☕ FEAT-POS-003: Bill of Materials (BOM) & Raw Ingredient Auto-Deduction

## 1. Ringkasan Fitur (Overview)
Modul manajemen formulasi resep makanan/minuman (*Bill of Materials* atau BOM). Fitur ini menghubungkan satu menu produk/varian jadi (contoh: "Kopi Susu Gula Aren 250ml") dengan daftar bahan baku mentah penyusunnya (misal: 15gr Biji Kopi Espresso, 120ml Susu UHT, 25ml Gula Aren Cair, 1 pcs Paper Cup & Tutup). Saat kasir menjual menu tersebut di POS, sistem secara otomatis menghitung dan memotong stok masing-masing bahan mentah di inventori outlet terkait.

---

## 2. Struktur Dokumen Fitur
- [`user-stories.md`](./user-stories.md): Kebutuhan pemilik kafe/restoran dan manajer inventori.
- [`business-rules.md`](./business-rules.md): Aturan `BR-BOM-001` s/d `BR-BOM-004`.
- [`acceptance-criteria.md`](./acceptance-criteria.md): Skenario Given-When-Then BDD (`AC-BOM-001` s/d `AC-BOM-003`).
- [`use-cases/`](./use-cases/):
  - [`UC-BOM-001-recipe-deduction.md`](./use-cases/UC-BOM-001-recipe-deduction.md): Pemotongan stok bahan baku otomatis saat checkout POS.

---

## 3. Matriks Kesiapan (Readiness Checklist)
- [x] Problem statement terdefinisi dengan jelas.
- [x] Use Case pemotongan bahan baku terpetakan lengkap dengan alur alternatif.
- [x] Aturan bisnis bernomor eksplisit (`BR-BOM-001` s/d `BR-BOM-004`).
- [x] Acceptance criteria berformat Given-When-Then BDD.
- [x] Penanganan pembatalan nota (void) memulihkan bahan baku.
- [ ] Disetujui oleh Product Owner (Status `IN_REVIEW` -> `APPROVED` -> `READY_FOR_DEV`).

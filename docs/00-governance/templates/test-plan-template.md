---
id: TP-MODUL-001
title: "Test Plan: [Nama Fitur / Modul]"
type: test-plan
status: DRAFT # DRAFT | APPROVED
author: QA Agent
version: 1.0.0
created_at: YYYY-MM-DD
---

# Rencana Pengujian (Test Plan): [Nama Fitur / Modul]

## 1. Ruang Lingkup Pengujian (Scope)
- **Komponen yang Diuji**: Handler HTTP, UseCase transaksi, Repository GORM, isolasi multi-tenant.
- **Komponen di Luar Pengujian**: [Jika ada].

## 2. Strategi Pengujian
- **Unit Testing**: Pengujian business rules logika diskon, perhitungan selisih kas, dan validasi kredit.
- **Integration Testing**: Pengujian transaksi multi-tabel dengan rollback database.
- **Security / RBAC Testing**: Percobaan akses silang merchant dan bypass role kasir.

## 3. Matriks Skenario Uji (Test Scenarios)
| Test ID | Skenario Uji | Tipe Pengujian | Kriteria Penerimaan Terkait | Status |
| :--- | :--- | :--- | :--- | :--- |
| `TC-MODUL-001` | Transaksi berhasil dengan stok mencukupi | Positif / E2E | `AC-MODUL-001` | `NOT_TESTED` |
| `TC-MODUL-002` | Transaksi gagal saat stok tidak mencukupi | Negatif | `AC-MODUL-002` | `NOT_TESTED` |

## 4. Lingkungan Uji & Data Setup
- Kebutuhan database PostgreSQL khusus testing (`db_test`).
- Mock data merchant, outlet, kasir, dan master produk.

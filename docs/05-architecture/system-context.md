---
id: ARCH-CTX-001
title: System Context (C4 Context Diagram) — KasirSakti
type: system-context
status: APPROVED
owner: Solution Architect Agent
version: 1.0.0
created_at: 2026-11-05
updated_at: 2026-11-05
---

# 🌐 System Context (C4 Model) — KasirSakti Platform

Dokumen ini memetakan batasan sistem (*system boundary*), aktor manusia, antarmuka klien, dan sistem eksternal yang berinteraksi dengan KasirSakti.

---

## Diagram Konteks Sistem (C4 Context Level 1)
```mermaid
flowchart TD
    subgraph Users["Aktor Manusia"]
        Cashier["Kasir Toko"]
        Manager["Manajer Cabang / Admin"]
        Owner["Pengurus Koperasi / Owner"]
        Member["Anggota / Pelanggan"]
    end

    subgraph KasirSaktiSystem["Ekosistem KasirSakti"]
        POSApp["KasirSakti POS (Web / Tablet Client)"]
        BackofficeApp["KasirSakti Back-Office (Web Dashboard)"]
        BackendAPI["KasirSakti Backend (Golang Clean Architecture)"]
        MainDB[("PostgreSQL Database (Multi-Tenant)")]
    end

    subgraph ExternalSystems["Sistem Eksternal"]
        SIMKOPDES["SIMKOPDES (Sistem Koperasi Desa Pemerintah)"]
        PrinterThermal["Printer Bluetooth / USB Thermal Struk"]
    end

    Cashier -->|Melayani transaksi POS| POSApp
    Manager -->|Mengawasi stok & kasbon| BackofficeApp
    Owner -->|Melihat laporan keuangan| BackofficeApp
    Member -->|Menerima struk & kartu kasbon| POSApp

    POSApp -->|REST API calls| BackendAPI
    BackofficeApp -->|REST API calls| BackendAPI
    BackendAPI -->|Baca & Tulis Transaksi ACID| MainDB
    BackendAPI -.->|Transactional Outbox Asynchronous| SIMKOPDES
    POSApp -->|Driver Cetak Struk| PrinterThermal
```

---

## Batasan & Tanggung Jawab Komponen
1. **KasirSakti Backend (`kasirsakti-be`)**:
   - Inti logika bisnis, otentikasi JWT, penegakan RBAC, multi-tenant partitioning, dan ACID transaction manager.
2. **PostgreSQL Database**:
   - Penyimpanan relasional dengan pemisahan tenant via `merchant_id` pada setiap tabel bisnis.
3. **SIMKOPDES**:
   - Pihak ketiga eksternal yang dihubungi secara asinkron; downtime pada SIMKOPDES tidak boleh menghambat operasional offline/online checkout POS lokal.

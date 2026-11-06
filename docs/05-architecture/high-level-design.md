---
id: ARCH-HLD-001
title: High-Level Design (HLD) — Full-Stack KasirSakti Architecture
type: high-level-design
status: APPROVED
owner: Solution Architect Agent
version: 1.1.0
created_at: 2026-11-05
updated_at: 2026-11-05
---

# 🏛️ High-Level Design (HLD) — Full-Stack KasirSakti Architecture

Dokumen ini menjelaskan arsitektur menyeluruh sistem KasirSakti, mencakup layer Frontend (Next.js 16 3-Layer) dan Backend (Golang Strict Clean Architecture).

---

## 1. Arsitektur Menyeluruh (End-to-End Architecture)
```mermaid
flowchart TD
    subgraph Frontend["Frontend Client (kasirsakti-fe)"]
        UI["1. Presentation Layer (src/app/ & src/components/)"]
        State["2. State & Hooks (Zustand & TanStack Query)"]
        Service["3. Data Access (src/services/ & ApiClient)"]
        Dexie[("Dexie.js IndexedDB (Offline Storage)")]
        UI --> State
        State --> Service
        State <--> Dexie
    end

    subgraph Network["Komunikasi Jaringan"]
        HTTPS["REST API JSON (Bearer JWT Auth)"]
    end

    subgraph Backend["Backend API (kasirsakti-be)"]
        Route["1. Route & RBAC Layer (routes/)"]
        Handler["2. Transport / Handler Layer (internal/app/handler/)"]
        UseCase["3. Business Logic / UseCase Layer (internal/app/context/)"]
        RepoContract["4. Repository Interface (internal/domain/repository/)"]
        RepoImpl["5. GORM Repository (internal/infrastructure/repository/)"]
        Models["6. Database Entity Models (internal/domain/model/)"]
        Route --> Handler
        Handler --> UseCase
        UseCase --> RepoContract
        RepoContract --> RepoImpl
        RepoImpl --> Models
    end

    subgraph Database["Penyimpanan Basis Data"]
        Postgres[("PostgreSQL (Multi-Tenant DB)")]
    end

    Service --> HTTPS
    HTTPS --> Route
    Models --> Postgres
```

---

## 2. Lapisan Frontend (`kasirsakti-fe/`)
1. **Presentation Layer (`src/app/`, `src/components/`)**:
   - Komponen React 19 Client Components (`'use client'`).
   - Menerapkan KasirSakti Design System (Tailwind v4, `#0052FF`, `rounded-full`, dark mode).
   - Dilarang memanggil Axios secara langsung.
2. **State & Hooks Layer (`src/store/`, `src/hooks/`)**:
   - Zustand: Mengelola state UI interaktif, status modal, form input, dan keranjang POS.
   - TanStack React Query: Mengelola caching data server, background refetch, dan invalidasi otomatis.
3. **Data Access Layer (`src/services/`, `src/lib/api.ts`)**:
   - Menyelubungi seluruh panggilan HTTP REST dengan interceptor token JWT Bearer otomatis.
4. **Offline Resilience Layer (`src/utils/db.ts`)**:
   - Menyimpan master produk dan antrean transaksi lokal saat jaringan internet terputus.

---

## 3. Lapisan Backend (`kasirsakti-be/`)
1. **Route Layer**: Registrasi URL endpoint, pengikatan role otorisasi via middleware `auth.MyAuth(...)`.
2. **Handler Layer**: Binding JSON DTO dan response formatting via `library/helper/response.go`. Tidak ada query SQL.
3. **UseCase Layer**: Aturan bisnis, validasi stok, penegakan credit limit, dan transaksi atomik `TransactionManager`.
4. **Repository Layer**: Abstraksi interface dan implementasi GORM SQL yang selalu menyertakan `merchant_id`.

---
id: ADR-001
title: "ADR-001: Penerapan Strict Clean Architecture pada Backend Golang"
type: adr
status: ACCEPTED
deciders:
  - Solution Architect Agent
  - Lead Developer
date: 2026-10-10
---

# 🏛️ ADR-001: Penerapan Strict Clean Architecture pada Backend Golang

## 1. Context (Konteks Masalah)
Backend KasirSakti melayani transaksi multi-tenant dengan beragam modul operasional (POS, kasir laci, kasbon kredit, inventori bertingkat, akuntansi, dan HRIS). Diperlukan arsitektur perangkat lunak yang memisahkan logika bisnis dari protokol transport (Gin HTTP) dan database ORM (GORM) guna mencegah spaghetti code dan mempermudah unit testing.

## 2. Decision (Keputusan)
Mengadopsi **Strict Clean Architecture** berlapis:
- Handler (`internal/app/handler/`) hanya bertugas binding DTO dan pemanggilan UseCase.
- UseCase (`internal/app/context/`) memuat 100% aturan bisnis dan orkestrasi transaksi basis data.
- Repository Interface (`internal/domain/repository/`) menjadi kontrak abstraksi data.
- GORM Repository (`internal/infrastructure/repository/`) menjalankan query database PostgreSQL.
- Handler DILARANG keras memanggil `gorm.DB` atau menulis raw SQL secara langsung.

## 3. Consequences
- **Positif (+)**: Logika bisnis dapat diuji secara independen dengan mock repository; kode rapi dan terstruktur.
- **Negatif / Trade-off (-)**: Menambah jumlah file interface dan DTO untuk setiap penambahan endpoint baru.

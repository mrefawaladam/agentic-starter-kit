---
id: FEAT-MEMBER-001
title: Feature — Member & Customer Management
type: feature
status: APPROVED
priority: P1
owner: PM Agent
version: 1.0.0
created_at: 2026-11-05
updated_at: 2026-11-05
related_epics:
  - EPIC-CREDIT
depends_on: []
---

# 👥 FEAT-MEMBER-001: Member & Customer Management

## 1. Ringkasan Fitur
Modul pendaftaran dan pengelolaan master anggota koperasi (*members*) dan pelanggan umum (*customers*). Mencakup Nomor Induk Anggota (NIA), nomor telepon, NIK KTP, profil plafon credit limit, dan status fasilitas kasbon.

---

## 2. Business Rules Utama
- **`BR-MEM-001`**: Setiap anggota koperasi memiliki NIA unik di dalam satu tenant merchant.
- **`BR-MEM-002`**: Plafon credit limit default anggota ditetapkan oleh kebijakan admin koperasi; modifikasi limit memerlukan otorisasi manajer/owner.
- **`BR-MEM-003`**: Anggota dengan status suspend/blacklist otomatis kehilangan hak pengajuan kasbon baru.

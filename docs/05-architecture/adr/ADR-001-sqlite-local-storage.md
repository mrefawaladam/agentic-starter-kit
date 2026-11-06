# 🏛️ Architecture Decision Record: ADR-001

## Judul: Penggunaan Local File / SQLite untuk State Kanban & Backlog

- **Status**: APPROVED
- **Tanggal**: 2026-11-06
- **Pengusul**: Solution Architect Agent
- **Penyetuju**: Human Lead

---

## 1. Konteks & Masalah
Setiap developer atau AI Agent membutuhkan sistem tracking backlog dan kanban board yang cepat tanpa memerlukan instalasi database cloud yang mahal, Docker, atau migrasi yang membebani resource laptop.

## 2. Pilihan yang Dipertimbangkan
1. **Cloud Database (Supabase / Neon PostgreSQL)**: Sangat scalable, tapi butuh koneksi internet, API key, dan konfigurasi env yang merepotkan untuk starter template cepat.
2. **Local Flat-file (`backlog.json` & SQLite)**: Sangat cepat, self-contained dalam repo, bisa di-commit ke Git, dan AI Agent dapat membacanya langsung tanpa network boundary.

## 3. Keputusan
Kita memilih **Format Flat-file (`data/backlog.json`)** sebagai penyimpanan status Kanban dan Backlog untuk starter kit ini.

## 4. Konsekuensi Positif
- Zero setup: Pengguna cukup git clone dan langsung menjalankan aplikasi tanpa docker/database external.
- Git-Tracked: Semua perubahan status fitur ikut tercatat dalam riwayat git commit tim.
- AI-Friendly: AI dapat mengedit dan menambahkan task dengan mudah melalui filesystem read/write.

---
id: DISC-ASSUMP-001
title: Daftar Asumsi Bisnis & Operasional (Assumptions)
type: assumptions
status: IN_REVIEW
owner: PM Agent
version: 1.0.0
created_at: 2026-11-05
updated_at: 2026-11-05
---

# 🧐 Daftar Asumsi Bisnis & Operasional (Assumptions)

Dokumen ini mendokumentasikan seluruh hipotesis dan asumsi yang mendasari perancangan sistem KasirSakti. Asumsi ini belum berstatus fakta terverifikasi penuh dan memerlukan validasi berkelanjutan dengan pemilik produk dan pengguna lapangan.

---

## Tabel Asumsi & Status Validasi

| ID Asumsi | Deskripsi Asumsi | Dampak Terhadap Desain Sistem | Status Validasi | Rencana Tindak Lanjut |
| :--- | :--- | :--- | :--- | :--- |
| **ASM-001** | Petani anggota koperasi lebih memilih melunasi kasbon secara musiman (pascapanen) dibandingkan cicilan flat bulanan. | Modul kredit harus mendukung fleksibilitas jatuh tempo dinamis berbasis kalender panen. | `[ASUMSI BELUM TERVALIDASI PENUH]` | Validasi melalui kuesioner ke 10 ketua kelompok tani koperasi. |
| **ASM-002** | Batas kasbon Rp100.000 adalah batas psikologis dan operasional yang wajar untuk mewajibkan dokumen perjanjian formal. | Penentuan threshold `BR-CREDIT-002` untuk memicu alur Level 2 (perjanjian). | `[DISETUJUI SEMENTARA]` | Tinjau ulang setelah 1 bulan uji coba pilot di outlet pertama. |
| **ASM-003** | Kasir toko memiliki koneksi internet stabil minimal jaringan seluler 4G di area pedesaan. | Backend mengandalkan arsitektur online-first REST API. | `[ASUMSI RISIKO TINGGI]` | Rancang arsitektur offline cache di frontend untuk mitigasi kendala sinyal drop. |
| **ASM-004** | API SIMKOPDES kelak akan menggunakan protokol standar REST/JSON dengan OAuth2 atau API Key. | Arsitektur integrasi dirancang menggunakan Transactional Outbox pattern. | `[PENDING]` | Menunggu rilis resmi pedoman teknis kementerian pengembang. |
| **ASM-005** | Tanda tangan elektronik sederhana (tanda tangan pada layar sentuh / foto KTP) memiliki kekuatan hukum permulaan yang cukup untuk internal koperasi. | Implementasi MVP tidak memerlukan sertifikasi PSrE PrivyID/Peruri berbayar. | `[PENDING_LEGAL_REVIEW]` | Divalidasi bersama praktisi hukum koperasi desa. |

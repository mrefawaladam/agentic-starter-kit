# 📑 Log Keputusan Produk & Arsitektur (Decision Log)

Dokumen ini mencatat keputusan-keputusan strategis tingkat produk, bisnis, dan rekayasa perangkat lunak yang disepakati oleh tim KasirSakti.

---

## Tabel Log Keputusan

| Nomor ID | Tanggal | Topik Keputusan | Keputusan yang Diambil | Status | Dampak / Referensi |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **DEC-001** | 2026-10-10 | Arsitektur Backend | Mengadopsi Strict Clean Architecture berlapis (Handler -> UseCase -> Repository Interface -> GORM) | `ACCEPTED` | [`ADR-001`](../05-architecture/adr/ADR-001-clean-architecture.md) |
| **DEC-002** | 2026-10-10 | Pembukuan Finansial | Mewajibkan pembukuan berpasangan (*Double-Entry Bookkeeping*) untuk seluruh mutasi bernilai moneter. | `ACCEPTED` | [`ADR-002`](../05-architecture/adr/ADR-002-double-entry-bookkeeping.md) |
| **DEC-003** | 2026-10-22 | Audit Kas Kasir | Menerapkan prosedur *Blind Cash Shift Closing* guna mengeliminasi peluang kecurangan laci kasir (*anti-fraud*). | `ACCEPTED` | [`FEAT-POS-001`](../03-requirements/features/FEAT-POS-001-sales/) |
| **DEC-004** | 2026-11-05 | Pola Integrasi Eksternal | Menggunakan pola *Transactional Outbox* untuk sinkronisasi data ke SIMKOPDES agar kegagalan pihak ketiga tidak menghambat transaksi POS lokal. | `ACCEPTED` | [`ADR-003`](../05-architecture/adr/ADR-003-transactional-outbox-simkopdes.md) |
| **DEC-005** | 2026-11-05 | Threshold Dokumen Kasbon | Menetapkan batas kasbon di atas Rp100.000 wajib dilengkapi persetujuan dan dokumen perjanjian tertulis/digital. | `APPROVED` | [`BR-CREDIT-002`](../03-requirements/features/FEAT-CREDIT-001-kasbon/business-rules.md) |
| **DEC-006** | 2026-11-05 | Spesifikasi SIMKOPDES | Penulisan rincian teknis endpoint SIMKOPDES ditunda sampai pihak kementerian/pengembang merilis dokumentasi resmi OpenAPI. | `PENDING` | [`simkopdes-research.md`](../02-discovery/integrations/simkopdes-research.md) |
| **DEC-007** | 2026-11-05 | Validitas Legal Digital Signature | Draft kepatuhan UU ITE & PSrE disiapkan, namun persetujuan akhir hukum menunggu legal counsel resmi. | `PENDING` | [`legal-review-log.md`](../07-security-compliance/legal/legal-review-log.md) |

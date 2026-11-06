---
id: INT-SIMKOPDES-001
title: Riset Integrasi SIMKOPDES (Sistem Informasi Koperasi Desa)
type: integration-research
status: IN_DISCOVERY
owner: BA Agent & Solution Architect
version: 1.0.0
created_at: 2026-11-05
updated_at: 2026-11-05
---

# 🌐 Riset Integrasi SIMKOPDES

Dokumen ini mendokumentasikan temuan dan analisis arsitektur awal untuk rencana integrasi KasirSakti dengan platform induk SIMKOPDES.

---

## 1. Latar Belakang Integrasi
SIMKOPDES (Sistem Informasi Koperasi Desa) merupakan platform yang dikembangkan untuk mengonsolidasikan data kelembagaan, transaksi permodalan, dan laporan operasional koperasi desa di tingkat daerah/nasional.

---

## 2. Status Spesifikasi Teknis Aktual
> [!IMPORTANT]
> Spesifikasi teknis resmi (kontrak OpenAPI / Swagger, format otentikasi, dan endpoint webhook) saat ini berstatus:
> **`[TODO: PENDING_OFFICIAL_API_DOCS]`**
>
> Sesuai instruksi tata kelola, tim rekayasa perangkat lunak KasirSakti **DILARANG** mengarang format endpoint JSON fiktif untuk pihak ketiga.

---

## 3. Strategi Arsitektur yang Disiapkan (Architectural Readiness)
Untuk mencegah kegagalan integrasi pihak ketiga melumpuhkan operasional checkout POS di cabang toko:
1. **Pola Asinkron (Transactional Outbox)**:
   - Setiap transaksi yang wajib disinkronkan ke SIMKOPDES tidak akan memanggil HTTP eksternal di dalam request checkout POS secara sinkron.
   - Sebagai gantinya, event transaksi ditulis ke tabel lokal `outbox_events` di dalam transaksi database yang sama dengan pesanan.
   - Worker background secara asinkron akan membaca `outbox_events` dan mengirimkannya ke SIMKOPDES dengan strategi exponential backoff retry.
2. **Idempotensi Pengiriman**:
   - Setiap payload pengiriman menyertakan UUID transaksi unik (`idempotency_key`) untuk mencegah pencatatan ganda saat terjadi gangguan jaringan seluler di lapangan.
3. **Penyimpanan Log Integrasi**:
   - Respons sukses dan kegagalan dicatat dalam tabel audit integrasi untuk memudahkan pelacakan oleh admin koperasi.

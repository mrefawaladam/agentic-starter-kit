---
id: PROD-ROADMAP-001
title: Product Roadmap — KasirSakti
type: roadmap
status: APPROVED
owner: PM Agent
version: 1.0.0
created_at: 2026-11-05
updated_at: 2026-11-05
---

# 🗺️ Roadmap Pengembangan Produk KasirSakti

Roadmap ini memetakan milestone strategis pengembangan fitur KasirSakti dari kapabilitas fondasi hingga fitur ekosistem lanjutan.

---

## Kuadran Roadmap

| Periode / Fase | Tema Utama | Milestone & Fitur | Status Kesiapan |
| :--- | :--- | :--- | :--- |
| **Q4 2026 (Fase 1)** | **Integritas Kas & Checkout POS** | - Auth JWT Multi-Tenant (`merchant_id`, `outlet_id`)<br>- Shift Kasir & Blind Cash Closing (`cashier_shift_logs`)<br>- POS Checkout, Diskon, Void & Reversal Journal<br>- Inventori Multi-Unit & Mutasi Stok | `IMPLEMENTED / IN_HARDENING` |
| **Q1 2027 (Fase 2)** | **Kredit Kasbon & Legalitas Dokumen** | - Profil Kredit Pelanggan & Credit Limit<br>- Pengajuan Kasbon Berjenjang (Level 1 tanpa perjanjian, Level 2 wajib perjanjian)<br>- Pembayaran Cicilan Berkala & Pelunasan Kasbon<br>- Perekaman Bukti Perjanjian & Tanda Tangan Digital | `SPECIFIED / READY_FOR_DEV` |
| **Q2 2027 (Fase 3)** | **Integrasi SIMKOPDES & Ekosistem** | - Arsitektur Transactional Outbox untuk Event Sinkronisasi<br>- Konektor Sinkronisasi Transaksi ke SIMKOPDES<br>- Pelaporan Keuangan Konsolidasi Multi-Cabang Koperasi<br>- Integrasi Otomatis Payroll HRIS ke Jurnal Akuntansi | `PENDING_API_SPEC` |

---

## Ketergantungan Lintas Fase
1. **Fase 2 mensyaratkan stabilitas Fase 1**: Modul Kasbon (`FEAT-CREDIT-001`) membutuhkan modul checkout POS (`FEAT-POS-001`) dan shift kasir yang kokoh untuk mencegah celah pencatatan piutang ganda.
2. **Fase 3 mensyaratkan spesifikasi pihak ketiga**: Integrasi SIMKOPDES membutuhkan rilis dokumentasi resmi endpoint dari instansi terkait.

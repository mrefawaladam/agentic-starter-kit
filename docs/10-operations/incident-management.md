---
id: OPS-INC-001
title: Manajemen Insiden & Eskalasi (Incident Management)
type: operations-incident
status: APPROVED
owner: Solution Architect Agent
version: 1.0.0
created_at: 2026-11-05
updated_at: 2026-11-05
---

# 🚨 Manajemen Insiden & Eskalasi (Incident Management)

Prosedur klasifikasi keparahan insiden operasional, jalur eskalasi, dan analisis pascainsiden (*post-mortem*).

---

## 1. Tingkat Keparahan Insiden (Severity Matrix)
- **SEV-1 (Kritis)**: Backend mati total, database crash, kasir tidak dapat melayani transaksi POS sama sekali di seluruh cabang.
  - *Response Time*: &lt; 15 menit. Target penyelesaian: &lt; 2 jam.
- **SEV-2 (Tinggi)**: Fitur pembayaran kasbon atau pencetakan struk terganggu, namun transaksi tunai masih dapat berjalan.
  - *Response Time*: &lt; 30 menit. Target penyelesaian: &lt; 6 jam.
- **SEV-3 (Menengah)**: Laporan back-office lambat atau kendala tampilan visual yang tidak memblokir penjualan kasir.
  - *Response Time*: &lt; 2 jam. Target penyelesaian: 1 hari kerja.

---

## 2. Alur Penanganan & Post-Mortem
1. **Deteksi & Triase**: Identifikasi anomali dari laporan kasir atau notifikasi monitoring.
2. **Mitigasi Cepat**: Restart container, failover basis data, atau rollback versi aplikasi.
3. **Analisis Akar Masalah (RCA)**: Menuliskan laporan *blameless post-mortem* dalam kurun waktu 2x24 jam guna mencegah insiden serupa terulang.

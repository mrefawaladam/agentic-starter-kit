---
id: OPS-MAINT-001
title: Standar Operasional Pemeliharaan Rutin (Maintenance SOP)
type: operations-maintenance
status: APPROVED
owner: Solution Architect Agent
version: 1.0.0
created_at: 2026-11-05
updated_at: 2026-11-05
---

# 🔧 Standar Operasional Pemeliharaan Rutin (Maintenance SOP)

Panduan jadwal dan langkah pemeliharaan preventif server backend dan database PostgreSQL KasirSakti.

---

## 1. Jendela Waktu Pemeliharaan (Maintenance Window)
- Jadwal jendela pemeliharaan berkala ditetapkan pada hari **Senin dini hari pukul 01:00 – 03:00 WIB** (di luar jam operasional toko/koperasi).
- Pemberitahuan pemeliharaan terencana (*planned downtime*) diumumkan minimal 24 jam sebelumnya melalui banner aplikasi back-office.

---

## 2. Aktivitas Pemeliharaan Berkala
1. **Database Vacuum & Reindex**:
   - Menjalankan `VACUUM ANALYZE` mingguan pada tabel transaksi dan stok yang mengalami mutasi intensif:
     ```sql
     VACUUM ANALYZE transactions;
     VACUUM ANALYZE transaction_details;
     VACUUM ANALYZE stock_movements;
     VACUUM ANALYZE cashier_shift_logs;
     ```
2. **Rotasi & Pembersihan Log**:
   - Log server aplikasi dirotasi mingguan dengan retensi maksimal 30 hari.
3. **Pembersihan Outbox Events**:
   - Arsipkan baris tabel `outbox_events` yang berstatus `DELIVERED` dan telah berusia lebih dari 90 hari.

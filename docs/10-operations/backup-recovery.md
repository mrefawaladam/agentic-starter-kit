---
id: OPS-BACKUP-001
title: Kebijakan Pencadangan & Pemulihan Basis Data (Backup & Recovery)
type: operations-backup
status: APPROVED
owner: Solution Architect Agent
version: 1.0.0
created_at: 2026-11-05
updated_at: 2026-11-05
---

# 💾 Kebijakan Pencadangan & Pemulihan (Backup & Recovery)

SOP pencadangan data dan pemulihan bencana (*Disaster Recovery*) untuk database PostgreSQL KasirSakti.

---

## 1. Parameter Target Pemulihan
- **RPO (Recovery Point Objective)**: Maksimal 1 jam (potensi kehilangan data maksimal 1 jam).
- **RTO (Recovery Time Objective)**: Maksimal 30 menit untuk memulihkan sistem kembali beroperasi penuh.

---

## 2. Jadwal & Prosedur Pencadangan
1. **Pencadangan Otomatis Harian (Daily Full Backup)**:
   - Dijalankan setiap pukul 02:00 WIB via cron job:
     ```bash
     pg_dump -h $DB_HOST -U $DB_USER -d $DB_NAME -F c -f "/backup/kasirsakti_$(date +%Y%m%d_%H%M%S).dump"
     ```
2. **Penyimpanan Snapshot Terpisah**:
   - Berkas dump dienkripsi menggunakan AES-256 dan disalin ke object storage terisolasi (S3 / remote VPS).
   - Retensi penyimpanan: 30 hari harian, 12 bulan akhir bulan.

---

## 3. Uji Coba Pemulihan (Restoration Drill)
- Tim teknis wajib menjalankan simulasi restore backup setiap bulan pada server staging untuk memverifikasi integritas file cadangan.

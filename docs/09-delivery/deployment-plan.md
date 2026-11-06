---
id: DELIV-DEPLOY-001
title: Rencana & Prosedur Deployment (Deployment Plan)
type: deployment-plan
status: APPROVED
owner: Solution Architect Agent
version: 1.0.0
created_at: 2026-11-05
updated_at: 2026-11-05
---

# 🚀 Rencana & Prosedur Deployment (Deployment Plan)

Prosedur standar operasional deployment backend KasirSakti ke server produksi atau container cloud.

---

## 1. SOP Eksekusi Deployment
1. **Langkah 1 (Pre-Deployment Backup)**:
   Ambil snapshot basis data PostgreSQL:
   ```bash
   pg_dump -h localhost -U kasir -d kasirsakti_db -F c -b -v -f backup_pre_deploy.dump
   ```
2. **Langkah 2 (Eksekusi Migrasi Basis Data)**:
   Jalankan migrasi database via binary backend:
   ```bash
   ./kasirsakti-be migrate
   ```
3. **Langkah 3 (Rolling Update / Container Restart)**:
   Deploy container baru via Docker Compose:
   ```bash
   docker-compose up -d --build backend
   ```
4. **Langkah 4 (Smoke Test & Health Check)**:
   Pastikan endpoint kesehatan sistem merespons `200 OK`:
   ```bash
   curl -f http://localhost:8080/health || exit 1
   ```

---

## 2. Prosedur Rollback Cepat
Jika ditemukan anomali kritis pasca deployment:
1. Kembalikan container ke image tag sebelumnya:
   ```bash
   docker-compose rollback backend
   ```
2. Jalankan rollback migrasi SQL via sql-migrate atau restore snapshot backup PostgreSQL.

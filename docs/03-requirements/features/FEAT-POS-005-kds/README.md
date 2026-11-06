---
id: FEAT-POS-005
title: Feature — Kitchen Display System (KDS) Realtime F&B
type: feature
status: APPROVED
priority: P1
owner: PM Agent
version: 1.0.0
created_at: 2026-11-05
updated_at: 2026-11-05
related_epics:
  - EPIC-POS
depends_on:
  - FEAT-POS-001
---

# 🍳 FEAT-POS-005: Kitchen Display System (KDS) Realtime F&B

## 1. Ringkasan Fitur (Overview)
Modul antarmuka dan API backend Kitchen Display System (KDS) untuk operasional F&B dan dapur/bar. KDS menggantikan tiket pesanan kertas konvensional dengan antrean digital layar sentuh yang menampilkan tiket pesanan kasir secara realtime, nomor meja, instruksi khusus (misal: "tanpa gula", "pedas level 3"), serta memfasilitasi pelacakan status masak (`PENDING` -> `PREPARING` -> `READY` -> `SERVED`).

---

## 2. Struktur Dokumen Fitur
- [`user-stories.md`](./user-stories.md): Kebutuhan koki dapur, barista, dan kasir.
- [`business-rules.md`](./business-rules.md): Aturan `BR-KDS-001` s/d `BR-KDS-004`.
- [`acceptance-criteria.md`](./acceptance-criteria.md): Skenario Given-When-Then BDD (`AC-KDS-001` & `AC-KDS-002`).
- [`use-cases/`](./use-cases/):
  - [`UC-KDS-001-order-stream.md`](./use-cases/UC-KDS-001-order-stream.md): Pengambilan antrean pesanan dapur aktif.
  - [`UC-KDS-002-update-cooking-status.md`](./use-cases/UC-KDS-002-update-cooking-status.md): Pembaruan status proses memasak/penyajian.

---

## 3. Matriks Kesiapan (Readiness Checklist)
- [x] Problem statement terdefinisi dengan jelas.
- [x] Seluruh Use Case memiliki alur alternatif dan kegagalan.
- [x] Aturan bisnis bernomor eksplisit (`BR-KDS-001` s/d `BR-KDS-004`).
- [x] Acceptance criteria berformat Given-When-Then BDD.
- [x] Matriks RBAC role terdefinisi (`cashier`, `kitchen`, `admin`, `owner`).
- [ ] Disetujui oleh Product Owner (Status `IN_REVIEW` -> `APPROVED` -> `READY_FOR_DEV`).

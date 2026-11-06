---
id: FEAT-MODUL-001-slug
title: "[Nama Fitur]"
type: feature
status: DRAFT # DRAFT | IN_REVIEW | APPROVED | READY_FOR_DEV
priority: P1
owner: PM Agent
version: 0.1.0
created_at: YYYY-MM-DD
updated_at: YYYY-MM-DD
related_epics:
  - EPIC-XXX
depends_on:
  - FEAT-YYY-001
---

# Spesifikasi Fitur: [Nama Fitur]

## 1. Ringkasan Fitur (Overview)
Penjelasan ringkas tentang apa yang dilakukan oleh fitur ini dan mengapa penting bagi pengguna.

## 2. Struktur Dokumen Fitur
Untuk fitur berkategori kompleks, dokumentasi dipecah menjadi file-file pendukung:
- [`problem-and-goals.md`](./problem-and-goals.md)
- [`scope.md`](./scope.md)
- [`workflows.md`](./workflows.md)
- [`use-cases/`](./use-cases/)
- [`user-stories.md`](./user-stories.md)
- [`business-rules.md`](./business-rules.md)
- [`acceptance-criteria.md`](./acceptance-criteria.md)
- [`permissions.md`](./permissions.md)
- [`states-and-transitions.md`](./states-and-transitions.md)
- [`data-requirements.md`](./data-requirements.md)
- [`edge-cases.md`](./edge-cases.md)
- [`dependencies-and-risks.md`](./dependencies-and-risks.md)
- [`open-questions.md`](./open-questions.md)

*(Catatan: Untuk fitur sederhana, rincian di atas dapat digabung dalam satu file ini).*

## 3. Matriks Kesiapan (Readiness Checklist)
- [ ] Problem statement terdefinisi dengan jelas.
- [ ] Seluruh Use Case memiliki alur alternatif dan kegagalan.
- [ ] Aturan bisnis bernomor eksplisit (`BR-XXX-001`).
- [ ] Acceptance criteria berformat Given-When-Then (`AC-XXX-001`).
- [ ] Edge cases dan race condition terpetakan.
- [ ] Matriks RBAC role terdefinisi.
- [ ] Disetujui oleh Product Owner (Status berganti ke `APPROVED` lalu `READY_FOR_DEV`).

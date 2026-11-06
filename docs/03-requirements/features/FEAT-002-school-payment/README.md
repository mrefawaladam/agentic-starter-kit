---
id: FEAT-002-school-payment
title: "Sistem Pembayaran SPP & Uang Gedung Sekolah"
status: READY_FOR_DEV
priority: MUST
lead_role: product-manager
created_at: 2026-11-06
target_release: Sprint-02
---

# Feature Specification: Sistem Pembayaran Sekolah (FEAT-002)

Solusi penagihan dan pembayaran biaya pendidikan (SPP bulanan, Uang Gedung, Seragam) secara digital dan otomatis terintegrasi dengan Payment Gateway (QRIS & Virtual Account).

## 📑 Daftar Dokumen Spesifikasi

| Dokumen | Tanggung Jawab Peran | Deskripsi |
| :--- | :--- | :--- |
| [`prd-payment-system.md`](./prd-payment-system.md) | **Product Manager** | Latar belakang bisnis, target persona, metrik kesuksesan, & scope in/out. |
| [`use-cases.md`](./use-cases.md) | **Business Analyst** | Diagram alur BPMN, aktor, use cases (UC-01 s/d UC-03), & state transitions. |
| [`user-stories.md`](./user-stories.md) | **Product Manager** | User stories format standar dengan estimasi story points dan prioritas MoSCoW. |
| [`acceptance-criteria.md`](./acceptance-criteria.md) | **Quality Engineer** | Kriteria penerimaan dalam format formal Gherkin (Given-When-Then). |
| [`risk-register.md`](./risk-register.md) | **Security / PM** | Matriks risiko teknis, operasional, kepatuhan, serta mitigasinya. |

## 🏛️ Dokumen Teknis Terkait (Progressive Scope)

- **Database Schema**: [`docs/05-architecture/schemas/billing-schema.md`](../../../05-architecture/schemas/billing-schema.md)
- **API Contracts**: [`docs/06-api/billing-endpoints.md`](../../../06-api/billing-endpoints.md)
- **Security STRIDE Review**: [`docs/07-security-compliance/threat-models/payment-threat-model.md`](../../../07-security-compliance/threat-models/payment-threat-model.md)

## 🤝 Handoff & Readiness Verification

- [x] **Product Manager Sign-off**: PRD, User Stories, dan Scope disetujui.
- [x] **Business Analyst Sign-off**: Diagram proses BPMN dan FSM disinkronkan.
- [x] **Solution Architect Sign-off**: Skema database relational dan kontrak REST API disetujui.
- [x] **Security Engineer Sign-off**: STRIDE Threat Analysis selesai (HMAC Webhook & BOLA mitigation).
- [x] **Status Kesiapan**: `READY_FOR_DEV` (Developer diperbolehkan mengimplementasikan kode).

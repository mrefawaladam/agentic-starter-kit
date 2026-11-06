# 📝 Catatan Perubahan (Changelog)

Seluruh perubahan penting pada proyek KasirSakti didokumentasikan di sini mengikuti standar Keep a Changelog.

---

## [Unreleased]
### Added
- Penyelarasan struktur repositori dengan blueprint Agentic Product Engineering: pembentukan folder `agents/` dan `docs/00-governance/` s/d `docs/10-operations/`.
- Template tata kelola PRD, Feature Spec, Use Case, User Story, Business Rules, Acceptance Criteria, Workflow, ADR, dan Test Plan.
- Spesifikasi lengkap fitur POS Checkout & Blind Shift Closing (`FEAT-POS-001`) dan Kasbon Management (`FEAT-CREDIT-001`).
- Pemodelan arsitektur Transactional Outbox untuk integrasi SIMKOPDES.
- Dokumen perancangan keamanan RBAC matrix, STRIDE threat model, dan kepatuhan privasi UU PDP.

### Changed
- Penyesuaian `AGENTS.md` root repositori untuk menyatukan aturan multi-agent collaboration dengan aturan Clean Architecture Go dan ACID transaction invariants.

---

## [1.0.0-beta] - 2026-10-22
### Added
- Fondasi Clean Architecture backend Go (Gin, GORM, PostgreSQL).
- Modul autentikasi JWT multi-tenant dan role authorization middleware.
- Modul shift kasir, master produk, checkout POS, dan pencatatan double-entry journal dasar.

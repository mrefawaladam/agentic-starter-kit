# Agentic Starter Kit — Global AI Instructions

Framework pengembangan perangkat lunak berbasis **AI Spec-Driven Development** yang hemat token, terstruktur, dan teruji.

---

## 1. Prinsip Utama Penghematan Token (Progressive Disclosure)

Dilarang memuat seluruh isi repository ke dalam konteks percakapan. Terapkan 5 tahap bertahap:

```
[Tahap 1: Kenali Tugas] ➔ [Tahap 2: Baca 1 Skill Relevan] ➔ [Tahap 3: Muat Referensi Seperlunya] ➔ [Tahap 4: Telusuri Graph Dependensi] ➔ [Tahap 5: Eksekusi Deliverable]
```

1. **Kenali Tugas**: Identifikasi peran mana yang bertanggung jawab (PM, BA, UI/UX, Architect, Frontend, Backend, QE, atau Security).
2. **Baca 1 Skill Saja**: Muat file `.agents/skills/<role>/SKILL.md` yang spesifik untuk tugas tersebut.
3. **Ambil Referensi Seperlunya**: Hanya baca file dokumen di `docs/` atau `.agents/skills/<role>/references/` yang dibutuhkan secara langsung.
4. **Telusuri Dependensi**: Gunakan `data/knowledge-graph.json` untuk menavigasi modul, tipe data, dan endpoint yang terdampak tanpa memindai seluruh folder source code.
5. **Hasilkan Deliverable**: Buat dokumen atau kode sesuai standar, catat asumsi terbuka (`[TODO: PENDING_CONFIRMATION]`), dan perbarui `data/backlog.json`.

---

## 2. Pembagian 8 Peran Spesialis & Lokasi Panduan

| Peran AI Agent | Lokasi Skill Utama | Tanggung Jawab Deliverable | Scope Dokumen yang Dibaca |
| :--- | :--- | :--- | :--- |
| **Product Manager (PM)** | [`.agents/skills/product-manager/`](./.agents/skills/product-manager/) | PRD, Use Cases, User Stories, MoSCoW, Roadmap, Risk Register | `docs/01-product/`, `docs/03-requirements/` |
| **Business Analyst (BA)** | [`.agents/skills/business-analyst/`](./.agents/skills/business-analyst/) | BPMN Process, FSM Transitions, Ubiquitous Glossary, RACI | `docs/02-discovery/`, `docs/03-requirements/workflows/` |
| **UI/UX Designer** | [`.agents/skills/ui-ux/`](./.agents/skills/ui-ux/) | Design System, Screen Specs (Empty, Loading, Error, Success), UI-Skills | `docs/04-ux-design/` |
| **Solution Architect** | [`.agents/skills/solution-architect/`](./.agents/skills/solution-architect/) | C4 Diagrams, HLD/LLD, Database Schemas, REST/gRPC API Contracts, ADR | `docs/05-architecture/`, `docs/06-api/` |
| **Frontend Developer** | [`.agents/skills/frontend-developer/`](./.agents/skills/frontend-developer/) | UI Components, State/Form Handling, API Integration, Component Tests | `docs/03-requirements/`, `docs/04-ux-design/`, `docs/06-api/` |
| **Backend Developer** | [`.agents/skills/backend-developer/`](./.agents/skills/backend-developer/) | Clean Architecture, Services, Database Migrations, Unit Tests | `docs/03-requirements/`, `docs/05-architecture/`, `docs/06-api/` |
| **Quality Engineer (QE)**| [`.agents/skills/quality-engineer/`](./.agents/skills/quality-engineer/) | Automated E2E Tests (Playwright), Contract Tests, Test Plans, Bugs | `docs/08-quality-assurance/`, specs fitur |
| **Security Engineer** | [`.agents/skills/security-engineer/`](./.agents/skills/security-engineer/) | STRIDE Threat Model, RBAC Matrix, SAST/DAST, Security Audit | `docs/07-security-compliance/`, API & DB |

---

## 3. Aturan Status Kesiapan (Readiness Gates)

```
[DRAFT / IN_REVIEW] ──(Human Approval)──> [APPROVED] ──(Architect & UI/UX Ready)──> [READY_FOR_DEV] ──> [IN_DEV] ──> [IN_QA] ──> [DONE]
```

- `DRAFT` / `IN_REVIEW`: Dokumen sedang dirancang. Developer **DILARANG** menulis kode aplikasi.
- `APPROVED`: Disetujui oleh Human Product Owner.
- `READY_FOR_DEV`: Dokumen fungsional, UI screen spec, database schema, dan API contract lengkap. Developer **BOLEH** mulai implementasi.
- `IN_QA`: Implementasi selesai, Quality Engineer menjalankan verifikasi Acceptance Criteria.
- `DONE`: Semua test pass dan siap rilis.

---

## 4. Aturan Kolaborasi & Handoff Antar-Agent

Setiap handoff wajib mencakup 5 elemen:
1. **Goal**: Tujuan fitur atau tugas.
2. **Source Docs**: Tautan file dokumen sumber di `docs/`.
3. **Approval Status**: Status persetujuan (harus diverifikasi, tidak boleh diasumsikan).
4. **Dependencies**: Komponen atau modul lain yang terkait.
5. **Open Questions**: Hal yang masih memerlukan konfirmasi pengguna.

Agent penerima handoff **TIDAK BOLEH** mengasumsikan hasil kerja sebelumnya otomatis 100% benar; jika ada inkonsistensi, catat dan minta klarifikasi sebelum berasumsi.

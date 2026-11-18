# 🤖 Sakti-Agent — Autonomous AI Software Engineering OS (AI-SEOS) Master Guidelines

Dokumen ini adalah konstitusi operasional terpusat (*Single Source of Truth*) untuk seluruh AI Assistant, Agent Spesialis (`agents/` & `.agents/skills/`), dan solo software developer dalam merancang, mendokumentasikan, dan mengimplementasikan solusi perangkat lunak *production-grade*.

> **Core Philosophy**:
> "One Developer. One Engineering System. Multiple AI Specialists. One Source of Truth. Production-Grade Software."

---

## 1. Konstitusi Penghematan Token (Sakti Token Economy Policy)

AI **DILARANG KERAS** memindai atau membaca seluruh repository secara membabi buta. Setiap proses harus mematuhi **Context Budget Protocol** dan **7-Level Progressive Disclosure**:

### A. 7-Level Progressive Disclosure Protocol
```text
LEVEL 0 — Pahami Inti Tugas (Task Classification & Scope Lock)
       ↓
LEVEL 1 — Muat 1 Skill Relevan (Skill Activation)
       ↓
LEVEL 2 — Inspeksi Repository Map & Graph (Struktur direktori & modul terdampak)
       ↓
LEVEL 3 — Cari Simbol Relevan (Symbol First: functions, interfaces, routes)
       ↓
LEVEL 4 — Baca Region Kode Spesifik (Region Read: hanya baris/fungsi yang diubah)
       ↓
LEVEL 5 — Hubungkan Dependencies, Specs & Test Cases Terkait
       ↓
LEVEL 6 — Deep Investigation (HANYA jika terjadi ambiguitas tinggi atau parameter --deep aktif)
```

### B. Aturan Emas Token & Batasan Konteks (*Bounded Context*)
1. **Symbol-First, Region-Second, File-Third**: Jangan membaca file 800 baris jika hanya memerlukan fungsi 40 baris. Gunakan pencarian simbol dan baris spesifik.
2. **Context Budget (Default: 16k tokens, Max: 32k tokens)**: Jika utilisasi melebihi 80%, kompres konteks, buang referensi sekunder, dan gunakan artefak ringkasan (*Context Summary*).
3. **Pencarian Terbatas (Bounded Search)**: Maksimal 20 file dan 10 match per file untuk pencarian teks.
4. **Jalur yang Wajib Diabaikan (Ignored Paths)**:
   `node_modules/**`, `.git/**`, `.next/**`, `dist/**`, `build/**`, `coverage/**`, `vendor/**`, `tmp/**`, `logs/**`, `*.lock`, `*.min.js`.
5. **Context Reuse**: Gunakan artefak keluaran agen sebelumnya (misal temuan BA di `.context/` atau `docs/03-requirements/`) sebagai input untuk Architect/Developer. Jangan melakukan scan repo ulang.
6. **Output Economy**: Agen dilarang mengulang deskripsi peran, basa-basi pembuka, atau mengulang teks instruksi pengguna. Sajikan langsung hasil rekayasa terstruktur: `Finding` $\to$ `Evidence` $\to$ `Impact` $\to$ `Recommendation`.

---

## 2. Pembagian 12 Canonical Agent & Shortcut Panggilan

| Canonical Agent ID | Shortcut (`/`) | Context File (`@`) | Scope Tanggung Jawab & Batasan |
| :--- | :---: | :--- | :--- |
| **Orchestrator** | `/orchestrator` | `@agents/orchestrator/AGENT.md` | Routing, task planning, context compilation, delegasi, dan pemantauan lintas peran. |
| **Product Manager (PM)** | `/pm` | `@agents/product-manager/AGENT.md` | Product vision, PRD, MoSCoW prioritization, user stories. **Wajib simpan file fisik** ke `docs/01-product/` atau `docs/03-requirements/`. |
| **Business Analyst (BA)** | `/ba` | `@agents/business-analyst/AGENT.md` | BPMN process, state machine transitions, edge cases, business rules. |
| **UI/UX Designer** | `/ui` | `@agents/ui-ux/AGENT.md` | Design system, visual hierarchy, interaction states, WCAG AA accessibility specs. |
| **Solution Architect** | `/architect` | `@agents/solution-architect/AGENT.md` | C4 Model, ADR, database schemas, API contracts (OpenAPI/RFC 7807). |
| **Fullstack Developer** | `/fullstack` | `@agents/fullstack-developer/AGENT.md` | End-to-end Vertical Slice implementation (UI + API + DB migration + Unit tests). |
| **Frontend Developer** | `/frontend` | `@agents/frontend-developer/AGENT.md` | Client UI, React Server Components, responsive layout, client-side state. |
| **Backend Developer** | `/backend` | `@agents/backend-developer/AGENT.md` | Domain logic, clean architecture, transactional database persistence, API resilience. |
| **Code Reviewer** | `/review` | `@agents/code-reviewer/AGENT.md` | Review kode independen, deteksi arsitektur violation, race condition, dan code smell sebelum QA. |
| **Quality Engineer (QE)**| `/qa` | `@agents/quality-engineer/AGENT.md` | Playwright E2E, Gherkin validation. **Wajib melampirkan screenshot & test evidence** ke `docs/08-quality-assurance/evidence/`. |
| **Security Engineer** | `/security` | `@agents/security-engineer/AGENT.md` | STRIDE threat modeling, OWASP Top 10 mitigation, SAST/DAST verification, RBAC/ABAC. |
| **DevOps Engineer** | `/devops` | `@agents/devops-engineer/AGENT.md` | Docker containerization, CI/CD pipelines, build automation, telemetry & deployment. |

---

## 3. Matriks Hak Akses & Batasan Agen (Agent Boundaries)

| Agent Role | Izin Edit Kode (`src/`, `app/`) | Izin Edit Dokumen (`docs/`) | Izin Edit Task (`data/`) | Batasan Mutlak |
| :--- | :---: | :---: | :---: | :--- |
| **Orchestrator** | ❌ Tidak | ✅ Ya | ✅ Ya | Koordinasi & delegasi; tidak mengubah kode langsung. |
| **PM / BA / UI-UX** | ❌ Tidak | ✅ Ya | ✅ Ya | Dilarang menulis implementasi kode aplikasi atau mengubah database. |
| **Architect** | ❌ Tidak | ✅ Ya | ✅ Ya | Menetapkan kontrak API/ADR; tidak menulis implementasi aplikasi. |
| **Developer (FE/BE/FS)** | ✅ Ya | ✅ Ya | ✅ Ya | Dilarang koding jika task masih `DRAFT`/`IN_REVIEW`. Wajib lolos linter & typecheck. |
| **Code Reviewer** | ❌ Tidak | ✅ Ya | ✅ Ya | Hanya mereview diff dan memberikan catatan review (PASS/CHANGES_REQUESTED). |
| **Quality Engineer** | ⚠️ Test Saja | ✅ Ya | ✅ Ya | Hanya boleh menulis file test (`tests/`, `e2e/`). Wajib sertakan screenshot/bukti. |
| **Security Engineer**| ❌ Tidak | ✅ Ya | ✅ Ya | Melakukan audit keamanan; tidak mengubah kode fitur secara langsung. |
| **DevOps Engineer** | ⚠️ Infra Saja | ✅ Ya | ✅ Ya | Hanya mengedit file CI/CD, Docker, scripts, dan konfigurasi release. |

---

## 4. Siklus Kesiapan & Validasi (Readiness Gates 2.0)

Perubahan status task **TIDAK BOLEH** terjadi hanya karena klaim teks AI. Setiap perpindahan status harus memvalidasi prasyarat teknis:

```text
[DISCOVERY] ──> [SPECIFICATION] ──> [IN_REVIEW] ──(Human Approval)──> [READY_FOR_DEV]
      │
      └──> [IMPLEMENTATION] ──> [CODE_REVIEW] ──> [IN_QA] ──> [SECURITY_CHECK] ──> [RELEASE] ──> [DONE]
```

- **DISCOVERY $\to$ SPECIFICATION**: Ruang lingkup masalah dan batas fitur jelas.
- **IN_REVIEW $\to$ READY_FOR_DEV**: Disetujui oleh Human Developer (*Human Quality Gate*).
- **READY_FOR_DEV $\to$ IMPLEMENTATION**: Dokumen fungsional, API contract, dan Acceptance Criteria lengkap.
- **IMPLEMENTATION $\to$ CODE_REVIEW**: Kode terkompilasi, build & lint bersih.
- **CODE_REVIEW $\to$ IN_QA**: Code Reviewer menyatakan *Approved* tanpa blocker.
- **IN_QA $\to$ SECURITY_CHECK**: Seluruh skenario Acceptance Criteria lolos pengujian dengan bukti visual/log.
- **SECURITY_CHECK $\to$ RELEASE**: Tidak ada kerentanan kritis / privilege escalation.
- **RELEASE $\to$ DONE**: Verifikasi produksi / live smoke test terkonfirmasi.

---

## 5. Protokol Handoff Antar Agen

Setiap kali terjadi delegasi tugas antar agen (misal `/ba` $\to$ `/architect` $\to$ `/frontend`), agen pengirim wajib menyerahkan ringkasan terstruktur:
1. **Task ID & Feature Goal**: Sasaran fitur yang sedang dikerjakan.
2. **Key Findings / Artifacts**: Lokasi file dokumen yang dihasilkan (misal `docs/03-requirements/...`).
3. **Relevant Files & Symbols**: Fungsi, komponen, atau endpoint yang relevan.
4. **Decisions & Constraints**: Keputusan teknis/ADR yang mengikat.
5. **Open Questions / Risks**: Hal yang masih membutuhkan konfirmasi pengguna.

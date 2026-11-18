# 🤖 Sakti-Agent — Autonomous AI Software Engineering OS (AI-SEOS)

> **"One Developer. One Engineering System. Multiple AI Specialists. One Source of Truth. Production-Grade Software."**

`sakti-agent` adalah sistem operasi rekayasa perangkat lunak otonom (*Autonomous AI Software Engineering OS / AI-SEOS*) untuk solo-developer. Dirancang untuk merancang, mendokumentasikan, mengimplementasikan, mereview, menguji, dan merilis aplikasi *production-grade* secara terstruktur, deterministik, dan hemat token (*Token Economy*).

Dilengkapi dengan **Command Center Kanban & Documentation Hub lokal (Next.js 16 Turbopack)** yang beroperasi secara *local-first* (JSON + Markdown), mesin kecerdasan repositori (*Repository Intelligence*), CLI terpadu (`make` / `scripts/sakti.js`), dan 12 peran AI spesialis (*Canonical Specialists*).

---

## 🚀 Prinsip Utama: 7-Level Progressive Disclosure (Token Economy)

AI **DILARANG KERAS** memindai atau membaca seluruh repositori sekaligus. Sistem menerapkan protokol 7 level bertahap:

```text
LEVEL 0 — Pahami Inti Tugas (Task Classification & Scope Lock)
       ↓
LEVEL 1 — Muat 1 Skill Relevan (Skill Activation)
       ↓
LEVEL 2 — Inspeksi Repository Map & Graph (Struktur direktori & modul terdampak)
       ↓
LEVEL 3 — Cari Simbol Relevan (Symbol First: functions, interfaces, routes)
       ↓
LEVEL 4 — Baca Region Kode Spesifik (Region Read: baris/fungsi yang terdampak)
       ↓
LEVEL 5 — Hubungkan Dependencies, Specs & Test Cases Terkait
       ↓
LEVEL 6 — Deep Investigation (HANYA jika parameter --deep aktif)
```

- **Default Context Budget**: 16.000 tokens (Maksimal: 32.000 tokens).
- **Auto-Compression Trigger**: Peringatan aktif jika pemakaian token melampaui 80% (12.8k tokens).
- **Context Reuse**: Hasil analisis agen sebelumnya disimpan di `.context/` dan dioper ke agen berikutnya (*Handoff*) tanpa pemindaian ulang.

---

## 👥 Ekosistem 12 Canonical AI Specialists

Panggil peran spesialis di terminal Antigravity CLI (`agy`) menggunakan **Slash Command** (`/`) atau teks alami (`@`):

| Canonical Role ID | Shortcut (`/`) | File Konteks (`@`) | Tanggung Jawab & Batasan |
| :--- | :---: | :--- | :--- |
| **Orchestrator** | `/orchestrator`, `/orc` | `@agents/orchestrator/AGENT.md` | Routing cerdas, scope lock, context compilation, delegasi, dan pemantauan lintas peran. |
| **Product Manager (PM)** | `/pm` | `@agents/product-manager/AGENT.md` | PRD, MoSCoW prioritization, user stories. **Wajib simpan file fisik** ke `docs/01-product/` atau `docs/03-requirements/`. |
| **Business Analyst (BA)** | `/ba` | `@agents/business-analyst/AGENT.md` | Pemodelan proses BPMN, FSM state machine transitions, business rules, dan edge cases. |
| **UI/UX Designer** | `/ui`, `/ui-ux` | `@agents/ui-ux/AGENT.md` | Design system, visual hierarchy, interaction states, dan kepatuhan WCAG AA. |
| **Solution Architect** | `/architect` | `@agents/solution-architect/AGENT.md` | C4 Model diagrams, ADR, API contracts (OpenAPI/RFC 7807), dan skema relasional database. |
| **Fullstack Developer** | `/fullstack` | `@agents/fullstack-developer/AGENT.md` | Eksekusi fitur vertikal (*Vertical Slice Architecture*): UI + API + DB migration + Unit tests. |
| **Frontend Developer** | `/frontend`, `/dev` | `@agents/frontend-developer/AGENT.md` | Client UI, React Server Components (RSC), responsive layout, client-side state. |
| **Backend Developer** | `/backend`, `/dev` | `@agents/backend-developer/AGENT.md` | Domain logic, Clean Architecture (Ports & Adapters), persistensi ACID, resiliensi API. |
| **Code Reviewer** | `/review` | `@agents/code-reviewer/AGENT.md` | Review kode independen, deteksi pelanggaran ADR, race condition, dan code smell sebelum QA. |
| **Quality Engineer (QE)**| `/qa` | `@agents/quality-engineer/AGENT.md` | Playwright E2E, Gherkin validation. **Wajib simpan screenshot & bukti uji** ke `docs/08-quality-assurance/evidence/`. |
| **Security Engineer** | `/security` | `@agents/security-engineer/AGENT.md` | STRIDE threat modeling, mitigasi OWASP Top 10, SAST/DAST verification, RBAC/ABAC. |
| **DevOps Engineer** | `/devops` | `@agents/devops-engineer/AGENT.md` | Docker multi-stage, CI/CD pipeline, verifikasi migrasi database, dan kesiapan rilis. |

---

## 🚦 Siklus Kesiapan & Validasi: Readiness Gates 2.0

Perubahan status task **tidak boleh** terjadi hanya karena klaim teks AI. Setiap perpindahan status harus memvalidasi prasyarat teknis:

```text
[DISCOVERY] ──> [SPECIFICATION] ──> [IN_REVIEW] ──(Human Approval)──> [READY_FOR_DEV]
      │
      └──> [IMPLEMENTATION] ──> [CODE_REVIEW] ──> [IN_QA] ──> [SECURITY_CHECK] ──> [READY_FOR_RELEASE] ──> [DONE]
```

1. **DISCOVERY $\to$ SPECIFICATION**: Ruang lingkup masalah, latar belakang, dan batas fitur jelas.
2. **IN_REVIEW $\to$ READY_FOR_DEV**: Disetujui oleh Developer/Human Lead (*Human Quality Gate*).
3. **READY_FOR_DEV $\to$ IMPLEMENTATION**: Dokumen spesifikasi fungsional, API contract, dan Acceptance Criteria lengkap.
4. **IMPLEMENTATION $\to$ CODE_REVIEW**: Kode terkompilasi, build linter dan typecheck bersih.
5. **CODE_REVIEW $\to$ IN_QA**: Code Reviewer menyatakan *Approved* tanpa pelanggaran arsitektur/race condition.
6. **IN_QA $\to$ SECURITY_CHECK**: Seluruh skenario Acceptance Criteria lolos pengujian dengan bukti screenshot visual dan log.
7. **SECURITY_CHECK $\to$ READY_FOR_RELEASE**: Tidak ada kerentanan kritis / privilege escalation.
8. **READY_FOR_RELEASE $\to$ DONE**: Verifikasi produksi / live smoke test terkonfirmasi.

---

## 🛠️ Perintah Praktis (Makefile Control Plane)

Gunakan perintah `make` untuk mengontrol seluruh sistem rekayasa secara mudah:

### 1. Dashboard & Viewer
```bash
make board                  # Menjalankan Dashboard Kanban & Docs Hub (http://localhost:3000)
make board-build            # Build Next.js viewer mode produksi
make board-start            # Menjalankan viewer mode produksi
```

### 2. Repository Intelligence & Token Economy
```bash
make sakti-status           # Cek status kesehatan AI-SEOS, backlog & 12 spesialis
make sakti-inspect SYMBOL=calculateContextBudget # Cari definisi simbol/fungsi (Symbol-First)
make sakti-impact FILE=viewer/src/lib/storage.ts # Analisis modul & test terdampak perubahan
make sakti-context FILES="AGENTS.md scripts/sakti.js" # Hitung estimasi penggunaan token budget
make sakti-handoff ROLE=solution-architect SUMMARY="Review routing" # Buat artefak serah terima di .context/
make sakti-map DEPTH=2      # Tampilkan hierarki direktori bersih (tanpa sampah)
```

### 3. Manajemen Task Kanban
```bash
make task-list              # Daftar semua task kanban (atau: make task-list STATUS=ready_for_dev)
make task-get ID=TASK-001   # Baca rincian spesifikasi lengkap sebuah task
make task-status ID=TASK-001 GATE=ready_for_dev # Pindahkan status task ke gate berikutnya
make task-check ID=TASK-001 AC=AC-1 # Centang checklist Acceptance Criteria
make task-report ID=TASK-001 RES=passed SUM="3 AC lolos" BY="QA Specialist" # Simpan laporan QA
```

### 4. Git & Branch Management
```bash
make git-status             # Cek status working directory git
make git-branch             # Tampilkan daftar branch aktif beserta status tracking
make git-log                # Lihat 10 commit riwayat terbaru
```

---

## 📚 Struktur Direktori AI-SEOS 2.0

```
agentic-starter-kit/
├── .agents/
│   ├── policies/            # Kebijakan token-economy & agent-boundaries
│   └── skills/              # Definisi skill terstandarisasi untuk LLM
├── .context/                # Artefak serah terima (handoff) & ringkasan konteks aktif
├── agents/                  # Panduan peran spesialis & batasan mutlak (AGENT.md)
├── data/                    # JSON persistence (backlog.json, knowledge-graph.json, users.json)
├── docs/                    # Hierarki dokumentasi bernomor (00-governance s.d. 10-operations)
│   ├── 00-governance/       # Decision log (ADR), glossary, standar dokumentasi
│   └── 08-quality-assurance/evidence/ # Penyimpanan screenshot UI & log eksekusi test
├── engine/                  # Context engine & token budget calculator
├── intelligence/            # Repository indexer & change impact analyzer
├── scripts/                 # CLI utilities (sakti.js, task.js, graph-lookup.js)
├── viewer/                  # Next.js 16 Web Dashboard (Kanban, Docs Hub, Evidence Viewer)
├── AGENTS.md                # Konstitusi operasional Single Source of Truth
├── Makefile                 # Pusat kontrol perintah developer
└── package.json             # Root workspace scripts & package metadata
```

---

## 📖 Dokumentasi Lengkap
- [**`HOW_TO_USE.md`**](./HOW_TO_USE.md): Panduan SOP operasional harian langkah demi langkah.
- [**`IMPLEMENTATION_SUMMARY_AI_SEOS_2.0.md`**](./IMPLEMENTATION_SUMMARY_AI_SEOS_2.0.md): Detail teknis arsitektur 5 batch yang telah diimplementasikan.
- [**`AGENTS.md`**](./AGENTS.md): Konstitusi tata kelola agen dan matriks batasan peran.

# Agentic Blueprint Starter Kit

> **A Token-Efficient, Smart, Multi-Agent Development Framework Powered by Docs, Skills, Rules, and Codebase Knowledge Graph.**

Starter kit ini adalah cetak biru (*blueprint*) rekayasa perangkat lunak multi-agent yang dirancang agar AI Agent bekerja secara terstruktur, kolaboratif, tidak saling tumpang tindih, dan **sangat hemat token**. Dilengkapi dengan **Web UI Kanban & Documentation Hub lokal (Next.js 16)** bergaya **Jira Light** yang beroperasi secara *local-first* (JSON + Markdown) tanpa dependensi database eksternal.

---

## Prinsip Penghematan Token (Progressive Disclosure)

Alih-alih memuat seluruh repositori ke dalam context window yang boros token dan memicu halusinasi, sistem menerapkan 5 tahap pemuatan bertahap:

```
[1. Kenali Tugas & Peran]
         ⬇
[2. Muat 1 Skill Relevan (.agents/skills/<role>/SKILL.md)]
         ⬇
[3. Ambil Referensi Seperlunya (references/)]
         ⬇
[4. Query Knowledge Graph (data/knowledge-graph.json)]
         ⬇
[5. Eksekusi Deliverable & Perbarui Backlog]
```

Hasil benchmarking menunjukkan konsumsi context window dapat dihemat **hingga 85%** dibandingkan metode scanning repository konvensional.

---

## Pembagian 8 Peran AI Spesialis & Slash Commands

Panggil peran agen di terminal Antigravity CLI (`agy`) menggunakan **Slash Command** resmi:

| Slash Command | Peran AI Agent | Folder Skill | Tanggung Jawab Deliverable | Scope Dokumen |
| :--- | :--- | :--- | :--- | :--- |
| **`/pm`** | **Product Manager (PM)** | [`.agents/skills/product-manager/`](./.agents/skills/product-manager/) | PRD, User Stories, MoSCoW Prioritization, Risk Register | `docs/01-product/`, `docs/03-requirements/` |
| **`/ba`** | **Business Analyst (BA)** | [`.agents/skills/business-analyst/`](./.agents/skills/business-analyst/) | BPMN Process Flows, State Machine (FSM), Ubiquitous Glossary | `docs/02-discovery/`, `docs/03-requirements/workflows/` |
| **`/ui-ux`** | **UI/UX Designer** | [`.agents/skills/ui-ux/`](./.agents/skills/ui-ux/) | Design System, 5 UI States (Empty/Loading/Error/etc), Baseline UI | `docs/04-ux-design/` |
| **`/architect`** | **Solution Architect** | [`.agents/skills/solution-architect/`](./.agents/skills/solution-architect/) | C4 Diagrams, ADR Decisions, Relational Schema, REST Contracts | `docs/05-architecture/`, `docs/06-api/` |
| **`/dev`** | **Frontend & Backend Dev** | [`.agents/skills/frontend-developer/`](./.agents/skills/frontend-developer/) | RSC Components, Hexagonal Architecture, Zod Validation | `docs/03-requirements/`, `docs/05-architecture/`, `docs/06-api/` |
| **`/security`** | **Security Engineer** | [`.agents/skills/security-engineer/`](./.agents/skills/security-engineer/) | STRIDE Threat Model, RBAC Matrix, Webhook HMAC Verification | `docs/07-security-compliance/`, API & DB |
| **`/qa`** | **Quality Engineer (QE)** | [`.agents/skills/quality-engineer/`](./.agents/skills/quality-engineer/) | Playwright POM E2E, Gherkin Verification, Contract Tests | `docs/08-quality-assurance/`, specs fitur |

> **Panduan Detail Alur Kerja**: Baca SOP lengkap langkah demi langkah di [**`HOW_TO_USE.md`**](./HOW_TO_USE.md).

---

## Codebase Knowledge Graph

Peta ketergantungan relasional antara Feature, Dokumen PRD, Skema Database, Kontrak REST API, Komponen UI, dan Test Suite:

```bash
# Query seluruh lingkup dokumen & komponen yang dibutuhkan untuk suatu fitur
node scripts/graph-lookup.js --feature FEAT-002-school-payment

# Query upstream dependencies & downstream impacts dari suatu file
node scripts/graph-lookup.js --file docs/06-api/billing-endpoints.md
```

---

## Fitur Dashboard Lokal (Jira Light Web UI)

1. **Kanban Board**: Drag & drop task antar-kolom (*Backlog* ➔ *Spec Drafting* ➔ *In Review* ➔ *Ready for Dev* ➔ *In Progress* ➔ *In QA* ➔ *Done*).
2. **Backlog Table**: Tampilan tabel ringkas ala Jira List dengan filter prioritas, tipe issue, status, dan assignee.
3. **Documentation Hub**: File tree browser 11 modul (`00-governance` s.d. `10-operations`) dengan dukungan penuh **Mermaid diagrams** dan preview simbol.
4. **Knowledge Graph & Scope Navigator**: Visualisasi ketergantungan fitur dan tombol satu-klik *"Copy Context Scope"* untuk prompt AI.
5. **Agents Hub & Skill Catalog**: Integrasi 30+ skills standar industri ([UI-Skills](https://www.ui-skills.com/), [Skills.sh](https://www.skills.sh/), [AgentNative](https://www.agentnative.dev/skills), [Skill-Atlas](https://github.com/luongs3/skill-atlas)) dalam format bahasa Inggris unabridged dengan YAML frontmatter.

---

## Memulai Cepat

```bash
# 1. Masuk ke direktori
cd agentic-starter-kit

# 2. Jalankan Jira Light SpecOS Dashboard
pnpm board
# atau
npm run board
```

Buka peramban di [http://localhost:3000](http://localhost:3000).

---

## Struktur Repositori

```
agentic-starter-kit/
│
├── AGENTS.md                  # Instruksi global & 5 tahap progressive disclosure
├── README.md                  # Dokumentasi arsitektur sistem
├── package.json               # Script runner ("pnpm board")
│
├── .agents/                   # Konfigurasi native AI Engineering
│   ├── skills/                # 8 peran spesialis (SKILL.md + references/)
│   └── rules/                 # Contextual rules (docs, dev, product, security)
│
├── agents/                    # Persona definisi peran untuk AI prompt
│
├── data/
│   ├── backlog.json           # Single source of truth untuk kartu Kanban & status
│   └── knowledge-graph.json   # Directed dependency graph antar-komponen
│
├── docs/                      # Struktur folder dokumentasi standar (00 s.d. 10)
│   ├── 00-governance/         # Naming conventions, glossary, templates
│   ├── 01-product/            # Product vision, strategy, roadmap
│   ├── 02-discovery/          # Problem statement, assumptions
│   ├── 03-requirements/       # Epics & feature specs (FEAT-001 & FEAT-002)
│   ├── 04-ux-design/          # Design system, screen specifications
│   ├── 05-architecture/       # HLD, LLD, C4 diagrams, database schemas, ADRs
│   ├── 06-api/                # API conventions, REST/webhook endpoints
│   ├── 07-security-compliance/# STRIDE threat models, RBAC matrix
│   ├── 08-quality-assurance/  # Test strategy, Playwright E2E cases
│   ├── 09-delivery/           # Release plans, sprint plans
│   └── 10-operations/         # Monitoring, backup & recovery
│
├── scripts/
│   └── graph-lookup.js        # CLI utility untuk query scope Knowledge Graph
│
├── skills/                    # Katalog lengkap unabridged English skills (UI-Skills, QA, dll.)
│
└── viewer/                    # Next.js 16 Web Dashboard (Kanban, Docs, Graph, Agents)
```

---

## Lisensi
MIT License. Bebas digunakan dan dimodifikasi sebagai starter kit di setiap proyek software rekayasa Anda.

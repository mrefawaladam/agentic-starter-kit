Menurut saya, **Sakti-Agent harus dikembangkan lebih jauh dari sekadar AI Agent Starter Kit menjadi sebuah AI Software Engineering Operating System (AI-SEOS)**.

Target akhirnya bukan hanya membuat AI bisa menulis kode. Targetnya adalah membuat satu orang developer mampu menjalankan proses yang biasanya membutuhkan satu tim software house: Product Manager, Business Analyst, UI/UX Designer, Architect, Developer, QA, Security Engineer, dan DevOps.

Saya ingin mengimprovisasi konsep kamu dengan satu prinsip utama:

> **One Developer. One Engineering System. Multiple AI Specialists. One Source of Truth. Production-Grade Software.**

Artinya, kamu tetap menjadi satu-satunya pengambil keputusan utama, tetapi Sakti-Agent menjadi sistem yang mengatur seluruh pekerjaan engineering, menjaga konsistensi, mengawasi kualitas, dan memastikan setiap fitur bisa dipertanggungjawabkan.

Berikut rancangan pengembangan yang saya rekomendasikan.

# **1. Evolusi Sakti-Agent**

CURRENT CONCEPT

**Sakti-Agent — AI Spec-Driven Engineering Hub**

AI membantu developer mengelola spesifikasi, task, dokumentasi, implementasi, dan QA.

PROPOSED EVOLUTION

# **SAKTI-AGENT**

**Autonomous AI Software Engineering OS**

A complete solo-developer operating system for building, validating, maintaining, and evolving production-grade applications.

AI Orchestration

Workflow Engine

Spec Governance

Code Intelligence

Quality Assurance

Engineering Observability

Project Memory

Deployment Pipeline

Perubahan paling penting: jangan menjadikan AI sebagai sekumpulan prompt. Jadikan AI sebagai bagian dari sebuah sistem dengan workflow, state, permission, validasi, dan audit trail.

# **2. Arsitektur Baru: 12 Core Engineering Systems**

Saya merekomendasikan Sakti-Agent memiliki 12 subsistem utama.

## **SAKTI-AGENT SYSTEM ARCHITECTURE**

**01. Engineering Command Center**

Dashboard, Kanban, Docs, Task Control, Metrics, Approvals

**02. AI Orchestration Engine**

Task Router · Agent Coordinator · Context Compiler · Model Router

03

**Product Intelligence**

PRD, Stories, Backlog

04

**Specification Engine**

RFC, AC, Contracts

05

**Architecture Intelligence**

DDD, C4, ADR, ERD

06

**Code Intelligence**

Repo Map, Symbols, Dependencies

07

**Implementation Engine**

Planning, Coding, Refactoring

08

**Quality Engine**

Tests, Coverage, Evidence

09

**Security Engine**

Threats, SAST, Dependency Audit

10

**Release Engine**

Build, CI/CD, Deployment

**11. Knowledge & Memory**

Project Knowledge, Decisions, History

**12. Observability**

Logs, Cost, Metrics, Traces, Audit

Dua hal yang belum terlihat kuat pada rancangan awalmu adalah Code Intelligence dan Engineering Observability.

Padahal keduanya sangat penting.

AI tidak cukup hanya mengetahui dokumentasi aplikasi. AI juga harus mengetahui kondisi kode aktual, dependensi, perubahan terakhir, test yang gagal, biaya penggunaan model, dan alasan keputusan teknis sebelumnya.

# **3. Evolusi 9 Agent menjadi Dynamic Specialist System**

Saya tidak menyarankan menjalankan sembilan agent sekaligus.

Untuk solo developer, hal tersebut berpotensi menghasilkan:

- Token boros.
- Konteks saling bertabrakan.
- Duplikasi analisis.
- Konflik implementasi.
- Terlalu banyak proses koordinasi.

Solusinya adalah **Dynamic Specialist Orchestration**.

Satu Orchestrator bertugas memilih spesialis berdasarkan kebutuhan task.

## **Struktur agent yang diperkuat**

| Agent               | Tanggung jawab tambahan                                 |
| ------------------- | ------------------------------------------------------- |
| Orchestrator        | Routing, planning, delegation, context control          |
| Product Manager     | Product strategy, roadmap, prioritization               |
| Business Analyst    | Domain modeling, business rules, edge cases             |
| UI/UX Designer      | Design system, UX flow, accessibility                   |
| Solution Architect  | Architecture, ADR, technical constraints                |
| Fullstack Developer | Vertical slice implementation                           |
| Frontend Specialist | UI, rendering, client-side state                        |
| Backend Specialist  | API, domain, database, transactions                     |
| Quality Engineer    | Automated testing, regression, evidence                 |
| Security Engineer   | Threat modeling, vulnerability analysis                 |
| DevOps Engineer     | CI/CD, infrastructure, deployment                       |
| Code Reviewer       | Code quality, maintainability, architectural compliance |

Saya menambahkan tiga spesialis baru:

1. **Orchestrator:** pusat kendali seluruh agent.
2. **DevOps Engineer:** menangani build, release, deployment, dan environment.
3. **Code Reviewer:** memeriksa hasil implementasi secara independen.

Code Reviewer penting karena agent yang menulis kode sebaiknya tidak menjadi satu-satunya pihak yang memvalidasi hasil kerjanya.

### **Sistem pemanggilan agent**

Contoh:

```
User:
"Buat fitur multi-warehouse pada KasirSakti"

Orchestrator:
  1. Analyze request
  2. Classify task complexity
  3. Identify impacted domains

  Delegate:
    -> Product Manager
    -> Business Analyst
    -> Solution Architect

  Wait for approval.

  Delegate:
    -> UI/UX Designer
    -> Fullstack Developer
    -> Quality Engineer
    -> Security Engineer
    -> Code Reviewer

  Final:
    -> Generate implementation report
    -> Update Kanban
    -> Save QA evidence
    -> Update knowledge graph
```

Tidak semua spesialis wajib dipanggil. Task sederhana seperti memperbaiki typo tidak membutuhkan Product Manager, Architect, dan Security Engineer sekaligus.

# **4. Context Engineering: Sistem Penghematan Token yang Lebih Cerdas**

Ini salah satu bagian yang menurut saya harus menjadi keunggulan utama Sakti-Agent.

Konsep Progressive Disclosure kamu sudah benar, tetapi bisa ditingkatkan menjadi **Adaptive Context Engineering**.

Jangan hanya membatasi jumlah file yang dibaca. Sistem harus mampu memilih informasi berdasarkan relevansi terhadap task.

## **Lima tahap context loading yang ditingkatkan**

1. **Task Classification**

   Identifikasi jenis task, kompleksitas, domain, risiko, dan output yang dibutuhkan.
2. **Skill Activation**

   Muat hanya skill yang sesuai dengan task. Tidak semua skill harus masuk ke konteks.
3. **Context Compilation**

   Ambil spesifikasi, ADR, file terkait, business rules, dan coding conventions yang relevan.
4. **Dependency Intelligence**

   Telusuri knowledge graph, symbol references, API dependencies, dan database relationships.
5. **Execution Context**

   Buat context package final yang ringkas, terukur, dan siap digunakan agent.

### **Tambahkan Context Budget Manager**

Setiap task memiliki anggaran konteks tersendiri.

Contoh konfigurasi:

```
context_policy:
  max_context_ratio: 0.70

  priorities:
    - task_requirements
    - acceptance_criteria
    - relevant_source_code
    - architecture_constraints
    - business_rules
    - dependency_references
    - historical_decisions

  rules:
    - never_load_entire_repository
    - deduplicate_references
    - prefer_summaries_for_large_docs
    - preserve_critical_constraints
    - track_context_usage
```

Angka tersebut adalah batas kebijakan awal, bukan jaminan penghematan token tertentu. Implementasinya perlu disesuaikan dengan context window model yang dipakai.

### **Tambahkan Model Router**

Jangan semua pekerjaan menggunakan model AI paling mahal.

| Jenis pekerjaan          | Model routing            |
| ------------------------ | ------------------------ |
| Task classification      | Small / Fast             |
| Document extraction      | Small / Fast             |
| Code generation kompleks | Strong reasoning         |
| Architecture design      | Strong reasoning         |
| Code review              | Independent strong model |
| Summarization            | Small / Fast             |
| Security analysis        | Strong reasoning         |

Model router sebaiknya mendukung fallback, batas biaya, dan pencatatan penggunaan token per task.

# **5. Specification-First Development 2.0**

Menurut saya, ini harus menjadi jantung Sakti-Agent.

Spesifikasi tidak boleh hanya menjadi dokumentasi yang dibaca AI. Spesifikasi harus menjadi kontrak yang dapat diperiksa secara otomatis.

Saya merekomendasikan setiap fitur memiliki struktur:

```
feature/
├── feature.yaml
├── prd.md
├── requirements.md
├── use-cases.md
├── business-rules.md
├── acceptance-criteria.md
├── architecture.md
├── api-contract.yaml
├── database-schema.md
├── ui-spec.md
├── test-plan.md
├── security-review.md
└── implementation-report.md
```

### **Tambahkan Traceability Engine**

Setiap requirement harus dapat ditelusuri sampai implementasi dan bukti pengujiannya.

Contohnya:

**REQ-WH-001**

User dapat memindahkan stok antar gudang.

**AC-WH-001**

Stok sumber berkurang dan stok tujuan bertambah secara atomik.

**IMPLEMENTATION**

InventoryTransferService + Database Transaction

**TEST-WH-001**

Integration Test + Concurrency Test

**EVIDENCE-WH-001**

Test report, execution log, screenshot, commit reference.

Dengan demikian, Sakti-Agent bisa menjawab:

- Requirement mana yang sudah diimplementasikan?
- Requirement mana yang belum memiliki test?
- Perubahan kode mana yang memengaruhi fitur lain?
- Acceptance Criteria mana yang belum terbukti?
- Apakah dokumentasi masih sesuai dengan kode?

Ini jauh lebih kuat daripada Kanban biasa.

# **6. Readiness Gates 2.0: Jangan Biarkan AI Melompati Proses**

Lifecycle awal kamu sudah bagus. Saya akan menambahkan tahapan yang lebih terstruktur.

\#chatgpt-mermaid-\_r_5dt\_{font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";font-size:16px;fill:rgb(13, 13, 13);}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#chatgpt-mermaid-\_r_5dt\_ .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#chatgpt-mermaid-\_r_5dt\_ .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#chatgpt-mermaid-\_r_5dt\_ .error-icon{fill:rgb(243, 243, 243);}#chatgpt-mermaid-\_r_5dt\_ .error-text{fill:rgb(13, 13, 13);stroke:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_5dt\_ .edge-thickness-normal{stroke-width:1px;}#chatgpt-mermaid-\_r_5dt\_ .edge-thickness-thick{stroke-width:3.5px;}#chatgpt-mermaid-\_r_5dt\_ .edge-pattern-solid{stroke-dasharray:0;}#chatgpt-mermaid-\_r_5dt\_ .edge-thickness-invisible{stroke-width:0;fill:none;}#chatgpt-mermaid-\_r_5dt\_ .edge-pattern-dashed{stroke-dasharray:3;}#chatgpt-mermaid-\_r_5dt\_ .edge-pattern-dotted{stroke-dasharray:2;}#chatgpt-mermaid-\_r_5dt\_ .marker{fill:rgb(143, 143, 143);stroke:rgb(143, 143, 143);}#chatgpt-mermaid-\_r_5dt\_ .marker.cross{stroke:rgb(143, 143, 143);}#chatgpt-mermaid-\_r_5dt\_ svg{font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";font-size:16px;}#chatgpt-mermaid-\_r_5dt\_ p{margin:0;}#chatgpt-mermaid-\_r_5dt\_ .label{font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";color:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_5dt\_ .cluster-label text{fill:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_5dt\_ .cluster-label span{color:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_5dt\_ .cluster-label span p{background-color:transparent;}#chatgpt-mermaid-\_r_5dt\_ .label text,#chatgpt-mermaid-\_r_5dt\_ span{fill:rgb(13, 13, 13);color:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_5dt\_ .node rect,#chatgpt-mermaid-\_r_5dt\_ .node circle,#chatgpt-mermaid-\_r_5dt\_ .node ellipse,#chatgpt-mermaid-\_r_5dt\_ .node polygon,#chatgpt-mermaid-\_r_5dt\_ .node path{fill:rgb(222, 234, 251);stroke:rgb(83, 154, 248);stroke-width:1px;}#chatgpt-mermaid-\_r_5dt\_ .rough-node .label text,#chatgpt-mermaid-\_r_5dt\_ .node .label text,#chatgpt-mermaid-\_r_5dt\_ .image-shape .label,#chatgpt-mermaid-\_r_5dt\_ .icon-shape .label{text-anchor:middle;}#chatgpt-mermaid-\_r_5dt\_ .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#chatgpt-mermaid-\_r_5dt\_ .rough-node .label,#chatgpt-mermaid-\_r_5dt\_ .node .label,#chatgpt-mermaid-\_r_5dt\_ .image-shape .label,#chatgpt-mermaid-\_r_5dt\_ .icon-shape .label{text-align:center;}#chatgpt-mermaid-\_r_5dt\_ .node.clickable{cursor:pointer;}#chatgpt-mermaid-\_r_5dt\_ .root .anchor path{fill:rgb(143, 143, 143)!important;stroke-width:0;stroke:rgb(143, 143, 143);}#chatgpt-mermaid-\_r_5dt\_ .arrowheadPath{fill:rgb(143, 143, 143);}#chatgpt-mermaid-\_r_5dt\_ .edgePath .path{stroke:rgb(143, 143, 143);stroke-width:1px;}#chatgpt-mermaid-\_r_5dt\_ .flowchart-link{stroke:rgb(143, 143, 143);fill:none;}#chatgpt-mermaid-\_r_5dt\_ .edgeLabel{background-color:rgb(252, 252, 252);text-align:center;}#chatgpt-mermaid-\_r_5dt\_ .edgeLabel p{background-color:rgb(252, 252, 252);}#chatgpt-mermaid-\_r_5dt\_ .edgeLabel rect{opacity:0.5;background-color:rgb(252, 252, 252);fill:rgb(252, 252, 252);}#chatgpt-mermaid-\_r_5dt\_ .labelBkg{background-color:rgba(252, 252, 252, 0.5);}#chatgpt-mermaid-\_r_5dt\_ .cluster rect{fill:rgb(243, 243, 243);stroke:rgba(0, 0, 0, 0.1);stroke-width:1px;}#chatgpt-mermaid-\_r_5dt\_ .cluster text{fill:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_5dt\_ .cluster span{color:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_5dt\_ div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";font-size:12px;background:rgb(243, 243, 243);border:1px solid rgba(0, 0, 0, 0.1);border-radius:2px;pointer-events:none;z-index:100;}#chatgpt-mermaid-\_r_5dt\_ .flowchartTitleText{text-anchor:middle;font-size:18px;fill:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_5dt\_ rect.text{fill:none;stroke-width:0;}#chatgpt-mermaid-\_r_5dt\_ .icon-shape,#chatgpt-mermaid-\_r_5dt\_ .image-shape{background-color:rgb(252, 252, 252);text-align:center;}#chatgpt-mermaid-\_r_5dt\_ .icon-shape p,#chatgpt-mermaid-\_r_5dt\_ .image-shape p{background-color:rgb(252, 252, 252);padding:2px;}#chatgpt-mermaid-\_r_5dt\_ .icon-shape .label rect,#chatgpt-mermaid-\_r_5dt\_ .image-shape .label rect{opacity:0.5;background-color:rgb(252, 252, 252);fill:rgb(252, 252, 252);}#chatgpt-mermaid-\_r_5dt\_ .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#chatgpt-mermaid-\_r_5dt\_ .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#chatgpt-mermaid-\_r_5dt\_ .node .neo-node{stroke:rgb(83, 154, 248);}#chatgpt-mermaid-\_r_5dt\_ [data-look="neo"].node rect,#chatgpt-mermaid-\_r_5dt\_ [data-look="neo"].cluster rect,#chatgpt-mermaid-\_r_5dt\_ [data-look="neo"].node polygon{stroke:url(#chatgpt-mermaid-\_r_5dt\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_5dt\_ [data-look="neo"].swimlane.cluster rect{filter:none;}#chatgpt-mermaid-\_r_5dt\_ [data-look="neo"].node path{stroke:url(#chatgpt-mermaid-\_r_5dt\_-gradient);stroke-width:1px;}#chatgpt-mermaid-\_r_5dt\_ [data-look="neo"].node .outer-path{filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_5dt\_ [data-look="neo"].node .neo-line path{stroke:rgb(83, 154, 248);filter:none;}#chatgpt-mermaid-\_r_5dt\_ [data-look="neo"].node circle{stroke:url(#chatgpt-mermaid-\_r_5dt\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_5dt\_ [data-look="neo"].node circle .state-start{fill:#000000;}#chatgpt-mermaid-\_r_5dt\_ [data-look="neo"].icon-shape .icon{fill:url(#chatgpt-mermaid-\_r_5dt\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_5dt\_ [data-look="neo"].icon-shape .icon-neo path{stroke:url(#chatgpt-mermaid-\_r_5dt\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_5dt\_ .node text{font-size:14px;font-weight:600;letter-spacing:normal;fill:rgb(0, 79, 153);}#chatgpt-mermaid-\_r_5dt\_ .edgeLabels text{font-size:13px;font-weight:600;letter-spacing:-0.08px;fill:rgb(0, 79, 153);}#chatgpt-mermaid-\_r_5dt\_ .node tspan[font-weight="normal"],#chatgpt-mermaid-\_r_5dt\_ .edgeLabels tspan[font-weight="normal"]{font-weight:600;}#chatgpt-mermaid-\_r_5dt\_ .edgeLabel .label rect{opacity:1;rx:13px;ry:13px;fill:rgb(245, 250, 255);stroke:rgb(206, 219, 229);stroke-width:1px;}#chatgpt-mermaid-\_r_5dt\_ .node rect,#chatgpt-mermaid-\_r_5dt\_ .node circle,#chatgpt-mermaid-\_r_5dt\_ .node ellipse,#chatgpt-mermaid-\_r_5dt\_ .node polygon,#chatgpt-mermaid-\_r_5dt\_ .node path{fill:rgb(229, 243, 255);stroke:rgba(0, 0, 0, 0.1);stroke-width:1px;}#chatgpt-mermaid-\_r_5dt\_ .node rect{rx:16px;ry:16px;}#chatgpt-mermaid-\_r_5dt\_ .mermaid-decision .label-container{fill:rgb(245, 250, 255);stroke:rgb(206, 219, 229);stroke-dasharray:2,2;}#chatgpt-mermaid-\_r_5dt\_ .edgePaths .flowchart-link{stroke:rgb(143, 143, 143);stroke-width:1px;stroke-linecap:round;stroke-linejoin:round;}#chatgpt-mermaid-\_r_5dt\_ .marker{fill:rgb(143, 143, 143);stroke:rgb(143, 143, 143);}#chatgpt-mermaid-\_r_5dt\_ :root{--mermaid-font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";}REQUESTEDDISCOVERYSPECIFICATIONIN_REVIEWREADY_FOR_DEVIMPLEMENTATIONCODE_REVIEWIN_QASECURITY_CHECKREADY_FOR_RELEASEDEPLOYMENTPRODUCTION_VERIFICATIONDONERejectedApprovedChanges RequestedApprovedFailedPassedFailedPassedVerified

### **Gate enforcement**

Setiap transisi harus memiliki syarat yang dapat divalidasi.

| Gate                               | Persyaratan                    |
| ---------------------------------- | ------------------------------ |
| DISCOVERY → SPECIFICATION          | Scope dan tujuan jelas         |
| IN_REVIEW → READY_FOR_DEV          | Human approval                 |
| READY_FOR_DEV → IMPLEMENTATION     | AC dan dependency tersedia     |
| IMPLEMENTATION → CODE_REVIEW       | Build dan lint lolos           |
| CODE_REVIEW → IN_QA                | Review approved                |
| IN_QA → SECURITY_CHECK             | Required tests passed          |
| SECURITY_CHECK → READY_FOR_RELEASE | Tidak ada blocker keamanan     |
| DEPLOYMENT → DONE                  | Production verification passed |

**Prinsip penting:** status tidak boleh berubah hanya karena AI mengatakan sudah selesai. Status harus berubah berdasarkan validasi sistem.

# **7. Tambahkan Engineering Intelligence yang Belum Ada**

Inilah bagian yang bisa membuat Sakti-Agent benar-benar berbeda.

## **A. Repository Intelligence Engine**

HIGH PRIORITY

AI harus mengetahui struktur repository tanpa harus membaca seluruh file.

Kemampuan:

- Automatic repository mapping.
- Symbol indexing.
- Function/class lookup.
- Dependency graph.
- API endpoint discovery.
- Database relationship discovery.
- Change impact analysis.
- Dead code detection.
- Circular dependency detection.

Contoh:

```
pnpm sakti repo map
pnpm sakti repo search "InventoryService"
pnpm sakti repo impact "ProductController"
pnpm sakti repo dependencies "Warehouse"
```

Ketika sebuah service berubah, AI bisa mengetahui modul mana yang mungkin terdampak.

## **B. Change Impact Analysis**

Sebelum melakukan implementasi, AI harus memprediksi dampak perubahan.

Misalnya:

```
CHANGE REQUEST:
Modify Product pricing logic.

IMPACT ANALYSIS:

Direct Dependencies:
- ProductService
- PricingService

Indirect Dependencies:
- POS Checkout
- Sales Reporting
- Discount Engine

Database:
- products
- product_prices

Potential Risks:
- Historical transaction integrity
- Discount calculation regression
- Multi-warehouse pricing inconsistency

Required Tests:
- Unit
- Integration
- Regression
```

Ini sangat penting untuk aplikasi POS seperti KasirSakti karena satu perubahan pada pricing bisa memengaruhi checkout, transaksi, dan laporan.

## **C. Engineering Memory**

Jangan hanya mengandalkan knowledge graph.

Tambahkan tiga jenis memori:

| Memory           | Isi                                                       |
| ---------------- | --------------------------------------------------------- |
| Project Memory   | Domain, modul, struktur dan konfigurasi aplikasi          |
| Decision Memory  | ADR, keputusan teknis, alasan dan alternatif              |
| Execution Memory | Task history, error, solusi, test, dan hasil implementasi |

Memory harus bisa diperbarui secara terkontrol dan tidak boleh otomatis mengubah keputusan arsitektur yang sudah disetujui.

## **D. Autonomous Debugging Engine**

Sistem harus bisa melakukan siklus debugging:

```
DETECT ERROR
    ↓
COLLECT LOGS
    ↓
IDENTIFY ROOT CAUSE
    ↓
GENERATE FIX PLAN
    ↓
APPLY FIX
    ↓
RUN TESTS
    ↓
VERIFY REGRESSION
    ↓
GENERATE REPORT
```

Tambahkan batas percobaan, misalnya maksimal tiga siklus perbaikan otomatis sebelum meminta intervensi manusia.

## **E. Engineering Observability**

Dashboard bukan hanya untuk melihat task.

Tambahkan metrik:

- Task completion rate.
- Test pass rate.
- Defect rate.
- Code coverage.
- Token consumption per task.
- Cost per feature.
- Agent execution duration.
- Retry rate.
- Build success rate.
- Deployment success rate.
- Requirement traceability coverage.

Tujuannya adalah mengetahui apakah sistem benar-benar meningkatkan produktivitas, bukan hanya terlihat canggih.

# **8. Arsitektur Folder Sakti-Agent Versi 2.0**

Saya akan mempertahankan struktur awalmu, tetapi memisahkan governance, orchestration, intelligence, runtime, dan dashboard.

Berikut rancangan targetnya:

```

sakti-agent/
│
├── AGENTS.md
├── README.md
├── package.json
├── pnpm-workspace.yaml
│
├── .agents/
│   ├── skills/
│   ├── policies/
│   └── workflows/
│
├── agents/
│   ├── orchestrator/
│   ├── product-manager/
│   ├── business-analyst/
│   ├── ui-ux/
│   ├── solution-architect/
│   ├── fullstack-developer/
│   ├── frontend-developer/
│   ├── backend-developer/
│   ├── quality-engineer/
│   ├── security-engineer/
│   ├── devops-engineer/
│   └── code-reviewer/
│
├── skills/
│   ├── product/
│   ├── architecture/
│   ├── engineering/
│   ├── frontend/
│   ├── backend/
│   ├── database/
│   ├── testing/
│   ├── security/
│   ├── devops/
│   └── design-patterns/
│
├── engine/
│   ├── orchestration/
│   ├── task-router/
│   ├── context-engine/
│   ├── model-router/
│   ├── workflow-engine/
│   ├── policy-engine/
│   ├── approval-engine/
│   └── execution-runtime/
│
├── intelligence/
│   ├── repository-indexer/
│   ├── dependency-analyzer/
│   ├── impact-analyzer/
│   ├── knowledge-graph/
│   ├── project-memory/
│   └── traceability-engine/
│
├── docs/
│   ├── 00-governance/
│   ├── 01-product/
│   ├── 02-discovery/
│   ├── 03-requirements/
│   ├── 04-architecture/
│   ├── 05-design/
│   ├── 06-engineering/
│   ├── 07-testing/
│   ├── 08-quality-assurance/
│   ├── 09-security/
│   └── 10-operations/
│
├── projects/
│   └── kasirsakti/
│       ├── project.yaml
│       ├── specs/
│       ├── backlog/
│       ├── architecture/
│       └── releases/
│
├── runtime/
│   ├── database/
│   ├── queue/
│   ├── events/
│   ├── logs/
│   ├── artifacts/
│   └── checkpoints/
│
├── data/
│   ├── schemas/
│   ├── seed/
│   └── exports/
│
├── scripts/
│   ├── task.js
│   ├── graph-lookup.js
│   ├── repo-map.js
│   ├── impact-analysis.js
│   └── validate-spec.js
│
├── packages/
│   ├── contracts/
│   ├── shared/
│   ├── cli/
│   └── sdk/
│
├── viewer/
│   └── src/
│       ├── app/
│       ├── components/
│       ├── features/
│       └── lib/
│
└── tests/
    ├── unit/
    ├── integration/
    ├── e2e/
    └── acceptance/

```

### **Perubahan arsitektur yang perlu diperhatikan**

**1. Pisahkan engine dari viewer.**

Dashboard hanya menjadi control plane. Workflow dan eksekusi harus berjalan di engine sehingga tidak bergantung pada lifecycle Next.js.

**2. Jangan jadikan JSON sebagai database utama.**

Untuk versi yang lebih serius, gunakan SQLite sebagai local persistence awal dengan transaksi, constraints, dan migration. JSON tetap berguna untuk export, import, konfigurasi, dan interoperabilitas.

**3. Tambahkan contracts.**

Semua komunikasi antarkomponen harus memiliki schema yang tervalidasi. Gunakan TypeScript dan Zod untuk contract validation.

**4. Gunakan event-driven workflow.**

Perubahan status task, approval, hasil test, dan deployment harus menghasilkan event yang dapat dilacak.

# **9. Local Engineering Command Center**

Dashboard Next.js yang sudah kamu rancang harus berkembang menjadi pusat kendali engineering.

Saya membayangkan UI-nya seperti berikut.

## **SAKTI-AGENT**

LOCAL ENGINE

AI SOFTWARE ENGINEERING COMMAND CENTER

Active Tasks

# **12**

Illustrative data

QA Pass Rate

# **96%**

Illustrative data

Agent Runs

# **28**

Illustrative data

Blocked Tasks

# **2**

Illustrative data

**Engineering Modules**

**Project Overview**

Health, milestones, engineering metrics

**Task Orchestration**

Kanban, dependencies, execution status

**Specification Hub**

PRD, RFC, ADR, requirements

**Knowledge Graph**

Modules, dependencies, relationships

**Agent Control**

Active agents, execution, approvals

**QA Evidence Hub**

Test runs, screenshots, regression

**Repository Intelligence**

Source map, impact analysis

**Observability**

Logs, token cost, traces, errors

**Release Management**

Builds, releases, deployments

Konsep visual dashboard. Angka di atas hanya data ilustrasi, bukan hasil sistem aktual.

Saya juga merekomendasikan halaman tambahan:

- Agent Execution Timeline.
- Human Approval Inbox.
- Failed Task Recovery.
- Spec-Code Drift Detector.
- Cost & Token Analytics.
- Project Health Monitor.

# **10. Sistem Keamanan dan Autonomy Control**

Ini wajib jika kamu ingin Sakti-Agent semakin autonomous.

Jangan memberikan AI akses penuh ke repository, terminal, database, dan deployment tanpa batas.

Buat tiga tingkat autonomy.

| Level | Mode       | Izin                                                          |
| ----- | ---------- | ------------------------------------------------------------- |
| L1    | Assisted   | AI menganalisis dan mengusulkan                               |
| L2    | Supervised | AI mengimplementasikan dengan approval pada tindakan berisiko |
| L3    | Autonomous | AI menjalankan task yang sudah diizinkan oleh policy          |

Tindakan yang wajib dibatasi:

- Menghapus database.
- Menjalankan destructive migration.
- Mengubah authentication atau authorization.
- Mengubah konfigurasi production.
- Mengakses secret dan credentials.
- Melakukan deployment production.
- Mengubah business rules yang telah disetujui.

Tambahkan sandbox, command allowlist, file write boundaries, approval policy, rollback, dan audit log.

Autonomy bukan berarti AI bebas melakukan semuanya. Autonomy berarti AI bisa menyelesaikan pekerjaan dalam batas kewenangan yang telah ditentukan.

# **11. Strategi Implementasi: Jangan Bangun Semuanya Sekaligus**

Ini bagian paling penting untuk solo developer.

Saya tidak menyarankan langsung membangun 12 subsistem tersebut. Kita harus membangun fondasi yang memungkinkan fitur-fitur berikutnya berkembang tanpa merombak arsitektur.

Saya merekomendasikan roadmap berikut.

# **SAKTI-AGENT DEVELOPMENT ROADMAP**

Urutan implementasi berdasarkan dependensi dan nilai engineering.

**Phase 1 — Core Foundation**

P0

Fondasi yang wajib ada sebelum autonomous execution.

- Project configuration & governance
- Task lifecycle & state machine
- SQLite persistence & migrations
- CLI task management
- Specification schemas
- Approval engine
- Event and audit logging

**Phase 2 — Intelligence Layer**

P1

- Context compiler
- Skill discovery & routing
- Repository indexer
- Dependency graph
- Impact analysis
- Traceability engine

**Phase 3 — Agent Orchestration**

P1

- Orchestrator
- Dynamic specialist routing
- Model routing
- Agent execution runtime
- Checkpoint & recovery
- Token and cost management

**Phase 4 — Engineering Automation**

P2

- Code implementation workflow
- Independent code review
- Automated unit/integration tests
- Playwright E2E
- QA Evidence Hub
- Autonomous debugging

**Phase 5 — Engineering Command Center**

P2

- Advanced Kanban
- Agent Control Center
- Documentation viewer
- Knowledge graph viewer
- Observability dashboard
- Cost analytics

**Phase 6 — Autonomous Delivery**

P3

- Release orchestration
- Deployment pipeline
- Production verification
- Rollback automation
- Continuous regression monitoring
- Multi-project support

**Strategi saya:** prioritaskan Phase 1 sampai Phase 3 sebelum mengejar dashboard yang kompleks. Dashboard tidak akan berguna jika workflow engine dan data model-nya belum kuat.

# **12. Tambahan: Fitur yang Bisa Membuat Sakti-Agent Sangat Powerful**

Ada lima fitur lanjutan yang menurut saya berpotensi menjadi pembeda terbesar.

| Fitur                         | Fungsi                                                                        |
| ----------------------------- | ----------------------------------------------------------------------------- |
| Spec-Code Drift Detection     | Mendeteksi kode yang tidak lagi sesuai dengan spesifikasi                     |
| Autonomous Task Decomposition | Memecah permintaan besar menjadi task teknis yang terukur                     |
| Regression Impact Predictor   | Menentukan test yang wajib dijalankan akibat perubahan kode                   |
| Engineering Self-Healing      | Mendeteksi kegagalan dan mengusulkan atau menerapkan perbaikan                |
| Project Replication Engine    | Membuat project baru menggunakan blueprint engineering yang sudah tervalidasi |

Khusus Project Replication Engine, ini menarik sekali.

Bayangkan kamu ingin membangun:

- KasirSakti POS.
- School Management System.
- Inventory Management.
- Accounting Application.
- HR Management System.

Kamu tidak perlu membangun ulang sistem engineering untuk masing-masing aplikasi.

Cukup buat project baru dengan:

```
pnpm sakti project create kasirsakti
pnpm sakti project create schoolsakti
pnpm sakti project create inventory-app
```

Setiap project memiliki spesifikasi, domain knowledge, backlog, architecture, dan konfigurasi sendiri. Namun semuanya menggunakan satu engineering engine.

Ini menjadikan Sakti-Agent bukan hanya alat untuk membuat KasirSakti, tetapi sebuah platform untuk membangun banyak aplikasi.

# **13. Rekomendasi Final: Identitas Sakti-Agent**

Saya menyarankan kita menetapkan identitas dan prinsip berikut sebagai arah pengembangan permanen.

# **SAKTI-AGENT**

AI SOFTWARE ENGINEERING OPERATING SYSTEM

## **From Idea to Production-Ready Software.**

**Core Philosophy**

1. Specification before implementation.
2. One Source of Truth.
3. Context-efficient AI execution.
4. Dynamic multi-agent orchestration.
5. Deterministic workflow enforcement.
6. Human-controlled autonomy.
7. Test-driven quality assurance.
8. Full requirement traceability.
9. Continuous engineering intelligence.
10. Reusable multi-project architecture.

    **Ultimate Objective**

One developer should be able to operate a complete software engineering organization through a controlled, intelligent, and auditable AI system.

# **14. Saya ingin mengunci arah desain sebelum kita mulai membangun**

Ada satu keputusan arsitektur yang sangat menentukan: Sakti-Agent akan menjadi framework khusus untuk KasirSakti atau menjadi platform engineering reusable untuk semua aplikasi yang akan kamu buat?

Rekomendasi saya adalah opsi kedua: **Universal Core + Project-Specific Configuration**.

Artinya:

- Sakti-Agent Core dibangun satu kali.
- Setiap aplikasi mempunyai project workspace tersendiri.
- Setiap aplikasi dapat mempunyai agent, skill, dan business rules khusus.
- Semua project menggunakan workflow engine, governance, QA, dan intelligence yang sama.

# **SAKTI-AGENT — Architecture Decisions**

**1. Target platform**

Universal Engineering Platform — banyak aplikasi (rekomendasi)

Dedicated Engineering System — khusus KasirSakti

**2. Execution environment**

Local-first — seluruh engine berjalan di komputer sendiri (rekomendasi awal)

Hybrid — local engine + cloud AI services

Cloud-based — centralized execution

**3. AI autonomy level**

Assisted — AI hanya memberi rekomendasi

Supervised Autonomous — AI bekerja, human mengontrol approval (rekomendasi)

Highly Autonomous — AI menjalankan task yang diizinkan secara mandiri

**4. Development priority**

Core Engine First — fondasi dan kecerdasan sistem (rekomendasi)

Dashboard First — UI Command Center lebih dahulu

Agent First — fokus membangun seluruh spesialis AI

Tetapkan arah Sakti-Agent 2.0&#x20;

Setelah arah ini ditetapkan, langkah berikutnya adalah menyusun **Master Technical Blueprint Sakti-Agent 2.0** yang menjadi dokumen induk implementasi. Saya ingin setiap komponen memiliki kontrak, tanggung jawab, dependency, interface, dan acceptance criteria yang jelas sehingga kita tidak sekadar membangun sistem yang terlihat canggih, tetapi benar-benar bisa dipakai untuk menghasilkan aplikasi production-grade secara konsisten.
Betul. Kalau targetnya **Sakti-Agent sebagai Solo Dev Engineering OS**, kita perlu mendesain bukan hanya arsitekturnya, tetapi **bagaimana manusia benar-benar menggunakannya dari hari ke hari**.

Saya akan gambarkan Sakti-Agent seperti produk nyata: dari `init`, masuk ke project lama, membuat fitur, bug fixing, refactoring, sampai release.

---

# 1. Mental Model: Sakti-Agent Bukan "Chatbot Coding"

Cara paling tepat membayangkannya:

```text
                    ┌─────────────────────┐
                    │    SOLO DEVELOPER   │
                    │       / YOU         │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   SAKTI COMMANDER   │
                    │   Orchestrator      │
                    └──────────┬──────────┘
                               │
          ┌────────────────────┼────────────────────┐
          ▼                    ▼                    ▼
     KNOWLEDGE             WORKFLOW             AGENTS
      ENGINE                ENGINE              ENGINE
          │                    │                    │
          ▼                    ▼                    ▼
    Repository            Gates / State       PM / BA / Dev
    Knowledge             Approval            QA / Security
    Graph                 Checkpoints         Architect / etc
          │                    │                    │
          └────────────────────┼────────────────────┘
                               ▼
                    ┌─────────────────────┐
                    │   YOUR APPLICATION  │
                    │     SOURCE CODE     │
                    └─────────────────────┘
```

Jadi kamu tidak selalu berbicara langsung dengan `/backend`, `/qa`, `/architect`, dll.

Biasanya kamu berbicara dengan:

```bash
sakti
```

atau:

```bash
sakti task ...
```

atau:

```bash
sakti run ...
```

Kemudian **Orchestrator menentukan siapa yang perlu bekerja**.

---

# 2. CASE #1 — Init Sakti-Agent ke Project Baru

Misalnya kamu baru mau membuat aplikasi:

> "Aplikasi POS untuk toko retail."

Kamu membuat repository kosong.

```bash
mkdir kasirsakti
cd kasirsakti
```

Kemudian:

```bash
sakti init
```

Sakti-Agent menjalankan discovery.

```text
Sakti-Agent Initialization

Project detected:
    Empty repository

Language:
    Not detected

Framework:
    Not detected

Database:
    Not detected

Project type:
    Unknown

Would you like to initialize as:
    1. New Application
    2. Existing Application
    3. Library
    4. Monorepo
```

Kamu pilih:

```text
1. New Application
```

Kemudian Sakti-Agent membuat:

```text
.sakti/
├── config.yaml
├── project.yaml
├── state.db
├── knowledge/
├── graph/
├── cache/
└── runtime/

agents/
skills/
docs/
```

Kemudian:

```bash
sakti discover
```

Hasil:

```text
Project Discovery

Application:
    KasirSakti

Type:
    Retail POS

Detected:
    Next.js
    TypeScript
    PostgreSQL

Modules:
    auth
    products
    sales
    inventory
    customers

Architecture:
    Vertical Slice / Modular

Database:
    37 tables

API:
    82 endpoints

Tests:
    126 tests

Risk areas:
    inventory
    payment
    transaction
```

Lalu Sakti-Agent membangun:

```text
Repository Graph
       │
       ├── Products
       ├── Inventory
       ├── Sales
       ├── Customers
       └── Payments
```

**Tidak ada coding AI pada tahap ini.**

Ini penting.

Sakti-Agent pertama-tama harus **memahami project**.

---

# 3. CASE #2 — Init ke Project yang SUDAH ADA

Ini justru salah satu use case paling penting.

Misalnya kamu punya project lama:

```text
my-pos/
├── src/
├── prisma/
├── package.json
├── app/
└── ...
```

Kamu masuk:

```bash
cd my-pos
```

Kemudian:

```bash
sakti init
```

Sakti mendeteksi:

```text
Existing project detected.

Framework:
    Next.js 15

Language:
    TypeScript

Database:
    PostgreSQL / Prisma

Estimated LOC:
    184,000

Modules:
    23

Tests:
    1,284

Documentation:
    Partial

Architecture documentation:
    Missing

Business rules:
    Missing

Knowledge graph:
    Not initialized
```

Kemudian Sakti menawarkan:

```text
Initialization mode:

[1] Safe Import
[2] Full Reverse Engineering
[3] Minimal Mode
```

Saya merekomendasikan **Safe Import** sebagai default.

---

# 4. Apa yang Terjadi Saat Existing Project Di-Import?

Sakti-Agent **tidak langsung mengubah kode**.

Dia melakukan:

```text
PHASE 1
Repository Scan

PHASE 2
Framework Detection

PHASE 3
Architecture Detection

PHASE 4
Dependency Analysis

PHASE 5
Database Discovery

PHASE 6
API Discovery

PHASE 7
Test Discovery

PHASE 8
Documentation Discovery

PHASE 9
Knowledge Graph Construction

PHASE 10
Engineering Baseline
```

Kemudian menghasilkan:

```text
docs/00-governance/
docs/02-discovery/
docs/04-architecture/
docs/06-engineering/
docs/07-testing/
```

Misalnya:

```text
docs/02-discovery/repository-map.md
docs/02-discovery/module-map.md
docs/02-discovery/domain-map.md

docs/04-architecture/current-architecture.md
docs/04-architecture/dependency-map.md

docs/07-testing/current-test-coverage.md
```

Tetapi ada hal yang sangat penting:

> **Sakti-Agent harus membedakan "observed fact" dan "AI inference".**

Contohnya:

```yaml
architecture:
  style: modular-monolith
  confidence: 0.91
  source: repository-analysis
```

Sedangkan:

```yaml
domain:
  name: Inventory
  confidence: 0.67
  source: inferred
```

Jangan sampai AI menganggap tebakannya sebagai fakta.

---

# 5. CASE #3 — "Saya Mau Buat Fitur Baru"

Ini use case utama.

Kamu mengatakan:

> Saya ingin menambahkan fitur transfer stok antar gudang.

Kamu bisa:

```bash
sakti feature create "Transfer stok antar gudang"
```

Atau dari UI.

---

# 6. Sakti Tidak Langsung Coding

Orchestrator menerima request.

```text
REQUEST
Transfer stok antar gudang
```

Kemudian:

```text
TASK CLASSIFICATION

Type:
    New Feature

Domain:
    Inventory

Complexity:
    Medium / High

Risk:
    High

Affected areas:
    Inventory
    Warehouse
    Stock Ledger

Required agents:
    PM
    BA
    Architect
    Developer
    QA
    Security
```

---

# 7. PM Agent Bekerja

PM menghasilkan:

```text
Feature:
Inventory Transfer

Objective:
Allow users to transfer inventory between warehouses.

Business Value:
Improve multi-warehouse inventory management.

Priority:
High
```

Disimpan:

```text
docs/01-product/features/inventory-transfer/prd.md
```

---

# 8. BA Agent

BA kemudian menganalisis business process.

Misalnya:

```text
Warehouse A
    │
    │ Transfer Request
    ▼
TRANSFER_PENDING
    │
    │ Approve
    ▼
TRANSFER_APPROVED
    │
    │ Execute
    ▼
TRANSFER_COMPLETED
```

Edge cases:

```text
- Source warehouse == destination warehouse
- Insufficient stock
- Product inactive
- Concurrent transfer
- Transfer cancellation
- Partial transfer
- Duplicate request
```

Kemudian:

```text
business-rules.md
use-cases.md
state-machine.md
```

---

# 9. Architect Agent

Architect melihat repository graph.

Misalnya dia menemukan:

```text
InventoryService
      │
      ├── StockLedger
      ├── ProductStock
      └── Warehouse

SalesService
      │
      └── StockLedger
```

Architect kemudian menyimpulkan:

```text
Transfer must NOT directly mutate product_stock.

All stock mutations must go through StockLedger.
```

Ini sangat penting.

AI tidak boleh hanya membuat kode berdasarkan prompt.

Dia harus memahami **arsitektur yang sudah ada**.

Architect menghasilkan ADR:

```text
ADR-042

Decision:
Inventory transfers use transactional stock ledger entries.

Reason:
Preserve inventory auditability and prevent stock mutation bypass.
```

---

# 10. Human Approval

Sakti sekarang berhenti.

UI menunjukkan:

```text
┌───────────────────────────────────────┐
│ FEATURE READY FOR REVIEW              │
├───────────────────────────────────────┤
│ Inventory Transfer                    │
│                                       │
│ Requirements       ✓                  │
│ Business Rules     ✓                  │
│ Architecture       ✓                  │
│ API Contract       ✓                  │
│ Database Design    ✓                  │
│ Security           ⚠                  │
│                                       │
│ Risk: HIGH                            │
│                                       │
│ [ APPROVE ]     [ REQUEST CHANGES ]   │
└───────────────────────────────────────┘
```

Kamu klik:

```text
APPROVE
```

Baru sekarang:

```text
READY_FOR_DEV
```

---

# 11. Developer Agent Mulai Bekerja

Developer tidak diberi seluruh repository.

Context compiler membuat:

```text
TASK CONTEXT

Task:
    Inventory Transfer

Relevant modules:
    inventory
    warehouse
    stock-ledger

Relevant files:
    inventory/service.ts
    inventory/stock-ledger.ts
    warehouse/repository.ts

Contracts:
    transfer.schema.ts
    transfer.openapi.yaml

Business rules:
    BR-INV-021
    BR-INV-022
    BR-INV-023

Acceptance criteria:
    AC-INV-001 ... AC-INV-009
```

Ini yang membuat sistemmu jauh lebih hemat token.

---

# 12. Developer Implementasi Vertical Slice

Misalnya struktur:

```text
inventory-transfer/
├── domain/
│   ├── transfer.ts
│   └── transfer-rules.ts
│
├── application/
│   ├── create-transfer.ts
│   └── execute-transfer.ts
│
├── infrastructure/
│   └── transfer-repository.ts
│
├── api/
│   └── transfer-route.ts
│
└── ui/
    └── TransferForm.tsx
```

Sakti mencatat:

```text
Files changed:
    12

Files created:
    7

Tests created:
    14

Migration:
    1

API endpoints:
    3
```

---

# 13. Code Reviewer Agent

Jangan langsung QA.

Code Reviewer membaca diff.

Dia mencari:

```text
Architecture violation:
    NONE

Business rule violation:
    NONE

Potential race condition:
    FOUND

Issue:
    Stock availability check occurs outside transaction.
```

Status:

```text
CODE_REVIEW_FAILED
```

Developer menerima feedback:

```text
Fix CR-001:
Move stock validation inside transaction.
```

Developer memperbaiki.

Code Reviewer:

```text
CODE_REVIEW_PASSED
```

---

# 14. QA Agent

QA mengambil Acceptance Criteria.

Contoh:

```text
AC-001 ✓
User can select source warehouse

AC-002 ✓
User can select destination warehouse

AC-003 ✓
Source and destination cannot be identical

AC-004 ✓
Transfer cannot exceed available stock

AC-005 ✓
Stock mutation is atomic

AC-006 ✓
Transfer generates audit record
```

Kemudian menjalankan:

```text
Unit Tests
Integration Tests
API Tests
E2E Tests
Concurrency Tests
Regression Tests
```

---

# 15. Evidence Hub

Misalnya Playwright menghasilkan:

```text
docs/08-quality-assurance/evidence/
└── TASK-INV-042/
    ├── test-report.html
    ├── transfer-success.png
    ├── insufficient-stock.png
    ├── audit-log.png
    └── execution.log
```

Sakti UI:

```text
TASK-INV-042

QA
──────────────────────

Acceptance Criteria

✓ AC-001
✓ AC-002
✓ AC-003
✓ AC-004
✓ AC-005
✓ AC-006

Evidence

[ Screenshot ]
[ Test Report ]
[ Execution Log ]
```

Ini membuat AI tidak sekadar mengatakan:

> "Test passed."

Tapi:

> **"Ini bukti bahwa test tersebut benar-benar dijalankan."**

---

# 16. CASE #4 — Bug Report

Kamu menemukan:

> Setelah transfer stok, laporan inventory kadang salah.

Kamu:

```bash
sakti bug create "Inventory report shows incorrect stock after transfer"
```

Orchestrator:

```text
BUG CLASSIFICATION

Domain:
    Inventory

Severity:
    High

Potential areas:
    Stock Ledger
    Inventory Projection
    Reporting

Required:
    Root Cause Analysis
    Regression Test
```

Kemudian Debug Agent:

```text
Observed:

Transfer transaction:
    102 units

Ledger:
    correct

Inventory projection:
    incorrect

Root cause:
    Projection worker ignores transfer_out event.
```

Sakti menghasilkan:

```text
ROOT CAUSE
↓
event handler missing
↓
IMPLEMENT FIX
↓
ADD REGRESSION TEST
↓
RUN TEST
↓
VERIFY
```

---

# 17. CASE #5 — Refactoring Besar

Misalnya:

> "Saya mau migrasikan authentication lama ke OAuth."

Ini tidak boleh dianggap sebagai task biasa.

Sakti melakukan:

```text
ARCHITECTURAL CHANGE DETECTED

Impact:
    HIGH

Affected:
    Authentication
    User Management
    Session
    RBAC
    API Gateway
    Frontend
    Mobile API

Estimated task tree:
    17 tasks

Required approvals:
    Architecture
    Security
    Product
```

Kemudian dibuat:

```text
EPIC AUTH-MIGRATION

├── AUTH-001 Discovery
├── AUTH-002 Architecture
├── AUTH-003 Provider Integration
├── AUTH-004 User Migration
├── AUTH-005 Session Migration
├── AUTH-006 RBAC Integration
├── AUTH-007 Frontend
├── AUTH-008 API
├── AUTH-009 Security Testing
├── AUTH-010 Migration Testing
└── ...
```

Satu perintah menghasilkan **program kerja**, bukan sekadar satu code generation.

---

# 18. CASE #6 — "Kenapa Kode Ini Dibuat Seperti Ini?"

Ini fitur yang sering dilupakan.

Kamu bertanya:

> Kenapa kita menggunakan StockLedger daripada langsung update product_stock?

Sakti:

```text
Decision found:

ADR-042

Decision:
All inventory mutations must go through StockLedger.

Reason:
1. Auditability
2. Transaction consistency
3. Historical reconstruction
4. Reporting integrity

Alternatives rejected:
- Direct stock mutation
- Event-only inventory
```

AI tidak perlu mengarang jawaban.

Dia mencari **decision memory**.

---

# 19. CASE #7 — "Apa yang Akan Rusak Kalau Saya Ubah File Ini?"

Kamu:

```bash
sakti impact src/inventory/stock-ledger.ts
```

Output:

```text
IMPACT ANALYSIS

Direct:
    InventoryService
    TransferService
    PurchaseService
    SalesService

Indirect:
    Reporting
    Dashboard
    Inventory Analytics

Tests:
    38 unit tests
    14 integration tests
    6 E2E tests

Risk:
    HIGH

Recommended:
    Run inventory regression suite.
```

Ini salah satu fitur yang menurut saya harus menjadi **killer feature** Sakti-Agent.

---

# 20. CASE #8 — "Buat Fitur dari Ide Kasar"

Misalnya kamu tidak punya spesifikasi sama sekali.

Kamu hanya bilang:

> Saya ingin kasir bisa memberikan diskon berdasarkan jumlah barang yang dibeli.

Sakti tidak langsung coding.

Dia mengubah ide menjadi:

```text
IDE
 ↓
DISCOVERY
 ↓
BUSINESS QUESTIONS
 ↓
REQUIREMENTS
 ↓
BUSINESS RULES
 ↓
ARCHITECTURE
 ↓
IMPLEMENTATION
 ↓
TEST
```

Sakti mungkin bertanya:

```text
I need clarification:

1. Discount applies per product or cart?
2. Can multiple discount rules stack?
3. Who can configure rules?
4. Is discount percentage or fixed amount?
5. What happens when two rules match?
6. Does discount affect tax calculation?
```

Ini membuat AI berperilaku seperti **BA sungguhan**, bukan autocomplete.

---

# 21. CASE #9 — "Bikin UI dari Requirement"

Misalnya:

> Buat halaman transfer stok.

UI Agent membaca:

```text
requirements.md
business-rules.md
design-system.md
accessibility.md
```

Kemudian menghasilkan UI dengan state:

```text
DEFAULT
LOADING
EMPTY
VALIDATION_ERROR
SERVER_ERROR
SUCCESS
DISABLED
CONFIRMATION
```

Bukan hanya:

```text
happy path
```

Ini penting untuk production-grade UI.

---

# 22. CASE #10 — Security Review

Misalnya kamu membuat endpoint:

```http
POST /api/inventory/transfers
```

Security Agent melakukan:

```text
THREAT MODEL

Asset:
    Inventory data

Threats:
    IDOR
    Privilege escalation
    Replay
    Race condition
    Mass assignment

Controls:
    RBAC ✓
    Ownership validation ✓
    Idempotency ✓
    Transaction isolation ✓
```

Kemudian:

```text
SECURITY PASS
```

atau:

```text
SECURITY BLOCKER

Issue:
User with warehouse role can transfer stock
from another unauthorized warehouse.

Severity:
HIGH
```

Task tidak boleh masuk release.

---

# 23. CASE #11 — Release

Misalnya 15 task sudah selesai.

Kamu:

```bash
sakti release prepare v2.4.0
```

Sakti mengumpulkan:

```text
Release v2.4.0

Features:
    Inventory Transfer
    Bulk Product Import
    Discount Rules

Bug fixes:
    INV-042
    POS-113

QA:
    100% required AC verified

Security:
    PASS

Regression:
    PASS

Architecture:
    PASS

Outstanding:
    2 low-priority warnings
```

Kemudian:

```text
[ REVIEW RELEASE ]

[ APPROVE ]
```

Baru deployment berjalan.

---

# 24. CASE #12 — Production Incident

Misalnya setelah deployment:

```text
ERROR RATE ↑
```

Sakti menerima event dari monitoring.

```text
PRODUCTION INCIDENT

Incident:
    INC-2026-042

Detected:
    13:42

Affected:
    Checkout

Error:
    Stock reservation timeout
```

Sakti otomatis mengumpulkan:

```text
Recent deployment
Changed files
Affected services
Recent logs
Database metrics
Related commits
Previous incidents
Relevant ADRs
```

Kemudian:

```text
ROOT CAUSE CANDIDATE

Checkout transaction timeout increased
after Inventory reservation change.

Confidence:
    82%
```

Lalu meminta approval:

```text
Recommended action:

Rollback v2.4.0

Risk:
    Medium

[ APPROVE ROLLBACK ]
```

Ini jauh lebih aman daripada AI diberi hak rollback otomatis tanpa policy.

---

# 25. CASE #13 — Project Lama yang Dokumentasinya Berantakan

Ini kasus nyata yang akan sangat sering terjadi.

Misalnya repository:

```text
README:
    outdated

Architecture:
    none

Tests:
    partial

Comments:
    inconsistent

Business rules:
    only inside code

Naming:
    inconsistent
```

Kamu menjalankan:

```bash
sakti recover
```

Sakti membuat:

```text
ENGINEERING RECOVERY

Repository understanding:
    78%

Architecture understanding:
    64%

Business domain understanding:
    51%

Test confidence:
    72%

Documentation confidence:
    31%
```

Kemudian menghasilkan:

```text
docs/02-discovery/
docs/04-architecture/
docs/07-testing/
```

Tetapi **tidak berpura-pura bahwa dokumentasi tersebut 100% benar**.

Setiap hasil diberi confidence dan source.

Ini sangat penting untuk reverse engineering.

---

# 26. CASE #14 — "Buatkan Saya Aplikasi dari Nol"

Ini level tertinggi.

Kamu:

```bash
sakti create-project
```

Kemudian:

```text
What are you building?
```

Kamu:

> Sistem manajemen sekolah dengan siswa, guru, kelas, pembayaran, absensi, dan raport.

Sakti membuat:

```text
PROJECT
School Management System

EPICS

01 Identity
02 Student
03 Teacher
04 Class
05 Attendance
06 Payment
07 Report Card
08 Notification
09 Reporting
```

Kemudian dependency graph:

```text
Identity
   │
   ├── Student
   │      │
   │      └── Class
   │
   ├── Teacher
   │      │
   │      └── Class
   │
   └── Payment

Class
 ├── Attendance
 └── Report Card
```

Sakti kemudian menyarankan execution order.

Bukan langsung:

> "Saya akan membuat semuanya."

Tetapi:

```text
PHASE 1
Identity

PHASE 2
Student + Teacher

PHASE 3
Class

PHASE 4
Attendance

PHASE 5
Payment

PHASE 6
Report Card
```

Dengan setiap phase memiliki readiness gate.

---

# 27. CASE #15 — Multiple Projects

Ini menurut saya akan menjadi bentuk final Sakti-Agent.

Misalnya satu developer memiliki:

```text
~/projects/
├── kasirsakti/
├── schoolsakti/
├── inventory/
├── accounting/
└── ecommerce/
```

Kamu punya satu Sakti-Agent Core.

```bash
sakti projects
```

```text
PROJECTS

● kasirsakti
  128 tasks
  4 active
  health: 94%

● schoolsakti
  72 tasks
  2 active
  health: 89%

● inventory
  31 tasks
  1 active
  health: 97%

● accounting
  45 tasks
  3 active
  health: 92%
```

Kemudian:

```bash
sakti use kasirsakti
```

Context berubah ke project tersebut.

---

# 28. CASE #16 — Membuat Feature dari GitHub Issue

Ini juga bagus.

Misalnya issue:

```text
#184
Add multi warehouse stock transfer
```

Sakti membaca issue.

```bash
sakti issue import 184
```

Kemudian:

```text
GitHub Issue
      ↓
Requirement extraction
      ↓
Business analysis
      ↓
Task decomposition
      ↓
Implementation
      ↓
QA
```

Dengan approval di titik yang sesuai.

---

# 29. CASE #17 — Dari Figma/Design ke Feature

Workflow:

```text
Design
  ↓
UI Agent
  ↓
Component analysis
  ↓
Design token mapping
  ↓
Accessibility analysis
  ↓
Implementation
  ↓
Visual regression
```

QA bisa melakukan:

```text
Expected UI
vs
Actual UI
```

dan menyimpan screenshot evidence.

---

# 30. CASE #18 — "Jangan Coding, Saya Hanya Mau Analisis"

Ini juga harus didukung.

```bash
sakti analyze "Apakah kita sebaiknya menggunakan event-driven architecture untuk inventory?"
```

Sakti masuk:

```text
ANALYSIS ONLY
```

Tidak ada file yang dimodifikasi.

Output:

```text
Problem
Alternatives
Trade-offs
Risks
Recommendation
ADR Proposal
```

Kemudian kamu bisa:

```bash
sakti decision approve ADR-051
```

---

# 31. CASE #19 — "Saya Mau Refactor tapi Jangan Ubah Behavior"

Ini sangat penting.

```bash
sakti task create \
  "Refactor inventory service without changing behavior"
```

Sakti menetapkan invariant:

```text
BEHAVIOR INVARIANTS

- API response unchanged
- Database behavior unchanged
- Stock calculation unchanged
- Error semantics unchanged
- Authorization unchanged
```

Kemudian regression suite wajib dijalankan.

Ini membuat AI lebih aman untuk refactoring.

---

# 32. CASE #20 — "Saya Mau AI Bekerja Sendiri Selama Saya Tidur"

Ini baru masuk **Autonomous Mode**.

Contoh:

```bash
sakti run TASK-POS-201 --autonomous
```

Tetapi policy menentukan:

```yaml
autonomy:
  allowed:
    - read_files
    - create_files
    - modify_source
    - run_tests
    - run_linter

  requires_approval:
    - database_migration
    - dependency_upgrade
    - security_policy_change

  forbidden:
    - production_deployment
    - delete_database
    - read_secrets
```

Sakti bisa bekerja:

```text
21:00
Task started

21:03
Context compiled

21:08
Implementation completed

21:12
Tests failed

21:15
Fix attempt #1

21:18
Tests passed

21:21
Code review passed

21:25
QA passed

21:27
Waiting for human approval
```

Pagi hari kamu melihat:

```text
TASK COMPLETE

Implementation:
    PASS

Tests:
    PASS

Code Review:
    PASS

Security:
    PASS

Deployment:
    WAITING APPROVAL
```

**Inilah bentuk solo-dev system yang sebenarnya powerful.**

---

# 33. UX Utama yang Saya Sarankan

Jangan membuat developer harus hafal 50 command.

Sediakan tiga interface.

### Interface 1 — CLI

Untuk power user.

```bash
sakti feature "inventory transfer"

sakti bug "checkout timeout"

sakti analyze "event driven inventory"

sakti impact "StockLedger"

sakti review

sakti qa

sakti release
```

### Interface 2 — Dashboard

Untuk visual control.

```text
COMMAND CENTER

Tasks
Agents
Specs
Architecture
Knowledge
QA
Security
Releases
Observability
```

### Interface 3 — Natural Language

Untuk pekerjaan sehari-hari.

```text
You:
"Tambahkan fitur diskon bertingkat berdasarkan quantity."

Sakti:
"Baik. Saya menemukan Pricing Engine yang sudah ada.
Saya akan mulai dengan discovery dan business analysis.
Saya tidak akan mengubah kode sampai requirement disetujui."
```

Ini adalah pengalaman yang menurut saya paling ideal.

---

# 34. Dan Ada Satu Konsep yang Saya Sangat Rekomendasikan

Tambahkan:

# `Sakti Mission`

Jangan semua pekerjaan diperlakukan sebagai task kecil.

Task cocok untuk:

```text
Fix button
Add endpoint
Add validation
```

Tetapi pekerjaan besar harus menjadi **Mission**.

Contoh:

```bash
sakti mission "Build Multi Warehouse System"
```

Mission memiliki:

```text
MISSION
│
├── Objectives
├── Constraints
├── Architecture
├── Epics
├── Tasks
├── Agents
├── Decisions
├── Risks
├── QA
├── Security
├── Release
└── Outcome
```

Jadi:

```text
MISSION
   ↓
EPIC
   ↓
FEATURE
   ↓
TASK
   ↓
SUBTASK
   ↓
AGENT EXECUTION
```

Ini membuat Sakti-Agent mampu menangani **proyek besar**, bukan sekadar prompt-to-code.

---

# 35. Gambaran Besar Akhirnya

Kalau seluruh konsep ini digabung, workflow Sakti-Agent menjadi:

```text
                    HUMAN
                      │
                      ▼
                  MISSION
                      │
                      ▼
                ORCHESTRATOR
                      │
              ┌───────┴────────┐
              ▼                ▼
         DISCOVERY         PLANNING
              │                │
              └───────┬────────┘
                      ▼
                 SPECIFICATION
                      │
                      ▼
                HUMAN APPROVAL
                      │
                      ▼
                 TASK GRAPH
                      │
             ┌────────┼────────┐
             ▼        ▼        ▼
            DEV      QA      SECURITY
             │        │        │
             └────────┼────────┘
                      ▼
                 CODE REVIEW
                      │
                      ▼
                 TEST / E2E
                      │
                      ▼
                 EVIDENCE
                      │
                      ▼
              RELEASE CANDIDATE
                      │
                HUMAN APPROVAL
                      │
                      ▼
                  DEPLOYMENT
                      │
                      ▼
              PRODUCTION VERIFY
                      │
                      ▼
                    DONE
                      │
                      ▼
              UPDATE MEMORY
                      │
                      ▼
             KNOWLEDGE GRAPH
```

Dan yang paling penting:

**Sakti-Agent bukan sekadar "AI yang bisa coding".**

Ia menjadi **lapisan engineering intelligence di atas repository**:

```text
                 ┌───────────────────────┐
                 │       YOU             │
                 │ Product + Decision    │
                 └───────────┬───────────┘
                             │
                             ▼
                 ┌───────────────────────┐
                 │     SAKTI-AGENT       │
                 │                       │
                 │ Understand            │
                 │ Plan                  │
                 │ Specify               │
                 │ Implement             │
                 │ Review                │
                 │ Test                  │
                 │ Secure                │
                 │ Release               │
                 │ Learn                 │
                 └───────────┬───────────┘
                             │
                             ▼
                 ┌───────────────────────┐
                 │   APPLICATION         │
                 │                       │
                 │ Source Code           │
                 │ Database              │
                 │ Infrastructure        │
                 │ Tests                 │
                 └───────────────────────┘
```

**Dan saya akan membuat satu aturan keras:** AI boleh mempercepat *execution*, tetapi **tidak boleh menjadi sumber kebenaran**. Sumber kebenaran tetap berada pada specification, repository, tests, decisions, evidence, dan explicit human approvals.

Dengan model ini, ketika kamu pindah dari **KasirSakti → SchoolSakti → Inventory → Accounting**, kamu tidak membuat sistem AI baru. Kamu hanya membuat **project workspace baru di atas engineering operating system yang sama**.
Ya. Dari screenshot dan contoh penggunaanmu, saya justru akan **mengubah prioritas desain Sakti-Agent**.

Untuk sekarang jangan terlalu fokus ke Dashboard, Mission UI, autonomous orchestration, dsb.

**Core product Sakti-Agent v1 harus menjadi CLI-first AI Engineering Environment**, dengan pengalaman seperti Antigravity CLI / Claude Code / Gemini CLI, tetapi mempunyai **agent specialization + spec-driven workflow + persistent engineering memory**.

Dan saya tangkap satu hal penting dari workflow kamu:

> **Kamu memang sengaja selalu menyebut agent secara eksplisit.**

Contohnya:

```text
/business-analyst audit sistem notifikasi...
```

Menurut saya **jangan dihilangkan**. Justru jadikan itu salah satu primitive utama Sakti-Agent.

---

# 1. CLI Sakti-Agent yang Saya Bayangkan

Pengalaman dasarnya:

```text
$ sakti
```

lalu:

```text
> /business-analyst audit sistem notifikasi
```

Sakti menjawab:

```text
● Agent: business-analyst
● Mode: audit
● Project: super-schools
● Scope: notification system

Analyzing...

✓ NotificationDrawer.tsx
✓ Student routing
✓ Notification types
✓ Existing route structure
✓ Related business rules

Found 7 issues.
```

Kemudian agent menghasilkan analisis.

Jadi mental modelnya:

```text
YOU
 │
 ├── /business-analyst
 ├── /solution-architect
 ├── /frontend-developer
 ├── /backend-developer
 ├── /qa
 ├── /security
 └── /devops
        │
        ▼
    SAKTI ENGINE
        │
        ├── Context Engine
        ├── Repository Intelligence
        ├── Knowledge Graph
        ├── Task Engine
        ├── Spec Engine
        └── Evidence Engine
```

**Agent adalah interface manusia. Engine adalah otaknya.**

---

# 2. Jangan Buat `/dev` Terlalu General

Di screenshot sekarang kamu punya:

```text
backend-developer
business-analyst
developer
frontend-developer
fullstack
fullstack-developer
pm
product-manager
qa
quality-engineer
security
security-engineer
solution-architect
ui-ux
```

Saya justru akan merapikan ini.

Jangan sampai user bingung:

```text
/dev
/developer
/fullstack
/fullstack-developer
```

Gunakan **canonical agent ID**.

Contoh:

```text
/business-analyst
/product-manager
/ui-ux
/solution-architect
/frontend-developer
/backend-developer
/fullstack-developer
/quality-engineer
/security-engineer
/devops-engineer
/code-reviewer
```

Alias boleh:

```text
/ba       → /business-analyst
/pm       → /product-manager
/ui       → /ui-ux
/architect → /solution-architect
/frontend → /frontend-developer
/backend  → /backend-developer
/fullstack → /fullstack-developer
/qa       → /quality-engineer
/security → /security-engineer
/devops   → /devops-engineer
/review   → /code-reviewer
```

Jadi kamu tetap bisa cepat.

---

# 3. `/agent` Bukan Sekadar Prompt

Ini penting.

Ketika kamu menulis:

```text
/business-analyst audit sistem notifikasi
```

Sakti tidak boleh sekadar mengirim string:

```text
"Anda adalah business analyst..."
```

ke LLM.

Harus terjadi:

```text
/business-analyst
       │
       ▼
Resolve Agent
       │
       ▼
Load AGENT.md
       │
       ▼
Load allowed skills
       │
       ▼
Classify operation
       │
       ▼
Build context
       │
       ▼
Execute
       │
       ▼
Validate boundary
       │
       ▼
Persist result
```

Dengan kata lain:

**Agent invocation adalah sebuah execution protocol.**

---

# 4. Contoh Persis dari Kasusmu

Kamu menjalankan:

```text
/business-analyst audit sistem notifikasi banyak masalah dari ui dan belum ada redirect nya kalo di klik
```

Kamu attach screenshot.

Sakti menampilkan:

```text
┌─────────────────────────────────────────────────────────┐
│ BUSINESS ANALYST                                        │
│ Operation: AUDIT                                        │
├─────────────────────────────────────────────────────────┤
│ Project: super-schools                                  │
│ Scope: Notification System                               │
│ Attachment: 1 image                                     │
│                                                         │
│ Mode: READ-ONLY                                         │
│ Code modification: DISABLED                             │
└─────────────────────────────────────────────────────────┘
```

Kemudian:

```text
● Discovering notification entry points
● Reading NotificationDrawer.tsx
● Mapping notification types
● Inspecting student routes
● Checking redirect targets
● Comparing UI behavior with route definitions
```

Ini **persis** dengan workflow yang kamu tunjukkan sekarang.

Tetapi Sakti-Agent versi baru harus menambahkan intelligence di belakangnya.

---

# 5. Agent Harus Punya "Operation"

Saya sangat menyarankan command ini:

```text
/agent operation target
```

Contoh:

```text
/business-analyst audit notification system
```

```text
/solution-architect design inventory transfer
```

```text
/frontend-developer implement notification redirect
```

```text
/quality-engineer test notification redirect
```

```text
/security-engineer review notification authorization
```

Jadi agent bukan hanya role.

Dia punya **role + operation**.

---

# 6. Operation yang Standard

Untuk semua agent, kita bisa punya vocabulary:

```text
audit
analyze
discover
design
plan
implement
review
test
debug
refactor
document
verify
explain
```

Contohnya:

### BA

```text
/business-analyst audit notification
/business-analyst analyze billing workflow
/business-analyst discover attendance rules
```

### Architect

```text
/solution-architect design notification routing
/solution-architect review inventory architecture
/solution-architect analyze payment architecture
```

### Frontend

```text
/frontend-developer implement notification redirect
/frontend-developer fix notification drawer
/frontend-developer refactor student navigation
```

### QA

```text
/quality-engineer test notification redirect
/quality-engineer regression inventory
/quality-engineer verify TASK-INV-021
```

### Security

```text
/security-engineer audit notification authorization
/security-engineer review student deep links
```

---

# 7. Yang Menarik: Agent Bisa Handoff

Misalnya kamu melakukan:

```text
/business-analyst audit notification
```

BA selesai.

Output:

```text
AUDIT COMPLETE

Critical:
    2

High:
    3

Medium:
    2

Artifacts:
    docs/03-requirements/audits/notification-audit.md

Recommended next agent:

    /solution-architect

Suggested operation:

    /solution-architect design notification routing
```

Kemudian kamu:

```text
/solution-architect design notification routing
```

Sakti sudah tahu:

```text
Previous Agent:
    business-analyst

Previous Artifact:
    notification-audit.md

Relevant findings:
    BA-001
    BA-002
    BA-003
```

Jadi **context tidak dimulai dari nol**.

---

# 8. Ini yang Membuat Sakti Berbeda dari Claude CLI Biasa

Claude Code / Antigravity-style CLI sangat kuat dalam:

```text
prompt
→ inspect repository
→ edit code
```

Sakti harus menambahkan:

```text
prompt
→ agent
→ operation
→ specification
→ context
→ artifact
→ task
→ handoff
→ evidence
```

Contohnya:

```text
/business-analyst audit notification
             │
             ▼
      AUDIT DOCUMENT
             │
             ▼
/solution-architect design notification routing
             │
             ▼
       ARCHITECTURE
             │
             ▼
/frontend-developer implement notification routing
             │
             ▼
          CODE
             │
             ▼
/code-reviewer review TASK-NOTIF-001
             │
             ▼
/quality-engineer test TASK-NOTIF-001
             │
             ▼
          EVIDENCE
```

**Ini adalah workflow yang saya rasa paling cocok dengan cara kamu bekerja sekarang.**

---

# 9. Jangan Paksa Agent Lain Ikut Kalau Tidak Diperlukan

Misalnya kamu cuma ingin:

> "Cari kenapa redirect notification tidak jalan."

Tidak perlu:

```text
PM
BA
Architect
UI
Developer
QA
Security
```

Cukup:

```text
/business-analyst audit notification routing
```

BA bisa membaca kode.

Kalau ternyata masalahnya membutuhkan perubahan arsitektur, BA memberikan:

```text
Recommended Handoff:
    /solution-architect
```

Kalau cuma bug sederhana:

```text
Recommended Handoff:
    /frontend-developer
```

Jadi **user tetap menentukan agent**, sementara Sakti memberikan rekomendasi agent berikutnya.

---

# 10. Tetapi Agent Harus Punya Boundary

Ini wajib.

Misalnya:

```text
/business-analyst
```

tidak boleh diam-diam mengedit:

```text
src/
```

BA punya permission:

```yaml
permissions:
  filesystem:
    read:
      - src/**
      - app/**
      - docs/**
      - tests/**

    write:
      - docs/01-product/**
      - docs/02-discovery/**
      - docs/03-requirements/**

  code:
    modify: false

  commands:
    allowed:
      - grep
      - rg
      - find
      - git
```

Sedangkan:

```text
/frontend-developer
```

boleh:

```yaml
code:
  modify: true

write:
  - src/**
  - app/**
  - components/**
  - tests/**
```

Dan:

```text
/security-engineer
```

misalnya default:

```yaml
code:
  modify: false
```

Dia hanya audit.

Ini membuat `/agent` benar-benar memiliki makna.

---

# 11. Saya Akan Menambahkan `/handoff`

Contohnya setelah BA selesai:

```text
/handoff /solution-architect
```

atau:

```text
/handoff /frontend-developer
```

Sakti membawa:

```text
Current Task
Current Findings
Relevant Files
Business Rules
Acceptance Criteria
Agent Output
Open Questions
Risk
```

Jadi kamu tidak perlu menjelaskan ulang.

---

# 12. Bahkan Bisa Langsung

Misalnya:

```text
/business-analyst audit notification
```

Selesai.

Lalu:

```text
/handoff /frontend-developer
```

Sakti bertanya:

```text
Business Analyst identified:

7 findings
3 redirect issues
2 UI issues
2 accessibility issues

Should I create implementation task from these findings?

[yes/no]
```

Kamu:

```text
yes
```

Sakti membuat:

```text
TASK-NOTIF-001
TASK-NOTIF-002
TASK-NOTIF-003
```

Kemudian:

```text
/handoff /frontend-developer
```

Developer melihat task tersebut.

---

# 13. `/task` Menjadi Bridge antara Agent dan Engineering

Saya akan membuat:

```text
/task
```

sebagai primitive utama.

Contoh:

```text
/business-analyst audit notification
```

menghasilkan:

```text
AUDIT-001
```

Kemudian:

```text
/task create from AUDIT-001
```

menghasilkan:

```text
TASK-NOTIF-001
```

Task:

```yaml
id: TASK-NOTIF-001

title: Fix student notification routing

source:
  agent: business-analyst
  artifact: AUDIT-001

status: ready_for_dev

requirements:
  - REQ-NOTIF-001

acceptance_criteria:
  - AC-NOTIF-001
  - AC-NOTIF-002

affected_modules:
  - notification
  - student-navigation

recommended_agent:
  - frontend-developer

risk:
  medium
```

Sekarang task menjadi **contract antara agent**.

---

# 14. `/context` Juga Penting

Karena kamu selalu bekerja dari CLI, kamu harus bisa melihat apa yang Sakti masukkan ke AI.

Contoh:

```text
/context
```

Output:

```text
CURRENT CONTEXT

Project:
    super-schools

Agent:
    business-analyst

Task:
    TASK-NOTIF-001

Files:
    NotificationDrawer.tsx
    notification-types.ts
    student routes

Documents:
    notification-audit.md

Graph:
    notification → student navigation

Context:
    18.2k tokens

Budget:
    32k tokens
```

Kemudian:

```text
/context files
```

atau:

```text
/context graph
```

atau:

```text
/context clear
```

Ini sangat berguna untuk debugging AI.

---

# 15. `/inspect`

Kamu juga perlu command:

```text
/inspect
```

Contoh:

```text
/inspect NotificationDrawer
```

Output:

```text
SYMBOL

NotificationDrawer
────────────────────────

File:
    src/components/NotificationDrawer.tsx

Type:
    React Component

Used by:
    StudentLayout
    DashboardLayout

Dependencies:
    useNotifications
    notificationTypes
    router

Related routes:
    /student/*
    /manage/*

Risk:
    HIGH

Consumers:
    4
```

Ini jauh lebih berguna daripada hanya `grep`.

---

# 16. `/impact`

Misalnya:

```text
/impact NotificationDrawer
```

Sakti:

```text
IMPACT ANALYSIS

Direct:
    StudentLayout
    DashboardLayout

Indirect:
    NotificationProvider
    StudentDashboard

Routes:
    /student
    /student/notifications

Tests:
    8

Potential risk:
    HIGH
```

---

# 17. `/why`

Ini menurut saya command kecil tetapi powerful.

```text
/why NotificationDrawer.tsx
```

Sakti mencari history:

```text
WHY THIS CODE EXISTS

Introduced:
    TASK-NOTIF-014

Reason:
    Notification center migration

ADR:
    ADR-021

Business requirement:
    REQ-NOTIF-003

Last modified:
    TASK-NOTIF-041
```

Jadi AI tidak hanya membaca kode.

Dia membaca **sejarah engineering**.

---

# 18. `/explain`

Misalnya:

```text
/explain NotificationDrawer
```

Output:

```text
NotificationDrawer is responsible for:

1. Fetching notifications
2. Rendering notification items
3. Marking notifications as read
4. Navigating users to notification targets

Current issue:

Navigation target is hardcoded based on
notification type and does not account for user role.
```

Ini mode aman.

Tidak modify apa pun.

---

# 19. `/run`

Untuk menjalankan agent dengan task.

```text
/run TASK-NOTIF-001
```

Sakti:

```text
Task:
    TASK-NOTIF-001

Recommended Agent:
    frontend-developer

Required skill:
    nextjs-routing

Status:
    READY_FOR_DEV

Proceed?
```

Atau kamu eksplisit:

```text
/frontend-developer /run TASK-NOTIF-001
```

Saya justru suka syntax kedua untuk Sakti karena agent tetap terlihat jelas.

---

# 20. `/review`

```text
/code-reviewer review TASK-NOTIF-001
```

Sakti tidak perlu diberitahu ulang:

```text
"review this code..."
```

Dia tahu:

```text
Task
↓
Spec
↓
Diff
↓
Acceptance Criteria
↓
Architecture
↓
Business Rules
```

---

# 21. `/qa`

Bisa langsung:

```text
/quality-engineer verify TASK-NOTIF-001
```

Kemudian:

```text
Loading:

✓ Requirements
✓ Acceptance Criteria
✓ Implementation diff
✓ Test plan

Running:

✓ Unit
✓ Integration
✓ E2E
✓ Visual regression

Evidence:

docs/08-quality-assurance/evidence/TASK-NOTIF-001/
```

---

# 22. `/status`

Sangat penting untuk solo developer.

```text
/status
```

Output:

```text
PROJECT STATUS
──────────────────────────────

Active Agent:
    frontend-developer

Current Task:
    TASK-NOTIF-001

State:
    IN_DEV

Progress:
    ███████░░░ 72%

Blocked:
    No

Next:
    Code Review

Open Tasks:
    14

In QA:
    3

Blocked:
    1
```

---

# 23. `/agents`

```text
/agents
```

Output:

```text
AVAILABLE AGENTS

● business-analyst
  audit analyze discover

● solution-architect
  design review analyze

● frontend-developer
  implement debug refactor

● backend-developer
  implement debug refactor

● quality-engineer
  test verify regression

● security-engineer
  audit review threat-model

● code-reviewer
  review

● devops-engineer
  deploy release observe
```

Dan:

```text
/agents inspect business-analyst
```

akan menampilkan:

```text
AGENT
business-analyst

Role:
    Business Analysis

Capabilities:
    audit
    analyze
    discover
    document

Can modify code:
    NO

Can create requirements:
    YES

Can create tasks:
    YES

Skills:
    BPMN
    State Machine
    Domain Analysis
    Edge Cases
```

---

# 24. Slash Command Harus Jadi "First-Class Citizen"

Saya menyarankan parser CLI Sakti seperti ini:

```text
/<agent> <operation> <target/request>
```

Contoh:

```text
/business-analyst audit notification system
```

```text
/solution-architect design notification routing
```

```text
/frontend-developer implement TASK-NOTIF-001
```

```text
/code-reviewer review TASK-NOTIF-001
```

```text
/quality-engineer verify TASK-NOTIF-001
```

Ini menjadi **bahasa kerja Sakti-Agent**.

---

# 25. Sedangkan Command System Tetap Ada

Bedakan:

### Agent commands

```text
/business-analyst
/frontend-developer
/quality-engineer
```

dengan:

### System commands

```text
/help
/status
/agents
/tasks
/context
/inspect
/impact
/handoff
/clear
/config
/project
```

Jadi shell Sakti memiliki dua lapisan:

```text
                 SAKTI CLI
                    │
          ┌─────────┴─────────┐
          │                   │
       AGENTS              SYSTEM
          │                   │
    /business-analyst      /status
    /architect             /context
    /frontend              /impact
    /qa                    /handoff
    /security              /tasks
```

---

# 26. Dan Saya Akan Mempertahankan `@`

Kamu juga sudah terbiasa dengan pola:

```text
@business-analyst
```

Saya akan membedakan:

```text
/business-analyst
```

= **aktifkan agent**

sedangkan:

```text
@docs/03-requirements/notification.md
```

= **referensi/context**

Contoh:

```text
/business-analyst audit @src/components/NotificationDrawer.tsx
```

atau:

```text
/solution-architect review @docs/04-architecture/notification.md
```

atau:

```text
/frontend-developer implement @TASK-NOTIF-001
```

---

# 27. Attachment Juga Jadi Context

Seperti screenshot kamu.

```text
/business-analyst audit notification
```

attach:

```text
notification.png
```

Sakti otomatis:

```text
Attachments:

[image] notification.png

Context role:
    visual evidence

Do not treat image as source of truth.
Cross-check against repository.
```

Kemudian BA bisa mengatakan:

```text
Visual observation:
Notification items appear clickable.

Repository evidence:
No valid navigation handler exists for
academic_report and announcement types.

Conclusion:
UI affordance and routing implementation
are inconsistent.
```

Ini sangat bagus karena **image → observation**, sedangkan **repository → technical fact**.

---

# 28. Ini Bahkan Bisa Menjawab Kasusmu Lebih Powerful

Dengan sistem yang saya usulkan, command kamu:

```text
/business-analyst audit sistem notifikasi banyak masalah dari ui dan belum ada redirect nya kalo di klik
```

bisa menghasilkan struktur:

```text
AUDIT: NOTIFICATION SYSTEM

Agent:
    business-analyst

Mode:
    audit

Evidence:
    notification.png

────────────────────────────────

BUSINESS FINDINGS

BA-001
Notification click has no valid destination.

BA-002
Student notification resolves to admin route.

BA-003
Some notification types have empty target.

────────────────────────────────

UX FINDINGS

UX-001
Clickable affordance unclear.

UX-002
Unread/read distinction weak.

UX-003
Bottom notification items are clipped.

────────────────────────────────

ROUTING FINDINGS

ROUTE-001
bill_created → missing student route

ROUTE-002
academic_report → missing route

ROUTE-003
announcement → empty destination

────────────────────────────────

RECOMMENDED TASKS

TASK-NOTIF-001
Create role-aware notification route resolver.

TASK-NOTIF-002
Fix notification drawer interaction states.

TASK-NOTIF-003
Add notification visual hierarchy.

TASK-NOTIF-004
Add E2E notification navigation tests.
```

Dan kemudian:

```text
Suggested handoff:

/solution-architect
```

**Ini jauh lebih dekat dengan workflow engineering yang sebenarnya.**

---

# 29. Satu Perubahan Besar pada `AGENTS.md`

Dengan pendekatan CLI ini, `AGENTS.md` jangan hanya berisi:

```text
general rules
```

Tapi menjadi **constitution** Sakti-Agent.

Contohnya:

```yaml
sakti:
  version: "2.0"

project:
  name: super-schools

workflow:
  spec_first: true
  human_approval_required: true

agents:
  business-analyst:
    boundary:
      code_write: false

  frontend-developer:
    boundary:
      code_write: true

  quality-engineer:
    boundary:
      code_write: false

  security-engineer:
    boundary:
      code_write: false
```

Lalu masing-masing:

```text
agents/
└── business-analyst/
    ├── AGENT.md
    ├── skills/
    ├── workflows/
    └── templates/
```

---

# 30. Jadi Fokus Sakti-Agent Sekarang Saya Ubah Menjadi Ini

Bukan:

```text
Dashboard
↓
Kanban
↓
AI
```

Tetapi:

```text
                SAKTI CLI
                   │
                   ▼
            AGENT INVOCATION
                   │
          /business-analyst
                   │
                   ▼
             ORCHESTRATOR
                   │
       ┌───────────┼───────────┐
       ▼           ▼           ▼
    Context      Skills      Policy
     Engine      Engine       Engine
       │           │           │
       └───────────┼───────────┘
                   ▼
              AGENT RUNTIME
                   │
                   ▼
            REPOSITORY INTEL
                   │
                   ▼
               ARTIFACT
                   │
                   ▼
                 TASK
                   │
                   ▼
               HANDOFF
                   │
                   ▼
             NEXT AGENT
```

Dashboard **nanti menjadi visualisasi dari semua ini**, bukan pusat sistem.

---

# 31. Prioritas Implementasi Sakti-Agent Sekarang

Kalau kita benar-benar mau membangun ini, saya akan mengubah roadmap menjadi:

### P0 — CLI Runtime

```text
[ ] sakti CLI shell
[ ] slash command parser
[ ] agent resolver
[ ] @ reference resolver
[ ] attachment resolver
[ ] command history
[ ] streaming output
[ ] agent AGENT.md loader
```

### P0 — Agent Runtime

```text
[ ] agent boundary
[ ] agent permissions
[ ] agent skill loading
[ ] agent context
[ ] agent execution
[ ] agent output
[ ] agent artifact persistence
```

### P0 — Repository Intelligence

```text
[ ] file discovery
[ ] symbol search
[ ] dependency search
[ ] route discovery
[ ] framework detection
[ ] git integration
[ ] impact analysis
```

### P1 — Engineering Workflow

```text
[ ] task engine
[ ] spec engine
[ ] readiness gates
[ ] approval
[ ] handoff
[ ] traceability
[ ] evidence
```

### P1 — Agent Ecosystem

```text
[ ] business-analyst
[ ] solution-architect
[ ] frontend-developer
[ ] backend-developer
[ ] fullstack-developer
[ ] quality-engineer
[ ] security-engineer
[ ] code-reviewer
[ ] devops-engineer
```

### P2 — Dashboard

Baru setelah CLI sudah solid:

```text
[ ] Kanban
[ ] Agent activity
[ ] Knowledge graph
[ ] Evidence viewer
[ ] Task timeline
[ ] Token analytics
```

---

## Dan satu keputusan yang menurut saya harus kita kunci

**Sakti-Agent CLI jangan dibuat sebagai wrapper sederhana ke `agy`, Claude CLI, atau model API.**

Buat:

```text
                 sakti
                   │
          ┌────────┴────────┐
          │                 │
       AGENT OS          MODEL ADAPTER
          │                 │
          │        ┌────────┼────────┐
          │        ▼        ▼        ▼
          │      Claude    Gemini    GPT
          │
          ├── Context
          ├── Skills
          ├── Policies
          ├── Tasks
          ├── Specs
          ├── Memory
          ├── Graph
          ├── Evidence
          └── Handoff
```

Jadi model bisa diganti.

Hari ini:

```text
Claude
```

besok:

```text
Gemini
```

atau:

```text
GPT
```

tetapi **agent identity, task state, specification, knowledge graph, approval, dan engineering memory tetap milik Sakti-Agent**.

Itulah yang akan membuat Sakti-Agent punya nilai sendiri, bukan sekadar CLI lain yang memanggil LLM.

Dan berdasarkan workflow yang kamu tunjukkan, **`/business-analyst ...` seharusnya kita jadikan reference UX utama untuk mendesain seluruh CLI Sakti-Agent 2.0**: eksplisit memilih agent → agent memahami scope → progressive context → bekerja dalam boundary → menghasilkan artifact → menawarkan handoff ke agent berikutnya.
Betul. Kalau target Sakti-Agent adalah **solo-dev AI engineering system**, maka **token economy harus menjadi aturan inti**, bukan sekadar optimasi tambahan.

Saya akan membuat prinsipnya:

> **AI tidak boleh membaca sesuatu hanya karena bisa membacanya. AI hanya boleh membaca context yang dibutuhkan untuk menyelesaikan task saat ini.**

Dan saya akan memperketat Progressive Disclosure dari 5 tahap menjadi **Context Budget Protocol**.

---

# 1. Aturan emas Sakti-Agent

```text
RULE 001 — Never Read Everything

Agent DILARANG melakukan:
    "scan seluruh repository"

Agent WAJIB:
    identify task
    → identify relevant domain
    → identify relevant files
    → inspect only required context
```

Contoh buruk:

```text
/business-analyst audit notification
```

Lalu AI membaca:

```text
src/**
docs/**
tests/**
package.json
node_modules/**
.git/**
```

**Ini pemborosan token.**

Yang benar:

```text
notification
   ↓
NotificationDrawer
   ↓
notification types
   ↓
notification service
   ↓
student routes
```

---

# 2. Buat Context Budget

Setiap agent harus punya budget.

Misalnya:

```yaml
context_budget:
  default: 16000
  maximum: 32000

  stages:
    task: 1000
    skill: 2000
    repository: 5000
    dependencies: 4000
    implementation: 12000
    verification: 6000
```

Jadi agent tidak bebas memasukkan 100k token.

Kalau context sudah:

```text
15,200 / 16,000
```

Sakti harus berhenti dan melakukan:

```text
CONTEXT PRESSURE

Current:
    15.2k

Budget:
    16k

Need:
    +4k

Action:
    compress context
    remove low-value files
    continue with targeted inspection
```

---

# 3. Context Harus Punya Prioritas

Jangan semua informasi dianggap sama.

Saya sarankan ranking:

```text
P0 — Task
P1 — Acceptance Criteria
P2 — Directly affected code
P3 — Direct dependencies
P4 — Relevant business rules
P5 — Architecture decisions
P6 — Tests
P7 — Documentation
P8 — Unrelated repository context
```

Agent selalu mengambil:

```text
P0 → P1 → P2 → P3
```

baru naik ke:

```text
P4 → P5 → P6
```

kalau memang diperlukan.

---

# 4. Jangan Kirim File Utuh Kalau Tidak Perlu

Ini salah satu penghematan terbesar.

Misalnya file:

```text
NotificationDrawer.tsx
```

isinya 800 baris.

Agent cuma membutuhkan:

```text
lines 100-150
```

maka jangan:

```text
read NotificationDrawer.tsx
```

secara penuh.

Gunakan:

```text
read relevant region
```

atau:

```text
symbol-level inspection
```

Misalnya:

```text
NotificationDrawer
handleNotificationClick
notificationType
```

Jadi context:

```text
800 lines
```

bisa menjadi:

```text
80 lines
```

---

# 5. Symbol First, File Second

Ini aturan yang saya sangat rekomendasikan.

Urutannya:

```text
SEARCH
  ↓
SYMBOL
  ↓
REGION
  ↓
FILE
```

Bukan:

```text
FILE
 ↓
baca semuanya
 ↓
cari-cari
```

Contoh:

```text
/business-analyst audit notification
```

Sakti mencari:

```text
NotificationDrawer
notificationTypes
router.push
href
bill_created
academic_report
announcement
```

baru membaca bagian relevan.

---

# 6. Search Output Juga Harus Dibatasi

Jangan:

```bash
grep -rn "notification" .
```

karena bisa menghasilkan ribuan baris.

Sakti harus menerapkan:

```text
SEARCH LIMIT

max_files: 20
max_matches_per_file: 10
max_output_tokens: 2000
```

Kalau hasil terlalu banyak:

```text
1,482 matches found.

Showing highest relevance:
    20 files
    50 matches

Use:
    /inspect notification
```

---

# 7. Jangan Masukkan `node_modules`, `.git`, Build Output

Ini harus menjadi hard rule.

```yaml
ignore:
  - node_modules/**
  - .git/**
  - .next/**
  - dist/**
  - build/**
  - coverage/**
  - vendor/**
  - tmp/**
  - logs/**
```

Termasuk file besar:

```text
*.lock
*.min.js
*.map
*.generated.*
```

kecuali memang dibutuhkan.

---

# 8. Progressive Disclosure Sakti 2.0

Saya akan membuatnya menjadi **7 level**:

```text
LEVEL 0
Task Understanding
       ↓
LEVEL 1
Agent Skill
       ↓
LEVEL 2
Repository Map
       ↓
LEVEL 3
Relevant Symbols
       ↓
LEVEL 4
Relevant Code
       ↓
LEVEL 5
Dependencies / Specs / Tests
       ↓
LEVEL 6
Deep Investigation
```

**Tidak boleh langsung lompat Level 6.**

Contoh:

```text
/business-analyst audit notification
```

### Level 0

```text
Task:
Audit notification system.
```

### Level 1

Load:

```text
business-analysis skill
```

### Level 2

Cari:

```text
notification/
student/
routing/
```

### Level 3

Cari:

```text
NotificationDrawer
NotificationType
notification handler
```

### Level 4

Baca:

```text
relevant functions
```

### Level 5

Kalau perlu:

```text
routes
business rules
tests
```

### Level 6

Hanya jika masih ada ambiguity.

---

# 9. Context Reuse

Ini juga sangat penting.

Misalnya BA sudah menemukan:

```text
NotificationDrawer.tsx
notification-types.ts
student routes
```

Kemudian kamu:

```text
/solution-architect design notification routing
```

**Jangan scan ulang.**

Sakti menggunakan artifact BA:

```text
AUDIT-001
```

dan mengambil:

```text
findings
files
symbols
routes
business rules
```

Jadi:

```text
Agent A
   ↓
Context
   ↓
Artifact
   ↓
Agent B
```

bukan:

```text
Agent A
   ↓
scan repo

Agent B
   ↓
scan repo lagi

Agent C
   ↓
scan repo lagi
```

Ini bisa menghemat token sangat besar.

---

# 10. Buat "Context Artifact"

Setiap investigation menghasilkan:

```text
.context/
```

misalnya:

```text
.context/
├── notification.audit.json
├── notification.symbols.json
├── notification.routes.json
└── notification.context.md
```

Contoh:

```json
{
  "scope": "notification",
  "files": [
    "src/components/NotificationDrawer.tsx"
  ],
  "symbols": [
    "NotificationDrawer",
    "handleNotificationClick"
  ],
  "routes": [
    "/student/...",
    "/manage/..."
  ],
  "findings": [
    "role mismatch",
    "missing redirect"
  ]
}
```

Agent berikutnya membaca metadata ini dahulu.

---

# 11. Context Cache

Kalau file sudah dibaca:

```text
NotificationDrawer.tsx
```

jangan dibaca ulang dalam session yang sama.

Sakti:

```text
CACHE HIT

NotificationDrawer.tsx

Previously analyzed:
    2m ago

Relevant symbols:
    NotificationDrawer
    handleNotificationClick
```

Kalau git berubah:

```text
CACHE INVALIDATED

Reason:
    file modified after previous analysis
```

Ini jauh lebih baik.

---

# 12. Jangan Mengulang Informasi

Ini aturan sederhana tetapi penting.

AI tidak boleh melakukan:

```text
"Sebagai Business Analyst, saya akan melakukan..."
```

setiap kali.

Tidak perlu.

Context sudah tahu:

```text
agent = business-analyst
```

Output langsung:

```text
## Findings

...
```

Begitu juga jangan mengulang seluruh task:

```text
User asked to audit notification...
The notification system...
As requested...
Based on your request...
```

Itu token yang tidak menghasilkan engineering value.

---

# 13. Output Juga Harus Token-Efficient

Agent harus punya **output budget**.

Misalnya:

```yaml
output:
  default_max_tokens: 3000

  modes:
    audit: 3000
    implementation: 5000
    review: 3000
    explanation: 2000
    debug: 4000
```

Untuk audit:

```text
Finding
Evidence
Impact
Recommendation
```

bukan essay 10 halaman.

Contoh:

```text
BA-001 — Invalid Student Redirect

Evidence:
NotificationDrawer.tsx:106

Problem:
leave notification points to /manage/...

Impact:
Student receives 403.

Recommendation:
Use role-aware route resolver.

Confidence:
HIGH
```

Jauh lebih valuable.

---

# 14. Gunakan Summary Compression

Setiap agent selesai, buat:

```text
AGENT SUMMARY
```

bukan menyimpan seluruh reasoning.

Misalnya:

```yaml
summary:
  problem: notification routing mismatch

  findings:
    - student uses admin route
    - academic_report has no target
    - announcement has empty target

  affected_files:
    - NotificationDrawer.tsx

  affected_routes:
    - /student/...
    - /manage/...

  recommendation:
    role-aware notification route resolver

  confidence: high
```

Agent berikutnya cukup membaca ini.

---

# 15. Jangan Simpan Chain-of-Thought

Ini juga bagus untuk desain sistem.

Sakti tidak perlu menyimpan:

```text
internal reasoning
```

Simpan **engineering result**:

```text
decision
evidence
finding
assumption
risk
artifact
```

Jadi memory tetap kecil dan berguna.

---

# 16. "Ask Before Expanding Context"

Kalau agent sudah cukup informasi untuk mengerjakan task:

**STOP.**

Jangan terus eksplorasi.

Misalnya:

```text
Found root cause.

Confidence:
    94%

Additional exploration:
    not required
```

Agent kemudian bekerja.

Kalau confidence rendah:

```text
Confidence:
    61%

Missing information:
    notification API contract

Need to inspect:
    src/api/notification.ts
```

Baru membaca.

---

# 17. Confidence-Driven Exploration

Ini bisa menjadi fitur keren Sakti.

```text
confidence >= 90%
    → execute

70–89%
    → inspect targeted context

50–69%
    → investigate dependencies

<50%
    → ask user / expand scope
```

Contoh:

```text
ROOT CAUSE CONFIDENCE: 93%

No additional repository exploration required.
```

---

# 18. Scope Lock

Saat kamu:

```text
/business-analyst audit notification
```

Sakti membuat:

```yaml
scope:
  domain:
    - notification

  user_roles:
    - student

  operations:
    - routing
    - ui

  excluded:
    - payment
    - attendance
    - teacher dashboard
```

Kalau agent menemukan:

```text
payment service
```

dia tidak otomatis membaca semuanya.

Dia bilang:

```text
Out-of-scope dependency detected:

PaymentService

Reason:
Notification references payment state.

Action:
Not inspected.

Use:
/context expand payment
```

Ini **sangat penting untuk token efficiency**.

---

# 19. User Bisa Force Expand

Kalau kamu memang mau:

```text
/context expand payment
```

atau:

```text
/business-analyst audit notification --deep
```

Default:

```text
normal
```

Deep mode:

```text
deep
```

Jadi kamu punya dua mode:

```text
FAST
→ minimal context

DEEP
→ comprehensive investigation
```

---

# 20. Buat `/compact`

Saya sangat merekomendasikan command:

```text
/compact
```

Contoh:

```text
Context:
    28,400 tokens

After compression:
    8,900 tokens

Removed:
    12 low-value file contents
    4 duplicated outputs
    2 stale search results

Preserved:
    task
    findings
    relevant code
    decisions
    open questions
```

Ini akan menjadi command yang sangat sering dipakai.

---

# 21. `/context` Harus Transparan

Kamu harus bisa melihat:

```text
/context
```

dan Sakti menjawab:

```text
CONTEXT

Task                    820
Agent                   420
Skill                   1,200
Repository map          1,100
Relevant code           4,820
Dependencies            1,700
Requirements            900
Previous artifacts      1,300
────────────────────────────
TOTAL                   12,260

Budget                  16,000

Utilization              76%
```

Ini akan membuat kamu sebagai solo dev **bisa mengontrol AI**, bukan AI yang mengontrol context.

---

# 22. Tambahkan Token Economy ke AGENTS.md

Saya akan memasukkan aturan seperti ini sebagai core policy Sakti:


# Sakti-Agent Token Economy Policy

## 1. Core Principle

Sakti-Agent MUST use the minimum context required to complete the current task.

> Read less. Reason over relevant context. Reuse previous work. Expand only when necessary.

Agents MUST NOT scan or load the entire repository unless explicitly requested or required by the task.

---

## 2. Context Priority

Agents MUST prioritize context in this order:

1. Current task
2. Acceptance Criteria
3. Directly affected files and symbols
4. Direct dependencies
5. Business rules
6. Architecture decisions
7. Relevant tests
8. Documentation
9. Unrelated repository content

Lower-priority context MUST NOT be loaded while higher-priority context is still sufficient.

---

## 3. Progressive Disclosure

Agents MUST follow this sequence:

```text
LEVEL 0 — Understand Task
LEVEL 1 — Load Required Skill
LEVEL 2 — Inspect Repository Map
LEVEL 3 — Locate Relevant Symbols
LEVEL 4 — Read Relevant Code Regions
LEVEL 5 — Inspect Dependencies / Specs / Tests
LEVEL 6 — Deep Investigation
```

Agents MUST NOT jump directly to Level 6 unless:

- the user explicitly requests deep analysis;
- the current evidence is insufficient;
- the task cannot be completed with the available context.

---

## 4. Symbol-First Reading

When possible, agents MUST inspect:

```text
symbol → region → file
```

instead of:

```text
file → entire file
```

Large files MUST be read selectively.

---

## 5. Search Limits

Repository searches MUST have bounded output.

Default limits:

```yaml
max_files: 20
max_matches_per_file: 10
max_search_output_tokens: 2000
```

If search results exceed the limit, the agent MUST rank results by relevance rather than loading everything.

---

## 6. Ignored Paths

The following paths MUST NOT be inspected by default:

```text
node_modules/**
.git/**
.next/**
dist/**
build/**
coverage/**
vendor/**
tmp/**
logs/**
```

Generated, minified, lock, and map files should also be excluded unless directly relevant.

---

## 7. Scope Lock

Every investigation MUST establish a scope.

Example:

```yaml
scope:
  domain:
    - notification

  roles:
    - student

  concerns:
    - ui
    - routing
```

Agents MUST NOT automatically expand into unrelated domains.

If an out-of-scope dependency is discovered, the agent should report it instead of automatically loading it.

---

## 8. Context Budget

Every agent execution MUST have a context budget.

Example:

```yaml
context_budget:
  default: 16000
  maximum: 32000
```

When context utilization exceeds 80%, the agent SHOULD:

1. remove duplicate context;
2. remove low-value files;
3. compress previous findings;
4. reuse existing artifacts;
5. inspect only targeted regions.

The agent MUST NOT blindly continue loading context.

---

## 9. Context Reuse

Agent outputs MUST become reusable artifacts.

Example:

```text
Business Analyst
        ↓
AUDIT-001
        ↓
Solution Architect
        ↓
ARCH-001
        ↓
Frontend Developer
        ↓
IMPLEMENTATION
        ↓
Quality Engineer
        ↓
QA-001
```

Agents MUST reuse existing artifacts instead of repeating repository exploration.

---

## 10. Context Cache

Previously inspected files and symbols SHOULD be cached.

Cache MUST be invalidated when:

- the source file changes;
- the relevant branch changes;
- the task scope changes materially;
- the user explicitly requests fresh analysis.

---

## 11. Output Economy

Agents MUST avoid unnecessary repetition.

Agents SHOULD NOT repeat:

- the user's request;
- their own role description;
- repository information already known;
- previously established findings;
- long explanations when a concise engineering result is sufficient.

Default output should prioritize:

```text
Finding
Evidence
Impact
Recommendation
Confidence
```

---

## 12. Reasoning Persistence

Sakti-Agent SHOULD persist engineering conclusions rather than internal reasoning.

Persist:

```text
decision
evidence
finding
assumption
risk
recommendation
artifact
```

Do NOT persist unnecessary internal reasoning traces.

---

## 13. Confidence-Driven Exploration

Agents SHOULD use confidence to determine whether additional context is required.

```text
>= 90%
    Execute / conclude

70–89%
    Inspect targeted context

50–69%
    Investigate dependencies

< 50%
    Ask user or explicitly expand scope
```

Confidence MUST NOT be used as a substitute for required verification.

---

## 14. Stop Condition

Agents MUST stop repository exploration when:

- the root cause is sufficiently established;
- required Acceptance Criteria are understood;
- required implementation context is available;
- additional context is unlikely to change the decision.

Example:

```text
Root cause identified.

Confidence: HIGH

Additional repository exploration:
NOT REQUIRED
```

---

## 15. Deep Mode

Default execution is `FAST`.

Deep investigation requires:

```text
--deep
```

or:

```text
/context expand <domain>
```

Example:

```text
/business-analyst audit notification --deep
```

Deep mode permits broader repository exploration but MUST still respect ignored paths and context limits.

---

## 16. Context Commands

Sakti-Agent SHOULD provide:

```text
/context
/context files
/context symbols
/context graph
/context clear
/context expand <domain>
/compact
```

Example:

```text
/context
```

must show:

```text
Task
Agent
Skill
Repository
Code
Dependencies
Artifacts
Total tokens
Budget
Utilization
```

---

## 17. Agent Handoff Economy

When handing work to another agent, transfer:

```text
task
findings
relevant files
relevant symbols
requirements
acceptance criteria
decisions
risks
open questions
```

Do NOT transfer the entire previous conversation or repository context.

---

## 18. Golden Rule

Before loading any context, the agent MUST ask internally:

> "Will this information materially improve my ability to complete the current task?"

If the answer is NO:

```text
DO NOT LOAD IT.
```

If the answer is MAYBE:

```text
LOAD A SMALLER REPRESENTATION FIRST.
```

If the answer is YES:

```text
LOAD ONLY THE REQUIRED REGION.
```


---

# 23. Tapi Saya Akan Tambahkan Satu Konsep Lagi: Context ROI

Ini bisa membuat Sakti sangat powerful.

Setiap context punya nilai:

```text
Context ROI =
Expected usefulness / token cost
```

Misalnya:

| Context | Token | Nilai |
|---|---:|---|
| `NotificationDrawer` relevant function | 500 | Sangat tinggi |
| notification types | 300 | Tinggi |
| student routes | 800 | Tinggi |
| entire student module | 15k | Rendah |
| `node_modules` | 100k+ | Hampir nol |

Sakti harus selalu memilih:

```text
HIGH ROI
```

terlebih dahulu.

---

# 24. Bahkan Skill Juga Jangan Selalu Dimuat Full

Misalnya:

```text
skills/
├── architecture/
├── database/
├── nextjs/
├── react/
├── golang/
├── python/
├── security/
└── testing/
```

Jangan:

```text
load all skills
```

Ketika:

```text
/frontend-developer fix notification redirect
```

cukup:

```text
nextjs-routing
react-navigation
notification-ui
```

Kalau ternyata perlu database:

```text
→ load database skill
```

**Skill juga Progressive Disclosure.**

---

# 25. Jadi Token Architecture Sakti Harus Seperti Ini

```text
                    USER
                      │
                      ▼
              /business-analyst
                      │
                      ▼
                TASK PARSER
                      │
                      ▼
                SCOPE LOCK
                      │
                      ▼
              CONTEXT PLANNER
                      │
              ┌───────┴───────┐
              ▼               ▼
          SKILL LOAD      REPO MAP
              │               │
              └───────┬───────┘
                      ▼
                SYMBOL SEARCH
                      │
                      ▼
                REGION READ
                      │
                      ▼
                CONTEXT CACHE
                      │
                      ▼
               AGENT EXECUTION
                      │
                      ▼
                ARTIFACT
                      │
                      ▼
              CONTEXT SUMMARY
                      │
                      ▼
                 HANDOFF
```

Dengan prinsip:

```text
                ┌────────────────────┐
                │   MINIMUM CONTEXT  │
                │        NEEDED      │
                └────────────────────┘
                         ↑
                         │
              everything must justify
                  its token cost
```

## Dan menurut saya ini harus menjadi identitas Sakti-Agent

Bukan sekadar:

> "AI yang punya banyak agent."

Tetapi:

> **"AI Engineering OS yang tahu kapan harus membaca, apa yang harus dibaca, apa yang tidak perlu dibaca, dan bagaimana menggunakan kembali hasil pekerjaan agent sebelumnya."**

Itu yang benar-benar cocok untuk **solo developer**: satu orang bisa menggunakan 8–10 specialist agent tanpa membayar token seolah-olah 8–10 developer sedang melakukan full repository scan setiap kali.
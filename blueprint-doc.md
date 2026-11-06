# Arsitektur Agentic Product Engineering — KasirSakti

Menurutku, ini justru salah satu hal paling penting yang perlu kamu bangun ketika menggunakan vibe coding.

Kamu jangan menjadikan AI hanya sebagai alat untuk menghasilkan kode. Kamu perlu membangun AI Engineering Team yang masing-masing agent memiliki tanggung jawab, standar dokumentasi, dan proses kerja yang jelas.

Bayangkan kamu memiliki perusahaan software kecil dengan beberapa posisi:

- Product Manager bertugas memahami kebutuhan bisnis.
- Business Analyst bertugas merinci proses bisnis dan requirement.
- Solution Architect bertugas merancang arsitektur.
- UI/UX Designer merancang pengalaman pengguna.
- Backend/Frontend Engineer mengimplementasikan sistem.
- QA Engineer menguji seluruh workflow.
- Security Engineer mengevaluasi keamanan.

Semua posisi tersebut dapat dibantu oleh AI Agent.

Tetapi ada satu fondasi yang wajib disiapkan:

# Project Documentation System

[AI Spec-Driven Development com Kiro e outras IDEs agênticas](https://images.openai.com/static-rsc-4/ugwGkxxYZIg0clI2GXVCO9Gn0k091LyQXxHtmXJpDofsBYUXDbp0JxVt3IYnZI0du9ghSx7h9Mx-HCHqZdpo8SAg71AnLyj6RKHE27Cox_NddXSplP8uBgIK2ZkXBqtRRrm5PgAZKZPaROLzaJ6meoavhHMyHBQMTvOduBHZ3T4?purpose=inline)

[blog.dyegomaas.com.br](https://blog.dyegomaas.com.br/posts/ai-spec-driven-development/?utm_source=chatgpt.com)

Dokumentasi menjadi kontrak kerja seluruh AI Agent.

Agent PM menghasilkan spesifikasi. Agent Architect menggunakan spesifikasi tersebut untuk membuat desain teknis. Agent Developer mengimplementasikan desain. Agent QA memastikan implementasinya memenuhi kebutuhan bisnis.

Artinya, ketika kamu meminta AI Developer membuat fitur kasbon, dia tidak boleh mengarang sendiri alurnya. Dia harus membaca dokumentasi hasil pekerjaan PM terlebih dahulu.

Aku akan merancangnya sebagai standar untuk seluruh proyekmu, bukan hanya KasirSakti.

# 1. Gambaran besar sistem dokumentasi

Aku menyarankan setiap project mempunyai folder khusus bernama `docs/`.

Di dalamnya terdapat dokumentasi dari sisi bisnis, produk, desain, arsitektur, implementasi, sampai pengujian.

Struktur utamanya:

## Documentation lifecycle

PRODUCT MANAGEMENT

Vision · Discovery · PRD · Use Case · Business Rules

SOLUTION ARCHITECTURE

HLD · LLD · ERD · API · Security

DESIGN & DEVELOPMENT

UI/UX · Backend · Frontend · Integration

QUALITY ENGINEERING

Test Plan · UAT · Security · Acceptance

PRODUCTION & OPERATIONS

Deployment · Monitoring · Maintenance

Alur ini disebut requirements traceability: kebutuhan bisnis harus bisa ditelusuri hingga implementasi dan pengujiannya.

# 2. Struktur folder project yang aku rekomendasikan

Berikut rancangan yang bisa langsung kamu terapkan pada repository KasirSakti.

Contoh struktur dokumentasi dan konfigurasi agent, bukan struktur folder wajib suatu framework.

```
kasirsakti/
│
├── AGENTS.md
├── README.md
│
├── agents/
│   ├── pm/
│   │   ├── AGENT.md
│   │   ├── responsibilities.md
│   │   └── workflow.md
│   │
│   ├── business-analyst/
│   │   └── AGENT.md
│   │
│   ├── solution-architect/
│   │   └── AGENT.md
│   │
│   ├── ui-ux/
│   │   └── AGENT.md
│   │
│   ├── developer/
│   │   └── AGENT.md
│   │
│   ├── qa/
│   │   └── AGENT.md
│   │
│   └── security/
│       └── AGENT.md
│
├── docs/
│   ├── README.md
│   │
│   ├── 00-governance/
│   │   ├── documentation-standard.md
│   │   ├── naming-convention.md
│   │   ├── glossary.md
│   │   ├── decision-log.md
│   │   └── templates/
│   │       ├── prd-template.md
│   │       ├── feature-spec-template.md
│   │       ├── use-case-template.md
│   │       ├── user-story-template.md
│   │       ├── business-rule-template.md
│   │       ├── acceptance-criteria-template.md
│   │       ├── workflow-template.md
│   │       ├── adr-template.md
│   │       └── test-plan-template.md
│   │
│   ├── 01-product/
│   │   ├── product-vision.md
│   │   ├── product-strategy.md
│   │   ├── product-roadmap.md
│   │   ├── mvp-scope.md
│   │   ├── product-metrics.md
│   │   ├── stakeholders.md
│   │   └── personas/
│   │       ├── cooperative-admin.md
│   │       ├── cashier.md
│   │       ├── finance-admin.md
│   │       └── member-customer.md
│   │
│   ├── 02-discovery/
│   │   ├── research/
│   │   ├── problem-statements/
│   │   ├── assumptions.md
│   │   ├── open-questions.md
│   │   ├── business-process/
│   │   │   ├── as-is-process.md
│   │   │   └── to-be-process.md
│   │   └── integrations/
│   │       └── simkopdes-research.md
│   │
│   ├── 03-requirements/
│   │   ├── prd/
│   │   │   └── PRD-001-kasirsakti.md
│   │   │
│   │   ├── epics/
│   │   │   ├── EPIC-POS.md
│   │   │   ├── EPIC-INVENTORY.md
│   │   │   ├── EPIC-CREDIT.md
│   │   │   └── EPIC-INTEGRATION.md
│   │   │
│   │   ├── features/
│   │   │   ├── FEAT-POS-001-sales/
│   │   │   ├── FEAT-CREDIT-001-kasbon/
│   │   │   ├── FEAT-LEGAL-001-agreement/
│   │   │   ├── FEAT-INVENTORY-001-stock/
│   │   │   └── FEAT-MEMBER-001-members/
│   │   │
│   │   └── backlog/
│   │       ├── product-backlog.md
│   │       └── bug-backlog.md
│   │
│   ├── 04-ux-design/
│   │   ├── design-principles.md
│   │   ├── user-journeys/
│   │   ├── wireframes/
│   │   ├── prototypes/
│   │   └── screen-specifications/
│   │
│   ├── 05-architecture/
│   │   ├── system-context.md
│   │   ├── high-level-design.md
│   │   ├── low-level-design.md
│   │   ├── database/
│   │   │   ├── erd.md
│   │   │   ├── data-dictionary.md
│   │   │   └── data-integrity.md
│   │   ├── integrations/
│   │   └── adr/
│   │
│   ├── 06-api/
│   │   ├── api-conventions.md
│   │   ├── authentication.md
│   │   └── endpoints/
│   │
│   ├── 07-security-compliance/
│   │   ├── security-requirements.md
│   │   ├── rbac-matrix.md
│   │   ├── privacy-policy-requirements.md
│   │   ├── threat-model.md
│   │   └── legal/
│   │       ├── agreement-requirements.md
│   │       └── legal-review-log.md
│   │
│   ├── 08-quality-assurance/
│   │   ├── test-strategy.md
│   │   ├── test-cases/
│   │   ├── regression-test.md
│   │   ├── uat/
│   │   └── bug-reports/
│   │
│   ├── 09-delivery/
│   │   ├── release-plan.md
│   │   ├── sprint-plan.md
│   │   ├── deployment-plan.md
│   │   └── changelog.md
│   │
│   └── 10-operations/
│       ├── monitoring.md
│       ├── backup-recovery.md
│       ├── incident-management.md
│       └── maintenance.md
│
└── src/
    └── ...
```

Struktur ini sengaja memisahkan `agents/` dengan `docs/`.

- `agents/` menjelaskan bagaimana AI harus bekerja.
- `docs/` menjelaskan apa yang harus dibangun dan bagaimana produk seharusnya bekerja.
- `src/` adalah implementasi kode sebenarnya.

Jangan mencampurkan instruksi AI dengan requirement produk. Keduanya memiliki fungsi berbeda.

# 3. Detail isi masing-masing dokumentasi

Sekarang kita bahas satu per satu seperti standar dokumentasi di perusahaan software profesional.

## 00 — Governance & Documentation Standard

Ini adalah aturan utama dokumentasi.

Tujuannya agar seluruh agent menghasilkan dokumen dengan format dan standar yang sama.

| File                        | Isi                                       |
| --------------------------- | ----------------------------------------- |
| `documentation-standard.md` | Aturan penulisan dan pemeliharaan dokumen |
| `naming-convention.md`      | Standar ID dan penamaan dokumen           |
| `glossary.md`               | Kamus istilah bisnis dan teknis           |
| `decision-log.md`           | Riwayat keputusan penting produk          |
| `templates/`                | Template standar semua dokumentasi        |

Contoh isi `glossary.md`:

| Term         | Definisi                                    |
| ------------ | ------------------------------------------- |
| Cooperative  | Koperasi yang menggunakan KasirSakti        |
| Outlet       | Lokasi usaha koperasi                       |
| Member       | Anggota resmi koperasi                      |
| Customer     | Pelanggan umum                              |
| Kasbon       | Pembelian barang dengan pembayaran tertunda |
| Receivable   | Piutang usaha                               |
| Credit Limit | Maksimum saldo piutang yang diperbolehkan   |
| Agreement    | Dokumen perjanjian antar pihak              |

Mengapa ini penting?

Karena PM Agent mungkin menggunakan istilah customer, Developer Agent menggunakan user, dan database menggunakan member. Tanpa kamus istilah, perbedaan persepsi bisa memunculkan bug.

## 01 — Product Management Documentation

Ini adalah wilayah kerja utama PM Agent.

Dokumen ini menjawab:

- Mengapa produk dibuat?
- Siapa pengguna produk?
- Masalah apa yang diselesaikan?
- Apa target bisnis?
- Fitur apa yang harus dibuat?
- Apa yang tidak termasuk ruang lingkup?

Detailnya:

| File                  | Apa yang harus dijelaskan                   |
| --------------------- | ------------------------------------------- |
| `product-vision.md`   | Visi jangka panjang produk                  |
| `product-strategy.md` | Strategi mencapai tujuan produk             |
| `product-roadmap.md`  | Urutan pengembangan fitur                   |
| `mvp-scope.md`        | Batas fitur versi MVP                       |
| `product-metrics.md`  | KPI dan indikator keberhasilan              |
| `stakeholders.md`     | Pemilik kepentingan dan pengambil keputusan |

Contoh `product-vision.md` KasirSakti:

```
# Product Vision — KasirSakti

## Vision
Menjadi platform POS dan manajemen operasional
yang membantu koperasi mengelola bisnis secara
terintegrasi dan transparan.

## Target Users
- Pengurus koperasi
- Manajer unit usaha
- Kasir
- Admin keuangan
- Anggota koperasi
- Pelanggan umum

## Core Problems
1. Transaksi masih sulit dikontrol.
2. Pengelolaan stok tidak terintegrasi.
3. Piutang pelanggan tidak terkelola.
4. Dokumen kasbon tidak terstandarisasi.
5. Laporan antar unit usaha tidak terintegrasi.

## Product Goals
1. Mempermudah operasional koperasi.
2. Meningkatkan akurasi transaksi.
3. Mengontrol piutang.
4. Mendukung integrasi data koperasi.

## Target MVP
POS, Inventory, Member,
Receivable, Agreement, Reporting.
```

Dokumen ini menjadi arah bagi seluruh fitur.

## 02 — Product Discovery Documentation

PM profesional tidak langsung membuat fitur setelah mendengar permintaan user.

Mereka melakukan discovery.

Dokumen ini harus menjawab kebutuhan nyata berdasarkan wawancara, observasi, kebijakan, data, dan proses bisnis.

| Dokumen              | Isi                            |
| -------------------- | ------------------------------ |
| Stakeholder Research | Siapa yang terlibat            |
| Problem Statement    | Masalah yang sedang terjadi    |
| User Research        | Temuan dari wawancara pengguna |
| Assumptions          | Hal yang belum terbukti        |
| Open Questions       | Pertanyaan yang belum terjawab |
| AS-IS Process        | Proses bisnis saat ini         |
| TO-BE Process        | Proses bisnis yang diharapkan  |

Contoh masalah bisnis:

```
# Problem Statement

## Problem
Petani membeli pupuk melalui koperasi
dengan pembayaran setelah masa panen.

## Current Condition
- Pembelian dicatat manual.
- Bukti kasbon tidak seragam.
- Pembayaran sulit dilacak.
- Tidak ada credit limit.

## User Impact
- Petugas kesulitan mengetahui piutang.
- Koperasi berisiko mengalami piutang macet.
- Pelanggan tidak memiliki rincian kewajiban.

## Evidence
Belum tersedia data wawancara.
Perlu validasi dengan pengurus koperasi.

## Assumptions
Petani membutuhkan jadwal pembayaran
yang menyesuaikan masa panen.
```

Perhatikan bagian `Evidence` dan `Assumptions`. AI tidak boleh mengubah asumsi menjadi fakta.

## 03 — Requirements Engineering

Ini adalah bagian terpenting dari seluruh dokumentasi produk.

PM Agent bertugas mengubah kebutuhan bisnis menjadi spesifikasi yang dapat dipahami developer tanpa interpretasi bebas.

Aku merekomendasikan tiga level dokumentasi:

Level 1 — PRD

Product Requirements Document.

Menjelaskan kebutuhan dan ruang lingkup produk secara keseluruhan.

Level 2 — Epic & Feature Specification

Membagi produk menjadi kelompok kemampuan dan fitur yang lebih kecil.

Level 3 — Use Case, User Story & Acceptance Criteria

Menjelaskan interaksi, aturan, perilaku sistem, dan cara menguji setiap fitur.

### A. PRD — Product Requirements Document

PRD merupakan dokumen induk yang menjelaskan keseluruhan produk atau sebuah inisiatif besar.

Contoh:

`PRD-001-kasirsakti.md`

Struktur isinya:

| Bagian                      | Isi                             |
| --------------------------- | ------------------------------- |
| Product Overview            | Penjelasan produk               |
| Background                  | Latar belakang                  |
| Problem Statement           | Masalah yang ingin diselesaikan |
| Goals & Objectives          | Tujuan bisnis                   |
| Target Users                | Pengguna                        |
| Product Scope               | Ruang lingkup                   |
| Functional Requirements     | Kebutuhan fungsional            |
| Non-Functional Requirements | Kebutuhan nonfungsional         |
| Dependencies                | Ketergantungan                  |
| Constraints                 | Batasan                         |
| Risks                       | Risiko                          |
| Success Metrics             | Ukuran keberhasilan             |
| Release Strategy            | Rencana rilis                   |

Satu PRD dapat mencakup banyak epic dan feature.

### B. Epic Documentation

Epic adalah kelompok kemampuan bisnis yang cukup besar.

Contoh KasirSakti:

```
EPIC-POS
  ├── Penjualan
  ├── Pembayaran
  ├── Retur
  └── Struk

EPIC-CREDIT
  ├── Credit Profile
  ├── Credit Limit
  ├── Kasbon
  ├── Repayment
  └── Collection

EPIC-LEGAL
  ├── Agreement Template
  ├── Agreement Generation
  ├── Digital Signature
  └── Agreement Archive
```

Setiap epic harus mempunyai:

- Objective.
- Business value.
- Related features.
- Dependencies.
- Priority.
- Success criteria.

### C. Feature Specification

Ini adalah dokumen yang paling sering dibaca oleh Developer Agent.

Contohnya:

`FEAT-CREDIT-001-kasbon/`

Aku merekomendasikan satu folder untuk setiap fitur yang memiliki kompleksitas berarti.

```
FEAT-CREDIT-001-kasbon/
│
├── README.md
├── problem-and-goals.md
├── scope.md
├── workflows.md
│
├── use-cases/
│   ├── UC-CREDIT-001-create-kasbon.md
│   ├── UC-CREDIT-002-approve-kasbon.md
│   ├── UC-CREDIT-003-repayment.md
│   └── UC-CREDIT-004-seasonal-payment.md
│
├── user-stories.md
├── business-rules.md
├── acceptance-criteria.md
├── permissions.md
├── states-and-transitions.md
├── data-requirements.md
├── edge-cases.md
├── dependencies-and-risks.md
└── open-questions.md
```

Mari kita bedah fungsi setiap file.

| File                        | Penjelasan                                  |
| --------------------------- | ------------------------------------------- |
| `README.md`                 | Ringkasan fitur dan metadata                |
| `problem-and-goals.md`      | Masalah dan tujuan bisnis                   |
| `scope.md`                  | Batas fitur: termasuk dan tidak termasuk    |
| `workflows.md`              | Diagram alur proses                         |
| `use-cases/`                | Detail interaksi setiap aktor dengan sistem |
| `user-stories.md`           | Kebutuhan dari sudut pandang pengguna       |
| `business-rules.md`         | Aturan bisnis yang wajib dipatuhi           |
| `acceptance-criteria.md`    | Kriteria fitur dinyatakan berhasil          |
| `permissions.md`            | Role yang boleh melakukan tindakan          |
| `states-and-transitions.md` | Siklus status dan transisinya               |
| `data-requirements.md`      | Data yang dibutuhkan fitur                  |
| `edge-cases.md`             | Kondisi khusus dan kegagalan                |
| `dependencies-and-risks.md` | Keterkaitan dan risiko                      |
| `open-questions.md`         | Hal yang masih menunggu keputusan           |

Untuk fitur sederhana, beberapa file dapat digabung. Struktur tersebut merupakan standar maksimal untuk fitur yang kompleks, bukan kewajiban membuat 14 file untuk setiap tombol.

# 4. Detail metode Product Manager ketika membuat satu fitur

Sekarang kita masuk ke cara kerja PM Agent.

Aku menggunakan contoh fitur Kasbon Management agar kamu bisa melihat seberapa detail spesifikasi yang harus dihasilkan.

## Tahap 1 — Problem framing

PM harus mendefinisikan masalah sebelum memutuskan solusi.

Contoh:

```
# Feature: Kasbon Management

Feature ID: FEAT-CREDIT-001

## Problem

Koperasi memberikan fasilitas pembelian
barang dengan pembayaran tertunda.

Saat ini pencatatan piutang belum terstruktur.

## Business Impact

- Risiko piutang tidak tertagih.
- Kesulitan mengetahui saldo pelanggan.
- Tidak ada pembatasan kredit.
- Bukti transaksi tidak konsisten.

## Proposed Solution

Membangun modul Kasbon Management
dengan credit limit, approval,
jadwal pembayaran, dan audit trail.

## Success Criteria

- Semua kasbon memiliki referensi transaksi.
- Semua pembayaran tercatat.
- Saldo piutang bisa ditelusuri.
- Transaksi wajib perjanjian tidak bisa
  diselesaikan sebelum persetujuan terpenuhi.
```

## Tahap 2 — Actor identification

PM harus mengidentifikasi siapa saja yang berinteraksi dengan fitur.

Contoh:

| Actor             | Responsibility                   |
| ----------------- | -------------------------------- |
| Cashier           | Membuat pengajuan kasbon         |
| Customer          | Menyetujui kewajiban             |
| Manager           | Menyetujui kasbon tertentu       |
| Finance           | Mengelola piutang dan pembayaran |
| Cooperative Admin | Mengatur kebijakan kredit        |
| Auditor           | Melihat jejak transaksi          |

## Tahap 3 — Use Case Specification

Ini bagian yang harus sangat detail.

Contoh format:

```
# UC-CREDIT-001
# Create Kasbon

## 1. Use Case Information

Use Case ID: UC-CREDIT-001

Feature ID: FEAT-CREDIT-001

Use Case Name: Create Kasbon

Primary Actor: Cashier

Secondary Actor: Customer, Manager

Priority: Critical

## 2. Description

Kasir membuat transaksi pembelian
dengan metode pembayaran tertunda.

## 3. Preconditions

- Kasir sudah login.
- Shift kasir aktif.
- Pelanggan terdaftar.
- Pelanggan tidak diblokir.
- Produk tersedia.
- Fasilitas kasbon aktif.

## 4. Trigger

Pelanggan memilih pembayaran kasbon.

## 5. Main Flow

1. Kasir memilih pelanggan.
2. Kasir memasukkan produk.
3. Sistem menghitung total.
4. Sistem memeriksa saldo piutang.
5. Sistem memeriksa credit limit.
6. Sistem menentukan level kasbon.
7. Sistem meminta approval jika diperlukan.
8. Sistem menghasilkan dokumen perjanjian
   jika threshold tercapai.
9. Pelanggan dan koperasi memberikan
   persetujuan sesuai mekanisme.
10. Sistem memfinalisasi transaksi.
11. Sistem mencatat piutang.
12. Sistem menerbitkan bukti transaksi.

## 6. Alternative Flow

A1. Pelanggan tidak terverifikasi.
A2. Credit limit terlampaui.
A3. Approval ditolak.
A4. Pelanggan menolak perjanjian.
A5. Penandatanganan gagal.
A6. Stok tidak mencukupi.

## 7. Postconditions

- Transaksi berhasil tercatat.
- Stok diperbarui.
- Piutang tercatat.
- Dokumen tersimpan jika diwajibkan.

## 8. Business Rules

Mengacu pada BR-CREDIT-001
sampai BR-CREDIT-010.

## 9. Acceptance Criteria

Mengacu pada AC-CREDIT-001
sampai AC-CREDIT-010.
```

Jangan hanya meminta AI membuat happy path. Use case harus memiliki alternate flow, exception flow, dan kondisi akhir.

### Perbedaan use case dan user story

| Use case                                    | User story                           |
| ------------------------------------------- | ------------------------------------ |
| Menjelaskan interaksi secara lengkap        | Menjelaskan kebutuhan secara ringkas |
| Memiliki main flow dan alternative flow     | Memiliki acceptance criteria         |
| Menjelaskan respons sistem                  | Menjelaskan nilai bagi pengguna      |
| Cocok sebagai referensi pengembangan dan QA | Cocok sebagai item backlog           |

Contoh user story:

```
# US-CREDIT-001

As a Cashier,

I want to create a deferred payment
transaction for a registered customer,

So that the customer can purchase
cooperative products without paying immediately.

## Acceptance Criteria

- Kasir dapat memilih pelanggan aktif.
- Kasir dapat memilih produk.
- Sistem menampilkan total piutang.
- Sistem memeriksa credit limit.
- Sistem menerapkan persyaratan perjanjian.
```

## Tahap 4 — Business Rules

Business rules harus dipisahkan dari kode dan ditulis sebagai aturan yang dapat diuji.

Contoh:

```
# Business Rules — Kasbon

BR-CREDIT-001

Pelanggan hanya dapat menggunakan fasilitas
kasbon jika statusnya memenuhi kebijakan koperasi.

BR-CREDIT-002

Nilai transaksi kasbon di atas Rp100.000
wajib melalui proses perjanjian.

BR-CREDIT-003

Total outstanding setelah transaksi harus
diperiksa terhadap threshold perjanjian.

BR-CREDIT-004

Pelanggan tidak boleh melewati credit limit
tanpa approval yang berwenang.

BR-CREDIT-005

Pembayaran sebagian diperbolehkan.

BR-CREDIT-006

Perubahan saldo harus mempunyai
referensi transaksi yang dapat diaudit.

BR-CREDIT-007

Perjanjian yang sudah ditandatangani
tidak dapat diubah langsung.
```

Setiap aturan harus memiliki:

- Business rule ID.
- Deskripsi.
- Alasan bisnis.
- Kondisi penerapan.
- Pihak yang berwenang.
- Referensi ke use case.

Ini akan membantu Developer Agent memahami batasan yang tidak boleh dilanggar.

## Tahap 5 — Workflow & State Machine

PM harus menjelaskan perjalanan sebuah proses, tidak cukup hanya menuliskan paragraf.

Contoh lifecycle kasbon:

\#chatgpt-mermaid-\_r_6ql\_{font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";font-size:16px;fill:rgb(13, 13, 13);}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#chatgpt-mermaid-\_r_6ql\_ .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#chatgpt-mermaid-\_r_6ql\_ .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#chatgpt-mermaid-\_r_6ql\_ .error-icon{fill:rgb(243, 243, 243);}#chatgpt-mermaid-\_r_6ql\_ .error-text{fill:rgb(13, 13, 13);stroke:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_6ql\_ .edge-thickness-normal{stroke-width:1px;}#chatgpt-mermaid-\_r_6ql\_ .edge-thickness-thick{stroke-width:3.5px;}#chatgpt-mermaid-\_r_6ql\_ .edge-pattern-solid{stroke-dasharray:0;}#chatgpt-mermaid-\_r_6ql\_ .edge-thickness-invisible{stroke-width:0;fill:none;}#chatgpt-mermaid-\_r_6ql\_ .edge-pattern-dashed{stroke-dasharray:3;}#chatgpt-mermaid-\_r_6ql\_ .edge-pattern-dotted{stroke-dasharray:2;}#chatgpt-mermaid-\_r_6ql\_ .marker{fill:rgb(143, 143, 143);stroke:rgb(143, 143, 143);}#chatgpt-mermaid-\_r_6ql\_ .marker.cross{stroke:rgb(143, 143, 143);}#chatgpt-mermaid-\_r_6ql\_ svg{font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";font-size:16px;}#chatgpt-mermaid-\_r_6ql\_ p{margin:0;}#chatgpt-mermaid-\_r_6ql\_ .label{font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";color:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_6ql\_ .cluster-label text{fill:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_6ql\_ .cluster-label span{color:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_6ql\_ .cluster-label span p{background-color:transparent;}#chatgpt-mermaid-\_r_6ql\_ .label text,#chatgpt-mermaid-\_r_6ql\_ span{fill:rgb(13, 13, 13);color:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_6ql\_ .node rect,#chatgpt-mermaid-\_r_6ql\_ .node circle,#chatgpt-mermaid-\_r_6ql\_ .node ellipse,#chatgpt-mermaid-\_r_6ql\_ .node polygon,#chatgpt-mermaid-\_r_6ql\_ .node path{fill:rgb(222, 234, 251);stroke:rgb(83, 154, 248);stroke-width:1px;}#chatgpt-mermaid-\_r_6ql\_ .rough-node .label text,#chatgpt-mermaid-\_r_6ql\_ .node .label text,#chatgpt-mermaid-\_r_6ql\_ .image-shape .label,#chatgpt-mermaid-\_r_6ql\_ .icon-shape .label{text-anchor:middle;}#chatgpt-mermaid-\_r_6ql\_ .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#chatgpt-mermaid-\_r_6ql\_ .rough-node .label,#chatgpt-mermaid-\_r_6ql\_ .node .label,#chatgpt-mermaid-\_r_6ql\_ .image-shape .label,#chatgpt-mermaid-\_r_6ql\_ .icon-shape .label{text-align:center;}#chatgpt-mermaid-\_r_6ql\_ .node.clickable{cursor:pointer;}#chatgpt-mermaid-\_r_6ql\_ .root .anchor path{fill:rgb(143, 143, 143)!important;stroke-width:0;stroke:rgb(143, 143, 143);}#chatgpt-mermaid-\_r_6ql\_ .arrowheadPath{fill:rgb(143, 143, 143);}#chatgpt-mermaid-\_r_6ql\_ .edgePath .path{stroke:rgb(143, 143, 143);stroke-width:1px;}#chatgpt-mermaid-\_r_6ql\_ .flowchart-link{stroke:rgb(143, 143, 143);fill:none;}#chatgpt-mermaid-\_r_6ql\_ .edgeLabel{background-color:rgb(252, 252, 252);text-align:center;}#chatgpt-mermaid-\_r_6ql\_ .edgeLabel p{background-color:rgb(252, 252, 252);}#chatgpt-mermaid-\_r_6ql\_ .edgeLabel rect{opacity:0.5;background-color:rgb(252, 252, 252);fill:rgb(252, 252, 252);}#chatgpt-mermaid-\_r_6ql\_ .labelBkg{background-color:rgba(252, 252, 252, 0.5);}#chatgpt-mermaid-\_r_6ql\_ .cluster rect{fill:rgb(243, 243, 243);stroke:rgba(0, 0, 0, 0.1);stroke-width:1px;}#chatgpt-mermaid-\_r_6ql\_ .cluster text{fill:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_6ql\_ .cluster span{color:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_6ql\_ div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";font-size:12px;background:rgb(243, 243, 243);border:1px solid rgba(0, 0, 0, 0.1);border-radius:2px;pointer-events:none;z-index:100;}#chatgpt-mermaid-\_r_6ql\_ .flowchartTitleText{text-anchor:middle;font-size:18px;fill:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_6ql\_ rect.text{fill:none;stroke-width:0;}#chatgpt-mermaid-\_r_6ql\_ .icon-shape,#chatgpt-mermaid-\_r_6ql\_ .image-shape{background-color:rgb(252, 252, 252);text-align:center;}#chatgpt-mermaid-\_r_6ql\_ .icon-shape p,#chatgpt-mermaid-\_r_6ql\_ .image-shape p{background-color:rgb(252, 252, 252);padding:2px;}#chatgpt-mermaid-\_r_6ql\_ .icon-shape .label rect,#chatgpt-mermaid-\_r_6ql\_ .image-shape .label rect{opacity:0.5;background-color:rgb(252, 252, 252);fill:rgb(252, 252, 252);}#chatgpt-mermaid-\_r_6ql\_ .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#chatgpt-mermaid-\_r_6ql\_ .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#chatgpt-mermaid-\_r_6ql\_ .node .neo-node{stroke:rgb(83, 154, 248);}#chatgpt-mermaid-\_r_6ql\_ [data-look="neo"].node rect,#chatgpt-mermaid-\_r_6ql\_ [data-look="neo"].cluster rect,#chatgpt-mermaid-\_r_6ql\_ [data-look="neo"].node polygon{stroke:url(#chatgpt-mermaid-\_r_6ql\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_6ql\_ [data-look="neo"].swimlane.cluster rect{filter:none;}#chatgpt-mermaid-\_r_6ql\_ [data-look="neo"].node path{stroke:url(#chatgpt-mermaid-\_r_6ql\_-gradient);stroke-width:1px;}#chatgpt-mermaid-\_r_6ql\_ [data-look="neo"].node .outer-path{filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_6ql\_ [data-look="neo"].node .neo-line path{stroke:rgb(83, 154, 248);filter:none;}#chatgpt-mermaid-\_r_6ql\_ [data-look="neo"].node circle{stroke:url(#chatgpt-mermaid-\_r_6ql\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_6ql\_ [data-look="neo"].node circle .state-start{fill:#000000;}#chatgpt-mermaid-\_r_6ql\_ [data-look="neo"].icon-shape .icon{fill:url(#chatgpt-mermaid-\_r_6ql\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_6ql\_ [data-look="neo"].icon-shape .icon-neo path{stroke:url(#chatgpt-mermaid-\_r_6ql\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_6ql\_ .node text{font-size:14px;font-weight:600;letter-spacing:normal;fill:rgb(0, 79, 153);}#chatgpt-mermaid-\_r_6ql\_ .edgeLabels text{font-size:13px;font-weight:600;letter-spacing:-0.08px;fill:rgb(0, 79, 153);}#chatgpt-mermaid-\_r_6ql\_ .node tspan[font-weight="normal"],#chatgpt-mermaid-\_r_6ql\_ .edgeLabels tspan[font-weight="normal"]{font-weight:600;}#chatgpt-mermaid-\_r_6ql\_ .edgeLabel .label rect{opacity:1;rx:13px;ry:13px;fill:rgb(245, 250, 255);stroke:rgb(206, 219, 229);stroke-width:1px;}#chatgpt-mermaid-\_r_6ql\_ .node rect,#chatgpt-mermaid-\_r_6ql\_ .node circle,#chatgpt-mermaid-\_r_6ql\_ .node ellipse,#chatgpt-mermaid-\_r_6ql\_ .node polygon,#chatgpt-mermaid-\_r_6ql\_ .node path{fill:rgb(229, 243, 255);stroke:rgba(0, 0, 0, 0.1);stroke-width:1px;}#chatgpt-mermaid-\_r_6ql\_ .node rect{rx:16px;ry:16px;}#chatgpt-mermaid-\_r_6ql\_ .mermaid-decision .label-container{fill:rgb(245, 250, 255);stroke:rgb(206, 219, 229);stroke-dasharray:2,2;}#chatgpt-mermaid-\_r_6ql\_ .edgePaths .flowchart-link{stroke:rgb(143, 143, 143);stroke-width:1px;stroke-linecap:round;stroke-linejoin:round;}#chatgpt-mermaid-\_r_6ql\_ .marker{fill:rgb(143, 143, 143);stroke:rgb(143, 143, 143);}#chatgpt-mermaid-\_r_6ql\_ :root{--mermaid-font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";}Customer RequestValidate CustomerEligible?RejectedCalculate CreditAgreement Required?Finalize TransactionGenerate AgreementApproval and SignatureApproved and Signed?Active ReceivablePartial PaymentFull PaymentPaidNoYesNoYesNoYes

Contoh status kasbon:

```
DRAFT
  ↓
PENDING_APPROVAL
  ↓
PENDING_AGREEMENT
  ↓
ACTIVE
  ├── PARTIALLY_PAID
  │       ↓
  │     ACTIVE
  │
  ├── OVERDUE
  │
  └── PAID
```

PM harus memisahkan lifecycle piutang dari lifecycle dokumen perjanjian, karena keduanya bukan satu proses yang sama.

## Tahap 6 — Acceptance Criteria

Kriteria penerimaan digunakan Developer dan QA.

Format yang aku rekomendasikan adalah Given-When-Then.

Contoh:

```
Feature: Kasbon Management

Scenario: Customer creates kasbon above threshold

Given customer is verified
And customer has an active credit facility
And current outstanding is Rp0

When cashier creates a kasbon transaction
with a total amount of Rp150000

Then system must classify it as Level 2
And system must require a valid agreement
And system must not finalize the transaction
before the required approval and signature
are completed
```

Format tersebut membantu AI membuat test otomatis.

## Tahap 7 — Edge Cases

Ini sangat penting dalam vibe coding.

Banyak bug terjadi karena AI hanya mengimplementasikan skenario normal.

Contoh edge cases:

| ID     | Kasus                                  | Expected behavior                                |
| ------ | -------------------------------------- | ------------------------------------------------ |
| EC-001 | Customer mengulang checkout            | Tidak membuat piutang ganda                      |
| EC-002 | Koneksi terputus                       | Tidak kehilangan atau menggandakan transaksi     |
| EC-003 | Saldo berubah bersamaan oleh dua kasir | Pemeriksaan limit harus konsisten                |
| EC-004 | Dokumen ditolak                        | Transaksi tidak difinalisasi                     |
| EC-005 | Pembayaran melebihi saldo              | Ditolak atau ditangani berdasarkan aturan refund |
| EC-006 | Pelanggan diblokir                     | Transaksi kredit ditolak                         |
| EC-007 | Perjanjian kadaluarsa                  | Gunakan kebijakan dan validasi perjanjian        |

Untuk fitur finansial, concurrency dan idempotency wajib menjadi perhatian.

## Tahap 8 — Permission Matrix

Contoh:

| Action              | Cashier  | Manager | Finance          | Auditor |
| ------------------- | -------- | ------- | ---------------- | ------- |
| Create Kasbon       | ✓        | ✓       | ✓                | –       |
| Approve Kasbon      | –        | ✓       | Sesuai kebijakan | –       |
| Record Payment      | ✓        | ✓       | ✓                | –       |
| Change Credit Limit | –        | ✓       | Sesuai kebijakan | –       |
| View Receivable     | Terbatas | ✓       | ✓                | ✓       |
| Delete Agreement    | –        | –       | –                | –       |

Tanda `–` berarti tidak diperbolehkan.

Permission final harus mengikuti kebijakan pengurus dan prinsip pemisahan tugas.

# 5. UX Design Documentation

Setelah kebutuhan produk jelas, UI/UX Agent mulai bekerja.

Jangan langsung meminta AI membuat desain dashboard. Agent harus membaca PRD, use case, persona, dan workflow terlebih dahulu.

Dokumentasi yang dihasilkan:

| File                     | Isi                                   |
| ------------------------ | ------------------------------------- |
| `design-principles.md`   | Aturan desain produk                  |
| `user-journeys/`         | Perjalanan pengguna                   |
| `wireframes/`            | Struktur awal layar                   |
| `prototypes/`            | Prototype interaktif                  |
| `screen-specifications/` | Detail perilaku masing-masing halaman |

Contoh screen specification:

```
# Screen: POS Checkout

## Screen ID
SCR-POS-001

## Purpose
Memfasilitasi kasir dalam menyelesaikan
transaksi penjualan.

## Components

- Product Search
- Barcode Scanner
- Product Cart
- Customer Selector
- Discount Input
- Payment Method
- Transaction Summary
- Checkout Button

## User Actions

1. Add product.
2. Change quantity.
3. Remove product.
4. Select customer.
5. Select payment method.
6. Submit transaction.

## UI States

- Default
- Loading
- Empty
- Validation Error
- Insufficient Stock
- Payment Failed
- Success

## Related Requirements

- FEAT-POS-001
- UC-POS-001
```

Tujuan dokumen ini supaya Frontend Agent tahu komponen apa yang dibuat, apa yang terjadi ketika tombol ditekan, serta bagaimana tampilan ketika proses gagal.

# 6. Software Architecture Documentation

Ini adalah wilayah Solution Architect Agent.

PM menjelaskan apa yang dibutuhkan. Architect menjelaskan bagaimana sistem akan dibuat.

| Dokumen                | Fungsi                               |
| ---------------------- | ------------------------------------ |
| `system-context.md`    | Batas sistem dan integrasi eksternal |
| `high-level-design.md` | Arsitektur sistem secara keseluruhan |
| `low-level-design.md`  | Detail desain komponen dan proses    |
| `erd.md`               | Entity Relationship Diagram          |
| `data-dictionary.md`   | Definisi setiap kolom database       |
| `data-integrity.md`    | Aturan konsistensi data              |
| `adr/`                 | Riwayat keputusan arsitektur         |

### Contoh ERD Documentation

```
# Receivable Data Model

## Entity: receivables

| Field | Type | Description |
|---|---|---|
| id | UUID | Primary key |
| tenant_id | UUID | Cooperative owner |
| customer_id | UUID | Customer reference |
| sale_id | UUID | Origin transaction |
| agreement_id | UUID | Agreement reference |
| principal_amount | DECIMAL | Original amount |
| outstanding_amount | DECIMAL | Remaining balance |
| status | VARCHAR | Receivable status |
| due_date | DATE | Final due date |

## Constraints

- Tenant isolation is mandatory.
- Outstanding cannot be negative.
- Receivable must reference a valid transaction.
- Financial corrections must be auditable.
```

### Architecture Decision Record (ADR)

Ini sering dilupakan dalam vibe coding, padahal sangat bermanfaat.

Contoh:

`ADR-001-transactional-outbox.md`

Isi dokumennya:

- Context: masalah yang dihadapi.
- Decision: keputusan yang diambil.
- Alternatives: alternatif yang dipertimbangkan.
- Consequences: konsekuensi positif dan negatif.
- Status: proposed, accepted, deprecated.

Contoh keputusan:

Mengapa transaksi POS tidak langsung mengirim request ke SIMKOPDES?

Karena transaksi internal harus tetap dapat diselesaikan ketika layanan eksternal mengalami gangguan. Maka dipilih pola transactional outbox untuk pengiriman data secara asynchronous.

Ketika keputusan ini diubah, tim bisa melihat alasan keputusan awalnya.

# 7. API & Integration Documentation

Developer tidak seharusnya membuat endpoint berdasarkan tebakan.

Setiap endpoint harus mempunyai API specification.

Contoh:

```
# API Specification

## POST /api/v1/receivables

Purpose:
Create a receivable.

## Authentication
Required.

## Permission
receivables.create

## Request

{
  "customer_id": "uuid",
  "sale_id": "uuid",
  "payment_term_id": "uuid"
}

## Response

{
  "id": "uuid",
  "status": "PENDING_APPROVAL",
  "principal_amount": 150000,
  "outstanding_amount": 150000
}

## Error Cases

- CUSTOMER_NOT_ELIGIBLE
- CREDIT_LIMIT_EXCEEDED
- AGREEMENT_REQUIRED
- INVALID_SALE
- DUPLICATE_REQUEST
```

Untuk API yang sudah matang, gunakan OpenAPI sebagai kontrak teknis dan simpan spesifikasinya di repository.

Untuk integrasi eksternal, tambahkan:

- Authentication requirements.
- Data mapping.
- Request/response schema.
- Rate limits.
- Error handling.
- Retry policy.
- Idempotency.
- Synchronization strategy.

Khusus SIMKOPDES, spesifikasi endpoint baru diisi ketika dokumentasi resmi tersedia.

# 8. Security & Compliance Documentation

Ini menjadi sangat penting untuk fitur keuangan dan dokumen legal KasirSakti.

Dokumentasi harus mencakup:

| Dokumen                          | Isi                                 |
| -------------------------------- | ----------------------------------- |
| `security-requirements.md`       | Persyaratan keamanan                |
| `rbac-matrix.md`                 | Matriks hak akses                   |
| `privacy-policy-requirements.md` | Pengelolaan data pribadi            |
| `threat-model.md`                | Ancaman dan mitigasi                |
| `agreement-requirements.md`      | Persyaratan perjanjian              |
| `legal-review-log.md`            | Keputusan hukum yang sudah ditinjau |

Contoh threat model:

```
# Threat Model: Kasbon

## Threat 1
Kasir memanipulasi saldo piutang.

Mitigation:
- RBAC
- Immutable financial ledger
- Audit logs
- Approval controls

## Threat 2
Dokumen perjanjian diubah setelah tanda tangan.

Mitigation:
- Document versioning
- File integrity verification
- Signature verification
- Immutable document storage

## Threat 3
Pelanggan mengakses data pelanggan lain.

Mitigation:
- Tenant isolation
- Resource-level authorization
- Data access logging
```

AI boleh membantu menganalisis risiko dan menyiapkan draft dokumen legal, tetapi validasi hukum final harus dilakukan tenaga profesional yang berwenang.

# 9. Quality Assurance Documentation

QA Agent harus menguji apakah implementasi memenuhi spesifikasi PM.

Jangan hanya meminta AI mengecek apakah aplikasi bisa dibuka.

Dokumentasi QA:

| Dokumen              | Isi                     |
| -------------------- | ----------------------- |
| `test-strategy.md`   | Strategi pengujian      |
| `test-cases/`        | Daftar kasus pengujian  |
| `regression-test.md` | Pengujian fitur lama    |
| `uat/`               | User Acceptance Testing |
| `bug-reports/`       | Dokumentasi bug         |

Contoh:

```
# Test Case

Test ID: TC-CREDIT-001

Feature: FEAT-CREDIT-001

Use Case: UC-CREDIT-001

## Scenario
Create kasbon above agreement threshold.

## Preconditions
- Customer is verified.
- Credit facility is active.
- Cashier has permission.

## Test Steps
1. Login as cashier.
2. Open POS.
3. Select customer.
4. Add products.
5. Create kasbon Rp150.000.

## Expected Result
- Agreement is required.
- Approval process starts.
- Transaction cannot finalize prematurely.

## Status
NOT TESTED
```

Inilah pentingnya ID yang konsisten. QA dapat langsung menghubungkan test case dengan use case dan requirement asalnya.

# 10. Delivery & Operations Documentation

Setelah fitur lulus testing, sistem memasuki delivery dan operasional.

Dokumen yang disiapkan:

- Sprint planning.
- Release planning.
- Deployment checklist.
- Migration plan.
- Rollback procedure.
- Changelog.
- Monitoring.
- Backup and recovery.
- Incident management.
- Maintenance SOP.

Contoh release checklist:

```
# Release Checklist

## Functional
- [ ] PRD requirements fulfilled.
- [ ] Acceptance criteria passed.
- [ ] Regression tests passed.

## Security
- [ ] RBAC verified.
- [ ] Tenant isolation verified.
- [ ] Sensitive data protected.

## Infrastructure
- [ ] Database backup verified.
- [ ] Migration tested.
- [ ] Monitoring enabled.
- [ ] Rollback procedure prepared.

## Approval
- [ ] Product approval.
- [ ] Technical approval.
- [ ] QA approval.
```

# 11. Bagaimana cara kerja masing-masing AI Agent?

Nah, sekarang masuk ke bagian yang menurutku paling menarik untuk workflow vibe coding kamu.

Jangan hanya menyediakan dokumen. Kamu juga perlu menyediakan Agent Definition.

Setiap agent mempunyai identitas, tanggung jawab, batasan, input, output, dan kriteria keberhasilan.

## Agent organization KasirSakti

Human Product Owner

Pemilik keputusan akhir, prioritas, dan persetujuan

Product Management Agent

Product Owner's AI partner

Discovery · PRD · Feature Specs · Use Cases

Business Analyst

Business logic dan requirements

Solution Architect

Technical design dan architecture

UI/UX Agent

User journey dan UI specification

Security Agent

Security dan compliance review

Developer Agent

Backend dan frontend

QA Agent

Testing dan verification

Release & Human Acceptance

Production approval dan validasi hasil

Agent tersebut bisa dijalankan secara berurutan, paralel untuk pekerjaan yang independen, atau melalui orchestrator. Tidak perlu semuanya berjalan sekaligus.

### Agent 1 — Product Manager Agent

Agent utama untuk product discovery

Lokasi:

`agents/pm/AGENT.md`

Tanggung jawab:

- Memahami kebutuhan bisnis.
- Melakukan product discovery.
- Mengidentifikasi user persona.
- Merancang product vision.
- Menulis PRD.
- Membuat epic dan feature breakdown.
- Menulis use case.
- Membuat user story.
- Menentukan business rules.
- Menentukan acceptance criteria.
- Mengidentifikasi edge cases.
- Menentukan prioritas.
- Menyusun backlog.
- Mengidentifikasi risiko dan pertanyaan terbuka.

Batasan:

PM Agent tidak boleh langsung menulis kode aplikasi, mengubah arsitektur tanpa review, atau menetapkan keputusan hukum sebagai fakta.

### Agent 2 — Business Analyst Agent

Tanggung jawab:

- Menelaah proses bisnis.
- Mencari ketidakkonsistenan requirement.
- Membuat business process diagram.
- Menyusun decision table.
- Memetakan aturan dan kondisi.
- Memeriksa completeness use case.
- Menemukan skenario yang terlewat.

### Agent 3 — Solution Architect Agent

Tanggung jawab:

- Menelaah PRD yang sudah disetujui.
- Membuat HLD dan LLD.
- Merancang ERD.
- Mendefinisikan API.
- Menentukan architecture pattern.
- Membuat ADR.
- Mengidentifikasi technical risk.

### Agent 4 — UI/UX Agent

Tanggung jawab:

- Membuat user journey.
- Menyusun wireframe.
- Menentukan komponen UI.
- Membuat screen specification.
- Menyusun design states.
- Memeriksa konsistensi desain dengan use case.

### Agent 5 — Developer Agent

Tanggung jawab:

- Membaca spesifikasi yang sudah disetujui.
- Mengimplementasikan backend.
- Mengimplementasikan frontend.
- Membuat database migration.
- Menulis automated tests.
- Menjaga kesesuaian implementasi dengan requirement.

### Agent 6 — QA Agent

Tanggung jawab:

- Menurunkan acceptance criteria menjadi test case.
- Menguji normal flow.
- Menguji alternate flow.
- Menguji edge cases.
- Menjalankan regression testing.
- Mengidentifikasi bug.
- Memverifikasi perbaikan.
- Membuat QA report.

### Agent 7 — Security Agent

Tanggung jawab:

- Threat modeling.
- Authorization review.
- Tenant isolation testing.
- Data privacy review.
- Vulnerability analysis.
- Security acceptance review.

# 12. Standar cara kerja PM Agent

Sekarang kita tentukan metode kerja PM Agent supaya hasilnya tidak tergantung pada kreativitas AI setiap kali kamu memberikan perintah.

PM Agent sebaiknya menggunakan kombinasi metode Product Management berikut.

| Metode                 | Kegunaan                                       |
| ---------------------- | ---------------------------------------------- |
| Design Thinking        | Memahami kebutuhan dan masalah pengguna        |
| Jobs To Be Done (JTBD) | Memahami tujuan sebenarnya pengguna            |
| User Journey Mapping   | Memahami alur perjalanan pengguna              |
| Impact Mapping         | Menghubungkan fitur dengan dampak bisnis       |
| User Story Mapping     | Membagi kebutuhan menjadi alur dan rilis       |
| INVEST                 | Memastikan user story berkualitas              |
| MoSCoW                 | Memilah prioritas requirement                  |
| RICE                   | Membantu memilih prioritas fitur               |
| Given-When-Then        | Mendefinisikan acceptance criteria             |
| Risk Analysis          | Mengidentifikasi risiko bisnis dan operasional |

Tidak semua metode harus digunakan untuk setiap fitur. PM Agent memilih metode berdasarkan kompleksitas dan konteks masalah.

## Workflow baku PM Agent

1. Requirement Intake

   Menerima ide, permintaan, masalah, dan konteks produk.
2. Discovery & Research

   Mengidentifikasi stakeholder, bukti, masalah dan asumsi.
3. Problem Definition

   Mendefinisikan problem statement dan target outcome.
4. Solution Exploration

   Mempertimbangkan beberapa solusi, manfaat, risiko dan trade-off.
5. Scope & Prioritization

   Menentukan MVP, epic, feature, dan prioritas.
6. Requirements Specification

   Menulis PRD, use case, user story, rules, workflow, dan acceptance criteria.
7. Requirements Validation

   Memeriksa konsistensi, kelengkapan dan edge cases.
8. Human Approval

   Meminta persetujuan product owner untuk requirement dan keputusan bisnis.
9. Engineering Handoff

   Menyerahkan spesifikasi kepada Architect, UX, Developer dan QA.

## Contoh aturan yang harus dimiliki PM Agent

File: `agents/pm/AGENT.md`

Berikut contoh instruksi dasarnya:

```
# PRODUCT MANAGER AGENT

## 1. Role

You are a Senior Product Manager and
Product Management Specialist.

Use a professional product development
methodology and approach.

You are responsible for transforming
business ideas into structured,
validated product requirements.

## 2. Responsibilities

You must:

- Understand business problems.
- Identify user personas.
- Conduct product discovery.
- Define product requirements.
- Create PRD documents.
- Create epics and feature specifications.
- Write use cases and user stories.
- Define business rules.
- Create workflow diagrams.
- Define acceptance criteria.
- Identify edge cases.
- Prioritize product backlog.
- Identify product risks.

## 3. Mandatory Principles

1. Understand the problem before proposing solutions.
2. Do not invent business requirements.
3. Separate facts, assumptions and hypotheses.
4. Ask focused clarification questions
   when critical information is missing.
5. Define clear business rules.
6. Cover normal and exceptional workflows.
7. Make requirements testable.
8. Maintain traceability between documents.
9. Keep documentation updated.
10. Never silently change approved requirements.

## 4. Documentation Rules

All product documentation must be stored
inside /docs.

Follow the documentation templates in:

/docs/00-governance/templates/

Use consistent IDs for:

- PRD
- EPIC
- FEAT
- UC
- US
- BR
- AC
- FR
- NFR

## 5. Output Requirements

Every complex feature must have:

- Feature overview
- Problem statement
- Business objectives
- Scope
- User personas
- Workflows
- Use cases
- User stories
- Business rules
- Acceptance criteria
- Permission requirements
- Edge cases
- Dependencies
- Risks
- Open questions

## 6. Restrictions

- Do not write production code.
- Do not make unapproved business decisions.
- Do not invent legal conclusions.
- Do not invent external API specifications.
- Do not mark a requirement APPROVED
  without explicit human approval.

## 7. Completion Criteria

A feature specification is complete only
when its requirements are sufficiently
clear, testable, traceable and reviewed.

A complete draft is not automatically
an approved requirement.
```

Instruksi tersebut adalah aturan kerja inti. Detailnya nanti bisa diperluas menggunakan template dan workflow khusus.

# 13. Standard dokumentasi dan status approval

Ini penting agar AI tidak sembarangan menganggap semua dokumen final.

Aku merekomendasikan setiap dokumen mempunyai metadata.

Contoh `README.md` sebuah fitur:

```
---
id: FEAT-CREDIT-001
title: Kasbon Management
type: feature
status: IN_REVIEW
priority: P0
owner: PM Agent
version: 0.1.0
created_at: 2026-11-05
updated_at: 2026-11-05
related_epics:
  - EPIC-CREDIT
related_features:
  - FEAT-LEGAL-001
depends_on:
  - FEAT-MEMBER-001
  - FEAT-POS-001
---
```

Status dokumen yang disarankan:

| Status           | Arti                         |
| ---------------- | ---------------------------- |
| `DRAFT`          | Sedang dibuat                |
| `IN_DISCOVERY`   | Sedang divalidasi            |
| `IN_REVIEW`      | Menunggu review              |
| `APPROVED`       | Disetujui pemilik produk     |
| `READY_FOR_DEV`  | Siap diserahkan ke developer |
| `IN_DEVELOPMENT` | Sedang diimplementasikan     |
| `IN_QA`          | Sedang diuji                 |
| `ACCEPTED`       | Lulus acceptance             |
| `RELEASED`       | Sudah dirilis                |
| `DEPRECATED`     | Tidak digunakan lagi         |

Aturan yang wajib diterapkan:

Developer Agent hanya mengimplementasikan requirement berstatus `READY_FOR_DEV`.

Jika Developer menemukan requirement ambigu, dia membuat pertanyaan atau blocker, bukan memutuskan perubahan bisnis sendiri.

Jika ada perubahan requirement yang sudah disetujui, PM harus memperbarui dokumen, menaikkan versi bila diperlukan, mencatat perubahan dan meminta persetujuan ulang pada bagian yang terdampak.

# 14. Traceability — menghubungkan seluruh pekerjaan AI

Ini salah satu kemampuan yang membedakan workflow vibe coding biasa dengan workflow engineering yang terstruktur.

Misalnya kamu ingin membangun satu fitur kasbon.

Semua pekerjaan harus bisa ditelusuri:

PRD-001

Product requirement

EPIC-CREDIT

Credit Management

FEAT-CREDIT-001

Kasbon Management

UC-CREDIT-001

Use Case

BR-CREDIT-001

Business Rule

US-CREDIT-001

User Story

AC-CREDIT-001

Acceptance Criteria

Technical Implementation

API · Database · Backend · Frontend

TC-CREDIT-001

Test Case dan QA Result

Manfaatnya:

- Kamu tahu setiap kode dibuat untuk kebutuhan apa.
- Perubahan PRD dapat diketahui dampaknya.
- QA mengetahui apa yang harus diuji.
- Developer tidak kehilangan konteks.
- PM dapat mengetahui fitur yang belum memenuhi persyaratan.

Aku juga menyarankan setiap fitur mempunyai bagian `Related Documents` agar referensi silang mudah dilakukan oleh agent.

# 15. Cara seluruh Agent bekerja ketika kamu melakukan vibe coding

Sekarang kita gabungkan semuanya ke workflow nyata.

Misalnya kamu memberikan perintah:

> Saya ingin menambahkan fitur pembayaran cicilan kasbon di KasirSakti.

Kamu tidak perlu langsung meminta AI menulis kode.

Alur idealnya seperti ini:

Contoh satu siklus development

1. Kamu → PM Agent

   "Analisis kebutuhan pembayaran cicilan kasbon."

   PM membaca dokumentasi, mengidentifikasi masalah, menulis use case dan business rules.

   Output: Feature Specification
2. PM Agent → Kamu

   PM menyajikan dokumen untuk direview.

   Kamu menyetujui aturan cicilan, pembayaran sebagian, jatuh tempo dan pelunasan.

   Human approval
3. PM Agent → Architect Agent

   Architect membaca requirement yang sudah disetujui, merancang database dan API.

   Output: Technical Design
4. PM Agent → UI/UX Agent

   UI/UX membuat rancangan tampilan berdasarkan use case.

   Output: Screen Specification
5. Architect + UX → Developer Agent

   Developer membaca seluruh dokumen yang relevan dan mengimplementasikan fitur.

   Output: Working Feature
6. Developer → QA Agent

   QA membuat test case berdasarkan acceptance criteria, kemudian menjalankan pengujian.

   Output: QA Report
7. QA → Kamu

   Kamu menerima laporan hasil implementasi, temuan bug, dan status acceptance.

   Setelah dinyatakan layak, fitur dapat disiapkan untuk release.

### Contoh perintah yang nanti kamu gunakan

Kamu bisa memberikan instruksi sederhana:

```
@PM

Saya ingin membuat fitur pembayaran cicilan kasbon.

Analisis kebutuhan bisnis dan dokumentasi
fitur yang sudah ada.

Jangan langsung membuat kode.

Identifikasi:
1. Kebutuhan pengguna.
2. Workflow.
3. Use cases.
4. Business rules.
5. Acceptance criteria.
6. Edge cases.
7. Dependencies.

Simpan seluruh hasilnya ke folder docs.

Setelah selesai, presentasikan dokumen
dan tunggu persetujuan saya.
```

Setelah dokumen disetujui:

```
@ARCHITECT

Analisis dokumentasi fitur yang sudah APPROVED.

Buat technical design:
- Database design
- ERD
- API specification
- Business logic mapping
- Security requirements
- Architecture decisions

Jangan mengubah business requirements
tanpa persetujuan PM.
```

Kemudian:

```
@DEVELOPER

Implementasikan feature yang berstatus READY_FOR_DEV.

Baca:
- PRD
- Feature specification
- Use cases
- Business rules
- Acceptance criteria
- Technical design

Jangan mengarang requirement baru.

Buat automated tests dan laporkan
setiap ketidaksesuaian atau blocker.
```

Dengan cara ini, kamu tetap bisa melakukan vibe coding secara cepat, tetapi setiap instruksi memiliki dasar dokumentasi.

# 16. Root AGENTS.md — aturan seluruh tim AI

Selain instruksi khusus masing-masing agent, buat satu file di root repository.

`AGENTS.md`

Fungsinya sebagai pedoman bersama semua agent.

Contoh:

```
# KASIRSAKTI ENGINEERING RULES

## 1. Project Context

KasirSakti is a cooperative POS and
operational management platform.

## 2. Documentation First

Before implementing any feature:

1. Read the project documentation.
2. Identify related PRD.
3. Identify related feature specifications.
4. Read use cases and business rules.
5. Read acceptance criteria.
6. Read related architecture documents.

## 3. Source of Truth

Product requirements:
 /docs/03-requirements/

Architecture:
 /docs/05-architecture/

API specifications:
 /docs/06-api/

Security:
 /docs/07-security-compliance/

QA:
 /docs/08-quality-assurance/

## 4. Engineering Rules

- Do not invent business rules.
- Do not silently change approved requirements.
- Do not duplicate business logic.
- Follow existing architecture decisions.
- Respect RBAC permissions.
- Respect tenant isolation.
- Maintain data integrity.
- Write tests for business-critical logic.
- Maintain auditability of financial operations.

## 5. Change Management

When implementation requires a change:

1. Identify the affected requirement.
2. Document the proposed change.
3. Explain the impact.
4. Request approval when the business decision changes.
5. Update the documentation.
6. Continue implementation only after approval.

## 6. Quality Requirements

A feature is not complete merely because
the code compiles.

It must satisfy its acceptance criteria
and pass the required tests.
```

Perlu diperhatikan: format pemanggilan sub-agent dan mekanisme pewarisan instruksi bergantung pada coding agent yang kamu gunakan. `AGENTS.md` ini menjadi pedoman bersama; file konfigurasi seperti `.github/agents/`, skill, atau konfigurasi khusus Claude/Cursor bisa dibuat sebagai adapter sesuai tool.

# 17. Jangan membuat dokumentasi terlalu rumit

Ada satu hal yang ingin aku tekankan.

Kita tidak ingin menghasilkan 1.000 file Markdown yang tidak pernah dibaca siapa pun.

Gunakan prinsip berikut:

| Jenis fitur           | Dokumentasi                                          |
| --------------------- | ---------------------------------------------------- |
| Fitur sederhana       | Feature spec + acceptance criteria                   |
| Fitur menengah        | Feature spec + use case + business rules + tests     |
| Fitur kompleks        | Full specification seperti contoh kasbon             |
| Fitur finansial/legal | Full specification + security + legal review         |
| Perubahan bug         | Bug report + regression test + dokumentasi terdampak |

Untuk awal, aku sarankan dokumen berikut menjadi wajib:

1. PRD.
2. Feature Specification.
3. Use Case.
4. Business Rules.
5. Acceptance Criteria.
6. Workflow.
7. Technical Design ketika sudah diserahkan kepada Architect.
8. Test Cases ketika sudah diserahkan kepada QA.

Dokumen lainnya disesuaikan dengan kebutuhan fitur.

# 18. Rencana penerapan di KasirSakti

Aku tidak menyarankan langsung mengaktifkan tujuh agent dan meminta mereka membangun seluruh sistem.

Kita lakukan bertahap.

| Tahap | Pekerjaan                             | Hasil                        |
| ----- | ------------------------------------- | ---------------------------- |
| 1     | Membuat struktur folder               | Documentation foundation     |
| 2     | Membuat instruksi PM Agent            | PM Agent siap digunakan      |
| 3     | Audit aplikasi existing               | Existing system audit        |
| 4     | Product discovery KDKMP               | Business requirements        |
| 5     | Membuat PRD                           | Product baseline             |
| 6     | Membuat feature specifications        | Use cases dan business logic |
| 7     | Membuat Agent Architect               | Technical design             |
| 8     | Membuat UI/UX, Developer dan QA Agent | Engineering workflow         |
| 9     | Pilot satu unit usaha                 | Validasi sistem nyata        |

Saran saya: mulai dari PM Agent terlebih dahulu. Jangan membangun agent lain sebelum dokumentasi produk memiliki standar yang jelas.

## 19. Definition of Success

Pada akhirnya, ketika kamu memberikan ide fitur baru, PM Agent harus bisa menghasilkan dokumen dengan struktur seperti ini:

FEAT-CREDIT-001 — Kasbon Management

Approved example

Problem statement

Business requirements

User personas

Workflow diagrams

Use case specifications

Business rules

Acceptance criteria

Edge cases

Permission matrix

Technical dependencies

Output akhir: satu paket dokumentasi yang dapat diserahkan ke Architect, Developer, dan QA tanpa harus mengulang seluruh diskusi dari awal.

## 20. Langkah selanjutnya

Ada dua hal yang sebaiknya kita kerjakan berurutan:

Pertama: membangun PM Agent System Prompt yang profesional, lengkap dengan metode kerja, aturan dokumentasi, template, cara melakukan discovery, validasi requirements, serta mekanisme approval.

Kedua: membuat seluruh starter documentation KasirSakti sebagai file Markdown yang benar-benar siap dimasukkan ke repository.

Supaya konfigurasi agent tidak salah format, aku perlu tahu satu hal:

Coding agent utama yang sekarang kamu gunakan?

Claude Code

Cursor

OpenAI Codex

Google Antigravity

Lainnya / kombinasi tools

Model penggunaan agent yang kamu inginkan?

Multi-agent dengan role masing-masing

Satu orchestrator yang mengatur seluruh agent

Hybrid: orchestrator + specialist agents

Lanjutkan membangun Agent System

Menurutku, arsitektur hybrid akan menjadi target yang bagus: satu orchestrator mengatur pekerjaan, sementara setiap specialist agent memiliki tanggung jawab dan dokumentasi masing-masing.

Review backlog mingguan KasirSakti juga sudah berhasil dibuat.

📋Review backlog KasirSakti setiap SeninMingguan · ⁨Senin⁩ pagi

Jalankan sekarang
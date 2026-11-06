# 📚 KasirSakti Project Documentation System

Selamat datang di Sistem Dokumentasi Rekayasa Produk KasirSakti (**KasirSakti Product Engineering Documentation System**).

Dokumentasi ini dirancang mengikuti blueprint **Agentic Product Engineering** dan prinsip **AI Spec-Driven Development**, berfungsi sebagai kontrak kerja tunggal (*single source of truth*) bagi seluruh tim pengembang manusia dan AI Agent (PM, BA, Solution Architect, UI/UX, Developer, QA, dan Security).

---

## 🧭 Siklus Hidup Dokumentasi (Documentation Lifecycle)

```
[01-PRODUCT MANAGEMENT]
   Vision · Strategy · Roadmap · MVP Scope · Metrics · Personas
       │
       ▼
[02-DISCOVERY & RESEARCH]
   Problem Statements · Research · Assumptions · AS-IS / TO-BE Process · Integrations
       │
       ▼
[03-REQUIREMENTS ENGINEERING]
   PRD · Epics · Feature Specifications · Use Cases · Business Rules · Stories · AC
       │
       ▼
[04-UX DESIGN & 05-ARCHITECTURE]
   Journeys · Screen Specs · HLD · LLD · ERD · Data Dictionary · ADR
       │
       ▼
[06-API & 07-SECURITY]
   API Specs · Auth · RBAC Matrix · Threat Model · Legal Compliance
       │
       ▼
[08-QUALITY ASSURANCE]
   Test Strategy · Test Cases (Given-When-Then) · Regression · UAT
       │
       ▼
[09-DELIVERY & 10-OPERATIONS]
   Sprint Plan · Release Plan · Monitoring · Backup · Maintenance
```

---

## 🗂️ Peta Struktur Folder Dokumentasi

| Folder | Nama Domain | Penjelasan & Cakupan |
| :--- | :--- | :--- |
| [`00-governance/`](./00-governance/) | **Tata Kelola & Standar** | Aturan penulisan dokumen, konvensi penamaan ID, glosarium istilah, log keputusan, dan template standar. |
| [`01-product/`](./01-product/) | **Manajemen Produk** | Visi jangka panjang, strategi, roadmap, ruang lingkup MVP, metrik keberhasilan, stakeholder, dan persona pengguna. |
| [`02-discovery/`](./02-discovery/) | **Riset & Discovery** | Problem statements, asumsi bisnis, pertanyaan terbuka, proses bisnis (AS-IS vs TO-BE), dan riset integrasi. |
| [`03-requirements/`](./03-requirements/) | **Rekayasa Kebutuhan** | PRD induk, breakdown Epic bisnis, spesifikasi Fitur mendalam, use cases, business rules, acceptance criteria, dan backlog. |
| [`04-ux-design/`](./04-ux-design/) | **Desain Pengalaman Pengguna** | Prinsip desain, alur perjalanan pengguna (*user journeys*), wireframes, spesifikasi layar (*screen specs*), dan state UI. |
| [`05-architecture/`](./05-architecture/) | **Arsitektur Sistem** | System context (C4), High-Level Design (HLD), Low-Level Design (LLD), ERD basis data, kamus data, dan ADR. |
| [`06-api/`](./06-api/) | **Spesifikasi API** | Standar kontrak REST API, pipeline otentikasi JWT, dan rincian endpoint per domain modul. |
| [`07-security-compliance/`](./07-security-compliance/) | **Keamanan & Kepatuhan** | Persyaratan keamanan, matriks RBAC, privasi data (UU PDP), pemodelan ancaman (STRIDE), dan tinjauan hukum. |
| [`08-quality-assurance/`](./08-quality-assurance/) | **Jaminan Kualitas (QA)** | Strategi pengujian, inventaris test cases (Given-When-Then), regresi, skenario UAT, dan pencatatan bug. |
| [`09-delivery/`](./09-delivery/) | **Rilis & Pengiriman** | Perencanaan sprint, jadwal rilis, SOP deployment, checklist produksi, dan catatan perubahan (*changelog*). |
| [`10-operations/`](./10-operations/) | **Operasional & Pemeliharaan** | Monitoring performa, backup & recovery, penanganan insiden, dan SOP pemeliharaan rutin database. |

> [!NOTE]
> File teknis Swagger API (`docs.go`, `swagger.go`, `swagger.json`, `swagger.yaml`) dipertahankan secara utuh pada folder `docs/` untuk menjamin kompatibilitas kompilasi framework Go backend `main.go`.

---

## 🏷️ Siklus Status Dokumen (Document Lifecycle Status)

Setiap dokumen spesifikasi wajib memiliki status formal di frontmatter:
- `DRAFT`: Dokumen sedang dalam tahap penyusunan awal.
- `IN_DISCOVERY`: Sedang mengumpulkan data lapangan atau memvalidasi masalah pengguna.
- `IN_REVIEW`: Sedang ditinjau oleh tim BA, Arsitek, atau Security.
- `APPROVED`: Telah disetujui secara resmi oleh Pemilik Produk manusia.
- `READY_FOR_DEV`: Spesifikasi lengkap dan siap diimplementasikan oleh Developer Agent.
- `IN_DEVELOPMENT`: Kode sedang dikembangkan di cabang kerja.
- `IN_QA`: Kode selesai dan sedang diverifikasi oleh QA Agent.
- `ACCEPTED`: Lulus seluruh skenario pengujian dan kriteria penerimaan.
- `RELEASED`: Telah dideploy ke lingkungan produksi.
- `DEPRECATED`: Fitur atau dokumen tidak berlaku lagi.

---

## 🔗 Prinsip Requirements Traceability

Setiap baris kode dan setiap test case harus memiliki silsilah yang dapat dilacak:
$$\text{PRD} \longrightarrow \text{EPIC} \longrightarrow \text{FEAT} \longrightarrow \text{UC / US} \longrightarrow \text{BR / AC} \longrightarrow \text{CODE} \longrightarrow \text{TEST (TC)}$$

Dilarang keras mengimplementasikan fitur atau aturan bisnis yang tidak memiliki dokumen induk berstatus `READY_FOR_DEV`.

# 🤖 Sakti-Agent — KasirSakti Engineering Ecosystem AI Master Guidelines

Dokumen ini adalah pedoman operasional terpusat (*Single Source of Truth*) untuk seluruh AI Assistant, Agent Spesialis (`agents/` & `.agents/skills/`), dan tim rekayasa perangkat lunak dalam merancang, mendokumentasikan, dan mengimplementasikan solusi pada ekosistem **KasirSakti** (Backend `kasirsakti-be`, Frontend `kasirsakti-fe`, dan E2E Testing `kasirsakti-e2e`).

Framework ini mengadopsi metodologi **AI Spec-Driven Development** yang hemat token, terstruktur, dan terverifikasi secara multi-agent.

---

## 1. Prinsip Utama Penghematan Token (Progressive Disclosure)

Dilarang memuat seluruh isi repository ke dalam konteks percakapan. Terapkan 5 tahap bertahap:

```
[Tahap 1: Kenali Tugas] ➔ [Tahap 2: Baca 1 Skill Relevan] ➔ [Tahap 3: Muat Referensi Seperlunya] ➔ [Tahap 4: Telusuri Graph Dependensi] ➔ [Tahap 5: Eksekusi Deliverable]
```

1. **Kenali Tugas**: Identifikasi peran mana yang bertanggung jawab (PM, BA, UI/UX, Architect, Frontend, Backend, QE, atau Security).
2. **Baca 1 Skill Saja**: Muat file `.agents/skills/<role>/SKILL.md` atau `agents/<role>/AGENT.md` yang spesifik untuk tugas tersebut.
3. **Ambil Referensi Seperlunya**: Hanya baca file dokumen di `docs/` atau `.agents/skills/<role>/references/` yang dibutuhkan secara langsung.
4. **Telusuri Dependensi**: Gunakan `data/knowledge-graph.json` dan skrip `scripts/graph-lookup.js` untuk menavigasi modul, tipe data, dan endpoint yang terdampak tanpa memindai seluruh folder source code.
5. **Hasilkan Deliverable**: Buat dokumen atau kode sesuai standar, catat asumsi terbuka (`[TODO: PENDING_CONFIRMATION]`), dan perbarui `data/backlog.json`.

---

## 2. Pembagian 8 Peran Spesialis & Shortcut Panggilan

| Peran AI Agent | Shortcut Skill (`/`) | File Konteks (`@`) | Lokasi Panduan Lengkap | Scope Dokumen yang Dibaca |
| :--- | :--- | :--- | :--- | :--- |
| **Product Manager (PM)** | `/pm` | `@agents/pm/AGENT.md` | [`.agents/skills/product-manager/`](./.agents/skills/product-manager/) | `docs/01-product/`, `docs/03-requirements/` |
| **Business Analyst (BA)** | `/ba` | `@agents/business-analyst/AGENT.md` | [`.agents/skills/business-analyst/`](./.agents/skills/business-analyst/) | `docs/02-discovery/`, `docs/03-requirements/workflows/` |
| **UI/UX Designer** | `/ui-ux` | `@agents/ui-ux/AGENT.md` | [`.agents/skills/ui-ux/`](./.agents/skills/ui-ux/) | `docs/04-ux-design/` |
| **Solution Architect** | `/architect` | `@agents/solution-architect/AGENT.md` | [`.agents/skills/solution-architect/`](./.agents/skills/solution-architect/) | `docs/05-architecture/`, `docs/06-api/` |
| **Frontend Developer** | `/dev` | `@agents/frontend-developer/AGENT.md` | [`.agents/skills/frontend-developer/`](./.agents/skills/frontend-developer/) | `docs/03-requirements/`, `docs/04-ux-design/`, `docs/06-api/` |
| **Backend Developer** | `/dev` | `@agents/backend-developer/AGENT.md` | [`.agents/skills/backend-developer/`](./.agents/skills/backend-developer/) | `docs/03-requirements/`, `docs/05-architecture/`, `docs/06-api/` |
| **Quality Engineer (QE)**| `/qa` | `@agents/quality-engineer/AGENT.md` | [`.agents/skills/quality-engineer/`](./.agents/skills/quality-engineer/) | `docs/08-quality-assurance/`, specs fitur |
| **Security Engineer** | `/security` | `@agents/security-engineer/AGENT.md` | [`.agents/skills/security-engineer/`](./.agents/skills/security-engineer/) | `docs/07-security-compliance/`, API & DB |

---

## 3. Cara Memanggil Role di Terminal Antigravity CLI (`agy`)

Tersedia 3 metode pemanggilan yang fleksibel:

1. **Metode Slash Command (`/`) (Paling Praktis)**:
   Ketik `/pm`, `/ba`, `/architect`, `/dev`, `/qa`, `/security`, atau `/ui-ux` untuk memuat skill langsung ke memori kerja Antigravity.
   Contoh:
   ```bash
   > /pm buatkan PRD fitur loyalty points
   ```
2. **Metode Teks Alami (`@role`)**:
   Jika Anda mengetik `@pm`, `@ba`, `@dev` langsung di dalam kalimat, AI secara otomatis mengenali peran yang diminta dan langsung memuat aturan yang bersangkutan.
   Contoh:
   ```bash
   > @pm buatkan kriteria penerimaan untuk modul autentikasi
   ```
3. **Metode File Mention (`@agents/...`)**:
   Ketik `@agents/` lalu pilih file `AGENT.md` spesifik dari folder `agents/` jika ingin melampirkan instruksi peran secara eksplisit.
   Contoh:
   ```bash
   > @agents/pm/AGENT.md tolong analisa risiko rilis fitur pembayaran
   ```

---

## 4. Aturan Status Kesiapan (Readiness Gates)

```
[DRAFT / IN_REVIEW] ──(Human Approval)──> [APPROVED] ──(Architect & UI/UX Ready)──> [READY_FOR_DEV] ──> [IN_DEV] ──> [IN_QA] ──> [DONE]
```

- `DRAFT` / `IN_REVIEW`: Dokumen sedang dirancang. Developer **DILARANG** menulis kode aplikasi.
- `APPROVED`: Disetujui oleh Human Product Owner.
- `READY_FOR_DEV`: Dokumen fungsional, UI screen spec, database schema, dan API contract lengkap. Developer **BOLEH** mulai implementasi.
- `IN_QA`: Implementasi selesai, Quality Engineer menjalankan verifikasi Acceptance Criteria.
- `DONE`: Semua test pass dan siap rilis.

---

## 5. Aturan Kolaborasi & Handoff Antar-Agent

Setiap handoff wajib mencakup 5 elemen:
1. **Goal**: Tujuan fitur atau tugas.
2. **Source Docs**: Tautan file dokumen sumber di `docs/`.
3. **Approval Status**: Status persetujuan (harus diverifikasi, tidak boleh diasumsikan).
4. **Dependencies**: Komponen atau modul lain yang terkait.
5. **Open Questions**: Hal yang masih memerlukan konfirmasi pengguna.

Agent penerima handoff **TIDAK BOLEH** mengasumsikan hasil kerja sebelumnya otomatis 100% benar; jika ada inkonsistensi, catat dan minta klarifikasi sebelum berasumsi.

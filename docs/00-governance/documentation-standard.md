# 📜 Standar Dokumentasi Rekayasa Produk KasirSakti

Dokumen ini mendefinisikan aturan baku penulisan, pemeliharaan, metadata, dan versioning untuk seluruh dokumen di KasirSakti.

---

## 1. Aturan Penulisan (Authoring Rules)
1. **Bahasa**: Dokumentasi bisnis, kebutuhan produk, dan user story ditulis menggunakan Bahasa Indonesia formal dan lugas. Dokumentasi arsitektur teknis dan kontrak API dapat menggunakan kombinasi Bahasa Indonesia dan terminologi baku Bahasa Inggris.
2. **Format Frontmatter Wajib**: Setiap dokumen spesifikasi atau arsitektur **wajib** diawali blok YAML frontmatter:
   ```yaml
   ---
   id: FEAT-CREDIT-001
   title: Kasbon Management
   type: feature # prd | epic | feature | use-case | adr | screen-spec | test-case
   status: DRAFT # DRAFT | IN_DISCOVERY | IN_REVIEW | APPROVED | READY_FOR_DEV | IN_DEVELOPMENT | IN_QA | ACCEPTED | RELEASED | DEPRECATED
   priority: P0 # P0 (Kritis) | P1 (Tinggi) | P2 (Menengah) | P3 (Rendah)
   owner: PM Agent
   version: 1.0.0
   created_at: 2026-11-05
   updated_at: 2026-11-05
   related_epics:
     - EPIC-CREDIT
   depends_on:
     - FEAT-POS-001
   ---
   ```
3. **Diagram Wajib Berformat Mermaid**: Seluruh diagram alur (*flowchart*), urutan interaksi (*sequence diagram*), dan siklus status (*state diagram*) harus dibuat dalam blok kode ````mermaid````. Dilarang menyematkan screenshot gambar yang tidak bisa diedit teksnya.
4. **Given-When-Then untuk Acceptance Criteria**: Seluruh kriteria penerimaan wajib diformulasikan dengan struktur Behavior Driven Development (BDD):
   - `Given`: Kondisi prasyarat atau status awal sistem.
   - `When`: Tindakan atau pemicu yang dilakukan oleh pengguna/aktor.
   - `Then`: Ekspektasi perubahan status sistem atau keluaran data.

---

## 2. Manajemen Perubahan & Versioning (Change Management)
- Menggunakan Semantic Versioning: `MAJOR.MINOR.PATCH`
  - `MAJOR`: Perubahan besar pada ruang lingkup atau perombakan alur bisnis.
  - `MINOR`: Penambahan use case, alternatif flow, atau aturan bisnis baru.
  - `PATCH`: Koreksi redaksional, klarifikasi catatan, atau perbaikan typo.
- **Pemberitahuan Perubahan**: Apabila ada perubahan pada dokumen berstatus `APPROVED` atau `READY_FOR_DEV`, status dikembalikan ke `IN_REVIEW` dan perubahan dicatat pada bagian *Changelog* di akhir dokumen.

---

## 3. Penanganan Ketidaktahuan (Anti-Halusinasi)
- AI Agent dilarang mengarang asumsi bisnis yang belum divalidasi.
- Jika suatu data belum diputuskan oleh pemangku kepentingan (misalnya: nominal denda keterlambatan, batas tenor kasbon maksimal, spesifikasi resmi SIMKOPDES), tandai secara eksplisit dengan tag:
  `[TODO: PENDING_STAKEHOLDER_CONFIRMATION]` atau `[PENDING: Menunggu spesifikasi resmi pihak ketiga]`.

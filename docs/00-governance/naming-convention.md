# 🏷️ Konvensi Penamaan ID Dokumen (Naming Convention)

Untuk menjaga ketertelusuran (*traceability*) lintas dokumen, seluruh entitas dokumentasi wajib menggunakan skema penomoran terstandarisasi berikut.

---

## 1. Prefix ID Dokumen & Entitas

| Prefix | Entitas | Contoh ID | Keterangan & Lokasi File |
| :--- | :--- | :--- | :--- |
| **PRD** | Product Requirements Document | `PRD-001-kasirsakti` | Dokumen induk produk (`docs/03-requirements/prd/`) |
| **EPIC** | Bisnis Epic | `EPIC-POS`, `EPIC-CREDIT` | Pengelompokan kapabilitas (`docs/03-requirements/epics/`) |
| **FEAT** | Feature Specification | `FEAT-CREDIT-001-kasbon` | Folder spesifikasi fitur (`docs/03-requirements/features/`) |
| **UC** | Use Case | `UC-CREDIT-001` | Skenario interaksi aktor-sistem (`features/.../use-cases/`) |
| **US** | User Story | `US-CREDIT-001` | Cerita kebutuhan pengguna (`features/.../user-stories.md`) |
| **BR** | Business Rule | `BR-CREDIT-001` | Aturan bisnis wajib (`features/.../business-rules.md`) |
| **AC** | Acceptance Criteria | `AC-CREDIT-001` | Kriteria uji kelulusan (`features/.../acceptance-criteria.md`) |
| **SCR** | Screen Specification | `SCR-POS-001` | Spesifikasi antarmuka layar (`docs/04-ux-design/screen-specifications/`) |
| **ADR** | Architecture Decision Record | `ADR-001-clean-arch` | Keputusan arsitektur (`docs/05-architecture/adr/`) |
| **TC** | Test Case QA | `TC-CREDIT-001` | Kasus uji pengujian sistem (`docs/08-quality-assurance/test-cases/`) |
| **BUG** | Laporan Bug Defect | `BUG-POS-001` | Rekam jejak temuan bug (`docs/08-quality-assurance/bug-reports/`) |

---

## 2. Standar Kode Modul / Domain

Setiap ID fitur dan spesifikasi menggunakan singkatan modul yang baku:
- `POS`: Transaksi kasir, meja, shift, cetak struk, void penjualan.
- `INVENTORY`: Katalog, varian produk, multi-unit, transfer stok, opname, resep/BOM.
- `CREDIT`: Piutang kasbon, credit limit, jadwal pembayaran, cicilan harvest.
- `LEGAL`: Dokumen perjanjian hutang/piutang, tanda tangan digital, arsip kepatuhan.
- `FINANCE`: Akuntansi jurnal berpasangan, buku besar, neraca, petty cash, arus kas.
- `HRIS`: Staf, karyawan, jadwal shift kerja, presensi absensi, payroll gaji.
- `MEMBER`: Manajemen anggota koperasi, pelanggan terdaftar, verifikasi identitas.
- `INTEGRATION`: Sinkronisasi pihak ketiga, e-faktur, SIMKOPDES.

---

## 3. Format Penamaan Folder & File
- Gunakan huruf kecil berkebab: `kebab-case.md`
- Hindari spasi dan karakter spesial: `FEAT-POS-001-sales/`, bukan `FEAT POS 001 (Sales)/`.
- Folder fitur wajib menyertakan kode modul dan nomor urut 3 digit: `FEAT-<MODUL>-<001>-<nama-singkat>/`.

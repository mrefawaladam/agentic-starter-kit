---
id: SCR-CREDIT-001
title: Spesifikasi Layar — Modal Persetujuan & Dokumen Kasbon
type: screen-spec
status: APPROVED
owner: UI/UX Agent
related_features:
  - FEAT-CREDIT-001
  - FEAT-LEGAL-001
related_use_cases:
  - UC-CREDIT-001
---

# 🖥️ SCR-CREDIT-001: Modal Persetujuan & Dokumen Kasbon

## 1. Tujuan & Sasaran Layar
Menampilkan rincian kewajiban kredit, pemeriksaan limit kredit, lembar perjanjian pengakuan hutang, serta kanvas tanda tangan digital bagi pelanggan dan otorisasi manajer.

---

## 2. Komponen Antarmuka (UI Components)
1. **Info Debitur**: Nama pelanggan, NIK, NIA anggota, total limit kredit, dan sisa limit berjalan.
2. **Indikator Level Kasbon**:
   - Badge Hijau: Level 1 (&le; Rp100.000, Langsung Proses).
   - Badge Oranye: Level 2 (&gt; Rp100.000, Wajib Dokumen & Approval).
3. **Pratinjau Surat Perjanjian**: Tampilan klausul pengakuan hutang dan tanggal jatuh tempo.
4. **Kanvas Tanda Tangan Digital**: Area tanda tangan layar sentuh atau tombol unggah foto bukti fisik.
5. **Form PIN Approval Manajer**: Input PIN/kata sandi otorisasi manajer outlet.

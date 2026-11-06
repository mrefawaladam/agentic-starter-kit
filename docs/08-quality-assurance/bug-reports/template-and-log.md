---
id: QA-BUG-001
title: Template Laporan Bug & Log Defect (Bug Reports)
type: bug-reports
status: APPROVED
owner: QA Agent
version: 1.0.0
created_at: 2026-11-05
updated_at: 2026-11-05
---

# 🐞 Template Laporan Bug & Log Defect

Dokumen ini memuat template standar pelaporan temuan cacat perangkat lunak serta rekapitulasi riwayat bug.

---

## 1. Template Laporan Bug
```markdown
### [BUG-XXX]: [Judul Singkat Masalah]
- **Tingkat Keparahan**: Critical (P0) / High (P1) / Medium (P2) / Low (P3)
- **Modul Terkait**: POS / Shift / Credit / Inventory / Finance
- **Lingkungan**: Local / Staging / Production
- **Prasyarat**: [Status database awal atau role pengguna]
- **Langkah Mereproduksi**:
  1. Login sebagai kasir...
  2. Buka endpoint / menu...
  3. Kirim payload JSON...
- **Hasil Aktual**: [Apa yang terjadi, pesan error / stack trace]
- **Hasil yang Diharapkan**: [Sesuai Acceptance Criteria nomor AC-XXX]
```

---

## 2. Log Defect Terkini

| Bug ID | Modul | Ringkasan Masalah | Severity | Status | Penanggung Jawab |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **BUG-001** | `POS/Shift` | Petty cash tidak mengurangi expected_cash shift. | `High` | `RESOLVED_IN_PLAN` | Developer Agent |
| **BUG-002** | `POS/Void` | Void belum membalik jurnal akuntansi. | `High` | `RESOLVED_IN_PLAN` | Developer Agent |

---
id: DISC-QUESTIONS-001
title: Daftar Pertanyaan Terbuka & Keputusan Tertunda (Open Questions)
type: open-questions
status: IN_REVIEW
owner: PM Agent
version: 1.0.0
created_at: 2026-11-05
updated_at: 2026-11-05
---

# ❓ Daftar Pertanyaan Terbuka & Keputusan Tertunda (Open Questions)

Dokumen ini memuat isu-isu kritis yang memerlukan konfirmasi atau keputusan resmi dari Human Product Owner, pengurus koperasi, atau penasihat hukum sebelum implementasi teknis difinalisasi.

---

## Log Pertanyaan Terbuka

### Q-001: Kebijakan Denda & Bunga Keterlambatan Kasbon
- **Pertanyaan**: Apakah koperasi memberlakukan denda keterlambatan (*late fee*) atau bunga administrasi bulanan jika kasbon melewati tanggal jatuh tempo?
- **Pilihan**:
  - Opsi A: Tanpa denda dan tanpa bunga sama sekali (sesuai prinsip kekeluargaan / syariah).
  - Opsi B: Denda administrasi flat nominal (misal Rp5.000 per minggu keterlambatan).
  - Opsi C: Bunga persentase proporsional dari sisa pokok pinjaman.
- **Status**: `[TODO: PENDING_STAKEHOLDER_CONFIRMATION]`
- **Penanggung Jawab**: Human Product Owner & Pengurus Koperasi.

---

### Q-002: Format Resmi & Metadata Integrasi SIMKOPDES
- **Pertanyaan**: Kapan dokumentasi resmi API SIMKOPDES dapat diakses oleh tim pengembang? Apakah data yang dikirimkan berupa ringkasan omzet harian atau rincian per baris nota?
- **Status**: `[PENDING: Menunggu rilis kementerian/dinas terkait]`
- **Penanggung Jawab**: Solution Architect & Bagian Humas Koperasi.

---

### Q-003: Kebijakan Toleransi Selisih Kas Shift Kasir
- **Pertanyaan**: Berapa batas toleransi deviasi selisih kas fisik (*cash_difference*) sebelum seorang kasir diwajibkan mengganti uang selisih tersebut dari gajinya?
- **Status**: `[TODO: PENDING_STAKEHOLDER_CONFIRMATION]`
- **Rekomendasi Awal**: Selisih negatif &le; Rp2.000 ditoleransi sebagai selisih pembulatan uang receh kasir.

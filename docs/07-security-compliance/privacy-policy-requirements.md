---
id: SEC-PRIV-001
title: Kepatuhan Privasi Data & UU PDP (Privacy Policy Requirements)
type: privacy-requirements
status: APPROVED
owner: Security Agent
version: 1.0.0
created_at: 2026-11-05
updated_at: 2026-11-05
---

# 🔒 Kepatuhan Privasi Data & UU PDP — KasirSakti

Dokumen ini mendefinisikan kepatuhan pengelolaan data pribadi anggota/pelanggan sesuai Undang-Undang Perlindungan Data Pribadi (UU PDP No. 27 Tahun 2022).

---

## 1. Klasifikasi Data Pribadi (PII Classification)
- **Data Pribadi Sensitif**: NIK KTP debitur kasbon, tanda tangan digital/spesimen tanda tangan, data gaji karyawan HRIS.
- **Data Pribadi Umum**: Nama lengkap, nomor telepon WhatsApp, alamat domisili.

---

## 2. Prinsip Perlindungan Data
1. **Minimisasi Data**: Hanya mengumpulkan data yang mutlak diperlukan untuk kepentingan pencatatan legalitas perjanjian hutang piutang kasbon.
2. **Enkripsi dalam Transit & Istirahat**: Seluruh lalu lintas data API wajib menggunakan HTTPS (TLS 1.3), dan backup database dienkripsi menggunakan AES-256.
3. **Akses Terbatas**: Kasir biasa hanya dapat melihat 4 digit terakhir nomor telepon pelanggan saat pencarian di POS.

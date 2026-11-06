---
id: PROD-SCOPE-001
title: MVP Scope — KasirSakti
type: scope
status: APPROVED
owner: PM Agent
version: 1.0.0
created_at: 2026-11-05
updated_at: 2026-11-05
---

# 📦 Batasan Ruang Lingkup MVP (Minimum Viable Product)

Dokumen ini menegaskan batas ruang lingkup yang termasuk (*in-scope*) dan yang dikecualikan (*out-of-scope*) untuk rilis Minimum Viable Product (MVP) KasirSakti.

---

## 1. Termasuk dalam MVP (In-Scope)
- **Manajemen Multi-Tenant & RBAC**:
  - Pendaftaran Merchant dan Cabang Outlet.
  - Otentikasi JWT dengan role: `owner`, `admin`, `cashier`, `finance`, `hr`.
- **Operasional Kasir & Laci Kas (Anti-Fraud)**:
  - Buka/tutup shift kasir dengan input modal awal.
  - *Blind cash shift closing* dengan perhitungan deviasi kas otomatis.
  - Pencatatan transaksi penjualan tunai, transfer, dan QRIS statis.
  - Pembatalan transaksi (*void*) yang membalik jurnal akuntansi dan memulihkan stok.
- **Katalog & Stok**:
  - Master produk dengan varian harga dan unit bertingkat (Dus, Pak, Pcs).
  - Pemotongan stok otomatis dan pencatatan riwayat mutasi stok.
- **Piutang Kasbon Dasar**:
  - Pencatatan penjualan dengan metode pembayaran kasbon/tempo.
  - Pencatatan pembayaran cicilan dan pelunasan kasbon.
- **Akuntansi Dasar**:
  - Posting otomatis entri jurnal seimbang (Debit/Kredit) untuk penjualan, HPP, kasbon, dan kas masuk/keluar.
  - Laporan Z-Report kasir harian.

---

## 2. Dikecualikan dari MVP (Out-of-Scope)
- **Sinkronisasi SIMKOPDES Otomatis**: [PENDING: Menunggu API spec resmi].
- **Tanda Tangan Digital Tersertifikasi (PSrE Berbayar)**: Menggunakan e-signature internal/unggah foto bukti fisik terlebih dahulu.
- **Payment Gateway Otomatis Dinamis**: Dinilai belum mendesak untuk toko/koperasi tahap awal.
- **Perhitungan Bunga Majemuk / Denda Finansial Rumit**: [TODO: PENDING_STAKEHOLDER_CONFIRMATION - Koperasi mengedepankan asas kekeluargaan tanpa bunga riba].

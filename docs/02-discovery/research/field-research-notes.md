---
id: RES-001
title: Catatan Riset Lapangan & Wawancara Pengguna
type: research
status: IN_DISCOVERY
owner: PM Agent
version: 1.0.0
created_at: 2026-11-05
updated_at: 2026-11-05
---

# 📝 Catatan Riset Lapangan & Wawancara Pengguna

Dokumen ini merekam temuan observasi operasional di unit usaha koperasi desa dan ritel UMKM mitra KasirSakti.

---

## 1. Temuan Lapangan: Kasir & Shift Laci Uang
- **Observasi**: Di banyak toko kelontong dan koperasi desa, kasir sering meminjam uang laci kasir untuk membayar kurir galon air, bensin operasional, atau pembelian es batu tanpa membuat nota kas kecil tertulis (*petty cash slip*).
- **Dampak Lapangan**: Pada saat pergantian shift sore, kasir mendapati uang laci kasir kurang Rp50.000 s/d Rp100.000, memicu perselisihan antara kasir dan pemilik toko.
- **Kesimpulan Kebutuhan**: Modul shift harus secara native mendukung fitur input `petty cash / expenses` yang langsung memperhitungkan rumus:
  $$\text{Expected Cash} = \text{Opening Cash} + \text{Cash Sales} - \text{Cash Expenses}$$

---

## 2. Temuan Lapangan: Transaksi Kasbon Pertanian
- **Observasi**: Petani anggota koperasi membeli pupuk bersubsidi atau pakan ternak senilai ratusan ribu hingga jutaan rupiah dengan kesepakatan lisan "bayar setelah panen jagung 3 bulan lagi".
- **Dampak Lapangan**: Catatan kasbon hanya ditulis di buku tulis kasir. Buku sering robek, terselip, atau nominal di buku berbeda dengan ingatan petani saat panen, menimbulkan sengketa hutang.
- **Status Kebutuhan**:
  - `[VALIDATED]`: Koperasi butuh pencatatan digital dengan bukti cetak struk kasbon.
  - `[PENDING: Validasi Legal]`: Dibutuhkan lembar perjanjian cetak/digital berstandar formal untuk transaksi di atas Rp100.000.

---

## 3. Riset Kebutuhan Integrasi SIMKOPDES
- **Observasi**: Beberapa pengurus koperasi diinstruksikan oleh dinas setempat untuk memasukkan laporan penjualan harian ke portal SIMKOPDES.
- **Status Data**:
  - `[TODO: PENDING_OFFICIAL_API_DOCS]`: Format payload JSON dan skema autentikasi SIMKOPDES belum tersedia secara publik.
  - Rekomendasi teknis: Siapkan arsitektur Transactional Outbox agar ketika API SIMKOPDES tersedia, integrasi dapat disambungkan tanpa merombak logika checkout lokal.

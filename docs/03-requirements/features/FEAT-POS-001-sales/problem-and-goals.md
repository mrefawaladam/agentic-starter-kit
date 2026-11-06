# 🎯 Problem & Goals: FEAT-POS-001

## 1. Problem Statement
- Kasir di toko ritel dan koperasi sering dihadapkan pada antrean panjang yang menuntut waktu layanan cepat (&lt; 15 detik).
- Rekonsiliasi fisik uang kas laci di akhir shift sering bermasalah karena kasir meminjam uang laci untuk kebutuhan toko tanpa catatan terintegrasi.
- Potensi manipulasi pembatalan nota kasir (*post-sale void*) setelah pelanggan meninggalkan toko.

## 2. Business Goals
- **Kecepatan**: Menyelesaikan pemrosesan checkout &lt; 50ms di backend.
- **Integritas Kas**: Memastikan deviasi kas laci terhitung matematis tanpa bias melalui *Blind Cash Closing*.
- **Integritas Akuntansi**: Menerbitkan entri jurnal otomatis secara seimbang untuk setiap transaksi berhasil maupun pembatalan.

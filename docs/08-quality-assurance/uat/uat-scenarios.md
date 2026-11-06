---
id: QA-UAT-001
title: Skenario User Acceptance Testing (UAT Scenarios)
type: uat-scenarios
status: APPROVED
owner: QA Agent
version: 1.0.0
created_at: 2026-11-05
updated_at: 2026-11-05
---

# 👥 Skenario User Acceptance Testing (UAT) — KasirSakti

Skenario pengujian penerimaan pengguna langsung oleh kasir, manajer toko, dan staf keuangan di lapangan.

---

## Skenario 1: Buka Shift, Transaksi Toko & Blind Closing Kasir
1. **Langkah 1**: Kasir membuka toko di pagi hari, login, menginput modal awal Rp100.000.
2. **Langkah 2**: Kasir melayani 5 transaksi tunai total Rp450.000 dan 1 transaksi QRIS Rp50.000.
3. **Langkah 3**: Kasir mencatat pengeluaran kas kecil laci Rp20.000 untuk beli es batu.
4. **Langkah 4**: Kasir menutup shift dan menghitung fisik uang tunai di laci (terdapat Rp530.000).
5. **Kriteria Kelulusan UAT**:
   - Sistem mencatat selisih kas = Rp0 (100.000 + 450.000 - 20.000 = 530.000).
   - Kasir dan Manajer menandatangani struk rekap Z-report harian.

---

## Skenario 2: Pembelian Kasbon Pupuk Pertanian oleh Petani
1. **Langkah 1**: Petani membeli 2 karung pupuk total Rp240.000 dengan metode kasbon.
2. **Langkah 2**: Kasir memilih pelanggan, sistem memvalidasi sisa limit kredit mencukupi.
3. **Langkah 3**: Karena > Rp100.000, sistem menampilkan lembar perjanjian dan meminta PIN manajer.
4. **Langkah 4**: Petani menandatangani lembar tanda terima kasbon.
5. **Kriteria Kelulusan UAT**:
   - Struk kasbon tercetak dengan rincian sisa hutang dan tanggal jatuh tempo panen.

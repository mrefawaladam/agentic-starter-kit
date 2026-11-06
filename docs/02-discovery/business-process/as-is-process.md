---
id: BP-ASIS-001
title: Proses Bisnis Saat Ini (AS-IS Process)
type: business-process
status: APPROVED
owner: BA Agent
version: 1.0.0
created_at: 2026-11-05
updated_at: 2026-11-05
---

# 🕰️ Proses Bisnis Saat Ini (AS-IS Process)

Dokumen ini memetakan kondisi operasional aktual yang berjalan di sebagian besar unit usaha koperasi desa dan toko ritel konvensional sebelum mengadopsi KasirSakti.

---

## 1. Alur Transaksi Kasir & Kas Laci Konvensional
```mermaid
flowchart TD
    A["Kasir Datang & Mulai Melayani"] --> B["Transaksi Tunai Dicatat di Buku / Kalkulator"]
    B --> C["Pengeluaran Toko Diambil Langsung dari Laci Kasir"]
    C --> D["Di Akhir Hari: Kasir Menghitung Total Nota Penjualan"]
    D --> E["Kasir Menghitung Sisa Uang Fisik"]
    E --> F{"Ada Selisih Uang?"}
    F -- "Ya" --> G["Perdebatan Kasir vs Pemilik Toko (Saling Tuduh)"]
    F -- "Tidak" --> H["Uang Diserahkan ke Pemilik Toko"]
```

### Masalah pada Alur Ini:
1. Tidak ada rekonsiliasi formal modal awal kasir.
2. Kasir mengetahui total penjualan sistem sebelum menghitung uang fisik sehingga rawan manipulasi.
3. Nota pengeluaran kas kecil (*petty cash*) tercecer atau tidak dicatat sama sekali.

---

## 2. Alur Pembelian Tempo (Kasbon) Manual
```mermaid
flowchart TD
    A1["Anggota Datang Membeli Barang (Pupuk/Sembako)"] --> B1["Anggota Meminta Kasbon / Tempo Panen"]
    B1 --> C1["Kasir Menulis Nama & Total di Buku Kasbon"]
    C1 --> D1["Barang Diserahkan Tanpa Surat Perjanjian Tertulis"]
    D1 --> E1["Beberapa Bulan Kemudian: Musim Panen Tiba"]
    E1 --> F1["Kasir Menagih Berdasarkan Buku Kasbon"]
    F1 --> G1{"Anggota Sepakat dengan Angka?"}
    G1 -- "Tidak" --> H1["Sengketa Nominal / Buku Kasbon Hilang / Piutang Macet"]
    G1 -- "Ya" --> I1["Anggota Melunasi Sebagian"]
```

### Masalah pada Alur Ini:
1. Ketiadaan batas plafon hutang (*credit limit*).
2. Ketiadaan dokumen perjanjian yang dapat dipertanggungjawabkan secara hukum perdata.
3. Sering terjadi pembengkakan saldo piutang tak terkendali.

---
id: PROB-002
title: Problem Statement — Kebocoran Uang Kas & Ketidakjelasan Selisih Shift Kasir
type: problem-statement
status: APPROVED
owner: PM Agent
version: 1.0.0
created_at: 2026-11-05
updated_at: 2026-11-05
---

# ⚠️ Problem Statement: Kebocoran Uang Kas & Ketidakjelasan Selisih Shift Kasir

## 1. Pernyataan Masalah (Problem Statement)
Operasional kasir di toko fisik sangat rentan mengalami kebocoran uang kas, baik akibat manipulasi kasir yang disengaja (*internal fraud* seperti *post-sale void*) maupun akibat bias perhitungan modal awal dan kas kecil (*petty cash*) yang tidak terintegrasi dalam rekapitulasi shift laci kasir.

---

## 2. Kondisi Saat Ini (Current Condition)
- Kasir dapat melihat total penjualan tunai di layar sebelum menghitung uang fisik, sehingga jika ada kelebihan uang, kasir tergoda mengantonginya.
- Transaksi tunai yang sudah selesai kerap dibatalkan (*void*) secara sepihak oleh oknum kasir setelah pelanggan pergi membawa barang belanjaan.
- Pengeluaran toko mendesak (beli token listrik, es batu, bensin) diambil langsung dari laci kasir tanpa rekam jejak formal di sistem.

---

## 3. Dampak terhadap Bisnis & Pengguna (User & Business Impact)
- Pemilik toko mengalami kerugian uang fisik kasir tanpa bisa membuktikan siapa yang bertanggung jawab.
- Kasir jujur sering menjadi korban tuduhan selisih uang yang sebenarnya dipakai untuk operasional toko.
- Laporan Z-report kasir tidak mencerminkan fisik uang kas yang disetorkan ke brankas pemilik.

---

## 4. Solusi yang Diusulkan (Proposed Solution)
1. **Blind Cash Shift Closing**: Kasir hanya memasukkan nominal uang fisik riil saat tutup kas tanpa diberi tahu nominal hitungan sistem. Sistem yang menghitung deviasi kas secara matematis dan independen.
2. **Pencatatan Petty Cash Terintegrasi**: Fitur kas keluar laci kasir langsung mengurangi saldo `expected_cash` shift aktif.
3. **Pembatasan Izin Void & Audit Log**: Pembatalan nota penjualan wajib memerlukan otorisasi manajer dan otomatis membalik jurnal akuntansi serta memulihkan stok.

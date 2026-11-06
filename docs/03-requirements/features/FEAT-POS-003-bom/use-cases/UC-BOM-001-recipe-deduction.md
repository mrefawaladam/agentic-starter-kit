---
id: UC-BOM-001
title: Pemotongan Stok Bahan Baku Otomatis Berbasis Resep (BOM)
type: use-case
status: IN_REVIEW
priority: P1
feature_id: FEAT-POS-003
actor: Kasir POS / Sistem Checkout
---

# 🎯 UC-BOM-001: Pemotongan Stok Bahan Baku Otomatis Berbasis Resep (BOM)

## 1. Informasi Use Case
- **Primary Actor**: Kasir POS
- **Secondary Actor**: Sistem Inventori, Sistem Akuntansi
- **Priority**: P1 (Tinggi)

## 2. Deskripsi Singkat
Ketika kasir memproses checkout penjualan item produk yang terdaftar memiliki resep (*Bill of Materials*), sistem secara otomatis mendeteksi bahan-bahan baku mentah yang diperlukan dan memotong kuantitas stok bahan baku tersebut di outlet kasir bersangkutan.

## 3. Prasyarat (Preconditions)
1. Produk/varian olahan telah dikonfigurasi memiliki resep aktif dengan bahan baku terdefinisi.
2. Kasir sedang berada dalam sesi shift aktif `OPEN`.
3. Stok masing-masing bahan mentah di inventori outlet mencukupi.

## 4. Pemicu (Trigger)
Kasir menekan tombol "Bayar" untuk menyelesaikan pesanan produk ber-resep di kasir POS.

## 5. Alur Utama (Main Flow)
1. Sistem menerima payload pesanan checkout.
2. Sistem mengecek apakah produk atau varian yang dibeli memiliki relasi di tabel `recipes` dan `recipe_ingredients`.
3. Sistem menghitung kebutuhan bahan baku: `kebutuhan = takaran_resep * qty_dijual`.
4. Sistem memverifikasi saldo stok setiap bahan baku pada tabel `outlet_inventory` di outlet tersebut.
5. Sistem memotong kuantitas stok masing-masing bahan baku.
6. Sistem mencatat pergerakan stok pada tabel `stock_movements` dengan tipe `OUT_RECIPE_BOM` dan referensi `transaction_id`.
7. Sistem menerbitkan transaksi penjualan dan jurnal akuntansi beban pokok penjualan (HPP) bahan baku terkait.
8. Sistem mengembalikan konfirmasi transaksi berhasil kepada kasir.

## 6. Alur Alternatif & Pengecualian
- **A1: Bahan Baku Tidak Mencukupi (Kebijakan Stok Minus)**:
  - Sistem mendeteksi stok salah satu bahan baku mentah &lt; kebutuhan (atau bahkan 0).
  - Sistem tetap melanjutkan pemrosesan checkout hingga sukses (status `COMPLETED`).
  - Saldo stok bahan baku di tabel `outlet_inventory` dikurangi sehingga bernilai negatif.
  - Respons sukses menyertakan metadata peringatan `warning: INSUFFICIENT_STOCK` dan mencatat alert log restock.
- **A2: Produk Reguler (Tanpa Resep)**:
  - Sistem memotong produk tersebut secara langsung seperti biasa sesuai alur standar `FEAT-POS-001`.

## 7. Kondisi Akhir (Postconditions)
- Stok bahan mentah terpotong secara akurat di outlet.
- Riwayat mutasi tercatat di kartu stok inventori.

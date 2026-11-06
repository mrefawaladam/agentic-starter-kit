---
id: UC-KDS-002
title: Pembaruan Status Memasak & Penyajian Pesanan
type: use-case
status: IN_REVIEW
priority: P1
feature_id: FEAT-POS-005
actor: Koki Dapur / Barista / Pelayan
---

# 🎯 UC-KDS-002: Pembaruan Status Memasak & Penyajian Pesanan

## 1. Informasi Use Case
- **Primary Actor**: Koki Dapur / Barista / Pelayan
- **Secondary Actor**: Kasir POS
- **Priority**: P1 (Tinggi)

## 2. Deskripsi Singkat
Aktor memperbarui progres pengerjaan pesanan dapur dengan mengetuk tombol aksi pada kartu pesanan digital untuk menandai perubahan tahapan: mulai dimasak (`PREPARING`), selesai disiapkan (`READY`), atau telah disajikan ke pelanggan (`SERVED`).

## 3. Prasyarat (Preconditions)
1. Tiket pesanan berstatus aktif dan muncul di layar KDS.
2. Pengguna memiliki hak akses staf dapur, kasir, atau pelayan.

## 4. Pemicu (Trigger)
Aktor mengetuk tombol aksi (contoh: "Mulai Masak" atau "Siap Saji") pada kartu tiket pesanan.

## 5. Alur Utama (Main Flow)
1. Aktor menekan tombol aksi target status pada kartu pesanan.
2. Antarmuka KDS mengirimkan permintaan `PATCH /api/v1/orders/:id/kitchen-status` dengan payload `{ "status": "PREPARING" | "READY" | "SERVED" }`.
3. Backend memvalidasi eksistensi order, kesesuaian `merchant_id` & `outlet_id`, serta validitas transisi status.
4. Backend memperbarui kolom `kitchen_status` pada tabel `transactions`.
5. Backend mengembalikan respons HTTP 200 OK dengan status terbaru.
6. Antarmuka KDS memperbarui status visual tiket seketika (mengubah warna kartu atau menghilangkan kartu dari layar jika status telah `SERVED`).

## 6. Alur Alternatif & Pengecualian
- **A1: Pesanan Telah Di-Void**:
  - Sistem mendeteksi status transaksi `CANCELLED`, mengembalikan error 400 Bad Request: *"Pesanan ini telah dibatalkan oleh kasir/manajer"*.
- **A2: Transisi Status Tidak Valid**:
  - Sistem menolak transisi yang melompat mundur atau tidak sah.

## 7. Kondisi Akhir (Postconditions)
- Kolom `kitchen_status` terbarui di database.
- Tampilan antarmuka KDS dan kasir POS tersinkronisasi.

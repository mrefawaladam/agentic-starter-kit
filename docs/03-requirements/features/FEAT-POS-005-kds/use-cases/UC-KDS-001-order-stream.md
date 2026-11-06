---
id: UC-KDS-001
title: Pengambilan Aliran Pesanan Dapur Aktif (KDS Order Stream)
type: use-case
status: IN_REVIEW
priority: P1
feature_id: FEAT-POS-005
actor: Koki Dapur / Barista
---

# 🎯 UC-KDS-001: Pengambilan Aliran Pesanan Dapur Aktif

## 1. Informasi Use Case
- **Primary Actor**: Koki Dapur / Barista
- **Secondary Actor**: Kasir POS
- **Priority**: P1 (Tinggi)

## 2. Deskripsi Singkat
Aktor membuka antarmuka Kitchen Display System (KDS) di dapur atau area bar untuk memantau semua tiket pesanan aktif yang harus dimasak atau disiapkan secara real-time.

## 3. Prasyarat (Preconditions)
1. Perangkat tablet/layar sentuh dapur terhubung ke internet dan staf dapur telah login dengan token JWT valid.
2. Outlet bersangkutan aktif.

## 4. Pemicu (Trigger)
Aktor membuka halaman KDS di browser/aplikasi, atau antarmuka KDS melakukan polling otomatis (setiap 10-15 detik) untuk memperbarui data antrean.

## 5. Alur Utama (Main Flow)
1. Antarmuka KDS mengirimkan permintaan `GET /api/v1/orders/kds` dengan menyertakan token auth.
2. Backend memvalidasi otentikasi dan mengekstrak `merchant_id` serta `outlet_id`.
3. Backend melakukan query transaksi dengan filter:
   - `outlet_id` sesuai token pengguna.
   - `created_at` pada rentang hari ini (atau sejak shift berjalan).
   - `kitchen_status IN ('PENDING', 'PREPARING', 'READY')`.
   - Transaksi tidak berstatus `CANCELLED`.
4. Backend mengembalikan daftar tiket pesanan terstruktur (nomor nota, waktu order, nomor meja, nama pelanggan, daftar item varian + catatan khusus, status saat ini).
5. Layar KDS menampilkan kartu-kartu tiket terurut berdasarkan waktu tertua (FIFO - *First In, First Out*).

## 6. Alur Alternatif & Pengecualian
- **A1: Tidak Ada Pesanan Aktif**:
  - Backend mengembalikan array kosong `[]` dengan status 200 OK.
  - Antarmuka menampilkan ilustrasi santai: "Tidak ada pesanan aktif saat ini".
- **A2: Sesi Auth Habis**:
  - Backend mengembalikan 401 Unauthorized; antarmuka mengarahkan ke halaman login staf dapur.

## 7. Kondisi Akhir (Postconditions)
- Tiket pesanan aktif tersaji di layar dapur tanpa memerlukan kertas struk fisik.

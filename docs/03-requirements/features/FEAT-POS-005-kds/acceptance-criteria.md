# ✅ Acceptance Criteria: FEAT-POS-005 (Kitchen Display System)

## `AC-KDS-001`: Pengambilan Daftar Tiket Pesanan Aktif
```gherkin
Given Kasir di Outlet A memproses checkout pesanan TRX-101 dengan 2x Nasi Goreng (Catatan: Pedas Sedang) dan Meja 04
  And Koki dapur telah login di layar KDS Outlet A
 When Layar KDS memanggil GET /api/v1/orders/kds
 Then Sistem mengembalikan daftar pesanan berstatus kitchen_status IN ('PENDING', 'PREPARING', 'READY')
  And Pesanan TRX-101 muncul dengan rincian Meja 04, 2x Nasi Goreng, Catatan "Pedas Sedang", dan kitchen_status PENDING
```

## `AC-KDS-002`: Pembaruan Status Memasak Tiket Dapur
```gherkin
Given Tiket pesanan TRX-101 berstatus kitchen_status PENDING di layar KDS
 When Koki menekan tombol "Mulai Masak" yang memicu PATCH /api/v1/orders/TRX-101/kitchen-status dengan status "PREPARING"
 Then Sistem memperbarui kitchen_status menjadi PREPARING di database
  And Tampilan kartu pesanan di KDS berubah warna indikator menjadi oranye/kuning
 When Koki menekan tombol "Selesai Masak" dengan payload status "READY"
 Then Sistem memperbarui kitchen_status menjadi READY
  And Kartu pesanan berubah warna menjadi hijau menandakan siap disajikan
```

## `AC-KDS-003`: Penanganan Tiket Dibatalkan (Void)
```gherkin
Given Tiket pesanan TRX-101 sedang berstatus kitchen_status PREPARING di KDS
 When Manajer melakukan void pada transaksi TRX-101 di aplikasi kasir
 Then Saat polling/refetch KDS berikutnya, tiket TRX-101 menampilkan banner merah bertuliskan "PESANAN DIBATALKAN"
  And Tombol aksi masak dinonaktifkan
```

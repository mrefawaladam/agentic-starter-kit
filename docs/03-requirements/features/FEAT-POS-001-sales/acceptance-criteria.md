# ✅ Acceptance Criteria: FEAT-POS-001

## `AC-POS-001`: Checkout Berhasil dengan Metode Tunai
```gherkin
Given Kasir telah login dan shift kasir berstatus OPEN
  And Stok produk "Beras 5kg" di outlet tersedia sebanyak 10 kantong
 When Kasir melakukan checkout 2 kantong beras dengan metode bayar CASH
 Then Sistem membuat transaksi dengan status COMPLETED
  And Sistem mengikatkan shift_log_id kasir pada transaksi
  And Stok produk "Beras 5kg" berkurang menjadi 8 kantong
  And Sistem mencatat mutasi stok OUT sebanyak 2
  And Sistem memposting jurnal seimbang Debit Kas Rp140.000 dan Kredit Penjualan Rp140.000
```

## `AC-POS-002`: Penolakan Checkout Tanpa Shift Aktif
```gherkin
Given Kasir telah login tetapi TIDAK MEMILIKI shift kasir aktif berstatus OPEN
 When Kasir mencoba menekan tombol bayar checkout
 Then Sistem menolak pemrosesan transaksi dengan kode HTTP 400
  And Sistem mengembalikan pesan "silakan buka shift kasir terlebih dahulu sebelum melayani transaksi"
  And Tidak ada perubahan stok maupun jurnal yang tercatat
```

## `AC-POS-003`: Blind Shift Closing dan Rekonsiliasi Deviasi Kas
```gherkin
Given Shift kasir dibuka dengan modal awal Rp100.000
  And Kasir mencatat total penjualan tunai Rp500.000
  And Kasir mencatat pengeluaran petty cash Rp50.000
 When Kasir menutup shift dengan memasukkan closing_cash fisik Rp545.000
 Then Sistem menghitung expectedCash = 100.000 + 500.000 - 50.000 = Rp550.000
  And Sistem menghitung cash_difference = 545.000 - 550.000 = -Rp5.000
  And Status shift berubah menjadi CLOSED
  And Selisih kas -Rp5.000 tersimpan di basis data untuk laporan audit
```

## `AC-POS-004`: Pembatalan Nota (Void), Jurnal Pembalik, & Pembatalan Piutang
```gherkin
Given Transaksi TRX-001 berstatus COMPLETED dengan total Rp150.000 metode KASBON untuk 3 pcs Kemeja (HPP Rp30.000/pcs)
  And Admin atau Owner memiliki hak akses otorisasi void
 When Admin melakukan void transaksi TRX-001 dengan alasan "Pelanggan salah memilih ukuran"
 Then Status transaksi TRX-001 berubah menjadi CANCELLED
  And Stok kemeja di outlet bertambah kembali sebanyak 3 pcs dengan mutasi IN_VOID
  And Status tagihan piutang pelanggan di customer_debts berubah menjadi CANCELLED
  And Sistem menerbitkan 4 baris jurnal pembalik seimbang:
      | Akun | Posisi | Nominal |
      | 4101 (Pendapatan Penjualan) | Debit | Rp150.000 |
      | 1103 (Piutang Usaha) | Kredit | Rp150.000 |
      | 1201 (Persediaan Barang) | Debit | Rp90.000 |
      | 5101 (Beban Pokok Penjualan) | Kredit | Rp90.000 |
  And Sistem mencatat log audit permanen dengan modul TRANSACTION dan aksi VOID
```

## `AC-POS-005`: Pencatatan Otomatis Audit Trail pada Aktivitas Berisiko Tinggi
```gherkin
Given Pengguna dengan role Admin atau Kasir melakukan aksi berisiko pada sistem:
      | Skenario | Aksi Pengguna | Ekspektasi Modul Audit | Ekspektasi Action Audit |
      | 1 | Kasir membuka shift dengan modal Rp100.000 | FINANCE | OPEN_SHIFT |
      | 2 | Kasir menutup shift dengan fisik Rp120.000 | FINANCE | CLOSE_SHIFT |
      | 3 | Admin mengubah harga jual varian produk | PRODUCT | UPDATE_PRICE |
      | 4 | Admin melakukan stock opname selisih -2 pcs | INVENTORY | STOCK_OPNAME |
 When Aksi tersebut berhasil dieksekusi di database
 Then Sistem secara otomatis menyisipkan 1 record pada tabel audit_logs
  And Record memuat merchant_id, user_id, action, module, description, dan timestamp secara akurat
```

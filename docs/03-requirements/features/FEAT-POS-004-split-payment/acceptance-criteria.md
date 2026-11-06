# ✅ Acceptance Criteria: FEAT-POS-004 (Split Payment)

## `AC-POS-006`: Checkout Berhasil Menggunakan Kombinasi Tunai & QRIS
```gherkin
Given Pelanggan membeli barang dengan total belanja Rp125.000
  And Kasir melayani dengan metode split payment:
      | Metode | Nominal |
      | CASH | Rp50.000 |
      | QRIS | Rp75.000 |
 When Kasir memproses checkout
 Then Sistem memvalidasi Rp50.000 + Rp75.000 == Rp125.000
  And Transaksi berstatus COMPLETED
  And Sistem menyimpan 2 baris pada tabel transaction_payments
  And Sistem menambahkan Rp50.000 (hanya porsi CASH) ke perhitungan omzet kas shift berjalan
  And Jurnal akuntansi memuat 2 baris debit terpisah:
      | Akun | Posisi | Nominal |
      | 1101 (Kas Laci Kasir) | Debit | Rp50.000 |
      | 1102 (Bank/QRIS) | Debit | Rp75.000 |
      | 4101 (Pendapatan Penjualan) | Kredit | Rp125.000 |
```

## `AC-POS-007`: Penolakan Checkout Saat Akumulasi Nominal Tidak Cocok
```gherkin
Given Pelanggan memiliki total belanja Rp100.000
 When Kasir menginput split payment:
      | Metode | Nominal |
      | CASH | Rp40.000 |
      | QRIS | Rp50.000 |
 Then Sistem mendeteksi total pembayaran (Rp90.000) != Total Belanja (Rp100.000)
  And Sistem menolak transaksi dengan pesan "Total rincian pembayaran (Rp90.000) tidak sesuai dengan total tagihan (Rp100.000)"
  And Tidak ada stok atau jurnal yang berubah
```

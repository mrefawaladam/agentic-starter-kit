# ✅ Acceptance Criteria: FEAT-CREDIT-001

## `AC-CREDIT-001`: Transaksi Kasbon di Bawah Threshold (Level 1)
```gherkin
Given Pelanggan terverifikasi memiliki credit limit Rp500.000 dan saldo piutang berjalan Rp0
 When Kasir membuat transaksi kasbon dengan total belanja Rp80.000
 Then Sistem mengklasifikasikan transaksi sebagai Level 1
  And Sistem tidak mewajibkan pembuatan dokumen perjanjian formal
  And Transaksi berhasil difinalisasi dengan status ACTIVE
  And Saldo piutang pelanggan tercatat bertambah Rp80.000
```

## `AC-CREDIT-002`: Transaksi Kasbon di Atas Threshold (Level 2)
```gherkin
Given Pelanggan terverifikasi memiliki credit limit Rp1.000.000
 When Kasir membuat transaksi kasbon dengan total belanja Rp150.000 (> Rp100.000)
 Then Sistem mengklasifikasikan transaksi sebagai Level 2
  And Sistem secara otomatis menghasilkan draft dokumen perjanjian (FEAT-LEGAL-001)
  And Sistem menahan finalisasi transaksi sampai approval manajer dan tanda tangan selesai
  And Setelah disetujui, transaksi difinalisasi dan saldo piutang tercatat Rp150.000
```

## `AC-CREDIT-003`: Penolakan Transaksi Melebihi Credit Limit
```gherkin
Given Pelanggan memiliki credit limit Rp500.000 dan saldo piutang aktif Rp450.000
 When Kasir mencoba mengajukan transaksi kasbon baru senilai Rp100.000 (total Rp550.000)
 Then Sistem menolak transaksi dengan kode HTTP 400
  And Sistem mengembalikan pesan "Pengajuan melebihi credit limit (Sisa limit: Rp50.000)"
  And Tidak ada piutang baru atau mutasi stok yang tersimpan
```

## `AC-CREDIT-004`: Pembayaran Cicilan Sebagian dan Pelunasan Penuh
```gherkin
Given Pelanggan memiliki tagihan piutang aktif dengan remaining_amount Rp200.000
 When Pelanggan menyetorkan uang cicilan Rp100.000 via kasir
 Then Sistem mencatat penerimaan kas Rp100.000
  And Sisa hutang remaining_amount berkurang menjadi Rp100.000
  And Status piutang tetap PARTIALLY_PAID
 When Pelanggan menyetorkan kembali sisa Rp100.000
 Then Sistem memperbarui remaining_amount menjadi Rp0
  And Status piutang otomatis berubah menjadi PAID
```

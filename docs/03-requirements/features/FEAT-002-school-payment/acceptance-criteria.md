# Acceptance Criteria: Sistem Pembayaran Sekolah

Spesifikasi kriteria penerimaan dalam format formal Gherkin (Given-When-Then) untuk verifikasi otomatis oleh Quality Engineer.

## Feature: Pembayaran Tagihan Sekolah (FEAT-002)

### Scenario 1: Menampilkan daftar tagihan aktif dengan format mata uang presisi
```gherkin
Given siswa dengan NIS "2026101" login ke portal
And siswa memiliki tagihan aktif "SPP November 2026" sebesar Rp 500.000 dengan status "PUBLISHED"
When siswa membuka halaman "Tagihan Saya"
Then sistem menampilkan kartu tagihan dengan judul "SPP November 2026"
And nominal ditampilkan dengan format font-mono tabular-nums "Rp 500.000"
And tombol "Bayar Sekarang" berstatus aktif dan dapat diklik
```

### Scenario 2: Generate kode QRIS dinamis dengan batas waktu kedaluwarsa 15 menit
```gherkin
Given siswa berada pada kartu tagihan "BILL-2026-001" berstatus "PUBLISHED"
When siswa menekan tombol "Bayar Sekarang"
And memilih channel "QRIS"
Then modal pembayaran QRIS muncul dalam waktu < 500ms
And sistem menampilkan gambar kode QR dinamis
And timer hitung mundur aktif selama 15 menit (900 detik)
And status tagihan di database diperbarui menjadi "PENDING_PAYMENT"
```

### Scenario 3: Settlement otomatis saat webhook resmi payment gateway diterima
```gherkin
Given transaksi pembayaran "TX-998811" dengan tagihan "BILL-2026-001" berstatus "PENDING_PAYMENT"
When endpoint "/api/webhooks/payment" menerima HTTP POST payload settlement
And header "X-Signature" valid sesuai perhitungan HMAC-SHA256
Then status tagihan harus diperbarui menjadi "PAID"
And status transaksi menjadi "SETTLED"
And sistem menghasilkan kuitansi dengan nomor seri unik "RCP-2026-11-001"
And response endpoint mengembalikan HTTP status 200 OK dengan body JSON success
```

### Scenario 4: Proteksi idempotency terhadap pengiriman webhook duplikat
```gherkin
Given tagihan "BILL-2026-001" telah berstatus "PAID" dengan transaksi "TX-998811"
When gateway mengirimkan webhook callback ulang dengan transaction_id "TX-998811" yang sama
Then sistem TIDAK BOLEH mencatat transaksi kredit ganda
And saldo rekening siswa tidak bertambah dua kali
And response endpoint tetap mengembalikan HTTP status 200 OK untuk menghentikan retry gateway
```

### Scenario 5: Penolakan webhook palsu tanpa signature otentik
```gherkin
Given penyerang mengirimkan HTTP POST ke "/api/webhooks/payment"
When payload settlement dikirimkan tanpa header "X-Signature" atau signature tidak valid
Then sistem harus menolak request dengan status HTTP 401 Unauthorized
And status tagihan TIDAK BOLEH berubah
And log insiden keamanan dicatat dengan tingkat keparahan WARNING
```

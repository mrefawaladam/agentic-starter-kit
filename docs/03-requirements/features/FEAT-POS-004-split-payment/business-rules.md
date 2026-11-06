# 📏 Business Rules: FEAT-POS-004 (Split Payment)

### `BR-POS-010`: Validasi Total Akumulasi Split Payment
Total penjumlahan seluruh rincian pembayaran pada array `payments` wajib tepat sama dengan total tagihan transaksi (`SUM(payments.amount) == TotalPrice`). Transaksi harus ditolak jika total kurang (*underpaid*) atau lebih (*overpaid* - kecuali kelebihan uang tunai yang dihitung sebagai uang kembalian kasir).

### `BR-POS-011`: Multi-Row Debit pada Jurnal Akuntansi
Setiap transaksi dengan split payment wajib menghasilkan baris debit terpisah pada entri jurnal akuntansi sesuai metode dan akun penampung masing-masing:
- Pembayaran `CASH`: Debit Akun `1101` (Kas di Laci Kasir) sebesar nominal tunai.
- Pembayaran `QRIS` / `TRANSFER`: Debit Akun `1102` (Bank / E-Wallet) sebesar nominal non-tunai.
- Pembayaran `DEBT`: Debit Akun `1103` (Piutang Usaha) sebesar sisa kasbon.
Total baris debit tersebut wajib seimbang dengan total kredit `4101` (Pendapatan Penjualan).

### `BR-POS-012`: Pengaruh Porsi Kas terhadap Shift Laci Kasir
Hanya porsi nominal yang dibayarkan menggunakan metode `CASH` yang diperhitungkan ke dalam `total_cash_sales` pada shift kasir aktif. Porsi pembayaran non-tunai (QRIS/Bank) dicatat secara terpisah dan tidak boleh mempengaruhi saldo uang fisik ekspektasi di laci kasir (`expectedCash`).

### `BR-POS-013`: Integritas Pembatalan Transaksi Split Payment
Jika transaksi ber-split payment dibatalkan (void):
1. Seluruh entri pembayaran di tabel `transaction_payments` ditandai dibatalkan.
2. Jurnal pembalik (*reversal journal*) membalikkan akun debit kas dan bank sesuai nominal porsinya masing-masing.

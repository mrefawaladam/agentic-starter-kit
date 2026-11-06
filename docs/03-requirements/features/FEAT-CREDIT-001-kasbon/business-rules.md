# 📏 Business Rules: FEAT-CREDIT-001

### `BR-CREDIT-001`: Eligibilitas Kasbon Pelanggan
Pelanggan hanya dapat menggunakan metode pembayaran kasbon jika status pelanggan terverifikasi (`is_verified = true`), fasilitas kredit aktif, dan tidak memiliki status blacklist / macet.

### `BR-CREDIT-002`: Batas Threshold Perjanjian Wajib (Agreement Threshold)
Nilai transaksi kasbon kumulatif atau transaksi tunggal di atas **Rp100.000** wajib menerbitkan dokumen perjanjian (`FEAT-LEGAL-001`) dan ditandatangani oleh pelanggan sebelum transaksi difinalisasi.

### `BR-CREDIT-003`: Penegakan Plafon Credit Limit (Credit Limit Enforcement)
Total akumulasi piutang yang masih belum lunas (*outstanding*) ditambah nominal transaksi baru **dilarang keras** melebihi nilai `credit_limit` pelanggan tanpa persetujuan eksplisit tertulis dari `RoleOwner`.

### `BR-CREDIT-004`: Pembayaran Parsial / Cicilan (Partial Repayment)
Pembayaran cicilan sebagian diperbolehkan. Setiap pembayaran parsial mengurangi saldo `remaining_amount` secara proporsional.

### `BR-CREDIT-005`: Audit Trail Mutasi Piutang (Auditable Ledger Reference)
Setiap perubahan saldo piutang (penambahan hutang baru maupun pelunasan cicilan) **wajib** memiliki referensi ID transaksi penjualan atau ID pembayaran kas dan tidak boleh dimanipulasi langsung.

### `BR-CREDIT-006`: Immutabilitas Perjanjian (Agreement Immutability)
Dokumen perjanjian yang telah ditandatangani dan diarsipkan bersifat *immutable* (tidak dapat diubah kembali). Jika terjadi koreksi transaksi, wajib dibuatkan dokumen adendum atau addendum pembatalan.

### `BR-CREDIT-007`: Larangan Penghapusan Data Piutang
Record piutang dilarang dihapus secara permanen (*hard delete*) dari database. Penghapusan piutang macet hanya dapat dilakukan melalui mekanisme akuntansi penyisihan piutang tak tertagih (*write-off journal*) dengan otorisasi `owner`.

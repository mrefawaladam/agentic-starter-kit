# 📏 Business Rules: FEAT-POS-001

### `BR-POS-001`: Keharusan Shift Aktif (Mandatory Active Shift)
Setiap transaksi penjualan kasir **wajib** terikat pada satu shift kasir aktif (`status = 'OPEN'`) milik user yang sedang login di outlet tersebut. Jika tidak ada shift aktif, checkout harus ditolak.

### `BR-POS-002`: Blind Cash Closing Policy
Layar penutupan kas kasir **dilarang** menampilkan nilai omzet atau ekspektasi nominal uang kas sistem sebelum kasir menginput dan mengonfirmasi penghitungan uang fisik.

### `BR-POS-003`: Pemotongan Stok Unit Dasar Otomatis
Setiap kuantitas produk yang terjual wajib dikonversikan ke unit dasar terkecil (*base unit*) dan langsung mengurangi saldo stok outlet di tabel `stocks` secara atomik di dalam transaksi database.

### `BR-POS-004`: Atomic Double-Entry Accounting
Setiap transaksi berstatus `COMPLETED` wajib secara instan memposting entri jurnal seimbang:
- Debit: Kas / Bank / Piutang Usaha
- Kredit: Pendapatan Penjualan
- Debit: Beban Pokok Penjualan (HPP)
- Kredit: Persediaan Barang

### `BR-POS-005`: Otorisasi Pembatalan (Void Authorization)
Pembatalan transaksi penjualan (*void*) hanya boleh diotorisasi oleh role `admin` atau `owner`. Kasir (`cashier`) dilarang melakukan void secara mandiri.

### `BR-POS-006`: Audit Trail Void & Alasan
Setiap aksi void wajib menyertakan alasan teks pembatalan dan otomatis mencatat jejak audit permanen pada tabel `audit_logs`.

### `BR-POS-007`: Reversal Journal pada Void
Transaksi void wajib menerbitkan entri jurnal pembalik (*reversal journal*) yang menganulir pendapatan dan mengembalikan aset persediaan barang.

### `BR-POS-008`: Rekonsiliasi Pengeluaran Kas Laci (Petty Cash Shift Reconciliation)
Seluruh pengeluaran uang tunai operasional yang diambil dari laci kasir selama shift berlangsung wajib dicatat ke dalam tabel `expenses` dan diakumulasikan ke `total_expense_cash` pada `cashier_shift_logs`. Rumus saldo ekspektasi kas sistem saat penutupan shift adalah:
$$\text{Expected Cash} = \text{Opening Cash} + \text{Total Cash Sales (berdasarkan shift\_log\_id)} - \text{Total Expense Cash}$$

### `BR-POS-009`: Audit Trail Logging Terpusat untuk Aksi Berisiko Tinggi
Sistem wajib merekam log audit permanen ke tabel `audit_logs` untuk aksi-aksi operasional kritis berikut:
1. `TRANSACTION / VOID`: Pembatalan transaksi penjualan beserta alasan dan otorisator.
2. `FINANCE / OPEN_SHIFT` & `CLOSE_SHIFT`: Buka dan tutup shift, uang modal awal, uang fisik penutupan, dan nominal selisih kas.
3. `PRODUCT / UPDATE_PRICE` & `DELETE`: Modifikasi harga jual produk atau penghapusan master katalog.
4. `INVENTORY / STOCK_OPNAME`: Penyesuaian deviasi fisik stok gudang/toko.
Log audit wajib memuat `merchant_id`, `user_id`, `action`, `module`, `ip_address`, dan rincian perubahan data.

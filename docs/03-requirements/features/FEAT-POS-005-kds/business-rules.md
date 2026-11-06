# 📏 Business Rules: FEAT-POS-005 (Kitchen Display System)

### `BR-KDS-001`: Filter Outlet & Status Aktif
Layar KDS hanya boleh menampilkan pesanan yang berada pada `outlet_id` yang sama dengan akun staf dapur yang login, dan memiliki status dapur aktif (`PENDING`, `PREPARING`, `READY`). Pesanan dengan status `SERVED` atau transaksi yang berstatus `CANCELLED` (void) tidak boleh ditampilkan pada antrean aktif.

### `BR-KDS-002`: Siklus Status Dapur (Kitchen Workflow Lifecycle)
Transisi status item atau tiket dapur harus mematuhi urutan:
1. `PENDING`: Pesanan baru masuk dari kasir POS.
2. `PREPARING`: Koki/barista telah mulai memasak / menyiapkan pesanan.
3. `READY`: Makanan/minuman selesai disiapkan dan siap diantar/diambil pelayan.
4. `SERVED`: Pesanan telah disajikan ke meja pelanggan.

### `BR-KDS-003`: Penanganan Transaksi Batal (Void Synchronization)
Jika pesanan di-void oleh kasir/manajer saat status dapur masih `PENDING` atau `PREPARING`, sistem KDS harus secara realtime menandai pesanan sebagai `CANCELLED` dengan visual peringatan warna merah mencolok agar dapur segera menghentikan proses pembuatan makanan.

### `BR-KDS-004`: Informasi Detail Tiket Pesanan
Setiap tiket KDS wajib memuat: nomor struk/antrean, nomor meja atau nama pelanggan, rincian produk & varian, kuantitas, catatan khusus item (notes), waktu masuk pemesanan, dan durasi elapsed time (penghitung menit sejak order dibuat).

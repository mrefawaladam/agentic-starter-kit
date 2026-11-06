# 📏 Business Rules: FEAT-POS-003 (Bill of Materials & Resep)

### `BR-BOM-001`: Relasi Resep Berbasis Varian Produk
Resep (BOM) didefinisikan secara spesifik per `product_variant_id` (atau per `product_id` untuk produk tanpa varian). Satu produk olahan dapat memiliki satu formula resep aktif yang memuat satu atau lebih bahan baku mentah (*ingredients*).

### `BR-BOM-002`: Pengurangan Atomik Bahan Mentah pada Checkout
Ketika kasir menjual produk yang memiliki relasi resep aktif:
1. Sistem tidak memotong kuantitas fisik produk jadi (karena produk diracik on-demand).
2. Sistem secara atomik memotong stok setiap bahan baku mentah pada tabel `stocks` / `outlet_inventory` di outlet kasir bersangkutan sebesar:
   $$\text{Qty Bahan Terpotong} = \text{Kuantitas Resep} \times \text{Kuantitas Produk Terjual}$$
3. Sistem mencatat kartu mutasi stok (`stock_movements`) untuk masing-masing bahan mentah dengan tipe `OUT_RECIPE_BOM` dan mereferensikan `transaction_id`.

### `BR-BOM-003`: Pemulihan Stok Bahan Baku pada Void Transaksi
Jika transaksi kasir yang mengandung item bermenu resep di-void oleh supervisor:
1. Sistem wajib memulihkan saldo stok masing-masing bahan mentah di outlet bersangkutan.
2. Sistem mencatat baris mutasi stok baru bertipe `IN_RECIPE_RESTORE` pada kartu stok bahan.

### `BR-BOM-004`: Kebijakan Stok Bahan Baku Menipis / Negatif (Warning Stok Minus)
Jika salah satu bahan baku mentah penyusun resep memiliki saldo stok fisik di bawah kebutuhan resep (termasuk bernilai 0):
1. **Transaksi Tetap Diizinkan**: Transaksi checkout kasir tetap diproses hingga berstatus `COMPLETED` agar antrean dan operasional kasir tidak terhambat.
2. **Pencatatan Stok Negatif**: Saldo kuantitas stok bahan baku mentah pada tabel `outlet_inventory` diizinkan menjadi bernilai minus (contoh: dari 0 Gram menjadi -30 Gram).
3. **Peringatan & Audit Alert**: Sistem menyertakan metadata peringatan `warning: INSUFFICIENT_STOCK` pada respons checkout dan menerbitkan notifikasi audit stok menipis agar manajer segera melakukan pengadaan (*restock*) atau stock opname.

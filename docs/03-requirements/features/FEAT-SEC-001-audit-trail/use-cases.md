# Use Cases — Centralized Audit Trail Logging

## UC-AUD-001: Perekaman Jejak Aktivitas Operasional Berisiko Tinggi

### 1. Deskripsi Singkat
Sistem secara otomatis mendeteksi dan menginjeksi pencatatan audit log terpusat melalui fungsi `LogActivity` setiap kali terjadi aksi penting yang mempengaruhi uang kas, akuntansi, katalog produk, atau inventori fisik.

### 2. Aktor
- Kasir
- Supervisor Cabang
- Finance Admin
- Toko Owner

### 3. Alur Kerja Terintegrasi
1. Pengguna memicu aksi berisiko tinggi melalui API:
   - Pembatalan transaksi (Void) di context `product` / `checkout.go`.
   - Buka/Tutup shift di context `finance` / `usecase.go`.
   - Update harga produk di context `product` / `usecase.go`.
   - Stok opname di context `inventory` / `usecase.go`.
2. Handler mengekstraksi token JWT untuk mendapatkan `UserID`, `MerchantID`, dan IP Address klien.
3. Use case mengeksekusi logika bisnis utama dalam database transaction.
4. Use case memanggil helper `LogActivity(ctx, db, logPayload)`.
5. Audit log tersimpan secara persisten pada tabel `audit_logs`.
6. Transaksi di-commit.

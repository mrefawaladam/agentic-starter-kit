# Business Rules — Centralized Audit Trail Logging

## BR-AUD-001: Immutability & Non-Repudiation
Entri yang telah dicatat ke dalam tabel `audit_logs` bersifat *append-only* dan *immutable* (tidak dapat diubah, diedit, atau dihapus melalui endpoint API apa pun).

## BR-AUD-002: Mandatory Context Fields
Setiap rekaman log audit wajib memuat:
1. `user_id`: ID pengguna yang melakukan aksi.
2. `merchant_id` & `outlet_id`: Toko dan cabang terjadinya aksi.
3. `module`: Modul domain aplikasi (`TRANSACTION`, `FINANCE`, `PRODUCT`, `INVENTORY`, `USER`).
4. `action`: Kata kerja aksi (`VOID`, `OPEN_SHIFT`, `CLOSE_SHIFT`, `UPDATE_PRICE`, `DELETE`, `STOCK_OPNAME`).
5. `description` / `metadata`: Rincian identitas entitas (contoh: nomor nota, nama produk, selisih kas, supervisor PIN approver).
6. `ip_address` & `user_agent`: Alamat IP jaringan dan agen peramban/klien pemanggil.

## BR-AUD-003: High-Risk Action Coverage
Aksi berikut WAJIB memicu pembuatan log audit:
- Void transaksi penjualan (mencatat reason & supervisor ID).
- Buka dan tutup shift kasir (mencatat kas fisik dan expected cash discrepancy).
- Perubahan harga jual/beli produk serta penghapusan produk.
- Stock opname adjustment kuantitas stok.

## BR-AUD-004: Fail-Safe Logging Policy
Jika penulisan audit log mengalami kegagalan pada transaksi finansial berisiko tinggi (seperti void nota), transaksi utama HARUS dibatalkan (*rollback*) guna mencegah aksi tak terrekam (*unaccounted operations*).

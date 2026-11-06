# ⚠️ Dependencies & Risks: FEAT-POS-001

## Ketergantungan (Dependencies)
- **Modul Inventori (`FEAT-INVENTORY-001`)**: Ketersediaan data varian produk dan stok outlet.
- **Modul Finansial (`EPIC-FINANCE`)**: Bagan akun (`accounts`) untuk memposting jurnal debit/kredit.
- **Modul Auth**: Middleware verifikasi token JWT dan injeksi context `merchant_id` dan `user_id`.

## Risiko & Mitigasi
- **Risiko Lock Contention Basis Data**:
  - *Mitigasi*: Optimasi durasi transaksi database agar tetap di bawah 20ms dan gunakan indeks pada kolom foreign key.
- **Risiko Offline Drop**:
  - *Mitigasi*: Frontend POS harus memiliki antrean lokal offline yang disinkronkan saat koneksi pulih.

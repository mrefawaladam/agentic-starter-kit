# 📦 Scope: FEAT-POS-001

## In-Scope
- Checkout transaksi dengan metode bayar `CASH`, `TRANSFER`, `QRIS`, dan `DEBT/KASBON`.
- Validasi wajib shift aktif berstatus `OPEN`.
- Perekaman `shift_log_id` pada setiap pesanan transaksi.
- Pemotongan kuantitas stok varian produk pada outlet terkait.
- Pencatatan kartu mutasi stok (`stock_movements`) bertipe `OUT`.
- Pembuatan entri jurnal otomatis (Kas/Bank/Piutang vs Penjualan, dan Beban HPP vs Persediaan).
- Pembatalan transaksi (*void*) dengan jurnal pembalik otomatis.

## Out-of-Scope
- Split payment / multi-metode pembayaran dalam 1 nota (dijadwalkan di Fase 2).
- Sinkronisasi instan ke printer bluetooth thermal dari backend (dikelola oleh driver frontend POS).

# ⚡ Edge Cases & Handling: FEAT-CREDIT-001

| ID Kasus | Skenario Edge Case | Perilaku Sistem yang Diharapkan |
| :--- | :--- | :--- |
| **EC-CREDIT-001** | Pelanggan melakukan dua transaksi kasbon sekaligus di dua kasir berbeda yang menyebabkan overlimit bersamaan. | Menggunakan database row lock (`FOR UPDATE`) pada record pelanggan saat mengevaluasi credit limit; transaksi kedua wajib ditolak jika sisa limit terlampaui. |
| **EC-CREDIT-002** | Pembayaran cicilan melebihi saldo sisa hutang (`amount > remaining_amount`). | Sistem menolak pembayaran dengan pesan validasi; kelebihan bayar tidak boleh disimpan sebagai saldo negatif. |
| **EC-CREDIT-003** | Transaksi penjualan asal di-void setelah kasbon diterbitkan. | Sistem membatalkan (*void*) record `customer_debts` terkait dan membalik jurnal piutang. Jika kasbon telah dicicil sebagian, void penjualan diblokir dan kasir harus memproses retur barang. |
| **EC-CREDIT-004** | Masa berlaku dokumen perjanjian kedaluwarsa sebelum ditandatangani. | Status pengajuan berubah menjadi `CANCELLED`; checkout POS dibatalkan dan barang kembali ke etalase. |

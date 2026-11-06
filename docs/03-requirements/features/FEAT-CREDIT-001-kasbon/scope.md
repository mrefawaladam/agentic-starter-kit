# 📦 Scope: FEAT-CREDIT-001

## In-Scope
- Pengecekan status eligibilitas dan saldo limit kredit pelanggan saat checkout POS.
- Klasifikasi kasbon berjenjang:
  - Level 1 (&le; Rp100.000): Pencatatan langsung via POS.
  - Level 2 (&gt; Rp100.000): Wajib dokumen perjanjian dan approval.
- Pencatatan pembayaran cicilan kasbon (sebagian maupun lunas).
- Kartu piutang pelanggan dan riwayat mutasi pembayaran.
- Penjadwalan jatuh tempo fleksibel (bulanan atau musiman panen).

## Out-of-Scope
- Sistem credit scoring otomatis berbasis data eksternal / biro kredit OJK (dikelola internal koperasi).
- Penagihan otomatis via debt collection agency pihak ketiga.

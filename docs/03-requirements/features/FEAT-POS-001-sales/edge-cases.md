# ⚡ Edge Cases & Handling: FEAT-POS-001

| ID Kasus | Skenario Edge Case | Perilaku Sistem yang Diharapkan (Expected Behavior) |
| :--- | :--- | :--- |
| **EC-POS-001** | Kasir mengklik tombol "Bayar" berkali-kali secara cepat (*double-tap*). | Endpoint wajib mendukung idempotensi atau lock transaksi; sistem tidak boleh membuat pesanan ganda atau memotong stok dua kali. |
| **EC-POS-002** | Dua kasir di outlet yang sama menjual sisa 1 unit produk yang sama secara bersamaan. | Menggunakan locking pada database (`SELECT ... FOR UPDATE` atau decrement bersyarat `stock >= qty`). Kasir kedua menerima error bahwa stok telah habis. |
| **EC-POS-003** | Kasir lupa menutup shift berhari-hari. | Sistem memberi peringatan saat kasir mencoba transaksi di hari berikutnya; shift sebelumnya harus ditutup terlebih dahulu sebelum membuka shift baru. |
| **EC-POS-004** | Koneksi internet terputus saat request checkout sedang diproses backend. | Transaksi di backend bersifat atomik; frontend memverifikasi status nota terakhir menggunakan invoice UUID sebelum mengulang submit. |

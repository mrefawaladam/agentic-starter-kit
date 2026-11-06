# Risk Register: Sistem Pembayaran Sekolah

| Risk ID | Kategori | Deskripsi Risiko | Probabilitas (1-5) | Dampak (1-5) | Skor Keparahan | Strategi Mitigasi | Penanggung Jawab |
| :--- | :--- | :--- | :---: | :---: | :---: | :--- | :--- |
| **RSK-PAY-01** | Teknis / Integrasi | Kegagalan koneksi Payment Gateway saat jam sibuk (1 s/d 5 setiap bulan). | 2 | 5 | **10 (Tinggi)** | Implementasi circuit breaker dan fallback channel ke Virtual Account bank lain atau QRIS alternatif. | Solution Architect |
| **RSK-PAY-02** | Keuangan | Pengiriman webhook berulang (duplicate retry) menyebabkan kredit ganda. | 3 | 4 | **12 (Tinggi)** | Penerapan Idempotency Key unik berbasis kombinasi `gateway_trx_id` + `bill_id` di database dengan constraint UNIQUE. | Backend Developer |
| **RSK-PAY-03** | Keamanan | Pemalsuan callback webhook oleh pihak luar untuk melunasi tagihan secara curang. | 2 | 5 | **10 (Tinggi)** | Validasi ketat signature cryptographic HMAC-SHA256 dengan secret token server-to-server. | Security Engineer |
| **RSK-PAY-04** | Operasional | Orang tua transfer setelah kode QRIS kedaluwarsa (> 15 menit). | 4 | 2 | **8 (Sedang)** | Payment gateway menolak transfer jika kode QR telah expired di sisi interchange perbankan. UI otomatis menyegarkan kode jika expired. | Frontend Developer |
| **RSK-PAY-05** | Privasi Data | Akses data rincian tunggakan siswa oleh wali murid lain (BOLA/IDOR). | 2 | 4 | **8 (Sedang)** | Validasi kepemilikan token JWT siswa pada setiap permintaan query parameter `student_id`. | Security Engineer |

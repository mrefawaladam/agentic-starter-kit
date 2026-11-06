---
id: FEAT-002-school-payment
title: "Product Requirement Document: Sistem Pembayaran Sekolah"
status: APPROVED
priority: MUST
owner: product-manager
last_updated: 2026-11-06
---

# Product Requirement Document (PRD): Sistem Pembayaran Sekolah

## 1. Executive Summary & Problem Statement

Proses pembayaran SPP sekolah saat ini masih manual: orang tua murid harus datang ke tata usaha (TU) atau transfer bank manual kemudian mengirim bukti foto via WhatsApp. Hal ini menimbulkan:
- **Tumpukan antrean** panjang pada minggu pertama setiap bulan.
- **Human error** pada pencatatan keuangan dan rekonsiliasi manual oleh staf TU.
- **Keterlambatan verifikasi** pembayaran sehingga status siswa sering keliru tertulis "Menunggak".

Fitur ini menyediakan portal pembayaran mandiri bagi siswa/orang tua dengan instant settlement melalui Virtual Account (BCA, Mandiri, BRI, BNI) dan QRIS, disertai otomatisasi penerbitan kuitansi resmi PDF.

## 2. Business Goals & Success Metrics

- **Goal 1**: Mengurangi waktu rekonsiliasi pembayaran bulanan dari 3 hari kerja menjadi **< 5 menit** (real-time automated settlement).
- **Goal 2**: Meningkatkan ketepatan waktu pembayaran SPP hingga **85%** pada minggu pertama bulan berjalan.
- **Goal 3**: Mengeliminasi 100% human-error rekonsiliasi pembayaran ganda atau slip palsu.
- **Counter-Metric**: Rata-rata kegagalan gateway payment harus di bawah **0.5%** dari total volume transaksi.

## 3. Scope Definition

### In-Scope (Phase 1)
- Pembuatan dan publikasi tagihan siswa otomatis setiap tanggal 1 oleh Tata Usaha.
- Pilihan channel pembayaran: Virtual Account (Bank Transfer) dan Dynamic QRIS.
- Webhook receiver dengan cryptographic HMAC verification untuk instant settlement.
- Unduh kuitansi resmi digital (PDF) ber-QR Code validasi.
- Notifikasi status tagihan (Diterbitkan, Jatuh Tempo, Lunas).

### Out-of-Scope (Non-Goals Phase 1)
- Cicilan atau pinjaman pendidikan pihak ketiga (Fintech Lending).
- Pembayaran tunai via kasir kas kecil sekolah (tetap diadministrasikan terpisah).
- Integrasi kartu kredit internasional.

## 4. Target User Personas

| Persona | Profil & Kebutuhan | Perilaku Utama |
| :--- | :--- | :--- |
| **Ibu Sarah (Orang Tua Murid)** | Bekerja purnawaktu, mengutamakan kemudahan pembayaran lewat m-banking tanpa harus izin cuti untuk ke sekolah. | Membuka portal via smartphone, memilih metode QRIS/VA, membayar dan menyimpan bukti PDF. |
| **Pak Joko (Kepala Tata Usaha)** | Bertanggung jawab atas pencatatan 1.200 siswa, butuh laporan rekonsiliasi real-time tanpa salah hitung. | Menerbitkan batch invoice awal bulan, memantau dashboard status pelunasan siswa. |

## 5. High-Level User Journey

1. **Publikasi**: Tata Usaha menerbitkan tagihan SPP bulan berjalan untuk kelas X-IPA.
2. **Notifikasi**: Orang tua menerima pemberitahuan via portal siswa bahwa tagihan telah terbit.
3. **Checkout**: Orang tua memilih metode pembayaran (QRIS atau Virtual Account Mandiri).
4. **Bayar**: Orang tua memindai QRIS melalui aplikasi perbankan mobile.
5. **Settlement Otomatis**: Webhook dari Payment Gateway masuk ke sistem; tagihan langsung berubah menjadi `LUNAS` dan PDF kuitansi siap diunduh seketika.

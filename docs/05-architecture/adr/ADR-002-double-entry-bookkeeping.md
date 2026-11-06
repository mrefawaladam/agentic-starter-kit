---
id: ADR-002
title: "ADR-002: Penerapan Native Double-Entry Bookkeeping pada Mutasi Moneter"
type: adr
status: ACCEPTED
deciders:
  - Solution Architect Agent
  - Finance Domain Specialist
date: 2026-10-10
---

# 🏛️ ADR-002: Native Double-Entry Bookkeeping pada Mutasi Moneter

## 1. Context (Konteks Masalah)
Banyak aplikasi POS hanya mencatat mutasi kas secara sepihak (*single-entry log*). Ketika pemilik usaha memerlukan neraca keuangan, laba rugi, dan rekonsiliasi piutang, terjadi deviasi angka karena catatan transaksi tidak pernah terhubung langsung dengan prinsip akuntansi berpasangan.

## 2. Decision (Keputusan)
Setiap mutasi bernilai uang di KasirSakti (penjualan kasir, penerimaan kasbon, pembelian tempo ke supplier, pengeluaran kas kecil, pembayaran gaji) **wajib** menghasilkan baris entri jurnal berpasangan seimbang (`debit == credit`) secara atomik di tabel `journal_entries` dan `journal_lines`.

## 3. Consequences
- **Positif (+)**: Koperasi dan merchant secara otomatis memiliki buku besar (*General Ledger*) dan neraca saldo (*Trial Balance*) realtime tanpa perlu software akuntansi terpisah.
- **Negatif / Trade-off (-)**: Menuntut pemahaman aturan debit/kredit yang ketat pada layer UseCase; kegagalan perimbangan jurnal akan membatalkan (rollback) transaksi checkout POS.

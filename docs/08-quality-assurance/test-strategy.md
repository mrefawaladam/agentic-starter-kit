---
id: QA-STRAT-001
title: Strategi Pengujian Kualitas Sistem Full-Stack & E2E
type: test-strategy
status: APPROVED
owner: QA Agent
version: 1.1.0
created_at: 2026-11-05
updated_at: 2026-11-05
---

# 🧪 Strategi Pengujian Kualitas Sistem Full-Stack & E2E — KasirSakti

Dokumen ini mendefinisikan piramida pengujian terintegrasi yang mencakup pengujian backend Go, pengujian frontend React, dan otomasi pengujian browser Playwright E2E di `kasirsakti-e2e/`.

---

## 1. Piramida Pengujian Ekosistem
```
             /\
            /  \       Otomasi Browser E2E (kasirsakti-e2e: Playwright)
           /────\      - Alur Buka/Tutup Shift Kasir & Blind Count
          /      \     - Alur Transaksi Kasbon > 100k & Dokumen Perjanjian
         /        \    - Skenario Offline POS & Sinkronisasi
        /──────────\
       /            \  Frontend Integration & Component Tests (kasirsakti-fe)
      /              \ - Zustand Store, PermissionButton Guard, Form Modals
     /────────────────\
    /                  \ Backend Integration Tests (kasirsakti-be)
   /                    \ - PostgreSQL Multi-Tenant Isolation, ACID Rollbacks
  /──────────────────────\
 /                        \ Backend Unit Tests (kasirsakti-be)
/──────────────────────────\ - Double-Entry Ledger, Shift Math, Discount & Tax
```

---

## 2. Cakupan Pengujian per Lapisan

### A. Backend Unit & Integration Tests (`kasirsakti-be/`)
- Menjalankan `go test -v ./...`.
- Verifikasi formula blind closing: `expectedCash = openingCash + cashSales - cashExpenses`.
- Verifikasi jurnal berpasangan seimbang: `debit == credit`.
- Verifikasi penolakan cross-tenant access.

### B. Frontend Unit & State Tests (`kasirsakti-fe/`)
- Pengujian Zustand store `usePosStore.ts`: penambahan produk, kalkulasi diskon, perubahan kuantitas.
- Pengujian isolasi tombol aksi berbasis role: `<PermissionButton roles={['owner', 'admin']}>`.

### C. Playwright E2E Automation (`kasirsakti-e2e/`)
- Eksekusi: `npx playwright test`.
- Skenario E2E-01: Kasir Login -> Buka Shift (Modal Rp100k) -> Tambah 2 Produk -> Bayar Tunai -> Cetak Struk -> Tutup Shift Blind Count -> Verifikasi Selisih Kas di Laporan Z-Report.
- Skenario E2E-02: Kasir Checkout Kasbon > Rp100k -> Form Perjanjian Terbuka -> Input Tanda Tangan -> Submit Approval PIN Manajer -> Verifikasi Kartu Piutang Pelanggan di Back-Office.
- Skenario E2E-03: Putus Jaringan Browser -> POS Menampilkan Banner Offline -> Simpan Transaksi ke IndexedDB -> Sambungkan Jaringan -> Hook `useOfflineSync` Berhasil Sinkronisasi ke Backend.

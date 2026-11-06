---
id: SCR-POS-001
title: Spesifikasi Layar — POS Checkout & Offline Handling
type: screen-spec
status: APPROVED
owner: UI/UX Agent & Solution Architect
related_features:
  - FEAT-POS-001
related_use_cases:
  - UC-POS-001
---

# 🖥️ SCR-POS-001: Layar Checkout Kasir (POS) & Offline Handling

## 1. Tujuan & Sasaran Layar
Memfasilitasi kasir dalam menambahkan produk belanjaan, memilih pelanggan, menentukan metode pembayaran, dan memfinalisasi transaksi pesanan dalam waktu sesingkat mungkin (&lt; 15 detik), baik dalam kondisi online maupun offline.

---

## 2. Pemetaan Komponen Frontend (`kasirsakti-fe/`)
- **Page Container**: `src/app/(dashboard)/pos/page.tsx`
- **Sub-komponen**:
  - `src/components/pos/ProductGrid.tsx` (Katalog produk, search bar rounded-full, filter kategori pill)
  - `src/components/pos/CartSection.tsx` (Tabel keranjang pesanan, stepper kuantitas, subtotal font Tourney)
  - `src/components/modals/PaymentModal.tsx` (Modal pilihan pembayaran tunai, QRIS, kasbon `rounded-3xl`)
  - `src/components/modals/ReceiptModal.tsx` (Dialog cetak struk thermal)
- **State Management**:
  - Zustand Store: `src/store/usePosStore.ts` (mengelola keranjang, customer aktif, diskon, modal status)
  - TanStack React Query: `src/hooks/useProductsQuery.ts` (caching katalog produk server-state)
- **Offline Storage**:
  - Dexie.js IndexedDB: `src/utils/db.ts` (tabel lokal `offline_products`, `checkout_queue`)
  - Sinkronisasi: `src/hooks/useOfflineSync.ts` (pengiriman otomatis saat koneksi pulih)

---

## 3. Komponen Antarmuka & Token Styling
1. **Header Kasir**:
   - Status Shift badge: `rounded-full px-3 py-1 text-xs font-bold bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600`.
   - Tombol Tutup Shift: `rounded-full border border-slate-200 dark:border-zinc-800 text-xs px-4 py-2`.
2. **Scanner & Search Input**:
   - `input className="w-full rounded-full bg-slate-50 dark:bg-zinc-800/60 border border-slate-200/80 px-5 py-3 text-xs focus:ring-[#0052FF]/30"`
3. **Katalog Produk**:
   - Card item: `rounded-2xl border border-slate-100 dark:border-zinc-800 hover:border-[#0052FF]/50 transition-all cursor-pointer`.
   - Harga: `font-bold text-sm text-[#0052FF]` (menggunakan helper `formatCurrency`).
4. **Tombol Bayar Utama (CTA)**:
   - `<button className="w-full py-4 bg-[#0052FF] hover:bg-[#0046D5] text-white font-bold rounded-full shadow-lg shadow-[#0052FF]/25 text-sm cursor-pointer transition-all">`

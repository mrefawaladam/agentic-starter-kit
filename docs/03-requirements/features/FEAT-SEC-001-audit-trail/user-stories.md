# User Stories — Centralized Audit Trail Logging

## US-AUD-001: Audit Log Pembatalan Nota (Void)
**As an** Owner atau Manajer Toko,  
**I want** sistem merekam jejak audit lengkap setiap kali sebuah transaksi nota penjualan dibatalkan (void),  
**So that** saya dapat mendeteksi kecurangan kas kasir dan mengetahui supervisor yang memberikan otorisasi beserta alasannya.

**Story Points**: 1  
**Priority**: MUST  

---

## US-AUD-002: Audit Log Siklus Shift Kasir
**As a** Finance Manager,  
**I want** setiap pembukaan dan penutupan shift kasir tercatat secara permanen dengan saldo modal awal, fisik akhir, dan selisihnya,  
**So that** saya memiliki bukti rekonsiliasi kas yang tidak dapat dimanipulasi oleh pihak mana pun.

**Story Points**: 1  
**Priority**: MUST  

---

## US-AUD-003: Audit Log Perubahan Harga & Katalog Produk
**As an** Owner Bisnis,  
**I want** setiap perubahan harga jual atau penghapusan produk terekam dalam audit log,  
**So that** saya dapat memantau jika ada staf yang sengaja mengubah harga produk untuk keuntungan pribadi.

**Story Points**: 1  
**Priority**: MUST  

---

## US-AUD-004: Audit Log Penyesuaian Stok Opname
**As an** Inventory Auditor,  
**I want** setiap penyesuaian selisih stok fisik (opname) tercatat detail di log audit,  
**So that** saya dapat menelusuri ke mana barang hilang atau siapa yang melakukan revisi stok manual.

**Story Points**: 1  
**Priority**: MUST  

# Acceptance Criteria — Centralized Audit Trail Logging

## AC-AUD-001: Audit Log Void Transaksi
```gherkin
Given kasir atau supervisor melakukan void transaksi nota "TRX-20261106-001"
When proses void disetujui dan transaksi berhasil dibatalkan
Then sistem membuat record baru pada tabel "audit_logs"
And field "module" bernilai "TRANSACTION"
And field "action" bernilai "VOID"
And field "description" memuat nomor struk, alasan pembatalan, dan ID supervisor otorisator
And field "ip_address" terisi alamat IP klien
```

---

## AC-AUD-002: Audit Log Siklus Shift Kasir
```gherkin
Given kasir melakukan buka shift atau tutup shift kasir
When proses shift closing diselesaikan dengan input uang fisik Rp 150.000
Then sistem membuat record baru pada tabel "audit_logs"
And field "module" bernilai "FINANCE"
And field "action" bernilai "OPEN_SHIFT" atau "CLOSE_SHIFT"
And field "description" memuat saldo modal awal, uang fisik akhir, dan selisih kas
```

---

## AC-AUD-003: Audit Log Perubahan Harga & Hapus Produk
```gherkin
Given admin atau owner mengubah harga jual produk atau menghapus data produk
When perubahan disimpan ke database
Then sistem membuat record baru pada tabel "audit_logs"
And field "module" bernilai "PRODUCT"
And field "action" bernilai "UPDATE_PRICE" atau "DELETE"
And field "description" memuat ID produk, nama produk, dan harga lama vs harga baru
```

---

## AC-AUD-004: Audit Log Penyesuaian Stok Opname
```gherkin
Given petugas gudang/manajer melakukan penyesuaian stok opname manual
When form opname disubmit
Then sistem membuat record baru pada tabel "audit_logs"
And field "module" bernilai "INVENTORY"
And field "action" bernilai "STOCK_OPNAME"
And field "description" memuat nama barang, kuantitas sistem, kuantitas fisik, dan selisih unit
```

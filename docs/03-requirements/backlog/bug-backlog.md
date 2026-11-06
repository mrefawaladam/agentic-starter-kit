# 🐛 Bug & Defect Backlog

Daftar temuan bug, kesenjangan implementasi (*workflow gaps*), dan isu teknis yang tercatat untuk diperbaiki.

---

## Active Defects & Gaps

| Bug ID | Modul Terkait | Deskripsi Masalah | Tingkat Keparahan | Status | Rencana Perbaikan / Referensi |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **BUG-001** | `POS / Shift` | Deviasi kas laci bias akibat pengeluaran kas kecil (*petty cash*) kasir tidak tercatat di shift log. | `HIGH` | `RESOLVED_IN_PLAN` | Tambahkan kolom `shift_log_id` ke tabel transactions dan `total_expense_cash` ke `cashier_shift_logs`. |
| **BUG-002** | `POS / Void` | Pembatalan transaksi (*void*) belum otomatis membalik jurnal akuntansi debit/kredit dan belum membatalkan record kasbon. | `HIGH` | `RESOLVED_IN_PLAN` | Implementasi pembalik jurnal akuntansi di `VoidTransaction`. |
| **BUG-003** | `Inventori` | Resep bahan baku (BOM) belum otomatis memotong stok komponen saat menu komposit terjual. | `MEDIUM` | `BACKLOG` | Implementasi loop pemotongan stok bahan baku di UseCase checkout. |

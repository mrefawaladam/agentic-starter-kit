---
id: ARCH-INTG-001
title: Integritas Data & Aturan Konsistensi (Data Integrity)
type: data-integrity
status: APPROVED
owner: Solution Architect Agent
version: 1.0.0
created_at: 2026-11-05
updated_at: 2026-11-05
---

# 🛡️ Integritas Data & Aturan Konsistensi (Data Integrity)

Dokumen ini mendefinisikan aturan integritas relasional, foreign key constraints, dan auditability pada PostgreSQL KasirSakti.

---

## 1. Isolasi Data Multi-Tenant (Tenant Boundary Integrity)
1. Setiap tabel transaksional wajib memuat kolom `merchant_id NOT NULL` dengan foreign key ke `merchants(id)`.
2. Seluruh indeks komposit pada tabel transaksional harus menyertakan `merchant_id` sebagai kolom terdepan, contoh:
   ```sql
   CREATE INDEX idx_transactions_merchant_created ON transactions(merchant_id, created_at);
   ```

---

## 2. Integritas Pembukuan Finansial (Financial Ledger Immutability)
1. **Aturan Baris Jurnal Seimbang**:
   $$\sum \text{Debit} = \sum \text{Credit}$$
   Jika nilai total debit tidak sama dengan kredit pada entri jurnal, transaksi wajib ditolak sebelum commit database.
2. **Larangan Update Jurnal**: Entri pada `journal_entries` dan `journal_lines` berstatus *append-only*. Anulir kesalahan wajib dilakukan dengan memasukkan jurnal baru berlawanan (*reversal journal*).

---

## 3. Batasan Non-Negatif (Check Constraints)
1. Kolom kuantitas stok: `CHECK (quantity >= 0)`.
2. Kolom sisa hutang kasbon: `CHECK (remaining_amount >= 0)`.
3. Kolom modal awal dan penutupan kasir: `CHECK (opening_cash >= 0 AND closing_cash >= 0)`.

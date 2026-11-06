---
id: ARCH-LLD-001
title: Low-Level Design (LLD) — Concurrency & Transactions
type: low-level-design
status: APPROVED
owner: Solution Architect Agent
version: 1.0.0
created_at: 2026-11-05
updated_at: 2026-11-05
---

# ⚙️ Low-Level Design (LLD) — Concurrency, Transactions & Isolation

Dokumen ini mendefinisikan mekanisme teknis tingkat rendah untuk manajemen transaksi basis data ACID, penanganan konkurensi stok, dan isolasi tenant.

---

## 1. Transaksi Multi-Tabel dengan `TransactionManager`
Seluruh alur checkout kasir, penutupan shift, pembatalan (*void*), dan pencatatan kasbon **wajib** menggunakan abstraction `TransactionManager`:

```go
err := u.txManager.WithTransaction(ctx, func(txCtx context.Context) error {
    // 1. Validasi & Kurangi Stok Varian
    if err := u.stockRepo.DeductStock(txCtx, outletID, variantID, qty); err != nil {
        return err // Otomatis ROLLBACK
    }
    // 2. Buat Record Transaksi Penjualan
    if err := u.orderRepo.CreateOrder(txCtx, order); err != nil {
        return err // Otomatis ROLLBACK
    }
    // 3. Buat Record Piutang Kasbon (jika metode kasbon)
    if isDebt {
        if err := u.creditRepo.CreateDebt(txCtx, debtRecord); err != nil {
            return err // Otomatis ROLLBACK
        }
    }
    // 4. Terbitkan Jurnal Akuntansi Seimbang
    if err := u.financeRepo.CreateJournalEntry(txCtx, journal); err != nil {
        return err // Otomatis ROLLBACK
    }
    return nil // Otomatis COMMIT
})
```

---

## 2. Penanganan Konkurensi Stok (Race Conditions)
Untuk mencegah *overselling* saat beberapa kasir menjual stok unit terakhir secara bersamaan:
- **Pendekatan Atomik SQL**:
  ```sql
  UPDATE stocks 
  SET quantity = quantity - ? 
  WHERE outlet_id = ? AND variant_id = ? AND quantity >= ?;
  ```
- Jika baris yang ter-update bernilai 0 (`RowsAffected == 0`), UseCase langsung mengembalikan error: `stok tidak mencukupi`, membatalkan seluruh rantai transaksi database.

---

## 3. Isolasi Multi-Tenant Mutlak
- Setiap request HTTP wajib melalui middleware `auth.MyAuth(...)`.
- Handler mengekstrak `user.MerchantID` dari `c.Get("user")`.
- `MerchantID` disuntikkan ke dalam Go `context.Context` atau parameter UseCase, menjamin bahwa query GORM selalu memuat klausa `WHERE merchant_id = ?`.

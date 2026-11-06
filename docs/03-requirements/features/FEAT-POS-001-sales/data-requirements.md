# 📊 Data Requirements: FEAT-POS-001

## Entitas Kunci
1. **`transactions`**:
   - `id`: BigInt Primary Key
   - `merchant_id`: BigInt (Foreign Key ke `merchants`)
   - `outlet_id`: BigInt (Foreign Key ke `outlets`)
   - `shift_log_id`: BigInt (Foreign Key ke `cashier_shift_logs`)
   - `user_id`: BigInt (Foreign Key ke `users` - Kasir)
   - `customer_id`: BigInt (Nullable)
   - `total_price`: Numeric(15,2)
   - `payment_method`: Varchar (`CASH`, `TRANSFER`, `QRIS`, `DEBT`)
   - `status`: Varchar (`PENDING`, `COMPLETED`, `CANCELLED`)
   - `created_at`: Timestamp
2. **`transaction_details`**:
   - `id`: BigInt Primary Key
   - `transaction_id`: BigInt (Foreign Key ke `transactions`)
   - `product_id`: BigInt
   - `variant_id`: BigInt
   - `quantity`: Int
   - `unit_price`: Numeric(15,2)
   - `subtotal`: Numeric(15,2)
3. **`cashier_shift_logs`**:
   - `id`: BigInt Primary Key
   - `merchant_id`: BigInt
   - `outlet_id`: BigInt
   - `user_id`: BigInt
   - `opening_cash`: Numeric(15,2)
   - `closing_cash`: Numeric(15,2)
   - `total_expense_cash`: Numeric(15,2)
   - `cash_difference`: Numeric(15,2)
   - `status`: Varchar (`OPEN`, `CLOSED`)
   - `opened_at`: Timestamp
   - `closed_at`: Timestamp

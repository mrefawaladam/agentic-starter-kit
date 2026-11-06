# 📊 Data Requirements: FEAT-CREDIT-001

## Entitas Data Kunci
1. **`customer_debts`**:
   - `id`: BigInt Primary Key
   - `merchant_id`: BigInt (Foreign Key ke `merchants`)
   - `outlet_id`: BigInt (Foreign Key ke `outlets`)
   - `customer_id`: BigInt (Foreign Key ke `customers`)
   - `transaction_id`: BigInt (Foreign Key ke `transactions`)
   - `agreement_id`: BigInt (Nullable, Foreign Key ke `agreements`)
   - `total_amount`: Numeric(15,2) (Nominal pokok kasbon awal)
   - `remaining_amount`: Numeric(15,2) (Sisa saldo pokok yang belum terbayar)
   - `due_date`: Date (Tanggal jatuh tempo pembayaran)
   - `status`: Varchar (`ACTIVE`, `PARTIALLY_PAID`, `PAID`, `OVERDUE`, `CANCELLED`, `WRITTEN_OFF`)
   - `created_at`: Timestamp
   - `updated_at`: Timestamp
2. **`customer_debt_payments`**:
   - `id`: BigInt Primary Key
   - `merchant_id`: BigInt
   - `debt_id`: BigInt (Foreign Key ke `customer_debts`)
   - `payment_method`: Varchar (`CASH`, `TRANSFER`)
   - `amount`: Numeric(15,2)
   - `notes`: Text
   - `received_by`: BigInt (Foreign Key ke `users`)
   - `created_at`: Timestamp

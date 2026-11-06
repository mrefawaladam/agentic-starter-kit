---
id: ARCH-DICT-001
title: Kamus Data Basis Data (Data Dictionary)
type: data-dictionary
status: APPROVED
owner: Solution Architect Agent
version: 1.0.0
created_at: 2026-11-05
updated_at: 2026-11-05
---

# 📖 Kamus Data Basis Data (Data Dictionary)

Rincian tabel, tipe data kolom, nullability, dan batasan integritas skema PostgreSQL.

---

## 1. Tabel: `merchants`
| Nama Kolom | Tipe Data | Nullable | Default | Deskripsi |
| :--- | :--- | :--- | :--- | :--- |
| `id` | BIGSERIAL | NO | Auto | Primary Key Tenant Merchant |
| `name` | VARCHAR(255) | NO | – | Nama Resmi Koperasi / Badan Usaha |
| `created_at` | TIMESTAMP | NO | NOW() | Waktu Registrasi |

---

## 2. Tabel: `cashier_shift_logs`
| Nama Kolom | Tipe Data | Nullable | Default | Deskripsi |
| :--- | :--- | :--- | :--- | :--- |
| `id` | BIGSERIAL | NO | Auto | Primary Key Log Shift |
| `merchant_id` | BIGINT | NO | – | FK ke `merchants.id` |
| `outlet_id` | BIGINT | NO | – | FK ke `outlets.id` |
| `user_id` | BIGINT | NO | – | FK ke `users.id` (Kasir) |
| `opening_cash`| NUMERIC(15,2)| NO | 0 | Modal Awal Receh Laci Kasir |
| `closing_cash`| NUMERIC(15,2)| YES | NULL | Uang Fisik Hasil Blind Count Kasir |
| `total_expense_cash`| NUMERIC(15,2)| NO | 0 | Total Kas Keluar Operasional (Petty Cash)|
| `cash_difference` | NUMERIC(15,2)| YES | NULL | Selisih Kas: closing - expected |
| `status` | VARCHAR(20) | NO | 'OPEN' | Status: `OPEN`, `CLOSED` |
| `opened_at` | TIMESTAMP | NO | NOW() | Waktu Pembukaan Shift |
| `closed_at` | TIMESTAMP | YES | NULL | Waktu Penutupan Shift |

---

## 3. Tabel: `transactions`
| Nama Kolom | Tipe Data | Nullable | Default | Deskripsi |
| :--- | :--- | :--- | :--- | :--- |
| `id` | BIGSERIAL | NO | Auto | Primary Key Transaksi |
| `merchant_id` | BIGINT | NO | – | FK ke `merchants.id` |
| `outlet_id` | BIGINT | NO | – | FK ke `outlets.id` |
| `shift_log_id`| BIGINT | YES | NULL | FK ke `cashier_shift_logs.id` |
| `user_id` | BIGINT | NO | – | Kasir Pemroses Transaksi |
| `customer_id` | BIGINT | YES | NULL | FK ke `customers.id` (Pelanggan) |
| `invoice_number` | VARCHAR(50)| NO | – | Nomor Nota Unik Toko |
| `total_price` | NUMERIC(15,2)| NO | – | Total Nilai Belanja Bersih |
| `payment_method` | VARCHAR(20)| NO | – | `CASH`, `TRANSFER`, `QRIS`, `DEBT` |
| `status` | VARCHAR(20) | NO | 'COMPLETED' | `COMPLETED`, `CANCELLED` |

---

## 4. Tabel: `customer_debts`
| Nama Kolom | Tipe Data | Nullable | Default | Deskripsi |
| :--- | :--- | :--- | :--- | :--- |
| `id` | BIGSERIAL | NO | Auto | Primary Key Piutang Kasbon |
| `merchant_id` | BIGINT | NO | – | FK ke `merchants.id` |
| `outlet_id` | BIGINT | NO | – | FK ke `outlets.id` |
| `customer_id` | BIGINT | NO | – | FK ke `customers.id` |
| `transaction_id`| BIGINT | NO | – | FK ke `transactions.id` |
| `agreement_id`| BIGINT | YES | NULL | FK ke `agreements.id` |
| `total_amount`| NUMERIC(15,2)| NO | – | Pokok Nilai Hutang Awal |
| `remaining_amount`| NUMERIC(15,2)| NO | – | Sisa Saldo Piutang Berjalan |
| `due_date` | DATE | NO | – | Tanggal Jatuh Tempo Pelunasan |
| `status` | VARCHAR(30) | NO | 'ACTIVE'| `ACTIVE`, `PARTIALLY_PAID`, `PAID`, `OVERDUE` |

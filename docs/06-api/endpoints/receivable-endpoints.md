# 💳 API Endpoints: Kasbon & Piutang Pelanggan

Kumpulan endpoint pengelolaan transaksi piutang dan pembayaran cicilan.

---

## 1. GET `/api/v1/customer-debts`
- **Deskripsi**: Mengambil daftar piutang kasbon pelanggan.
- **Filter**: `customer_id`, `status` (`ACTIVE`, `PARTIALLY_PAID`, `PAID`, `OVERDUE`).

---

## 2. POST `/api/v1/customer-debts/:id/payments`
- **Deskripsi**: Mencatat pembayaran cicilan atau pelunasan kasbon.
- **Request Body**:
  ```json
  {
    "amount": 100000,
    "payment_method": "CASH",
    "notes": "Cicilan panen pertama"
  }
  ```
- **Response (200 OK)**:
  ```json
  {
    "status": "success",
    "message": "pembayaran kasbon berhasil dicatat",
    "data": {
      "debt_id": 5,
      "paid_amount": 100000,
      "remaining_amount": 50000,
      "status": "PARTIALLY_PAID"
    }
  }
  ```

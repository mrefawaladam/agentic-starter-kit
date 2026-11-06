# 🛒 API Endpoints: POS & Shift Kasir

Kumpulan endpoint operasional penjualan kasir dan shift laci.

---

## 1. POST `/api/v1/products/checkout`
- **Deskripsi**: Memproses transaksi pembelian barang di kasir.
- **Autentikasi**: Wajib (`auth.MyAuth("owner", "admin", "cashier")`).
- **Request Body**:
  ```json
  {
    "outlet_id": 1,
    "customer_id": 10,
    "payment_method": "CASH",
    "items": [
      {
        "product_id": 5,
        "variant_id": 12,
        "quantity": 2,
        "unit_price": 70000
      }
    ],
    "discount_amount": 0,
    "paid_amount": 150000
  }
  ```
- **Response (200 OK)**:
  ```json
  {
    "status": "success",
    "message": "checkout berhasil",
    "data": {
      "transaction_id": 1002,
      "invoice_number": "INV-20261105-0001",
      "total_price": 140000,
      "change_amount": 10000,
      "status": "COMPLETED"
    }
  }
  ```

---

## 2. POST `/api/v1/finance/shifts/open`
- **Deskripsi**: Membuka shift kasir dengan input modal awal receh.
- **Request Body**:
  ```json
  {
    "outlet_id": 1,
    "opening_cash": 100000
  }
  ```

---

## 3. POST `/api/v1/finance/shifts/close`
- **Deskripsi**: Menutup shift kasir dengan perhitungan uang fisik (*Blind Count*).
- **Request Body**:
  ```json
  {
    "outlet_id": 1,
    "closing_cash": 645000,
    "notes": "Shift sore aman lancar"
  }
  ```

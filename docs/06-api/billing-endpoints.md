# API Contract: Billing & Tuition Endpoints

## Base Path: `/api/v1`

---

### 1. Get Student Bills
- **Endpoint**: `GET /api/v1/students/:studentId/bills`
- **Auth**: Bearer JWT (Student, Parent, or Admin)
- **Description**: Returns all billing obligations for a specific student.

#### Success Response (200 OK)
```json
{
  "status": "success",
  "data": [
    {
      "id": "e2f1837b-91d1-412f-90e8-0b5c1791244e",
      "bill_code": "BILL-2026-11-001",
      "title": "SPP Bulan November 2026",
      "total_amount": 500000.00,
      "status": "PUBLISHED",
      "due_date": "2026-11-10T23:59:59Z",
      "items": [
        {
          "category": "SPP",
          "description": "Iuran Bulanan Kelas X",
          "amount": 500000.00
        }
      ]
    }
  ]
}
```

---

### 2. Initiate Payment Charge
- **Endpoint**: `POST /api/v1/bills/:billId/pay`
- **Auth**: Bearer JWT (Student or Parent)
- **Header Required**: `Idempotency-Key: <UUID>`

#### Request Body
```json
{
  "payment_method": "QRIS"
}
```

#### Success Response (201 Created)
```json
{
  "status": "success",
  "data": {
    "transaction_id": "tx_88192837",
    "bill_id": "e2f1837b-91d1-412f-90e8-0b5c1791244e",
    "amount": 500000.00,
    "payment_method": "QRIS",
    "qr_string": "00020101021226600016ID.CO.QRIS.WWW01189360052300000000000215000000000000000303UME51440014ID.LINKAJA.WWW02150000000000000005204599953033605802ID5919SEKOLAH SAKTI UTAMA6007JAKARTA61051234062070703A0163041D3B",
    "expires_at": "2026-11-06T12:15:00Z"
  }
}
```

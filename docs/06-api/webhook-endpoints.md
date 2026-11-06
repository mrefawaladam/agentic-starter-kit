# API Contract: Payment Webhook Receiver

## Base Path: `/api/webhooks`

---

### Payment Settlement Webhook
- **Endpoint**: `POST /api/webhooks/payment`
- **Auth**: HMAC-SHA256 Signature via HTTP Header
- **Required Header**: `X-Signature: <hex_hmac_sha256>`
- **Description**: Asynchronous callback invoked by payment gateway when funds are settled.

#### Request Body
```json
{
  "event": "payment.settled",
  "transaction_id": "tx_88192837",
  "gateway_reference": "MIDTRANS-20261106-992",
  "bill_id": "e2f1837b-91d1-412f-90e8-0b5c1791244e",
  "amount_paid": 500000.00,
  "currency": "IDR",
  "settled_at": "2026-11-06T12:05:30Z"
}
```

#### Signature Calculation
```
Signature = HMAC_SHA256(raw_request_body, GATEWAY_SECRET_KEY)
```

#### Success Response (200 OK)
```json
{
  "status": "success",
  "message": "Webhook processed successfully",
  "bill_status": "PAID"
}
```

#### Error Response: Unauthorized (401 Unauthorized)
```json
{
  "type": "https://api.schoolbilling.com/errors/invalid-signature",
  "title": "Invalid Webhook Signature",
  "status": 401,
  "detail": "Provided X-Signature header does not match computed HMAC"
}
```

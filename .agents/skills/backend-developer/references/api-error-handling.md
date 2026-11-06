# API Error Handling Standard

## RFC 7807 Problem Details Standard

All error responses from the API MUST conform to the RFC 7807 standard:

```json
{
  "type": "https://api.schoolbilling.com/errors/bill-already-paid",
  "title": "Conflict - Bill Settled",
  "status": 409,
  "detail": "Bill with ID 'bill_98124' has already been paid on 2026-11-05.",
  "instance": "/v1/bills/bill_98124/pay",
  "code": "BILL_ALREADY_PAID",
  "timestamp": "2026-11-06T04:12:00Z"
}
```

## HTTP Status Codes Mapping
- `400 Bad Request`: Schema validation errors (missing or malformed fields).
- `401 Unauthorized`: Missing or invalid bearer token.
- `403 Forbidden`: Authenticated user lacks permission to access resource.
- `404 Not Found`: Resource ID does not exist in domain repository.
- `409 Conflict`: Business invariant violation (e.g. state machine conflict or idempotency race).
- `422 Unprocessable Entity`: Semantic logic violation.
- `500 Internal Server Error`: Unhandled infrastructure failure (redact stack trace in production).

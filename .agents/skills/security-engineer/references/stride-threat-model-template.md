# STRIDE Threat Modeling Template

## Feature: [Feature Name]

| STRIDE Category | Threat Description | Attacker Vector | Impact | Mitigation Strategy | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Spoofing** | Attacker impersonates payment gateway webhook | Sends forged HTTP POST to `/api/webhooks/payment` | Unauthorized settlement of unpaid bills | Validate `X-Signature` HMAC-SHA256 using pre-shared gateway secret. Reject all unsigned requests. | Mitigated |
| **Tampering** | Man-in-the-Middle alters payment amount | Intercepts bill creation request and modifies tuition fee | Underpayment / Revenue loss | Enforce TLS 1.3 only; compute total amount strictly on server side from official catalog. | Mitigated |
| **Repudiation** | User denies paying or receiving bill | Disputes credit card charge after service delivery | Chargeback loss | Immutable transaction logs with IP, timestamp, and gateway settlement reference. | Mitigated |
| **Information Disclosure** | Student accesses other students' fee slips (BOLA / IDOR) | Changes student ID in `/api/bills?student_id=XXX` | Breach of student privacy and financial status | Enforce tenant and user ownership checks in middleware; verify user has permission for requested student. | Mitigated |
| **Denial of Service** | Bot floods QRIS generation endpoint | Script requests 10,000 QR codes per minute | Rate-limits exhaustion, gateway fee spikes | Apply Redis rate limiter: max 10 bill generation requests per user/IP per minute. | Mitigated |
| **Elevation of Privilege** | Student issues refund | Calls `/api/bills/:id/refund` with student JWT | Unauthorized financial outflow | Strict RBAC middleware requiring `FINANCE_SUPERADMIN` role for refund endpoints. | Mitigated |

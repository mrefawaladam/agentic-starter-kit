# RBAC Permission Matrix Template

## Domain: School Billing & Tuition

| Resource / Action | Endpoint / Operation | Super Admin | School Finance | Teacher | Student / Parent | Public / Anon |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| View Own Bills | `GET /v1/bills` | ✅ | ✅ | ❌ | ✅ (Own only) | ❌ |
| View All Student Bills | `GET /v1/admin/bills` | ✅ | ✅ | ❌ | ❌ | ❌ |
| Create Tuition Bill | `POST /v1/admin/bills` | ✅ | ✅ | ❌ | ❌ | ❌ |
| Initiate Payment | `POST /v1/bills/:id/pay` | ✅ | ✅ | ❌ | ✅ (Own only) | ❌ |
| Receive Webhook Callback | `POST /v1/webhooks/payment` | ❌ | ❌ | ❌ | ❌ | ✅ (HMAC verified) |
| Issue Bill Refund | `POST /v1/admin/bills/:id/refund` | ✅ | ❌ | ❌ | ❌ | ❌ |
| Download Settlement Report | `GET /v1/reports/settlement` | ✅ | ✅ | ❌ | ❌ | ❌ |

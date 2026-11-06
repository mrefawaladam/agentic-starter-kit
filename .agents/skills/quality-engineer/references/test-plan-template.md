# Master Test Plan Template

```markdown
# Test Plan: [Feature ID & Name]

- **Status**: [DRAFT | APPROVED | COMPLETED]
- **Target Release**: Sprint XX
- **Lead QA Engineer**: Quality Engineer

## 1. Scope & Objectives
- Validate functional correctness against acceptance criteria.
- Verify security safeguards (HMAC webhook validation, RBAC boundaries).
- Verify peak load performance under 500 concurrent transactions.

## 2. Test Types & Coverage
| Test Level | Tool / Framework | Target Coverage | Pass Criteria |
| :--- | :--- | :--- | :--- |
| **Unit Tests** | Vitest / Jest | > 85% domain logic | 100% passing |
| **API Contract** | Pact / Supertest | All endpoint schemas | 0 contract violations |
| **E2E Automation**| Playwright | Critical user paths | 100% passing across Chromium, WebKit |
| **Load Test** | k6 | 500 req/sec | p95 latency < 400ms, error rate < 0.1% |

## 3. Test Scenarios Matrix
- [x] TC-01: Happy Path Payment via QRIS
- [x] TC-02: Payment Failure & Expired VA
- [ ] TC-03: Webhook Duplicate Delivery Idempotency
- [ ] TC-04: Unauthorized Admin Action Rejection
```

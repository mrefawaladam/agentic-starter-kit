# Security Pre-Flight Audit Checklist

## Essential Verification Steps

- [ ] **No Secret Leaks**: Checked repository for leaked `.env`, API keys, or private certificates using `gitleaks`.
- [ ] **Webhook Signature**: Payment webhook verifies gateway HMAC signature using constant-time comparison (`crypto.timingSafeEqual`).
- [ ] **SQL Injection Defense**: All database queries utilize parameterized queries or ORM models.
- [ ] **BOLA / IDOR Verification**: All resource lookup endpoints verify ownership against `session.user.id` or `session.tenant_id`.
- [ ] **Rate Limiting**: Public and mutation endpoints are throttled using token bucket or sliding window algorithms.
- [ ] **CORS Configuration**: CORS origins are explicitly whitelisted (no wildcard `*` allowed on credentialed routes).
- [ ] **Input Sanitization**: Rich text inputs are filtered with strict DOMPurify rules.

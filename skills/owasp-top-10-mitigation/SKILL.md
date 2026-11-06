---
name: owasp-top-10-mitigation
description: Defense against the OWASP Top 10 web vulnerabilities including Injection, Broken Authentication, Broken Access Control, and SSRF.
---

# OWASP Top 10 Mitigation

Technical defensive countermeasures against prevalent web application vulnerabilities.

## Critical Checkpoints

### 1. Broken Access Control (A01:2021)
- MUST verify object-level ownership on every API call (e.g., `WHERE id = ? AND merchant_id = ?`)
- NEVER trust client-provided IDs or roles in query parameters or request bodies

### 2. Cryptographic Failures (A02:2021)
- MUST hash passwords with Argon2id or Bcrypt (work factor >= 12)
- NEVER store secrets, tokens, or encryption keys in source control

### 3. Injection (A03:2021)
- MUST use parameterized queries or type-safe ORMs (Prisma, Drizzle) for all SQL operations
- NEVER construct SQL, OS commands, or LDAP queries via string concatenation

### 4. Server-Side Request Forgery (A10:2021 - SSRF)
- MUST validate and restrict outgoing webhooks/requests to an explicit allowlist of domains/IPs
- NEVER allow arbitrary user-supplied URLs to fetch internal network metadata endpoints (e.g., AWS `169.254.169.254`)

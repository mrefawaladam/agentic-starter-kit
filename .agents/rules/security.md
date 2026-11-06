---
trigger: "docs/07-security-compliance/**, src/auth/**, src/payment/**, api/**"
description: "Rules for security engineering, threat mitigation, and authentication"
---

# Security & Compliance Rules

Enforces zero-trust architecture, OWASP mitigation, cryptographic integrity, and compliance safeguards.

## Core Directives

1. **Zero-Trust Access Control**:
   - Every protected API route MUST authenticate the requester and enforce granular RBAC/ABAC permissions before executing business logic.
   - Never rely on client-side state or parameter tampering for authorization checks.
2. **Secrets & Credential Hygiene**:
   - Hardcoded API keys, JWT signing secrets, database credentials, or test cards in source code are STRICTLY FORBIDDEN.
   - All credentials MUST be injected via environment variables with secret rotation capabilities.
3. **STRIDE Threat Review**: Any new financial, authentication, or PII handling endpoint MUST undergo a STRIDE threat modeling review recorded in `docs/07-security-compliance/`.
4. **Injection & Deserialization Defense**:
   - All database interactions MUST use parameterized queries or trusted ORM/query builders. Raw string concatenation is prohibited.
   - All user-supplied HTML/rich text MUST be sanitized using strict DOMPurify policies.
5. **Idempotency & Replay Protection**:
   - Financial transactions and webhooks MUST require idempotent keys (`Idempotency-Key` header) and cryptographic signature validation (e.g., HMAC-SHA256).

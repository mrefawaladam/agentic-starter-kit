---
name: stride-threat-modeling
description: Systematic threat modeling using the STRIDE framework (Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege).
---

# STRIDE Threat Modeling

Identifies security vulnerabilities early in the system design lifecycle before code is written.

## STRIDE Categories & Defenses

| Threat Category | Definition | Standard Mitigations |
| :--- | :--- | :--- |
| **Spoofing** | Pretending to be someone else | Strong authentication, mTLS, signed JWTs with short expiry, MFA |
| **Tampering** | Modifying data or code | Digital signatures, cryptographic HMAC, parameterized SQL, immutability |
| **Repudiation** | Claiming you did not perform an action | Non-repudiation audit trails, append-only logs, secure timestamps |
| **Information Disclosure** | Exposing confidential data | Encryption at rest (AES-256), in transit (TLS 1.3), masking PII |
| **Denial of Service** | Depleting system resources | Rate limiting, circuit breakers, request size limits, autoscaling |
| **Elevation of Privilege** | Gaining unpermitted access | Principle of least privilege, strict RBAC/ABAC verification per route |

## Rules

- MUST conduct threat modeling for any feature handling authentication, payments, or personal data
- MUST document mitigations directly inside `docs/07-security-compliance/threat-model.md`
- NEVER mark a feature `READY_FOR_DEV` with unmitigated high-severity STRIDE risks

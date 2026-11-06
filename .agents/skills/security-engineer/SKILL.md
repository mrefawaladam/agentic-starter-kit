---
name: security-engineer
description: Conduct STRIDE threat modeling, enforce OWASP Top 10 mitigations, define RBAC/ABAC access control policies, and verify application security posture.
---

# Security Engineer Skill

Ensures zero-trust application security, defends against attacks, secures sensitive data, and maintains compliance.

## Progressive Disclosure Workflow

```
Step 1: Read Architecture Spec (`docs/05-architecture/`) & API Contract (`docs/06-api/`)
Step 2: Read References (`references/stride-threat-model-template.md`, `references/rbac-matrix-template.md`)
Step 3: Perform STRIDE Threat Model in `docs/07-security-compliance/threat-models/`
Step 4: Check Knowledge Graph (`data/knowledge-graph.json`) for data flows, sensitive endpoints, and third-party webhooks
Step 5: Enforce OWASP mitigations and author automated security audit checks
Step 6: Issue Security Sign-off before production readiness
```

## Core Responsibilities

1. **STRIDE Threat Modeling**: Analyze system components across Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, and Elevation of Privilege.
2. **OWASP Top 10 Defense**:
   - Defend against Broken Object Level Authorization (BOLA/IDOR).
   - Enforce cryptographic webhook verification (HMAC-SHA256).
   - Prevent SQL Injection, SSRF, XSS, and CSRF vulnerabilities.
3. **Role-Based Access Control (RBAC)**: Maintain an unambiguous matrix of permissions mapping roles (`SUPERADMIN`, `ADMIN`, `TEACHER`, `STUDENT`, `PARENT`) to API actions.
4. **Secret Management & Cryptographic Hygiene**: Guarantee that no secrets, private keys, or API tokens are hardcoded or leaked into client bundles.

## Associated Skills & References

- [STRIDE Threat Model Template](references/stride-threat-model-template.md)
- [RBAC Matrix Template](references/rbac-matrix-template.md)
- [Security Audit Checklist](references/security-audit-checklist.md)
- [STRIDE Threat Modeling](../../skills/stride-threat-modeling/SKILL.md)
- [OWASP Top 10 Mitigation](../../skills/owasp-top-10-mitigation/SKILL.md)

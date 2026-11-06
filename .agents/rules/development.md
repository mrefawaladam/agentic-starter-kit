---
trigger: "src/**, app/**, packages/**, viewer/**"
description: "Rules for frontend and backend code generation, testing, and architecture"
---

# Development Rules

Enforces clean engineering practices, test-driven validation, and strict boundary isolation.

## Core Directives

1. **Spec Compliance**: Developers MUST NOT write application code without an approved requirement specification in `docs/03-requirements/` and corresponding architectural contract in `docs/05-architecture/` or `docs/06-api/`.
2. **Layered Separation (Clean / Hexagonal Architecture)**:
   - Domain logic MUST remain pure with zero external dependencies (no direct database, network, or framework calls).
   - Application services coordinate use cases, transactions, and domain events.
   - Adapters (database, HTTP, external gateways) implement domain-defined interfaces.
3. **Frontend Component Isolation**:
   - Prefer React Server Components (RSC) for data-fetching leaves.
   - Restrict client-side state (`"use client"`) to interactive elements.
   - Adhere strictly to `skills/baseline-ui` (no random z-indices, GPU-friendly transforms, `tabular-nums` for numeric data).
   - Use accessible primitives (`Base UI`, `Radix UI`, `React Aria`).
4. **Defensive Mutation & Error Handling**:
   - All external inputs (request bodies, query parameters, webhook payloads) MUST be validated with strict schemas (e.g., Zod, JSON Schema).
   - Database mutations MUST be executed in explicit transaction blocks with rollback support.
   - Sensitive data (passwords, tokens, PAN, PII) MUST NEVER be logged or leaked in error responses.
5. **No Blind Refactoring**: Code changes MUST preserve existing public API contracts and include unit/integration tests confirming acceptance criteria.

---
name: fullstack-developer
description: Build end-to-end features connecting responsive UI components, resilient backend APIs, domain business logic, and transactional database persistence using Vertical Slice and Clean Architecture.
---

# Fullstack Developer Skill

Empowers autonomous end-to-end feature delivery by seamlessly bridging Frontend user experience, Backend services, API contracts, and database schema migrations.

## Strict Boundaries & RFC Directives

1. **Gate Adherence**: NEVER write implementation code for features with status `DRAFT` or `IN_REVIEW`. The task MUST be in `READY_FOR_DEV` or `IN_PROGRESS`.
2. **Contract Consistency**: Implementation MUST strictly adhere to API contracts in `docs/06-api/` and database schemas in `docs/05-architecture/`.
3. **No Blind Assumptions**: If API payloads, database models, or validation constraints conflict with documents, use `[TODO: PENDING_CONFIRMATION]` and request clarification before coding.
4. **Strict Typing & Testing**: NEVER use untyped `any` in TypeScript or skip error handling in Go/Python. Every feature must ship with automated tests.

## Progressive Disclosure Workflow

```
Step 1: Read Feature Specs & Acceptance Criteria (`docs/03-requirements/features/<feature-id>/`)
Step 2: Check API Specification in `docs/06-api/` & UI Design Specs in `docs/04-ux-design/`
Step 3: Check Architecture Diagrams & DB Schema in `docs/05-architecture/`
Step 4: Query Knowledge Graph (`scripts/graph-lookup.js`) to evaluate existing reusable models/components
Step 5: Implement Vertical Slice (Database Migration -> Backend Handler -> Frontend Screen/Hook)
Step 6: Run local verification tests & submit task to `IN_QA`
```

## Core Fullstack Architecture Patterns

- **Vertical Slice Architecture**: Organize code by feature boundaries rather than rigid horizontal layers. Each feature owns its request handlers, business validators, and presentation components.
- **Type-Safe Fullstack Contract**: Maintain end-to-end type safety between client and server (e.g., Zod schemas, OpenAPI generated client, or tRPC).
- **Graceful Error Propagation**: Standardize on RFC 7807 Problem Details across HTTP responses and handle network failure states gracefully in the UI.

## Associated Skills & References

- [Next.js React Best Practices](../../skills/nextjs-react-best-practices/SKILL.md)
- [Clean Architecture Hexagonal](../../skills/clean-architecture-hexagonal/SKILL.md)
- [Design Patterns GoF](../../skills/design-patterns-gof/SKILL.md)
- [Database Migrations Drizzle/Prisma](../../skills/database-migrations-drizzle-prisma/SKILL.md)
- [Systematic Debugging](../../skills/systematic-debugging/SKILL.md)

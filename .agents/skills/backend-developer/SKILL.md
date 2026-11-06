---
name: backend-developer
description: Implement scalable, robust backend services using Clean Architecture, transactional integrity, database migrations, and defensive API resilience.
---

# Backend Developer Skill

Builds secure, maintainable domain services, data persistence layers, and RESTful/gRPC APIs based on architectural blueprints.

## Progressive Disclosure Workflow

```
Step 1: Read Approved Feature Spec (`docs/03-requirements/features/<feature-id>/`)
Step 2: Read Architecture Spec (`docs/05-architecture/`) & API Contract (`docs/06-api/`)
Step 3: Check Knowledge Graph (`data/knowledge-graph.json`) for data entities and database schema
Step 4: Implement Domain Entities, Use Case Handlers, and Adapters (Repository / Controller)
Step 5: Write Database Migration scripts and Unit/Integration tests
Step 6: Hand off to Quality Engineer with verification evidence
```

## Core Responsibilities

1. **Clean / Hexagonal Architecture**:
   - Keep Domain core completely isolated from databases, HTTP frameworks, and third-party libraries.
   - Use dependency injection to pass repository and service interfaces into use cases.
   - Separate write models (Commands) from read models (Queries) where appropriate.

2. **Transactional Integrity & Idempotency**:
   - Wrap multi-table updates (e.g. mark bill paid + insert transaction + update ledger) in database transactions.
   - Require and enforce unique `Idempotency-Key` headers on payment endpoints to prevent double-charging.

3. **Database Migration Safety**:
   - Author reversible (up/down) migrations.
   - Add columns with default values or nullable types to avoid locking large production tables.
   - Index all foreign key columns.

## Associated Skills & References

- [Clean Architecture Template](references/clean-architecture-template.md)
- [Database Migration Safety Checklist](references/migration-safety-checklist.md)
- [API Error Handling Standard](references/api-error-handling.md)
- [Clean Architecture Hexagonal](../../skills/clean-architecture-hexagonal/SKILL.md)
- [Database Migrations Drizzle/Prisma](../../skills/database-migrations-drizzle-prisma/SKILL.md)
- [TDD Test Driven Development](../../skills/tdd-test-driven-development/SKILL.md)

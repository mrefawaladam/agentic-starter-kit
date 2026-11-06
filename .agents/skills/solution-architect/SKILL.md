---
name: solution-architect
description: Design scalable system architectures, C4 model diagrams, API specifications, database schemas, and Architecture Decision Records (ADR).
---

# Solution Architect Skill

Transforms functional business requirements into robust, scalable, secure, and maintainable software architectures.

## Progressive Disclosure Workflow

```
Step 1: Read Approved Feature PRD & Workflow (`docs/03-requirements/features/<feature-id>/`)
Step 2: Read References (`references/c4-architecture-template.md`, `references/adr-template.md`)
Step 3: Document Architectural Decisions in `docs/05-architecture/decisions/`
Step 4: Model System Component Diagrams in `docs/05-architecture/`
Step 5: Define API Contracts in `docs/06-api/` and Database Schemas in `docs/05-architecture/schemas/`
Step 6: Update `data/knowledge-graph.json` to link new components and endpoints
```

## Core Responsibilities

1. **C4 Model Diagrams**: Represent architecture across multiple abstraction levels (Context, Container, Component) using Mermaid diagrams.
2. **Architecture Decision Records (ADR)**: Capture technical decisions, evaluated alternatives, and trade-offs using standard ADR format (`docs/05-architecture/decisions/ADR-XXX.md`).
3. **Database Schema Design**: Design normalized, indexed schemas with explicit foreign keys, audit timestamps, and soft-delete/status strategies.
4. **API Contracts**: Author clean, type-safe RESTful / RPC contracts with strict request/response payloads, HTTP status codes, and error models.

## Strict RFC Directives

- MUST enforce separation of concerns and clear domain boundaries.
- MUST document data retention, concurrency locking (optimistic vs pessimistic), and idempotency keys.
- NEVER leave foreign key indexing unaddressed on high-traffic relations.
- MUST specify fallback behaviors for external dependencies and third-party gateway failures.

## Associated Skills & References

- [C4 Architecture Template](references/c4-architecture-template.md)
- [ADR Template](references/adr-template.md)
- [Database Schema Conventions](references/database-schema-conventions.md)
- [C4 Model Architecture](../../skills/c4-model-architecture/SKILL.md)
- [ADR Architecture Decisions](../../skills/adr-architecture-decisions/SKILL.md)
- [Clean Architecture Hexagonal](../../skills/clean-architecture-hexagonal/SKILL.md)

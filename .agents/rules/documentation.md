---
trigger: "docs/**"
description: "Rules for creating, modifying, and reviewing documentation"
---

# Documentation Governance Rules

Enforces documentation integrity, single source of truth, and zero duplicate specifications.

## Core Rules

1. **Single Source of Truth**: All application behavior must be defined in `docs/`. Code derives from documentation, never the reverse.
2. **Template Reuse**: Always use templates in `docs/00-governance/templates/` (PRD, Feature Spec, ADR, Acceptance Criteria, Test Plan). Never invent arbitrary schemas.
3. **No Duplicate Specifications**: Never recreate documentation files that already exist. Extend or update existing documents in their respective standard folder (`00-governance` to `10-operations`).
4. **Anti-Hallucination Tag**: Any unverified business logic, external credential, or unconfirmed edge case must be flagged as `[TODO: PENDING_CONFIRMATION]`. Never invent policies.
5. **Readiness Metadata**: Every feature spec must include frontmatter with `id`, `title`, `status` (`DRAFT | IN_REVIEW | APPROVED | READY_FOR_DEV`), `priority`, and `owner`.

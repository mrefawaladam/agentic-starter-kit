---
name: adr-architecture-decisions
description: Record architectural decisions with context, evaluated options, trade-offs, and consequences to build an immutable architectural log.
---

# Architecture Decision Records (ADR)

Captures significant architectural decisions along with their context, trade-offs, and downstream consequences.

## Schema

```markdown
# ADR-[NUMBER]: [SHORT TITLE]

## Status
[ PROPOSED | ACCEPTED | DEPRECATED | SUPERSEDED by ADR-XXX ]

## Date
YYYY-MM-DD

## Context & Problem Statement
Describe the forces at play, requirements, technical constraints, and business drivers.

## Considered Options
1. [Option 1] - Description
2. [Option 2] - Description

## Decision Outcome
Chosen option: [Option X], because [justification based on criteria].

### Positive Consequences
- Gain 1
- Gain 2

### Negative Consequences / Trade-offs
- Downside 1 (mitigation strategy)
```

## Rules

- MUST document decisions before implementation begins (Gate: `APPROVED` -> `READY_FOR_DEV`)
- NEVER delete or overwrite an accepted ADR; always supersede it with a new ADR
- MUST enumerate at least two viable alternatives before reaching a decision

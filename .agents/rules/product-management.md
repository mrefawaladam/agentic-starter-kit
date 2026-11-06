---
trigger: "docs/01-product/**, docs/03-requirements/**"
description: "Rules for Product Managers and requirements authoring"
---

# Product Management Rules

Enforces structured, testable, and unambiguous product requirement specifications.

## Core Directives

1. **Structured Traceability**: Every feature requirement MUST belong to a unique Feature ID (e.g., `FEAT-002-school-payment`) with matching directory in `docs/03-requirements/features/<feature-id>/`.
2. **Standard Artifact Decomposition**: Every feature directory MUST contain:
   - `prd-<feature>.md`: Business context, goals, non-goals, and success metrics.
   - `use-cases.md`: Actor interactions with precondition, main flow, alternate flows, and postconditions.
   - `user-stories.md`: Formatted as `As a <role>, I want <capability>, so that <business value>`.
   - `acceptance-criteria.md`: Written strictly in Given-When-Then (Gherkin format).
   - `risk-register.md`: Matrix of business, technical, and regulatory risks with mitigations.
3. **MoSCoW Prioritization**: Every story and requirement MUST be tagged with `MUST`, `SHOULD`, `COULD`, or `WON'T` to guide sprint planning.
4. **Never Specify Implementation**: PRDs and stories MUST specify *what* and *why*, NEVER internal code mechanics (e.g., database table names, SQL queries, or internal function names belong to Solution Architect specs).
5. **Readiness Gate**: A feature MUST remain in `DRAFT` or `IN_REVIEW` until all open questions (`[TODO: PENDING_CONFIRMATION]`) are resolved by the Product Owner.

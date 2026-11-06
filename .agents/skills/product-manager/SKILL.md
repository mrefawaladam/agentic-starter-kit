---
name: product-manager
description: Author comprehensive Product Requirement Documents (PRD), user story maps, MoSCoW prioritization, and risk registers with token-efficient progressive disclosure.
---

# Product Manager Skill

Enforces rigorous product discovery, feature specification decomposition, and structured requirements engineering.

## Progressive Disclosure Workflow

To minimize token consumption, NEVER read unrelated codebase folders or full documentation trees. Follow this strict sequence:

```
Step 1: Read Product Vision (`docs/01-product/vision.md` or roadmap)
Step 2: Read Scoped References (`references/prd-template.md`, `references/moscow-prioritization.md`)
Step 3: Draft Feature Specifications under `docs/03-requirements/features/<feature-id>/`
Step 4: Update Backlog in `data/backlog.json`
Step 5: Hand off to Business Analyst and Solution Architect with readiness status `IN_REVIEW`
```

## Core Responsibilities

1. **Feature Directory Structure**: Create and maintain structured feature directories under `docs/03-requirements/features/<feature-id>/`:
   - `README.md`: Feature summary, status, priority, and link to all sub-documents.
   - `prd-<feature>.md`: Business goals, customer problems, scope, and key performance indicators.
   - `use-cases.md`: Actor workflows, preconditions, main happy path, alternative paths, and failure states.
   - `user-stories.md`: User stories with business value justification and story estimates.
   - `acceptance-criteria.md`: Given-When-Then criteria defining verifiable test boundaries.
   - `risk-register.md`: Probability-impact assessment for business, technical, and operational risks.

2. **Strict RFC Directives**:
   - MUST define non-goals explicitly to prevent scope creep.
   - MUST format all user stories as `As a <role>, I want <capability>, so that <value>`.
   - MUST tag any ambiguous business policy or unconfirmed constraint as `[TODO: PENDING_CONFIRMATION]`.
   - NEVER include code implementation details, SQL tables, or framework classes in PRDs.
   - MUST assign a MoSCoW priority (`MUST`, `SHOULD`, `COULD`, `WON'T`) to every story.

## Associated Skills & References

- [PRD Template](references/prd-template.md)
- [MoSCoW Prioritization Guide](references/moscow-prioritization.md)
- [Risk Register Template](references/risk-register-template.md)
- [RICE Prioritization Framework](../../skills/rice-prioritization/SKILL.md)
- [User Story Mapping](../../skills/user-story-mapping/SKILL.md)

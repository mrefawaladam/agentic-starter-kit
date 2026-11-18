---
name: code-reviewer
description: Perform independent, rigorous code reviews detecting architecture violations, concurrency race conditions, security flaws, and maintainability smells prior to QA testing.
---

# Code Reviewer Skill

The Code Reviewer provides an independent pair of engineering eyes. To prevent self-validation bias, the agent who writes code should not be the sole party validating code quality and architectural compliance.

## Core Responsibilities

1. **Architectural Compliance**: Verify that new code respects domain boundaries, avoids direct DB bypass, and adheres to recorded ADRs in `docs/00-governance/decision-log.md`.
2. **Concurrency & Race Condition Detection**: Spot transactions that check state outside locks, unhandled promise rejections, and unsafe mutable shared state.
3. **Defensive Coding & Type Safety**: Ensure no loose `any` types, unvalidated user payloads, or suppressed linter rules.
4. **Independent Verdict**: Deliver an objective verdict (`APPROVED` or `CHANGES_REQUESTED`) with actionable fix recommendations.

## Progressive Disclosure Review Flow

```text
Step 1: Read Task Definition & Acceptance Criteria in `data/backlog.json`
Step 2: Read Architectural Constraints & ADRs in `docs/05-architecture/`
Step 3: Inspect Git Diff / Modified Lines (Region Read ONLY)
Step 4: Check for error handling, sanitization, and transaction atomicity
Step 5: Emit structured review report and update task status
```

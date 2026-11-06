---
name: quality-engineer
description: Implement robust test automation suites including Playwright E2E with Page Object Model, Gherkin acceptance testing, API contract tests, and performance load scripts.
---

# Quality Engineer Skill

Guarantees system reliability, verifies adherence to acceptance criteria, and prevents regressions across user journeys.

## Progressive Disclosure Workflow

```
Step 1: Read Acceptance Criteria (`docs/03-requirements/features/<feature-id>/acceptance-criteria.md`)
Step 2: Read References (`references/e2e-page-object-pattern.md`, `references/gherkin-standards.md`)
Step 3: Check API Contracts in `docs/06-api/` and UI screen specs
Step 4: Check Knowledge Graph (`data/knowledge-graph.json`) to identify test coverage gaps
Step 5: Author Playwright E2E tests, API integration tests, or k6 performance tests
Step 6: Execute tests, report pass/fail status, and document verified defects
```

## Core Responsibilities

1. **Acceptance Criteria Verification**: Verify that every Gherkin scenario written by the Product Manager passes cleanly in automated test suites.
2. **Playwright E2E Automation**:
   - Implement the Page Object Model (POM) to isolate UI selector changes from test scenarios.
   - Test critical end-to-end user journeys (e.g. login -> generate bill -> simulated payment callback -> verify receipt).
   - Never use arbitrary sleep/wait times; use Playwright web-first assertions (`expect(locator).toBeVisible()`).
3. **API Contract & Load Testing**:
   - Validate API responses against OpenAPI contracts using Pact or supertest.
   - Author k6 load scripts for high-traffic scenarios (e.g. tuition payment surge at month-end).

## Associated Skills & References

- [E2E Page Object Model Pattern](references/e2e-page-object-pattern.md)
- [Gherkin Authoring Standards](references/gherkin-standards.md)
- [Test Plan Template](references/test-plan-template.md)
- [Playwright E2E Testing](../../skills/playwright-e2e-testing/SKILL.md)
- [Gherkin Acceptance Criteria](../../skills/gherkin-acceptance-criteria/SKILL.md)
- [Contract Testing Pact](../../skills/contract-testing-pact/SKILL.md)
- [Load Testing k6](../../skills/load-testing-k6/SKILL.md)

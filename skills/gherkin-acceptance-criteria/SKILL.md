---
name: gherkin-acceptance-criteria
description: Define unambiguous, testable user acceptance criteria using Given-When-Then Gherkin syntax. Eliminates ambiguity between PM and Engineering.
---

# Gherkin Acceptance Criteria

Standardizes functional acceptance criteria into verifiable behavioral specifications.

## Template

```gherkin
Feature: [Feature Name]
  As a [Role]
  I want [Capability]
  So that [Business Benefit]

  Scenario: [Happy Path Scenario]
    Given [pre-condition / state]
    When [action / trigger executed by user]
    Then [expected system outcome]
    And [secondary verification]

  Scenario: [Validation Error / Edge Case]
    Given [pre-condition]
    When [invalid action attempted]
    Then [specific HTTP error code / validation message]
```

## Rules

- MUST specify exact expected HTTP status codes (`200 OK`, `201 Created`, `400 Bad Request`, `409 Conflict`)
- MUST include at least one positive scenario, one validation scenario, and one authorization/boundary scenario
- NEVER use vague terminology like "system responds appropriately" or "user is notified"

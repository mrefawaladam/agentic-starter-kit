---
name: tdd-test-driven-development
description: Write failing unit and integration tests before writing implementation code. Enforces Red-Green-Refactor cycles and high branch coverage.
---

# Test-Driven Development (TDD)

Enforces strict test-first development cycles to produce resilient, loosely-coupled, and regression-proof software.

## Protocol: Red-Green-Refactor

1. **RED**: Write a single, concise test that asserts the desired behavior from the specification. Run the test and verify that it fails for the expected reason (not due to a compilation syntax error).
2. **GREEN**: Write the minimal amount of implementation code necessary to make the failing test pass. Do not over-engineer or anticipate future requirements.
3. **REFACTOR**: Clean up code structure, eliminate duplication, improve naming, and optimize performance while keeping all tests green.

## Rules

- NEVER write application code without a pre-existing failing test
- MUST test behavior and public contracts, never private implementation details
- MUST follow the Arrange-Act-Assert (AAA) pattern with single assertions per test case
- MUST test boundary conditions: empty collections, null values, maximum integers, and invalid formats
- MUST achieve > 80% branch coverage on core domain services and state machines
- NEVER mock the System Under Test (SUT) — only mock external I/O boundaries

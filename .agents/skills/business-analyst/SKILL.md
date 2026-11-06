---
name: business-analyst
description: Model enterprise business processes, define finite state machine transitions, cultivate ubiquitous domain vocabularies, and detail edge case condition matrices.
---

# Business Analyst Skill

Bridges human business operational realities and structured technical requirements through visual modeling and unambiguous state transitions.

## Progressive Disclosure Workflow

```
Step 1: Read Approved Feature PRD (`docs/03-requirements/features/<feature-id>/prd-*.md`)
Step 2: Read References (`references/bpmn-workflow-patterns.md`, `references/state-machine-template.md`)
Step 3: Define Domain Glossary in `docs/02-discovery/glossary.md`
Step 4: Generate Mermaid BPMN Workflows & State Machines in `docs/03-requirements/workflows/`
Step 5: Hand off verified edge cases to Solution Architect and Quality Engineer
```

## Core Responsibilities

1. **Process Modeling (BPMN)**: Represent end-to-end multi-actor workflows using standard Mermaid flowchart and sequence diagrams with swimlanes and decision gateways.
2. **Finite State Machine (FSM) Transitions**: Specify explicit life cycles for key business entities (e.g. `Invoice`, `Transaction`, `Order`) detailing allowed transitions, triggers, and forbidden transitions.
3. **Ubiquitous Language**: Maintain standard domain terminology definitions to eradicate conceptual ambiguity across engineering teams.
4. **Boundary Condition & Edge Case Matrix**: Map all potential system boundary combinations (e.g. timeout during charge, network disconnect, partial payment).

## Strict RFC Directives

- MUST document both happy path and all catastrophic failure recovery paths.
- MUST state explicitly what happens when an entity receives an invalid state transition event.
- NEVER leave acronyms or domain jargon undefined in specifications.
- MUST ensure Mermaid diagrams use quotes around node text containing parentheses or special characters.

## Associated Skills & References

- [BPMN Workflow Patterns](references/bpmn-workflow-patterns.md)
- [State Machine Template](references/state-machine-template.md)
- [Ubiquitous Language Template](references/ubiquitous-language-template.md)
- [BPMN Process Modeling](../../skills/bpmn-process-modeling/SKILL.md)
- [State Machine Transitions](../../skills/state-machine-transitions/SKILL.md)

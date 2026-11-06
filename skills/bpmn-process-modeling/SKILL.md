---
name: bpmn-process-modeling
description: Model enterprise operational business processes using BPMN 2.0 notation and Mermaid sequence/flowcharts with explicit swimlane separation.
---

# BPMN Process Modeling

Standardized graphical representation of business workflows, actor interactions, and decision trees.

## Elements

- **Pools & Swimlanes**: Explicitly isolate responsibilities between Customer, Front-Office, Back-Office, and External Third Parties.
- **Events**: Start Events (Green circle), Intermediate Events (Double circle), and End Events (Thick circle).
- **Gateways**: Exclusive (XOR), Parallel (AND), and Event-based branches.
- **Activities**: Concrete business tasks executed by an actor or automated system.

## Rules

- MUST specify the actor responsible for every activity via swimlanes
- MUST define happy paths, timeout paths, and rejection/cancellation paths
- MUST document process flows in `docs/02-discovery/business-process/` using Mermaid syntax

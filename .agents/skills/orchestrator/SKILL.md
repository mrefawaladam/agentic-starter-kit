---
name: orchestrator
description: Direct, route, and coordinate multi-agent engineering workflows, compile minimal execution context, enforce token budgets, and manage cross-role handoffs.
---

# Orchestrator Agent Skill

The Orchestrator is the central operating system engine for Sakti-Agent. It receives high-level developer requests, classifies complexity, establishes scope locks, and delegates tasks to specific specialist agents without running unnecessary roles.

## Core Responsibilities

1. **Request Intake & Task Classification**:
   - Classify requests into operations: `audit`, `analyze`, `discover`, `design`, `implement`, `review`, `test`, `debug`, or `release`.
   - Identify affected domains (e.g. Sales, Inventory, Accounting) and estimate task complexity.
2. **Context Compilation & Scope Lock**:
   - Establish strict boundary conditions: what files/symbols are in scope and which are excluded.
   - Enforce the 16k context budget; prevent blind repository scanning.
3. **Specialist Delegation & Dynamic Routing**:
   - Delegate only to the necessary agents (e.g. simple bug fix $\to$ Developer + Reviewer + QA; architectural change $\to$ PM + BA + Architect first).
4. **Handoff Coordination**:
   - Ensure outgoing agents produce structured handoff summaries in `.context/` before triggering downstream specialists.

## Progressive Disclosure Execution Flow

```text
Step 1: Parse request & check task backlog (`data/backlog.json`)
Step 2: Lock domain scope and identify impacted dependencies (`scripts/graph-lookup.js`)
Step 3: Select minimal specialist team required for the task
Step 4: Supervise readiness gates and human approval points
Step 5: Consolidate deliverables and update engineering memory
```

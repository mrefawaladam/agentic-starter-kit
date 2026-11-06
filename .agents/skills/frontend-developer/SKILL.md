---
name: frontend-developer
description: Build responsive, accessible, high-performance web user interfaces using Next.js, React Server Components, Tailwind CSS, accessible primitives, and type-safe state management.
---

# Frontend Developer Skill

Implements client-side features based on approved functional specifications and UI/UX design blueprints.

## Progressive Disclosure Workflow

```
Step 1: Read Approved Feature Spec (`docs/03-requirements/features/<feature-id>/`)
Step 2: Read UI Screen Spec (`docs/04-ux-design/screens/<feature-id>/`)
Step 3: Check API Contract in `docs/06-api/`
Step 4: Check Knowledge Graph (`data/knowledge-graph.json`) for reusable components and types
Step 5: Implement UI using React Server Components, Tailwind CSS, and accessible primitives
Step 6: Write component unit tests and verify against Acceptance Criteria
```

## Core Responsibilities

1. **Component Architecture**:
   - Default to React Server Components (RSC) for data fetching and layout structure.
   - Use `"use client"` solely for components requiring browser APIs, local interactive state, or event handlers.
   - Compose accessible primitives (`Base UI`, `Radix UI`, `React Aria`) without recreating focus or keyboard behaviors.

2. **Strict Baseline UI Alignment**:
   - Adhere strictly to `skills/baseline-ui` rules.
   - Use `size-*` for square items; use `tabular-nums` for numeric and financial displays.
   - Never use `h-screen`, use `h-dvh`.
   - Never animate layout properties; animate only GPU compositor props (`transform`, `opacity`) under 200ms.

3. **Form & Data Handling**:
   - Enforce schema validation on all inputs using Zod or React Hook Form.
   - Never block paste in inputs or textareas.
   - Provide field-level inline error messages and disable submit buttons during in-flight mutations.

## Associated Skills & References

- [Next.js Component Guidelines](references/nextjs-component-guidelines.md)
- [State Management Patterns](references/state-management-patterns.md)
- [Form Validation Standards](references/form-validation-standards.md)
- [Baseline UI](../../skills/baseline-ui/SKILL.md)
- [Next.js & React Best Practices](../../skills/nextjs-react-best-practices/SKILL.md)
- [Systematic Debugging](../../skills/systematic-debugging/SKILL.md)

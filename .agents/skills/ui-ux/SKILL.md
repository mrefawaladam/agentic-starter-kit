---
name: ui-ux
description: Create human-centered design specifications, enforce UI baseline aesthetics, specify exhaustive interaction states, design tokens, and WCAG AA accessibility standards.
---

# UI/UX Designer Skill

Translates business requirements into polished, accessible, responsive visual specifications and interaction guidelines.

## Progressive Disclosure Workflow

```
Step 1: Read Feature Requirements (`docs/03-requirements/features/<feature-id>/`)
Step 2: Review Global Design System in `docs/04-ux-design/design-tokens.md`
Step 3: Read Interaction Guidelines (`skills/baseline-ui/SKILL.md`, `references/ui-states-template.md`)
Step 4: Draft UI Screen Specifications in `docs/04-ux-design/screens/<feature-id>/`
Step 5: Review with Frontend Developer to verify implementation feasibility
```

## Core Responsibilities

1. **Exhaustive UI State Specifications**: Every screen spec MUST document all 5 standard visual states:
   - **Empty State**: Clear guidance, illustration/icon, and one primary call-to-action (CTA).
   - **Loading State**: Structural skeleton loaders matching layout geometry (NEVER full-screen blocking spinners).
   - **Partial State**: Paginated or progressive disclosure states.
   - **Error State**: Non-blocking alert banners or field-level inline error messages with retry actions.
   - **Success / Ideal State**: Polished data presentation using `tabular-nums` and typographic balance.

2. **Strict Baseline UI Constraints** (from `skills/baseline-ui`):
   - MUST use Tailwind CSS defaults unless custom brand tokens explicitly exist.
   - NEVER add animations unless explicitly requested; restrict durations to `<200ms` on GPU-accelerated props (`transform`, `opacity`).
   - MUST use accessible component primitives (`Base UI`, `React Aria`, `Radix`).
   - MUST ensure tap targets are at least `44x44px` on mobile surfaces.
   - NEVER use purple or multicolor gradients, glows, or arbitrary z-index scales.

3. **Accessibility (WCAG 2.1 Level AA)**:
   - Enforce contrast ratio of >= 4.5:1 for standard text and >= 3:1 for large text / graphical objects.
   - Ensure complete keyboard navigation (tabbing, focus traps in modals, `aria-expanded`, `aria-live`).

## Associated Skills & References

- [UI States Specification Template](references/ui-states-template.md)
- [Design Tokens Guide](references/design-tokens-guide.md)
- [Accessibility WCAG AA Checklist](references/accessibility-checklist.md)
- [Baseline UI](../../skills/baseline-ui/SKILL.md)
- [Improve UI](../../skills/improve-ui/SKILL.md)
- [Fixing Accessibility](../../skills/fixing-accessibility/SKILL.md)
- [Fixing Motion Performance](../../skills/fixing-motion-performance/SKILL.md)

# Accessibility (WCAG 2.1 AA) Checklist

## Core Validation Criteria

1. **Color Contrast**:
   - Standard body text (`<18pt` or `<14pt bold`): Minimum contrast ratio `4.5:1`.
   - Large text (`>=18pt` or `>=14pt bold`): Minimum contrast ratio `3.0:1`.
   - Graphical icons and UI components: Minimum contrast ratio `3.0:1`.

2. **Keyboard Operability**:
   - All interactive elements MUST be reachable using `Tab` and `Shift+Tab`.
   - Modals and dialogs MUST trap focus and release focus back to the triggering element upon closing.
   - Esc key MUST close dropdown menus, tooltips, and dialogs.

3. **Screen Reader Affordance**:
   - Icon-only buttons MUST include `aria-label="Description"`.
   - Form inputs MUST have an associated `<label htmlFor="...">`.
   - Async state transitions MUST use `aria-live="polite"` or `aria-busy="true"`.

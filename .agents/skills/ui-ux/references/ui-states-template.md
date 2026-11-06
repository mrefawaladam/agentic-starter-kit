# UI States Specification Template

Every screen specification document must detail the following five canonical states:

## Screen: [Screen Name]

### 1. Ideal / Populated State
- Component layout structure.
- Content hierarchy: Primary heading (`text-xl font-semibold text-slate-900`), data badges, and action buttons.
- Numeric formatting: `font-mono tabular-nums` for currency, quantities, and dates.

### 2. Loading State
- Structural skeleton component representation:
  ```html
  <div class="animate-pulse space-y-3">
    <div class="h-6 w-1/3 rounded bg-slate-200"></div>
    <div class="h-20 w-full rounded-lg bg-slate-100"></div>
    <div class="h-20 w-full rounded-lg bg-slate-100"></div>
  </div>
  ```
- Skeleton geometries must match target rendered components to prevent layout shift (CLS = 0).

### 3. Empty State
- Headline: "No [Entities] Found".
- Explanatory description: One clear sentence explaining why the list is empty.
- Primary Action: One distinct button (e.g. `[ + Create New Bill ]`).

### 4. Error State
- Banner error positioned directly above the interactive area.
- Copy: Plain human-readable explanation (e.g. "Unable to load student bills. Please check your internet connection.").
- Remediation button: `[ Try Again ]`.

### 5. Partial / Edge State
- Truncated text behavior: `line-clamp-2` or `truncate` with tooltip on hover.
- Unpaid vs Overdue badge visual distinctions (`bg-amber-50 text-amber-700` vs `bg-rose-50 text-rose-700`).

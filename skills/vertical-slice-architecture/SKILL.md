---
name: vertical-slice-architecture
description: Implement software features organized as self-contained vertical slices covering presentation, business logic, validation, and database operations.
---

# Vertical Slice Architecture (VSA)

Vertical Slice Architecture organizes code by business features / use cases rather than rigid technical layers (Controller, Service, Repository).

```
Traditional Layered Architecture (Horizontal):
[ Controllers ] -> [ Services ] -> [ Repositories ] -> [ Database Models ]
(High coupling across layers when changing a single feature)

Vertical Slice Architecture:
[ Feature: CreateOrder (Handler + Validation + Query/Command + UI Hook) ]
[ Feature: GetShiftReport (Handler + Query + Excel Export) ]
[ Feature: ProcessRefund (Handler + Policy + Transaction) ]
(Each slice is cohesive, independent, and easily deleted or refactored)
```

## Core Principles

1. **Feature Cohesion**: Keep everything related to a use case as close together as possible.
2. **Minimize Cross-Slice Coupling**: A vertical slice should not directly depend on another slice's internal details. Share domain models or emit domain events.
3. **CQRS Alignment**: Easily pairs with Command Query Responsibility Segregation (Commands mutate data; Queries read data without side effects).

## Recommended Directory Structure

```
src/features/
├── pos-checkout/
│   ├── components/
│   │   ├── CartTable.tsx
│   │   └── PaymentModal.tsx
│   ├── checkout.command.ts       # Backend mutation handler
│   ├── checkout.schema.ts        # Zod validation schema
│   └── use-checkout.ts           # React query/mutation hook
└── shift-management/
    ├── components/
    ├── open-shift.command.ts
    ├── close-shift.command.ts
    └── get-current-shift.query.ts
```

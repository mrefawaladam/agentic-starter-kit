---
name: domain-driven-design
description: Design complex enterprise software around domain models, ubiquitous language, bounded contexts, aggregate roots, and value objects.
---

# Domain-Driven Design (DDD)

Applies tactical and strategic Domain-Driven Design principles to model business domains cleanly and protect transactional invariants.

## Strategic Design

- **Bounded Context**: Explicit boundaries within which a domain model applies. For example, `Sales/POS` context views a product with price and barcode, while `Inventory/Warehouse` context views the same product with shelf location, weight, and reorder levels.
- **Ubiquitous Language**: A shared vocabulary between business stakeholders (PM, BA) and developers embedded directly into code variable names and domain models.
- **Context Mapping**: Defining integration relationships between bounded contexts (Shared Kernel, Customer-Supplier, Anti-Corruption Layer).

## Tactical Building Blocks

1. **Entities**: Objects defined by identity that persists through time (e.g., `Order` with unique `order_id`).
2. **Value Objects**: Immutable objects defined strictly by their attributes, with no conceptual identity (e.g., `Money(amount, currency)`, `Address`).
3. **Aggregate Root**: The entry point cluster of associated entities and value objects treated as a single unit for data changes and business invariant enforcement.
   - External objects may only hold references to the Aggregate Root, never to internal entities directly.
4. **Domain Events**: Records of something significant that occurred in the domain (e.g., `ShiftClosedDomainEvent`, `StockDepletedDomainEvent`).
5. **Repositories**: Interfaces providing collection-like access to aggregate roots from persistence mechanisms.

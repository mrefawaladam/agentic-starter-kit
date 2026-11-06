---
name: clean-architecture-hexagonal
description: Enforce Ports and Adapters (Hexagonal) architecture to decouple domain business logic from frameworks, ORMs, and UI libraries.
---

# Clean Architecture (Hexagonal / Ports & Adapters)

Isolates domain logic from delivery mechanisms, persistence engines, and external dependencies.

## Layer Boundaries

```
[ Frameworks & Drivers: HTTP, CLI, ORM, External APIs ]
                  │
                  ▼
        [ Ports & Adapters ]
                  │
                  ▼
   [ Application Layer: Use Cases ]
                  │
                  ▼
      [ Domain Layer: Entities ]
```

## Rules

- **Domain Layer**:
  - MUST contain pure entities, value objects, domain events, and repository interfaces
  - NEVER import external libraries, HTTP frameworks, database clients, or ORMs inside the domain layer
- **Application Layer**:
  - MUST implement use cases as orchestrators (e.g., `CreateOrderUseCase`)
  - MUST accept and return plain Data Transfer Objects (DTOs), never raw database models
- **Infrastructure Layer**:
  - MUST implement domain repository ports using concrete adapters (Prisma, Drizzle, SQL, Redis)
  - MUST encapsulate all external API clients behind domain interfaces
- **Dependency Rule**:
  - Code dependencies MUST only point inward toward higher-level business policies

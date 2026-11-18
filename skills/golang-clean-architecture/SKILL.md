---
name: golang-clean-architecture
description: Implement idiomatic, high-concurrency Go services using Standard Project Layout, clean architecture, context cancellation, and robust error handling.
---

# Go (Golang) Clean Architecture & Idiomatic Patterns

Guides building production-grade backend microservices in Go adhering to idiomatic standards, zero allocation principles where applicable, and robust concurrency safety.

## Standard Project Layout

```
├── cmd/
│   └── api/
│       └── main.go              # Entry point, dependency wiring
├── internal/
│   ├── domain/                  # Pure entities, value objects, error constants
│   │   ├── order.go
│   │   └── errors.go
│   ├── usecase/                 # Business logic interfaces & implementation
│   │   ├── checkout_usecase.go
│   │   └── interfaces.go
│   ├── repository/              # PostgreSQL / MySQL database adapters (pgx / sqlx)
│   │   └── postgres_order_repo.go
│   └── delivery/                # HTTP / gRPC handlers (Fiber / Gin / Chi)
│       └── http/
│           ├── handler.go
│           └── router.go
└── pkg/                         # Reusable public utilities (logger, jwt, etc.)
```

## Idiomatic Go Directives

1. **Context Propagation**: Always pass `ctx context.Context` as the first parameter to functions performing I/O or network calls. Honor `ctx.Done()` to cancel work immediately when clients disconnect.
2. **Explicit Error Handling**: Never discard errors (`_ = ...`). Wrap errors with context using `%w` (`fmt.Errorf("failed to fetch order %s: %w", orderID, err)`).
3. **Accept Interfaces, Return Structs**: Define interfaces where they are consumed (client side), not where they are implemented.
4. **Concurrency Safety**: Protect shared mutable state with `sync.RWMutex` or channel-based communication. Always run tests with the race detector enabled (`go test -race ./...`).

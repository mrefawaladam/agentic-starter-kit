---
name: python-fastapi-patterns
description: Build high-performance asynchronous web APIs with Python, FastAPI, Pydantic v2 validation, SQLAlchemy 2.0 async, and RFC 7807 error responses.
---

# Python FastAPI & Modern Async Patterns

Prescribes architecture patterns for production-grade Python APIs using FastAPI, async execution, strong typing, and dependency injection.

## Recommended Directory Structure

```
app/
├── core/
│   ├── config.py           # Pydantic BaseSettings with environment parsing
│   ├── database.py         # Async engine & sessionmaker (SQLAlchemy 2.0)
│   └── security.py         # Password hashing (argon2/bcrypt) & JWT handling
├── api/
│   ├── v1/
│   │   ├── api.py          # APIRouter aggregation
│   │   └── endpoints/      # Handlers grouped by domain
│   └── dependencies.py     # Auth user injection, DB session yields
├── models/                 # SQLAlchemy DB entities
├── schemas/                # Pydantic request/response schemas
├── services/               # Reusable business logic services
└── main.py                 # Application bootstrap & middleware
```

## Key Directives

1. **Pydantic v2 Type Safety**: Strict type annotations on request bodies and response models (`response_model=List[ProductResponse]`). Never return raw database models directly to clients.
2. **Async I/O Best Practices**: Use `async def` for I/O-bound endpoints (database, external HTTP with `httpx`). For CPU-heavy work, offload to worker pools or background tasks (`Celery` / `Arq`).
3. **Database Transactions**: Manage DB sessions via `Depends()` generator with automatic commit/rollback context.
4. **Error Handling**: Use custom HTTPException handlers returning standardized RFC 7807 Problem Details JSON format.

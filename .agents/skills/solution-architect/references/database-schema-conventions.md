# Database Schema Conventions

## Naming & Typing Standards

1. **Table Names**: Lowercase snake_case, plural nouns (e.g. `students`, `bills`, `bill_items`, `payment_transactions`).
2. **Primary Keys**: Always `id UUID PRIMARY KEY DEFAULT gen_random_uuid()` or ULID/CUID.
3. **Audit Columns**: Every table MUST include:
   - `created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL`
   - `updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL`
   - `deleted_at TIMESTAMP WITH TIME ZONE NULL` (if soft-delete is required)
4. **Foreign Keys**: Named as `<singular_parent_table>_id` (e.g. `student_id`, `bill_id`) with explicit `ON DELETE RESTRICT` or `CASCADE` depending on domain invariants.
5. **Money & Decimals**: Monetary amounts MUST NEVER use floating point numbers. Use `DECIMAL(14, 2)` or integer cents (`BIGINT`).
6. **Indexes**: Foreign keys, query filter fields (`status`), and uniqueness combinations MUST be indexed explicitly.

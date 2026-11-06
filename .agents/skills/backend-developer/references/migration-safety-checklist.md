# Migration Safety Checklist

## Pre-Deployment Verification

1. **Reversibility**: Every migration MUST have an executable and tested `down` rollback step.
2. **Lock Avoidance**:
   - Never add a non-nullable column without a default value on an existing table.
   - Avoid creating indexes synchronously on production tables with millions of rows; use `CONCURRENTLY` (Postgres).
3. **Column Renaming**:
   - Never rename active columns directly.
   - Use the expand-contract pattern: Add new column -> Dual-write -> Backfill -> Read from new -> Deprecate old column.
4. **Foreign Key Performance**: Verify every foreign key column (`<entity>_id`) has an associated index.

---
name: user-story-mapping
description: Decompose product requirements into horizontal user journeys and vertical release slices to delineate MVP boundaries and delivery phases.
---

# User Story Mapping

Two-dimensional decomposition of product requirements to optimize user value delivery.

## Structure

1. **Backbone (Horizontal Axis)**:
   - High-level activities arranged chronologically from left to right (e.g., Discover -> Select -> Purchase -> Track).
2. **Walking Skeleton (Vertical Slice 1 - MVP)**:
   - The absolute minimal end-to-end functionality required for a working product.
3. **Subsequent Releases (Vertical Slices 2 & 3)**:
   - Sophistication, edge cases, automation, and performance optimizations.

## Rules

- MUST establish the Walking Skeleton before adding secondary stories
- NEVER plan a release that leaves a user workflow dead-ended
- MUST slice vertically (end-to-end from UI to DB), never horizontally (frontend-only or backend-only releases)

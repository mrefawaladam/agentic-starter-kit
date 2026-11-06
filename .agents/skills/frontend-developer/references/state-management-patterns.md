# State Management Patterns

## State Location Decision Tree

1. **URL Query State**: Filter parameters, pagination indices, selected tabs, search keywords.
   - Preserves back button history and link shareability.
   - Use Next.js `useSearchParams` and `router.push`.
2. **Local Component State**: Toggle dialogs, accordions, dropdowns, draft input text.
   - Use `useState` or `useReducer`.
3. **Server Cache & Invalidation**: Remote entities (bills, students, invoices).
   - Use Next.js Server Actions with `revalidatePath` / `revalidateTag` or React Query / SWR.
4. **Client Global Store**: Shopping carts, multi-step checkout drafts, offline synchronization buffers.
   - Use lightweight stores like Zustand.

---
name: nextjs-react-best-practices
description: Best practices for React 19 and Next.js App Router. Enforces Server Components by default, Server Actions with Zod validation, and fine-grained caching.
---

# Next.js & React Best Practices

Enforces performance, security, and developer ergonomics across React 19 and Next.js applications.

## Rules

- MUST default to React Server Components (RSC) unless interactivity or browser APIs (`useState`, `useEffect`, `window`) are strictly required
- MUST place `'use client'` at the lowest possible leaf component in the tree, never at layout or page roots
- MUST validate all Server Action inputs using runtime schemas (`zod` or `valibot`)
- MUST catch and handle errors in Server Actions, returning typed `{ success: boolean, error?: string }` objects rather than throwing unhandled exceptions to the client
- MUST use `revalidateTag()` or `revalidatePath()` to selectively invalidate cached data upon mutations
- NEVER expose sensitive credentials, database clients, or internal API keys in client-side code
- MUST optimize images using `next/image` with explicit `width`, `height`, and responsive `sizes` attributes

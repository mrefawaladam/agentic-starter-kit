# Form Validation Standards

## Zod Schema Validation Pattern

```typescript
import { z } from "zod";

export const CreateBillSchema = z.object({
  studentId: z.string().uuid("Invalid student identifier format"),
  category: z.enum(["SPP", "UANG_GEDUNG", "SERAGAM", "KEGIATAN"]),
  amount: z.number().positive("Amount must be greater than zero"),
  dueDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid due date format",
  }),
  notes: z.string().max(250).optional(),
});

export type CreateBillInput = z.infer<typeof CreateBillSchema>;
```

## Form Directives
- Always validate on client submission and re-validate inside the server action / API route.
- Map field errors directly next to the offending input using `aria-invalid="true"` and `aria-errormessage`.
- Never block pasting passwords or complex billing codes.

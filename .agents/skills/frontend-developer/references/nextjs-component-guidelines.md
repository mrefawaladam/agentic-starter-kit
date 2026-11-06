# Next.js Component Guidelines

## RSC vs Client Component Boundary

```tsx
// Server Component (Default): Data fetching & server rendering
import { getStudentBills } from "@/lib/api";
import { BillListClient } from "./BillListClient";

export default async function StudentBillsPage({ params }: { params: { studentId: string } }) {
  const bills = await getStudentBills(params.studentId);

  return (
    <div className="mx-auto max-w-5xl py-8">
      <h1 className="text-2xl font-bold text-slate-900 text-balance">Tagihan Pembayaran Siswa</h1>
      <BillListClient initialBills={bills} studentId={params.studentId} />
    </div>
  );
}
```

```tsx
// Client Component: Interactive state & micro-interactions
"use client";

import { useState } from "react";
import { Bill } from "@/types";

export function BillListClient({ initialBills }: { initialBills: Bill[] }) {
  const [selectedBillId, setSelectedBillId] = useState<string | null>(null);

  return (
    <div className="mt-4 space-y-3">
      {initialBills.map((bill) => (
        <div key={bill.id} className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4">
          <div>
            <p className="font-semibold text-slate-900">{bill.title}</p>
            <p className="font-mono text-sm tabular-nums text-slate-600">Rp {bill.amount.toLocaleString("id-ID")}</p>
          </div>
          <button
            onClick={() => setSelectedBillId(bill.id)}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 active:scale-95"
          >
            Bayar
          </button>
        </div>
      ))}
    </div>
  );
}
```

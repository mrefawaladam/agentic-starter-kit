# Clean Architecture Layering Template

## Directory Structure

```
src/modules/billing/
├── domain/
│   ├── entities/
│   │   ├── Bill.ts
│   │   └── PaymentTransaction.ts
│   ├── errors/
│   │   └── BillingErrors.ts
│   └── repositories/
│       └── IBillRepository.ts
├── application/
│   ├── use-cases/
│   │   ├── CreateBillUseCase.ts
│   │   └── ProcessPaymentWebhookUseCase.ts
│   └── dtos/
│       └── ProcessPaymentDTO.ts
└── infrastructure/
    ├── http/
    │   └── BillingController.ts
    └── persistence/
        └── PostgresBillRepository.ts
```

## Domain Entity Example

```typescript
export class Bill {
  constructor(
    public readonly id: string,
    public readonly studentId: string,
    public readonly amount: number,
    private _status: "DRAFT" | "PENDING" | "PAID" | "EXPIRED",
    public readonly dueDate: Date
  ) {}

  public markAsPaid(transactionId: string): void {
    if (this._status === "PAID") {
      throw new Error("Bill is already settled");
    }
    if (this._status === "EXPIRED") {
      throw new Error("Cannot pay an expired bill");
    }
    this._status = "PAID";
  }

  get status(): string {
    return this._status;
  }
}
```

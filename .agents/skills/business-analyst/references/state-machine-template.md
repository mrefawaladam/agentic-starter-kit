# State Machine Transition Template

## Entity Lifecycle: `Bill` / `Invoice`

```mermaid
stateDiagram-v2
    [*] --> DRAFT: Created by Administration
    DRAFT --> PUBLISHED: Approved for Billing
    PUBLISHED --> PENDING_PAYMENT: Parent Selects Payment Channel
    PENDING_PAYMENT --> PAID: Payment Gateway Webhook Confirmed
    PENDING_PAYMENT --> EXPIRED: 24h Window Elapsed Without Payment
    EXPIRED --> PENDING_PAYMENT: Regenerate VA / QRIS
    PAID --> REFUNDED: Administrative Approval
    PAID --> [*]
    REFUNDED --> [*]
```

## State Transition Rules Matrix

| From State | Event / Trigger | Target State | Guards & Prerequisites | Post-Action / Side Effects |
| :--- | :--- | :--- | :--- | :--- |
| `DRAFT` | `PUBLISH` | `PUBLISHED` | Total amount > 0, items valid | Send notification to parent |
| `PUBLISHED` | `CHECKOUT` | `PENDING_PAYMENT` | Expiration time set | Generate gateway transaction reference |
| `PENDING_PAYMENT` | `WEBHOOK_SUCCESS` | `PAID` | Gateway HMAC valid, amount matches exactly | Unlock student access, issue receipt |
| `PENDING_PAYMENT` | `EXPIRY_JOB` | `EXPIRED` | Current timestamp > expires_at | Invalidate virtual account |
| `PAID` | `PROCESS_REFUND` | `REFUNDED` | Superadmin token + reason | Reverse ledger entry, notify finance |

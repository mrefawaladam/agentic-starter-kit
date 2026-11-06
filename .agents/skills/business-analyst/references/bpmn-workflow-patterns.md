# BPMN Workflow Modeling Patterns

## Standard Mermaid Swimlane Pattern

Use `flowchart TD` or `sequenceDiagram` to illustrate role-segregated flows:

```mermaid
flowchart TD
    subgraph Parent["Student / Parent"]
        A1[Receive Tuition Bill Notification] --> A2[Select Payment Method: QRIS / VA]
        A2 --> A3[Execute Payment via Mobile Banking]
    end

    subgraph Gateway["Payment Gateway"]
        B1[Generate VA / Dynamic QRIS] --> B2[Detect Settlement Event]
        B2 --> B3[Dispatch Webhook Notification]
    end

    subgraph Core["School Billing System"]
        C1[Publish Monthly Invoices] --> A1
        A2 --> B1
        B3 --> C2{Validate HMAC & Check Idempotency}
        C2 -- "Valid & New" --> C3[Update Bill State to PAID]
        C2 -- "Duplicate" --> C4[Acknowledge 200 OK without double-crediting]
        C3 --> C5[Generate Official PDF Receipt]
    end
```

## Modeling Checklist
- Always represent external third-party timeouts.
- Indicate asynchronous webhook retries.
- Show user feedback states when errors occur.

# Database Schema: Billing & Invoicing (School Tuition)

## Entity Relationship Overview

```mermaid
erDiagram
    STUDENTS ||--o{ BILLS : receives
    BILLS ||--|{ BILL_ITEMS : contains
    BILLS ||--o{ PAYMENT_TRANSACTIONS : settles
    PAYMENT_TRANSACTIONS ||--o| RECEIPTS : generates

    STUDENTS {
        uuid id PK
        string nis UK "Nomor Induk Siswa"
        string full_name
        string class_rombel
        timestamp created_at
    }

    BILLS {
        uuid id PK
        uuid student_id FK
        string bill_code UK "BILL-YYYY-XXXX"
        string title
        decimal total_amount
        string status "PUBLISHED | PENDING_PAYMENT | PAID | EXPIRED"
        timestamp due_date
        timestamp created_at
        timestamp updated_at
    }

    BILL_ITEMS {
        uuid id PK
        uuid bill_id FK
        string category "SPP | GEDUNG | SERAGAM"
        string description
        decimal amount
    }

    PAYMENT_TRANSACTIONS {
        uuid id PK
        uuid bill_id FK
        string gateway_reference UK
        string payment_method "QRIS | VA_MANDIRI | VA_BCA"
        decimal amount_paid
        string status "PENDING | SETTLED | EXPIRED | FAILED"
        string idempotency_key UK
        timestamp settled_at
    }

    RECEIPTS {
        uuid id PK
        uuid transaction_id FK
        string receipt_number UK "RCP-YYYY-MM-XXXX"
        string pdf_url
        string qr_verification_hash
        timestamp issued_at
    }
```

## SQL DDL Reference (PostgreSQL)

```sql
CREATE TABLE bills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE RESTRICT,
    bill_code VARCHAR(32) NOT NULL UNIQUE,
    title VARCHAR(120) NOT NULL,
    total_amount NUMERIC(14, 2) NOT NULL CHECK (total_amount >= 0),
    status VARCHAR(24) NOT NULL DEFAULT 'PUBLISHED' CHECK (status IN ('DRAFT', 'PUBLISHED', 'PENDING_PAYMENT', 'PAID', 'EXPIRED')),
    due_date TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_bills_student_status ON bills(student_id, status);
CREATE INDEX idx_bills_due_date ON bills(due_date);

CREATE TABLE payment_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    bill_id UUID NOT NULL REFERENCES bills(id) ON DELETE RESTRICT,
    gateway_reference VARCHAR(64) NOT NULL UNIQUE,
    payment_method VARCHAR(24) NOT NULL,
    amount_paid NUMERIC(14, 2) NOT NULL,
    status VARCHAR(24) NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'SETTLED', 'EXPIRED', 'FAILED')),
    idempotency_key VARCHAR(128) NOT NULL UNIQUE,
    settled_at TIMESTAMPTZ NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_transactions_bill_id ON payment_transactions(bill_id);
```

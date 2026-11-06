# Risk Register Template

## Risk Assessment Matrix

| Risk ID | Category | Description | Probability (1-5) | Impact (1-5) | Severity Score | Mitigation Strategy | Owner |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **RSK-01** | Technical | Third-party payment gateway downtime | 2 | 5 | 10 (High) | Implement automatic fallback gateway and exponential retry backoff. | Solution Architect |
| **RSK-02** | Business | User disputes duplicate debit charges | 3 | 4 | 12 (High) | Enforce unique idempotency keys on every transaction and instant reconciliation. | Backend Developer |
| **RSK-03** | Compliance | Failure to store audit logs for 5 years | 1 | 5 | 5 (Medium) | Write append-only immutable audit trail to compliant cloud bucket. | Security Engineer |

# Ubiquitous Language Dictionary Template

## Domain: School Payment & Billing (`SPP / Uang Gedung`)

| Term | Aliases | Definition | Business Rules & Constraints |
| :--- | :--- | :--- | :--- |
| **Student Bill (`Tagihan`)** | Invoice | An official financial obligation issued to a student for a specific academic cycle. | Cannot be deleted once published; can only be voided or marked paid. |
| **Virtual Account (VA)** | Billing Code | A 16-digit unique temporary banking identifier generated per transaction. | Single-use or multi-use with fixed expiration of 24 hours. |
| **QRIS Dynamic** | QR Payment | Quick Response code containing the exact bill amount and unique merchant invoice identifier. | Valid for 15 minutes before expiration. |
| **Webhook Callback** | IPN | Asynchronous HTTP POST sent by the Payment Gateway informing the application of settlement. | Must be verified using HMAC-SHA256 signature and deduplicated. |
| **Reconciliation (`Rekonsiliasi`)** | Settlement Audit | Matching system payment logs with bank gateway settlement statements. | Executed daily at 23:59 UTC+7. |

# Gherkin Scenario Standards

## Standard Given-When-Then Format

```gherkin
Feature: Student Tuition Payment via QRIS

  Scenario: Parent successfully pays published tuition bill via QRIS
    Given a published tuition bill "BILL-2026-001" exists for student "STU-88" with amount Rp 500,000
    And the bill status is currently "PENDING_PAYMENT"
    When the parent selects "QRIS" as the payment method
    And completes the transaction via a mobile banking simulation
    And the system receives a valid webhook callback from the payment gateway
    Then the bill status must transition to "PAID"
    And an official receipt must be generated with timestamp and reference ID
    And the student dashboard must reflect "LUNAS" without page refresh
```

## Anti-Pattern Warnings
- Avoid writing procedural UI steps in Gherkin (e.g. `When I click on div with class .btn-submit`). Gherkin describes business behavior, not DOM operations.
- Each scenario should verify one distinct behavior or edge case.

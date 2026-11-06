# Playwright Page Object Model (POM) Pattern

## Structure

```typescript
import { Page, Locator, expect } from "@playwright/test";

export class PaymentPage {
  readonly page: Page;
  readonly payButton: Locator;
  readonly qrisModal: Locator;
  readonly qrisImage: Locator;
  readonly statusBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.payButton = page.getByRole("button", { name: /bayar sekarang/i });
    this.qrisModal = page.getByRole("dialog", { name: /pembayaran qris/i });
    this.qrisImage = page.getByAltText(/qris code/i);
    this.statusBadge = page.getByTestId("bill-status-badge");
  }

  async goto(billId: string) {
    await this.page.goto(`/bills/${billId}`);
  }

  async initiatePayment() {
    await this.payButton.click();
    await expect(this.qrisModal).toBeVisible();
  }

  async verifySettled() {
    await expect(this.statusBadge).toHaveText("LUNAS", { timeout: 10000 });
  }
}
```

## Anti-Flakiness Rules
- Never use `page.waitForTimeout(5000)`. Always wait for dynamic network idle or specific locators.
- Use accessible locators: `page.getByRole()`, `page.getByLabel()`, `page.getByText()`.

---
name: playwright-e2e-testing
description: Author robust, deterministic, cross-browser End-to-End tests using Microsoft Playwright. Use when testing user journeys, critical checkouts, authentication flows, and regression suites.
---

# Playwright E2E Testing

Enforces canonical practices for browser automation, eliminating flaky assertions, arbitrary timeouts, and brittle XPath selectors.

## How to use

- `/playwright-e2e-testing`
  Apply these testing guidelines to any test generation or QA workflow.

- `/playwright-e2e-testing <spec>`
  Review existing test files or generate comprehensive test suites against the given feature specification.

## Core Rules

- MUST use user-facing locators (`getByRole`, `getByLabel`, `getByText`, `getByTestId`) over CSS/XPath
- NEVER use arbitrary `page.waitForTimeout(n)` — always await web-first assertions (`expect(locator).toBeVisible()`)
- MUST structure tests using the Page Object Model (POM) for multi-step user journeys
- MUST isolate test state: each test must run in a clean browser context with isolated cookies and storage
- MUST mock external third-party APIs (Stripe, Twilio, OAuth) via `page.route()` to ensure deterministic CI runs
- SHOULD record traces on failure (`trace: 'retain-on-failure'`) and capture full-page screenshots on error
- MUST test critical viewports: Desktop (1280x720) and Mobile (375x667 Mobile Safari)

## Example

```typescript
import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/login-page';

test.describe('Authentication Flow', () => {
  test('user logs in successfully with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('user@example.com', 'SecurePassword123!');

    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
    await expect(page).toHaveURL(/.*\/dashboard/);
  });
});
```

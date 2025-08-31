import { test, expect } from '@playwright/test';

test('should have title Playwright', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page).toHaveTitle(/Playwright/);
});

test('should fail and take screenshot', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page).toHaveTitle(/ThisWillFail/); // ❌ fails → screenshot/video/trace saved
});
